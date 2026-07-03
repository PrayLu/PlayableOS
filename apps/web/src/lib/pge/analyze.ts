import { callDeepSeekJson } from "./deepseek";

export interface KnowledgeSummary {
  title: string;
  topic: string;
  core_points: string[];
  capability_targets: string[];
  scenario_ideas: string[];
  recommended_dimensions: string[];
}

const KPG_SYSTEM_PROMPT = `你是 PlayableOS 的 Knowledge Parser（KPG）。
分析企业知识文档，提取可用于设计能力训练的关键信息。

只输出合法 JSON，不要 markdown。结构：
{
  "title": "建议的训练标题",
  "topic": "文档主题一句话",
  "core_points": ["核心知识点1", "核心知识点2", "核心知识点3"],
  "capability_targets": ["能力目标1", "能力目标2", "能力目标3"],
  "scenario_ideas": ["情境创意1：具体职场冲突", "情境创意2", "情境创意3"],
  "recommended_dimensions": ["评估维度1", "评估维度2", "评估维度3"]
}`;

export async function analyzeKnowledge(
  documentText: string,
  fileName: string,
): Promise<KnowledgeSummary> {
  const raw = await callDeepSeekJson(
    KPG_SYSTEM_PROMPT,
    `分析以下企业知识文档（来源：${fileName}），提取训练设计所需信息。\n\n---\n${documentText}\n---`,
  );

  const obj = raw as Record<string, unknown>;
  return {
    title: String(obj.title ?? "企业能力训练"),
    topic: String(obj.topic ?? "企业知识培训"),
    core_points: Array.isArray(obj.core_points)
      ? obj.core_points.map(String).slice(0, 6)
      : [],
    capability_targets: Array.isArray(obj.capability_targets)
      ? obj.capability_targets.map(String).slice(0, 4)
      : [],
    scenario_ideas: Array.isArray(obj.scenario_ideas)
      ? obj.scenario_ideas.map(String).slice(0, 4)
      : [],
    recommended_dimensions: Array.isArray(obj.recommended_dimensions)
      ? obj.recommended_dimensions.map(String).slice(0, 4)
      : [],
  };
}
