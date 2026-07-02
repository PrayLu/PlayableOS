const DEEPSEEK_API = "https://api.deepseek.com/chat/completions";

interface DeepSeekMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function callDeepSeekJson(
  systemPrompt: string,
  userPrompt: string,
): Promise<unknown> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error("DEEPSEEK_API_KEY 未配置");
  }

  const model = process.env.DEEPSEEK_MODEL ?? "deepseek-chat";

  const response = await fetch(DEEPSEEK_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ] satisfies DeepSeekMessage[],
      response_format: { type: "json_object" },
      temperature: 0.6,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `DeepSeek API 错误 (${response.status}): ${detail.slice(0, 300)}`,
    );
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };

  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("DeepSeek 返回内容为空");
  }

  try {
    return JSON.parse(content);
  } catch {
    const cleaned = content
      .replace(/^```json\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();
    return JSON.parse(cleaned);
  }
}

export function isDeepSeekConfigured(): boolean {
  return Boolean(process.env.DEEPSEEK_API_KEY);
}
