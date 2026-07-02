import type { PlayableBlueprint, Scene } from "@playableos/blueprint-schema";
import { VOLCENGINE_VOICES } from "@/lib/tts/types";

const SCENE_IMAGES = [
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920&q=80",
  "https://images.unsplash.com/photo-1431540015161-0bf868a140d2?w=1920&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80",
  "https://images.unsplash.com/photo-1497215843270-43b730b1a976?w=1920&q=80",
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80",
];

const VOICE_BY_CHARACTER: Record<string, string> = {
  mentor: VOLCENGINE_VOICES.mentor_female,
  colleague: VOLCENGINE_VOICES.colleague_male,
  customer: VOLCENGINE_VOICES.customer_male,
};

const MOODS: Scene["mood"][] = [
  "warm",
  "calm",
  "tense",
  "focus",
  "tense",
  "calm",
  "success",
];

export function enrichBlueprint(
  raw: PlayableBlueprint,
  playableId: string,
): PlayableBlueprint {
  const title = raw.metadata.title;

  const characters = raw.scenario.characters.map((c, i) => ({
    ...c,
    portrait:
      c.portrait ??
      `https://api.dicebear.com/7.x/notionists/png?seed=${encodeURIComponent(c.name)}&backgroundColor=${i === 0 ? "6366f1" : i === 1 ? "8b5cf6" : "f59e0b"}`,
    position: c.position ?? (i % 2 === 0 ? "left" : "right"),
    voice: {
      rate: c.voice?.rate ?? (c.id === "mentor" ? 0.92 : 1.0),
      pitch: c.voice?.pitch ?? 1.0,
      voice_id:
        c.voice?.voice_id ??
        VOICE_BY_CHARACTER[c.id] ??
        VOLCENGINE_VOICES.narrator,
      stability: c.voice?.stability ?? 0.5,
      similarity_boost: c.voice?.similarity_boost ?? 0.78,
    },
  }));

  const scenes: Record<string, Scene> = {};
  const nodeScenes: Record<string, string> = {};

  raw.experience.nodes.forEach((node, index) => {
    const sceneId = `scene_${node.id}`;
    nodeScenes[node.id] = sceneId;

    const isResult = node.type === "result";
    const isReflection = node.type === "reflection";

    scenes[sceneId] = {
      id: sceneId,
      title: node.title ?? title,
      subtitle: `PlayableOS · ${title}`,
      background:
        isResult || isReflection
          ? {
              type: "gradient",
              gradient: isResult
                ? "linear-gradient(135deg, #312e81 0%, #4f46e5 50%, #0f172a 100%)"
                : "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #0f172a 100%)",
              ken_burns: false,
            }
          : {
              type: "image",
              src: SCENE_IMAGES[index % SCENE_IMAGES.length],
              ken_burns: true,
            },
      mood: MOODS[index % MOODS.length] ?? "neutral",
      particles: node.type === "choice" ? "pulse" : "bokeh",
    };
  });

  return {
    ...raw,
    metadata: {
      ...raw.metadata,
      id: playableId,
      version: "1.0.0",
      language: raw.metadata.language ?? "zh-CN",
    },
    scenario: { ...raw.scenario, characters },
    presentation: {
      theme: {
        accent: "#6366f1",
        accent_glow: "rgba(99, 102, 241, 0.45)",
      },
      scenes,
      node_scenes: nodeScenes,
      audio: {
        bgm: "bgm_main",
        voice_enabled: true,
        tts: {
          provider: "volcengine",
          model_id: "seed-tts-2.0-standard",
          fallback: "browser",
        },
        tracks: {
          bgm_main: {
            src: "https://assets.mixkit.co/music/preview/mixkit-spirit-of-the-digital-world-298.mp3",
            loop: true,
            volume: 0.22,
          },
          ambient_soft: {
            src: "https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3",
            loop: true,
            volume: 0.12,
          },
        },
        sfx: {
          click:
            "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3",
          success:
            "https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3",
          warning:
            "https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3",
          phone_ring:
            "https://assets.mixkit.co/active_storage/sfx/1366/1366-preview.mp3",
          reveal:
            "https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3",
          whoosh:
            "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3",
        },
      },
      character_overrides: {},
    },
  };
}
