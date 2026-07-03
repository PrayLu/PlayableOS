import mammoth from "mammoth";

const MAX_CHARS = 14_000;

export async function parseWordDocument(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer });
  return normalizeText(result.value);
}

export async function parsePdfDocument(buffer: Buffer): Promise<string> {
  const pdfParse = (await import("pdf-parse")).default;
  const result = await pdfParse(buffer);
  return normalizeText(result.text);
}

function normalizeText(text: string): string {
  const cleaned = text.replace(/\n{3,}/g, "\n\n").trim();

  if (!cleaned) {
    throw new Error("文档内容为空，请检查文件是否包含可提取文字");
  }

  if (cleaned.length > MAX_CHARS) {
    return `${cleaned.slice(0, MAX_CHARS)}\n\n[文档已截断，仅分析前 ${MAX_CHARS} 字]`;
  }

  return cleaned;
}

export type SupportedDocumentType = "docx" | "pdf";

export function detectDocumentType(fileName: string): SupportedDocumentType | null {
  const name = fileName.toLowerCase();
  if (name.endsWith(".docx")) return "docx";
  if (name.endsWith(".pdf")) return "pdf";
  return null;
}

export async function parseDocument(
  buffer: Buffer,
  fileName: string,
): Promise<string> {
  const type = detectDocumentType(fileName);
  if (type === "docx") return parseWordDocument(buffer);
  if (type === "pdf") return parsePdfDocument(buffer);
  throw new Error("仅支持 .docx 和 .pdf 格式");
}
