import { NextResponse } from "next/server";
import { listStoredPlayables } from "@/lib/store/playables";

export async function GET() {
  const playables = await listStoredPlayables();
  return NextResponse.json(
    playables.map((p) => ({
      id: p.id,
      title: p.blueprint.metadata.title,
      description: p.blueprint.metadata.description,
      duration_minutes: p.blueprint.metadata.duration_minutes,
      sourceFileName: p.sourceFileName,
      createdAt: p.createdAt,
      playUrl: `/play/${p.id}`,
    })),
  );
}
