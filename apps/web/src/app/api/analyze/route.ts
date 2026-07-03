import { NextResponse } from "next/server";
import { parseDocument } from "@/lib/document/parse-document";
import { analyzeKnowledge } from "@/lib/pge/analyze";
import { isDeepSeekConfigured } from "@/lib/pge/deepseek";

export const maxDuration = 60;

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
      return NextResponse.json({ error: "请上传文档" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const text = await parseDocument(buffer, file.name);
    const summary = await analyzeKnowledge(text, file.name);

    return NextResponse.json({
      fileName: file.name,
      textPreview: text.slice(0, 300),
      summary,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "知识分析失败，请重试";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
