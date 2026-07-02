import { NextResponse } from "next/server";
import { parseWordDocument } from "@/lib/document/parse-word";
import { isDeepSeekConfigured } from "@/lib/pge/deepseek";
import { generatePlayableFromText } from "@/lib/pge/generate";
import { savePlayable } from "@/lib/store/playables";

export const maxDuration = 120;

export async function GET() {
  return NextResponse.json({
    configured: isDeepSeekConfigured(),
    provider: "deepseek",
    model: process.env.DEEPSEEK_MODEL ?? "deepseek-chat",
  });
}

export async function POST(request: Request) {
  if (!isDeepSeekConfigured()) {
    return NextResponse.json(
      { error: "DEEPSEEK_API_KEY 未配置" },
      { status: 503 },
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "请上传 Word 文件" }, { status: 400 });
    }

    const name = file.name.toLowerCase();
    if (!name.endsWith(".docx")) {
      return NextResponse.json(
        { error: "仅支持 .docx 格式，请上传 Word 文档" },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const text = await parseWordDocument(buffer);

    const result = await generatePlayableFromText(text, file.name);

    await savePlayable({
      id: result.id,
      createdAt: new Date().toISOString(),
      sourceFileName: result.sourceFileName,
      sourceTextPreview: result.sourceTextPreview,
      blueprint: result.blueprint,
    });

    return NextResponse.json({
      id: result.id,
      title: result.blueprint.metadata.title,
      description: result.blueprint.metadata.description,
      duration_minutes: result.blueprint.metadata.duration_minutes,
      playUrl: `/play/${result.id}`,
      studioUrl: `/studio?id=${result.id}`,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "生成失败，请重试";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
