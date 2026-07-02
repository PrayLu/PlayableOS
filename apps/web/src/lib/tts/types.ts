import { z } from "zod";

export const TtsRequestSchema = z.object({
  text: z.string().min(1).max(2000),
  voice_id: z.string().min(1),
  model_id: z.string().default("seed-tts-2.0-standard"),
  language: z.string().default("zh-CN"),
  stability: z.number().min(0).max(1).default(0.5),
  similarity_boost: z.number().min(0).max(1).default(0.78),
  speech_rate: z.number().min(-50).max(100).optional(),
  emotion: z.string().optional(),
});

export type TtsRequest = z.infer<typeof TtsRequestSchema>;

export type TtsProviderName = "volcengine" | "elevenlabs" | "browser";

export interface TtsProvider {
  name: TtsProviderName;
  synthesize(request: TtsRequest): Promise<ArrayBuffer>;
}

/** 火山引擎豆包语音 — 已验证可用音色 */
export const VOLCENGINE_VOICES = {
  mentor_female: "zh_female_xiaohe_uranus_bigtts",
  colleague_male: "zh_male_ahu_conversation_wvae_bigtts",
  customer_male: "zh_male_jingqiangkanye_moon_bigtts",
  narrator: "zh_female_xiaohe_uranus_bigtts",
} as const;

/** ElevenLabs 音色（备用） */
export const ELEVENLABS_VOICES = {
  mentor_female: "Xb7hH8MSUJpSbSDYk0k2",
  colleague_male: "IKne3meq5aSn9XLyUdCD",
  customer_male: "SOYHLrjzK2X1ezoPC6cr",
  narrator: "EXAVITQu4vr4xnSDxMaL",
} as const;

export function mapRateToSpeechRate(rate: number): number {
  return Math.max(-50, Math.min(100, Math.round((rate - 1) * 100)));
}

export const EMOTION_MAP: Record<string, string> = {
  neutral: "neutral",
  happy: "happy",
  serious: "serious",
  concerned: "sad",
  encouraging: "happy",
};
