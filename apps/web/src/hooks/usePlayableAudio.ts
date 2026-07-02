"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PlayableBlueprint } from "@playableos/blueprint-schema";
import { TtsClient } from "@/lib/tts/client";

interface PlayableAudioOptions {
  blueprint: PlayableBlueprint;
  enabled?: boolean;
}

export function usePlayableAudio({
  blueprint,
  enabled = true,
}: PlayableAudioOptions) {
  const [muted, setMuted] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(
    blueprint.presentation?.audio?.voice_enabled ?? true,
  );
  const [voiceSpeaking, setVoiceSpeaking] = useState(false);
  const [voiceProvider, setVoiceProvider] = useState<
    "volcengine" | "elevenlabs" | "browser" | "idle" | "loading"
  >("loading");
  const [aiVoiceAvailable, setAiVoiceAvailable] = useState(false);

  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const ambientRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const ttsRef = useRef<TtsClient | null>(null);

  if (!ttsRef.current) {
    ttsRef.current = new TtsClient({
      blueprint,
      onSpeakingChange: setVoiceSpeaking,
      onProviderChange: setVoiceProvider,
    });
  }

  useEffect(() => {
    void ttsRef.current?.checkConfigured().then((ok) => {
      setAiVoiceAvailable(ok);
      const provider = ttsRef.current?.getActiveProvider() ?? "browser";
      setVoiceProvider(
        ok && provider !== "browser" && provider !== "idle"
          ? provider
          : "browser",
      );
    });
  }, []);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }, []);

  const playTone = useCallback(
    (freq: number, duration: number, type: OscillatorType = "sine") => {
      if (muted || !enabled) return;
      try {
        const ctx = getCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          ctx.currentTime + duration,
        );
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch {
        /* ignore */
      }
    },
    [enabled, getCtx, muted],
  );

  const playSfx = useCallback(
    (key: string) => {
      if (muted || !enabled) return;

      const url = blueprint.presentation?.audio?.sfx?.[key];
      if (url) {
        const audio = new Audio(url);
        audio.volume = 0.45;
        void audio.play().catch(() => playTone(880, 0.08, "triangle"));
        return;
      }

      const tones: Record<string, () => void> = {
        click: () => playTone(520, 0.06, "triangle"),
        tap: () => playTone(440, 0.05, "sine"),
        success: () => {
          playTone(523, 0.1, "sine");
          setTimeout(() => playTone(659, 0.12, "sine"), 90);
          setTimeout(() => playTone(784, 0.15, "sine"), 180);
        },
        warning: () => {
          playTone(330, 0.12, "square");
          setTimeout(() => playTone(294, 0.15, "square"), 120);
        },
        phone_ring: () => {
          for (let i = 0; i < 3; i++) {
            setTimeout(() => playTone(880, 0.18, "sine"), i * 400);
            setTimeout(() => playTone(988, 0.18, "sine"), i * 400 + 200);
          }
        },
        whoosh: () => playTone(220, 0.2, "sine"),
        reveal: () => playTone(392, 0.14, "triangle"),
      };

      (tones[key] ?? tones.click)?.();
    },
    [blueprint.presentation?.audio?.sfx, enabled, muted, playTone],
  );

  const speak = useCallback(
    (text: string, characterId?: string, emotion?: string) => {
      if (muted || !enabled || !voiceEnabled) return;
      void ttsRef.current?.speak(text, characterId, emotion);
    },
    [enabled, muted, voiceEnabled],
  );

  const startBgm = useCallback(() => {
    if (muted || !enabled) return;
    const bgmKey = blueprint.presentation?.audio?.bgm;
    const track = bgmKey
      ? blueprint.presentation?.audio?.tracks?.[bgmKey]
      : null;
    if (!track?.src) return;

    if (!bgmRef.current) {
      bgmRef.current = new Audio(track.src);
      bgmRef.current.loop = track.loop;
      bgmRef.current.volume = track.volume;
    }
    void bgmRef.current.play().catch(() => undefined);
  }, [blueprint.presentation?.audio, enabled, muted]);

  const setAmbient = useCallback(
    (trackKey?: string) => {
      if (muted || !enabled || !trackKey) return;
      const track = blueprint.presentation?.audio?.tracks?.[trackKey];
      if (!track?.src) return;

      if (ambientRef.current) {
        ambientRef.current.pause();
        ambientRef.current = null;
      }

      const audio = new Audio(track.src);
      audio.loop = track.loop;
      audio.volume = track.volume * 0.6;
      ambientRef.current = audio;
      void audio.play().catch(() => undefined);
    },
    [blueprint.presentation?.audio?.tracks, enabled, muted],
  );

  const stopAll = useCallback(() => {
    bgmRef.current?.pause();
    ambientRef.current?.pause();
    ttsRef.current?.stop();
  }, []);

  useEffect(() => {
    return () => {
      stopAll();
      void ctxRef.current?.close();
    };
  }, [stopAll]);

  return {
    muted,
    voiceEnabled,
    voiceSpeaking,
    voiceProvider,
    aiVoiceAvailable,
    setMuted,
    setVoiceEnabled,
    playSfx,
    speak,
    startBgm,
    setAmbient,
    stopAll,
  };
}
