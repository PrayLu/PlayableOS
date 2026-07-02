import { NextResponse } from "next/server";
import {
  createTtsProvider,
  getActiveTtsProviderName,
  isTtsConfigured,
  TtsRequestSchema,
} from "@/lib/tts";

export async function GET() {
  return NextResponse.json({
    configured: isTtsConfigured(),
    provider: getActiveTtsProviderName(),
  });
}

export async function POST(request: Request) {
  const provider = createTtsProvider();
  if (!provider) {
    return NextResponse.json(
      { error: "TTS provider not configured", fallback: "browser" },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const parsed = TtsRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const audioBuffer = await provider.synthesize(parsed.data);

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400, immutable",
        "X-TTS-Provider": provider.name,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "TTS generation failed";
    return NextResponse.json(
      { error: message, fallback: "browser" },
      { status: 502 },
    );
  }
}
