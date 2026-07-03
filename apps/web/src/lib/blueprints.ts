import {
  parsePlayableBlueprint,
  type PlayableBlueprint,
} from "@playableos/blueprint-schema";
import corporateCulture from "../../../../fixtures/blueprints/corporate-culture.json";
import runzeyuanOnboarding from "../../../../fixtures/blueprints/runzeyuan-onboarding.json";
import yangmingGaoyu from "../../../../fixtures/blueprints/yangming-gaoyu.json";
import { getStoredPlayable } from "./store/playables";

export interface PlayableEntry {
  id: string;
  blueprint: PlayableBlueprint;
  source?: "fixture" | "generated";
  sourceFileName?: string;
  createdAt?: string;
}

const FIXTURES: Record<string, PlayableBlueprint> = {
  "corporate-culture": parsePlayableBlueprint(corporateCulture),
  "runzeyuan-onboarding": parsePlayableBlueprint(runzeyuanOnboarding),
  "yangming-gaoyu": parsePlayableBlueprint(yangmingGaoyu),
};

export async function getBlueprint(id: string): Promise<PlayableBlueprint | null> {
  if (FIXTURES[id]) return FIXTURES[id];

  const stored = await getStoredPlayable(id);
  return stored?.blueprint ?? null;
}

export async function getPlayableEntry(
  id: string,
): Promise<PlayableEntry | null> {
  if (FIXTURES[id]) {
    return { id, blueprint: FIXTURES[id], source: "fixture" };
  }

  const stored = await getStoredPlayable(id);
  if (!stored) return null;

  return {
    id: stored.id,
    blueprint: stored.blueprint,
    source: "generated",
    sourceFileName: stored.sourceFileName,
    createdAt: stored.createdAt,
  };
}

export async function listBlueprints(): Promise<PlayableEntry[]> {
  const { listStoredPlayables } = await import("./store/playables");
  const generated = await listStoredPlayables();

  const fixtures: PlayableEntry[] = Object.entries(FIXTURES).map(
    ([id, blueprint]) => ({
      id,
      blueprint,
      source: "fixture" as const,
    }),
  );

  const genEntries: PlayableEntry[] = generated.map((g) => ({
    id: g.id,
    blueprint: g.blueprint,
    source: "generated" as const,
    sourceFileName: g.sourceFileName,
    createdAt: g.createdAt,
  }));

  return [...genEntries, ...fixtures];
}

export const DEFAULT_PLAYABLE_ID = "corporate-culture";
