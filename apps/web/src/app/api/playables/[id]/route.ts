import { NextResponse } from "next/server";
import { getStoredPlayable } from "@/lib/store/playables";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const entry = await getStoredPlayable(id);

  if (!entry) {
    return NextResponse.json({ error: "Playable 不存在" }, { status: 404 });
  }

  return NextResponse.json(entry);
}
