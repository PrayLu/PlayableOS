import type {
  DialogueLine,
  PlayableBlueprint,
  Scene,
} from "@playableos/blueprint-schema";

export interface NormalizedDialogue {
  character_id: string;
  lines: DialogueLine[];
}

export function normalizeDialogue(
  content: PlayableBlueprint["interactions"]["dialogues"][string],
): NormalizedDialogue {
  if ("lines" in content) {
    return { character_id: content.character_id, lines: content.lines };
  }
  return {
    character_id: content.character_id,
    lines: content.messages.map((text) => ({
      text,
      emotion: "neutral" as const,
    })),
  };
}

export function getSceneForNode(
  blueprint: PlayableBlueprint,
  nodeId: string,
): Scene | null {
  const presentation = blueprint.presentation;
  if (!presentation) return null;

  const node = blueprint.experience.nodes.find((n) => n.id === nodeId);
  const sceneId =
    node?.scene_id ??
    presentation.node_scenes[nodeId] ??
    Object.keys(presentation.scenes)[0];

  if (!sceneId) return null;
  return presentation.scenes[sceneId] ?? null;
}

export function getCharacterPortrait(
  blueprint: PlayableBlueprint,
  characterId: string,
  emotion?: string,
): string | undefined {
  const character = blueprint.scenario.characters.find(
    (c) => c.id === characterId,
  );
  const overrides = blueprint.presentation?.character_overrides[characterId];

  if (emotion && overrides?.emotions?.[emotion]) {
    return overrides.emotions[emotion];
  }

  return overrides?.portrait ?? character?.portrait;
}

export function getCharacterPosition(
  blueprint: PlayableBlueprint,
  characterId: string,
): "left" | "right" | "center" {
  const character = blueprint.scenario.characters.find(
    (c) => c.id === characterId,
  );
  const override = blueprint.presentation?.character_overrides[characterId];
  return override?.position ?? character?.position ?? "left";
}

export const MOOD_OVERLAYS: Record<string, string> = {
  calm: "linear-gradient(180deg, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.65) 100%)",
  warm: "linear-gradient(180deg, rgba(120,53,15,0.15) 0%, rgba(15,23,42,0.7) 100%)",
  tense: "linear-gradient(180deg, rgba(127,29,29,0.25) 0%, rgba(15,23,42,0.75) 100%)",
  focus: "linear-gradient(180deg, rgba(30,58,138,0.2) 0%, rgba(15,23,42,0.72) 100%)",
  success:
    "linear-gradient(180deg, rgba(6,78,59,0.2) 0%, rgba(15,23,42,0.65) 100%)",
  neutral:
    "linear-gradient(180deg, rgba(15,23,42,0.25) 0%, rgba(15,23,42,0.7) 100%)",
};
