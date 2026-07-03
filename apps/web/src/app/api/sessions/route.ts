import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { saveSession, listSessions } from "@/lib/store/sessions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const playableId = searchParams.get("playableId") ?? undefined;
  const sessions = await listSessions(playableId);
  return NextResponse.json(sessions);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      playableId,
      playableTitle,
      playerName,
      score,
      passed,
      dimension_scores,
      reflection,
      duration_ms,
    } = body;

    if (!playableId || typeof score !== "number") {
      return NextResponse.json({ error: "缺少必要字段" }, { status: 400 });
    }

    const session = await saveSession({
      id: `sess-${randomUUID().slice(0, 8)}`,
      playableId,
      playableTitle: playableTitle ?? "未命名训练",
      playerName: playerName?.trim() || "匿名学员",
      score,
      passed: Boolean(passed),
      dimension_scores: dimension_scores ?? {},
      reflection,
      completedAt: new Date().toISOString(),
      duration_ms: duration_ms ?? 0,
    });

    return NextResponse.json(session);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "保存训练记录失败";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
