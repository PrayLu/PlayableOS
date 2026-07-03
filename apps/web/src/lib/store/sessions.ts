import { promises as fs } from "fs";
import path from "path";

export interface TrainingSession {
  id: string;
  playableId: string;
  playableTitle: string;
  playerName: string;
  score: number;
  passed: boolean;
  dimension_scores: Record<string, number>;
  reflection?: string;
  completedAt: string;
  duration_ms: number;
}

const SESSIONS_DIR = path.join(process.cwd(), "data", "sessions");

async function ensureDir(): Promise<void> {
  await fs.mkdir(SESSIONS_DIR, { recursive: true });
}

function sessionPath(id: string): string {
  return path.join(SESSIONS_DIR, `${id}.json`);
}

export async function saveSession(session: TrainingSession): Promise<TrainingSession> {
  await ensureDir();
  await fs.writeFile(sessionPath(session.id), JSON.stringify(session, null, 2));
  return session;
}

export async function listSessions(playableId?: string): Promise<TrainingSession[]> {
  await ensureDir();
  let files: string[];
  try {
    files = await fs.readdir(SESSIONS_DIR);
  } catch {
    return [];
  }

  const sessions: TrainingSession[] = [];
  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    try {
      const raw = await fs.readFile(path.join(SESSIONS_DIR, file), "utf-8");
      const session = JSON.parse(raw) as TrainingSession;
      if (!playableId || session.playableId === playableId) {
        sessions.push(session);
      }
    } catch {
      /* skip corrupt files */
    }
  }

  return sessions.sort(
    (a, b) =>
      new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime(),
  );
}

export interface DashboardStats {
  total_sessions: number;
  completion_count: number;
  average_score: number;
  pass_rate: number;
  dimension_averages: Record<string, number>;
  recent_sessions: TrainingSession[];
}

export async function getDashboardStats(
  playableId?: string,
): Promise<DashboardStats> {
  const sessions = await listSessions(playableId);

  if (sessions.length === 0) {
    return {
      total_sessions: 0,
      completion_count: 0,
      average_score: 0,
      pass_rate: 0,
      dimension_averages: {},
      recent_sessions: [],
    };
  }

  const totalScore = sessions.reduce((s, x) => s + x.score, 0);
  const passed = sessions.filter((s) => s.passed).length;

  const dimTotals: Record<string, { sum: number; count: number }> = {};
  for (const session of sessions) {
    for (const [dim, score] of Object.entries(session.dimension_scores)) {
      if (!dimTotals[dim]) dimTotals[dim] = { sum: 0, count: 0 };
      dimTotals[dim].sum += score;
      dimTotals[dim].count += 1;
    }
  }

  const dimension_averages: Record<string, number> = {};
  for (const [dim, { sum, count }] of Object.entries(dimTotals)) {
    dimension_averages[dim] = Math.round(sum / count);
  }

  return {
    total_sessions: sessions.length,
    completion_count: sessions.length,
    average_score: Math.round(totalScore / sessions.length),
    pass_rate: Math.round((passed / sessions.length) * 100),
    dimension_averages,
    recent_sessions: sessions.slice(0, 10),
  };
}
