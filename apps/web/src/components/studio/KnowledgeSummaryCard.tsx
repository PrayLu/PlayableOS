"use client";

import type { KnowledgeSummary } from "@/lib/pge/analyze";

interface KnowledgeSummaryCardProps {
  summary: KnowledgeSummary;
  fileName: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export function KnowledgeSummaryCard({
  summary,
  fileName,
  onConfirm,
  onCancel,
  loading,
}: KnowledgeSummaryCardProps) {
  return (
    <div className="space-y-5">
      <div className="glass-card glass-card--glow border-cyan-400/20 bg-gradient-to-br from-cyan-500/8 to-indigo-500/8 p-6">
        <span className="badge badge-brand">KPG 知识分析</span>
        <h3 className="mt-3 text-xl font-bold">{summary.title}</h3>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">{summary.topic}</p>
        <p className="mt-2 text-xs text-[var(--text-muted)]">来源：{fileName}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <SummaryBlock title="核心知识点" items={summary.core_points} />
        <SummaryBlock title="能力目标" items={summary.capability_targets} />
        <SummaryBlock title="推荐情境" items={summary.scenario_ideas} />
        <SummaryBlock title="评估维度" items={summary.recommended_dimensions} />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={loading}
          onClick={onConfirm}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "正在生成…" : "确认并生成 Playable →"}
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={onCancel}
          className="btn-secondary disabled:opacity-50"
        >
          重新上传
        </button>
      </div>
    </div>
  );
}

function SummaryBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="glass-card p-4">
      <h4 className="text-sm font-semibold text-indigo-200">{title}</h4>
      <ul className="mt-2 space-y-1.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-2 text-xs leading-relaxed text-[var(--text-secondary)]"
          >
            <span className="text-violet-400">▸</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
