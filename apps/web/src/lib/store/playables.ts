import { parsePlayableBlueprint } from "@playableos/blueprint-schema";
import type { PlayableBlueprint } from "@playableos/blueprint-schema";
import { promises as fs } from "fs";
import path from "path";

export interface StoredPlayable {
  id: string;
  createdAt: string;
  sourceFileName: string;
  sourceTextPreview: string;
  blueprint: PlayableBlueprint;
}

const DATA_DIR = path.join(process.cwd(), "data", "generated");

async function ensureDataDir(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

function filePath(id: string): string {
  return path.join(DATA_DIR, `${id}.json`);
}

export async function savePlayable(
  entry: StoredPlayable,
): Promise<StoredPlayable> {
  await ensureDataDir();
  await fs.writeFile(filePath(entry.id), JSON.stringify(entry, null, 2), "utf-8");
  return entry;
}

export async function getStoredPlayable(
  id: string,
): Promise<StoredPlayable | null> {
  try {
    const raw = await fs.readFile(filePath(id), "utf-8");
    const data = JSON.parse(raw) as StoredPlayable;
    data.blueprint = parsePlayableBlueprint(data.blueprint);
    return data;
  } catch {
    return null;
  }
}

export async function listStoredPlayables(): Promise<StoredPlayable[]> {
  await ensureDataDir();
  const files = await fs.readdir(DATA_DIR);
  const entries: StoredPlayable[] = [];

  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    const id = file.replace(/\.json$/, "");
    const entry = await getStoredPlayable(id);
    if (entry) entries.push(entry);
  }

  return entries.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}
