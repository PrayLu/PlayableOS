"use client";

import type { PlayableBlueprint } from "@playableos/blueprint-schema";
import {
  ELEVENLABS_VOICES,
  EMOTION_MAP,
  mapRateToSpeechRate,
  VOLCENGINE_VOICES,
  type TtsProviderName,
} from "@/lib/tts/types";
import { prepareTextForTts, splitForTts } from "@/lib/tts/text";

const audioCache = new Map<string, string>();

function cacheKey(text: string, voiceId: string, modelId: string): string {
  return `${voiceId}:${modelId}:${text}`;
}

function resolveVoiceId(
  blueprint: PlayableBlueprint,
  characterId?: string,
  provider: TtsProviderName = "volcengine",
): string {
  if (characterId) {
    const character = blueprint.scenario.characters.find(
      (c) => c.id === characterId,
    );
    if (character?.voice?.voice_id) return character.voice.voice_id;
  }

  const defaults =
    provider === "elevenlabs" ? ELEVENLABS_VOICES : VOLCENGINE_VOICES;

  if (characterId && characterId in defaults) {
    return defaults[characterId as keyof typeof defaults];
  }

  // partner 等新角色 id 复用 mentor 默认音色
  if (characterId === "partner") {
    return defaults.mentor_female;
  }

  return defaults.narrator;
}

function speakWithBrowser(
  text: string,
  blueprint: PlayableBlueprint,
  characterId?: string,
): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      resolve();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = blueprint.metadata.language ?? "zh-CN";
    utterance.rate = 0.95;

    const character = blueprint.scenario.characters.find(
      (c) => c.id === characterId,
    );
    if (character?.voice) {
      utterance.rate = character.voice.rate;
      utterance.pitch = character.voice.pitch;
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    window.speechSynthesis.speak(utterance);
  });
}

export interface TtsClientOptions {
  blueprint: PlayableBlueprint;
  onSpeakingChange?: (speaking: boolean) => void;
  onProviderChange?: (provider: TtsProviderName | "browser" | "idle") => void;
}

export class TtsClient {
  private currentAudio: HTMLAudioElement | null = null;
  private abortController: AbortController | null = null;
  private configured: boolean | null = null;
  private activeProvider: TtsProviderName = "volcengine";

  constructor(private options: TtsClientOptions) {}

  async checkConfigured(): Promise<boolean> {
    if (this.configured !== null) return this.configured;

    try {
      const res = await fetch("/api/tts");
      const data = (await res.json()) as {
        configured: boolean;
        provider: TtsProviderName | "browser";
      };
      this.configured = data.configured;
      if (data.provider !== "browser") {
        this.activeProvider = data.provider;
      }
      return data.configured;
    } catch {
      this.configured = false;
      return false;
    }
  }

  getActiveProvider(): TtsProviderName | "browser" | "idle" {
    if (this.configured === false) return "browser";
    return this.activeProvider;
  }

  stop(): void {
    this.abortController?.abort();
    this.abortController = null;

    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.src = "";
      this.currentAudio = null;
    }

    if (typeof window !== "undefined") {
      window.speechSynthesis?.cancel();
    }

    this.options.onSpeakingChange?.(false);
  }

  async speak(
    text: string,
    characterId?: string,
    emotion?: string,
  ): Promise<void> {
    const cleaned = prepareTextForTts(text);
    if (!cleaned) return;

    const { blueprint, onSpeakingChange, onProviderChange } = this.options;
    const ttsConfig = blueprint.presentation?.audio?.tts;
    const preferBrowser = ttsConfig?.provider === "browser";
    const fallback = ttsConfig?.fallback ?? "browser";

    this.stop();

    if (preferBrowser) {
      onProviderChange?.("browser");
      onSpeakingChange?.(true);
      await speakWithBrowser(cleaned, blueprint, characterId);
      onSpeakingChange?.(false);
      return;
    }

    const configured = await this.checkConfigured();
    if (!configured) {
      if (fallback === "browser") {
        onProviderChange?.("browser");
        onSpeakingChange?.(true);
        await speakWithBrowser(cleaned, blueprint, characterId);
        onSpeakingChange?.(false);
      } else {
        onProviderChange?.("idle");
      }
      return;
    }

    const character = blueprint.scenario.characters.find(
      (c) => c.id === characterId,
    );
    const voiceId = resolveVoiceId(
      blueprint,
      characterId,
      this.activeProvider,
    );
    const modelId =
      ttsConfig?.model_id ??
      (this.activeProvider === "volcengine"
        ? "seed-tts-2.0-standard"
        : "eleven_multilingual_v2");

    const segments = splitForTts(cleaned);
    onSpeakingChange?.(true);
    onProviderChange?.(this.activeProvider);

    try {
      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i]!;
        const key = cacheKey(segment, voiceId, modelId);

        let blobUrl = audioCache.get(key);

        if (!blobUrl) {
          this.abortController = new AbortController();

          const response = await fetch("/api/tts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            signal: this.abortController.signal,
            body: JSON.stringify({
              text: segment,
              voice_id: voiceId,
              model_id: modelId,
              language: blueprint.metadata.language,
              stability: character?.voice?.stability ?? 0.58,
              similarity_boost: character?.voice?.similarity_boost ?? 0.82,
              speech_rate: character?.voice?.rate
                ? mapRateToSpeechRate(character.voice.rate)
                : -12,
              emotion: emotion ? EMOTION_MAP[emotion] : undefined,
            }),
          });

          if (!response.ok) {
            throw new Error(`TTS API ${response.status}`);
          }

          const buffer = await response.arrayBuffer();
          const blob = new Blob([buffer], { type: "audio/mpeg" });
          blobUrl = URL.createObjectURL(blob);
          audioCache.set(key, blobUrl);
        }

        const audio = new Audio(blobUrl);
        this.currentAudio = audio;
        audio.volume = 0.92;

        await new Promise<void>((resolve, reject) => {
          audio.onended = () => resolve();
          audio.onerror = () => reject(new Error("Audio playback failed"));
          void audio.play().catch(reject);
        });

        if (i < segments.length - 1) {
          await new Promise((r) => setTimeout(r, 280));
        }
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      if (fallback === "browser") {
        onProviderChange?.("browser");
        await speakWithBrowser(cleaned, blueprint, characterId);
      } else {
        onProviderChange?.("idle");
      }
    } finally {
      this.currentAudio = null;
      this.abortController = null;
      onSpeakingChange?.(false);
    }
  }
}
