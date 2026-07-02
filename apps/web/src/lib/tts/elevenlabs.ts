import type { TtsProvider, TtsRequest } from "./types";

const ELEVENLABS_API = "https://api.elevenlabs.io/v1";

export class ElevenLabsProvider implements TtsProvider {
  name = "elevenlabs" as const;

  constructor(private apiKey: string) {}

  async synthesize(request: TtsRequest): Promise<ArrayBuffer> {
    const response = await fetch(
      `${ELEVENLABS_API}/text-to-speech/${request.voice_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": this.apiKey,
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text: request.text,
          model_id: request.model_id,
          language_code: request.language.startsWith("zh") ? "zh" : undefined,
          voice_settings: {
            stability: request.stability,
            similarity_boost: request.similarity_boost,
            style: 0.15,
            use_speaker_boost: true,
          },
        }),
      },
    );

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new Error(
        `ElevenLabs TTS failed (${response.status}): ${detail.slice(0, 200)}`,
      );
    }

    return response.arrayBuffer();
  }
}
