import { NextResponse } from "next/server";
import { getDashboardStats } from "@/lib/store/sessions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const playableId = searchParams.get("playableId") ?? undefined;
  const stats = await getDashboardStats(playableId);
  return NextResponse.json(stats);
}
