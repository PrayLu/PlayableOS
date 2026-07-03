import {
  parsePlayableBlueprint,
  safeParsePgeBlueprint,
  type PgeBlueprint,
} from "@playableos/blueprint-schema";
import type { PlayableBlueprint } from "@playableos/blueprint-schema";
import { randomUUID } from "crypto";
import { callDeepSeekJson } from "./deepseek";
import { enrichBlueprint } from "./enrich";
import { buildPgeUserPrompt, PGE_SYSTEM_PROMPT } from "./prompt";

import type { KnowledgeSummary } from "./analyze";

export interface GenerateResult {
  id: string;
  blueprint: PlayableBlueprint;
  sourceFileName: string;
  sourceTextPreview: string;
  knowledgeSummary?: KnowledgeSummary;
}

function normalizePgeOutput(raw: unknown): unknown {
  if (!raw || typeof raw !== "object") return raw;

  const obj = raw as Record<string, unknown>;
  const meta = (obj.metadata ?? {}) as Record<string, unknown>;

  return {
    ...obj,
    metadata: {
      language: "zh-CN",
      type: "simulation",
      tags: [],
      ...meta,
      duration_minutes:
        meta.duration_minutes !== undefined
          ? Number(meta.duration_minutes)
          : 12,
    },
    interactions: {
      intros: {},
      dialogues: {},
      choices: {},
      feedbacks: {},
      reflections: {},
      results: {},
      ...((obj.interactions as object) ?? {}),
    },
    assessment: {
      passing_score: 60,
      ...((obj.assessment as object) ?? {}),
    },
  };
}

export async function generatePlayableFromText(
  documentText: string,
  fileName: string,
  knowledgeSummary?: KnowledgeSummary,
): Promise<GenerateResult> {
  const playableId = `gen-${randomUUID().slice(0, 8)}`;
  const userPrompt = buildPgeUserPrompt(documentText, fileName, knowledgeSummary);

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

    const normalized = normalizePgeOutput(rawJson);
    const parsed = safeParsePgeBlueprint(normalized);

    if (parsed.success) {
      const blueprint = enrichBlueprint(parsed.data as PgeBlueprint, playableId);
      parsePlayableBlueprint(blueprint);
      return {
        id: playableId,
        blueprint,
        sourceFileName: fileName,
        sourceTextPreview: documentText.slice(0, 500),
        knowledgeSummary,
      };
    }

    lastError = JSON.stringify(parsed.error.flatten().fieldErrors).slice(
      0,
      800,
    );
  }

  throw new Error(`Blueprint 生成失败：${lastError}`);
}
