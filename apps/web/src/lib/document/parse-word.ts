import mammoth from "mammoth";

const MAX_CHARS = 14_000;

export async function parseWordDocument(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer });
  const text = result.value.replace(/\n{3,}/g, "\n\n").trim();

  if (!text) {
    throw new Error("文档内容为空，请检查 Word 文件是否包含可提取文字");
  }

  if (text.length > MAX_CHARS) {
    return `${text.slice(0, MAX_CHARS)}\n\n[文档已截断，仅分析前 ${MAX_CHARS} 字]`;
  }

  return text;
}

export function isWordFile(file: File): boolean {
  const name = file.name.toLowerCase();
  return (
    name.endsWith(".docx") ||
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  );
}
