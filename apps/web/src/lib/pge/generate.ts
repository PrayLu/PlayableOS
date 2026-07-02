import {
  parsePlayableBlueprint,
  safeParsePlayableBlueprint,
} from "@playableos/blueprint-schema";
import type { PlayableBlueprint } from "@playableos/blueprint-schema";
import { randomUUID } from "crypto";
import { callDeepSeekJson } from "./deepseek";
import { enrichBlueprint } from "./enrich";
import { buildPgeUserPrompt, PGE_SYSTEM_PROMPT } from "./prompt";

export interface GenerateResult {
  id: string;
  blueprint: PlayableBlueprint;
  sourceFileName: string;
  sourceTextPreview: string;
}

export async function generatePlayableFromText(
  documentText: string,
  fileName: string,
): Promise<GenerateResult> {
  const playableId = `gen-${randomUUID().slice(0, 8)}`;
  const userPrompt = buildPgeUserPrompt(documentText, fileName);

  let lastError = "未知错误";

  for (let attempt = 0; attempt < 2; attempt++) {
    const rawJson = await callDeepSeekJson(
      attempt === 0
        ? PGE_SYSTEM_PROMPT
        : `${PGE_SYSTEM_PROMPT}\n\n上次输出未通过 Schema 校验，请严格修正 JSON 结构后重新输出。`,
      attempt === 0
        ? userPrompt
        : `${userPrompt}\n\n校验错误：${lastError}`,
    );

    const parsed = safeParsePlayableBlueprint(rawJson);
    if (parsed.success) {
      const blueprint = enrichBlueprint(parsed.data, playableId);
      parsePlayableBlueprint(blueprint);
      return {
        id: playableId,
        blueprint,
        sourceFileName: fileName,
        sourceTextPreview: documentText.slice(0, 500),
      };
    }

    lastError = JSON.stringify(parsed.error.flatten().fieldErrors).slice(
      0,
      500,
    );
  }

  throw new Error(`Blueprint 生成失败：${lastError}`);
}
