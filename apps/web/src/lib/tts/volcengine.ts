import { randomUUID } from "crypto";
import type { TtsProvider, TtsRequest } from "./types";

const VOLCENGINE_API =
  "https://openspeech.bytedance.com/api/v3/tts/unidirectional";

interface VolcengineChunk {
  code?: number;
  message?: string;
  data?: string | null;
}

function parseConcatenatedJson(text: string): VolcengineChunk[] {
  const results: VolcengineChunk[] = [];
  let i = 0;

  while (i < text.length) {
    while (i < text.length && /\s/.test(text[i]!)) i++;
    if (i >= text.length) break;

    if (text[i] !== "{") {
      i++;
      continue;
    }

    let depth = 0;
    const start = i;

    for (let j = i; j < text.length; j++) {
      if (text[j] === "{") depth++;
      if (text[j] === "}") depth--;
      if (depth === 0) {
        try {
          results.push(JSON.parse(text.slice(start, j + 1)) as VolcengineChunk);
        } catch {
          /* skip malformed chunk */
        }
        i = j + 1;
        break;
      }
    }

    if (depth !== 0) break;
  }

  return results;
}

function resolveResourceId(speaker: string, fallback: string): string {
  if (speaker.includes("uranus_bigtts") || speaker.includes("saturn_bigtts")) {
    return "seed-tts-2.0";
  }
  if (
    speaker.includes("moon_bigtts") ||
    speaker.includes("wvae_bigtts") ||
    speaker.includes("_streaming")
  ) {
    return "seed-tts-1.0";
  }
  return fallback;
}

function isTts2Resource(resourceId: string): boolean {
  return resourceId.startsWith("seed-tts-2");
}

export class VolcengineProvider implements TtsProvider {
  name = "volcengine" as const;

  constructor(
    private apiKey: string,
    private defaultResourceId: string,
  ) {}

  async synthesize(request: TtsRequest): Promise<ArrayBuffer> {
    const resourceId = resolveResourceId(request.voice_id, this.defaultResourceId);
    const useTts2 = isTts2Resource(resourceId);

    const reqParams: Record<string, unknown> = {
      text: request.text,
      speaker: request.voice_id,
      audio_params: {
        format: "mp3",
        sample_rate: 24000,
        ...(request.speech_rate !== undefined
          ? { speech_rate: request.speech_rate }
          : {}),
        ...(request.emotion && !useTts2 ? { emotion: request.emotion } : {}),
      },
      // 火山 API 要求 additions 为 JSON 字符串，不能是 object
      additions: JSON.stringify({
        explicit_language: request.language.startsWith("zh") ? "zh" : "en",
      }),
    };

    if (useTts2) {
      reqParams.model = request.model_id || "seed-tts-2.0-standard";
    }

    const response = await fetch(VOLCENGINE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": this.apiKey,
        "X-Api-Resource-Id": resourceId,
        "X-Api-Request-Id": randomUUID(),
      },
      body: JSON.stringify({
        user: { uid: "playableos" },
        req_params: reqParams,
      }),
    });

    const logId = response.headers.get("X-Tt-Logid");

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new Error(
        `Volcengine TTS failed (${response.status})${logId ? ` [logid=${logId}]` : ""}: ${detail.slice(0, 300)}`,
      );
    }

    const body = await response.text();
    const chunks = parseConcatenatedJson(body);
    const audioParts: Uint8Array[] = [];

    for (const chunk of chunks) {
      if (chunk.code !== undefined && chunk.code !== 0 && chunk.code !== 20000000) {
        throw new Error(
          `Volcengine TTS error ${chunk.code}: ${chunk.message ?? "unknown"}${logId ? ` [logid=${logId}]` : ""}`,
        );
      }
      if (chunk.data && typeof chunk.data === "string") {
        audioParts.push(new Uint8Array(Buffer.from(chunk.data, "base64")));
      }
    }

    if (audioParts.length === 0) {
      throw new Error(
        `Volcengine TTS returned no audio${logId ? ` [logid=${logId}]` : ""}`,
      );
    }

    const total = audioParts.reduce((sum, p) => sum + p.length, 0);
    const merged = new Uint8Array(total);
    let offset = 0;
    for (const part of audioParts) {
      merged.set(part, offset);
      offset += part.length;
    }

    return merged.buffer;
  }
}
