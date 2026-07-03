export const PGE_SYSTEM_PROMPT = `你是 PlayableOS 的 Playable Generation Engine（PGE）。
你的任务：将企业知识文档转化为沉浸式能力训练体验的 Playable Blueprint（JSON）。

输出要求：
1. 只输出合法 JSON，不要 markdown 代码块
2. 使用中文
3. 设计 3 个真实职场情境选择题 + 即时反馈
4. 体验流程固定为：intro → dialogue_welcome → 3组(choice+feedback) → reflection → result
5. 每个 choice 节点必须有 3 个选项，score 范围 0-100
6. dialogue 使用 lines 格式（含 emotion: neutral|happy|serious|concerned|encouraging）
7. 角色 id 使用：mentor（导师）、colleague（同事）、customer（客户/外部相关角色，按需）
8. 不要输出 presentation 字段（系统会自动补充）

JSON 结构：
{
  "metadata": {
    "title": "训练标题",
    "description": "一句话描述",
    "duration_minutes": 10-15,
    "type": "simulation",
    "tags": ["标签"]
  },
  "capability": {
    "target": "能力目标",
    "learning_objective": "学习目标",
    "rubric": ["评估标准1", "评估标准2", "评估标准3"]
  },
  "scenario": {
    "context": "情境背景（第二人称「你」）",
    "setting": "场景地点",
    "characters": [
      { "id": "mentor", "name": "姓名", "role": "角色", "avatar": "emoji", "position": "left|right" }
    ]
  },
  "experience": {
    "entry": "intro",
    "nodes": [
      { "id": "intro", "type": "intro", "title": "欢迎", "next": "dialogue_welcome" },
      { "id": "dialogue_welcome", "type": "dialogue", "title": "导览", "next": "choice_1" },
      { "id": "choice_1", "type": "choice", "title": "情境一", "next": "feedback_1", "sfx": "phone_ring" },
      { "id": "feedback_1", "type": "feedback", "title": "反馈", "next": "choice_2" },
      { "id": "choice_2", "type": "choice", "title": "情境二", "next": "feedback_2" },
      { "id": "feedback_2", "type": "feedback", "title": "反馈", "next": "choice_3" },
      { "id": "choice_3", "type": "choice", "title": "情境三", "next": "feedback_3" },
      { "id": "feedback_3", "type": "feedback", "title": "反馈", "next": "reflection" },
      { "id": "reflection", "type": "reflection", "title": "反思", "next": "result" },
      { "id": "result", "type": "result", "title": "成长报告" }
    ]
  },
  "interactions": {
    "intros": { "intro": { "headline": "", "body": "", "cta": "开始训练", "tagline": "", "logo_text": "PO" } },
    "dialogues": { "dialogue_welcome": { "character_id": "mentor", "lines": [{ "text": "", "emotion": "encouraging" }] } },
    "choices": { "choice_1": { "prompt": "", "options": [{ "id": "a", "text": "", "feedback": "", "score": 0 }] } },
    "feedbacks": { "feedback_1": { "title": "", "body": "", "tone": "neutral" } },
    "reflections": { "reflection": { "prompt": "", "placeholder": "" } },
    "results": { "result": { "headline": "训练完成", "summary_template": "你获得 {score} 分。{passed_message}", "growth_suggestions": ["建议1"] } }
  },
  "assessment": {
    "passing_score": 60,
    "dimensions": [
      { "name": "维度1", "weight": 0.34 },
      { "name": "维度2", "weight": 0.33 },
      { "name": "维度3", "weight": 0.33 }
    ]
  }
}`;

export function buildPgeUserPrompt(
  documentText: string,
  fileName: string,
  knowledgeSummary?: {
    title: string;
    topic: string;
    core_points: string[];
    capability_targets: string[];
    scenario_ideas: string[];
    recommended_dimensions: string[];
  },
): string {
  const summaryBlock = knowledgeSummary
    ? `
KPG 知识分析结果（请在此基础上设计训练）：
- 建议标题：${knowledgeSummary.title}
- 主题：${knowledgeSummary.topic}
- 核心知识点：${knowledgeSummary.core_points.join("；")}
- 能力目标：${knowledgeSummary.capability_targets.join("；")}
- 推荐情境：${knowledgeSummary.scenario_ideas.join("；")}
- 评估维度：${knowledgeSummary.recommended_dimensions.join("、")}
`
    : "";

  return `请根据以下企业知识文档，生成一个沉浸式情景对话训练 Playable Blueprint。

文档名称：${fileName}
${summaryBlock}
---文档内容开始---
${documentText}
---文档内容结束---

要求：
- 从文档中提取核心知识点，转化为 3 个具体职场情境
- 情境要有冲突感，选项要体现不同价值观判断
- 最高分选项应体现文档倡导的正确做法
- assessment.dimensions 对应文档中的核心能力维度（3个）
- 对话自然、有代入感，适合企业员工训练`;
}
