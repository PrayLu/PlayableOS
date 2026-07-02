import type { TtsProvider, TtsProviderName } from "./types";
import { ElevenLabsProvider } from "./elevenlabs";
import { VolcengineProvider } from "./volcengine";

function resolveProviderName(): TtsProviderName | null {
  const explicit = process.env.TTS_PROVIDER as TtsProviderName | undefined;

  if (explicit === "volcengine" && process.env.VOLCENGINE_TTS_API_KEY) {
    return "volcengine";
  }
  if (explicit === "elevenlabs" && process.env.ELEVENLABS_API_KEY) {
    return "elevenlabs";
  }

  if (process.env.VOLCENGINE_TTS_API_KEY) return "volcengine";
  if (process.env.ELEVENLABS_API_KEY) return "elevenlabs";

  return null;
}

export function createTtsProvider(): TtsProvider | null {
  const name = resolveProviderName();
  if (!name) return null;

  if (name === "volcengine") {
    return new VolcengineProvider(
      process.env.VOLCENGINE_TTS_API_KEY!,
      process.env.VOLCENGINE_TTS_RESOURCE_ID ?? "seed-tts-2.0",
    );
  }

  return new ElevenLabsProvider(process.env.ELEVENLABS_API_KEY!);
}

export function getActiveTtsProviderName(): TtsProviderName | "browser" {
  return resolveProviderName() ?? "browser";
}

export function isTtsConfigured(): boolean {
  return resolveProviderName() !== null;
}
