/** 清洗文本，让 TTS 朗读更自然（去 emoji、规范标点） */
export function prepareTextForTts(text: string): string {
  return (
    text
      // emoji & 符号
      .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
      .replace(/[✅❌⚠️📞📚🍽📱✍️🎉📌🌟💡✨🔊🎙️→@]/g, "")
      // markdown / 飞书残留
      .replace(/\\([._\-])/g, "$1")
      .replace(/\*\*/g, "")
      // 引号统一
      .replace(/[「」『』""]/g, "")
      // 停顿：逗号句号后留自然断句
      .replace(/；/g, "，")
      .replace(/…+/g, "。")
      .replace(/\.{2,}/g, "。")
      // 多余空白
      .replace(/\s+/g, " ")
      .trim()
  );
}

/** 长句按标点切分，逐句朗读更自然 */
export function splitForTts(text: string, maxLen = 120): string[] {
  const cleaned = prepareTextForTts(text);
  if (cleaned.length <= maxLen) return [cleaned];

  const parts: string[] = [];
  let buf = "";

  for (const seg of cleaned.split(/(?<=[，。！？、])/)) {
    if ((buf + seg).length > maxLen && buf) {
      parts.push(buf.trim());
      buf = seg;
    } else {
      buf += seg;
    }
  }
  if (buf.trim()) parts.push(buf.trim());
  return parts.length > 0 ? parts : [cleaned];
}
