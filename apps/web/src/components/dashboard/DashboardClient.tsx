"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/ui/AppShell";

interface DashboardStats {
  total_sessions: number;
  completion_count: number;
  average_score: number;
  pass_rate: number;
  dimension_averages: Record<string, number>;
  recent_sessions: Array<{
    id: string;
    playableId: string;
    playableTitle: string;
    playerName: string;
    score: number;
    passed: boolean;
    dimension_scores: Record<string, number>;
    completedAt: string;
    duration_ms: number;
  }>;
}

interface PlayableListItem {
  id: string;
  title: string;
  sourceFileName?: string;
}

export function DashboardClient({
  initialPlayableId,
}: {
  initialPlayableId?: string;
}) {
  const [playables, setPlayables] = useState<PlayableListItem[]>([]);
  const [selectedId, setSelectedId] = useState(initialPlayableId ?? "");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void fetch("/api/playables")
      .then((r) => r.json())
      .then((items: PlayableListItem[]) => {
        setPlayables(items);
        if (!initialPlayableId && items.length > 0) {
          setSelectedId((prev) => prev || items[0].id);
        }
      })
      .catch(() => setPlayables([]));
  }, [initialPlayableId]);

  const loadStats = useCallback(async (playableId?: string) => {
    setLoading(true);
    try {
      const url = playableId
        ? `/api/dashboard/stats?playableId=${playableId}`
        : "/api/dashboard/stats";
      const res = await fetch(url);
      if (res.ok) setStats(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadStats(selectedId || undefined);
  }, [selectedId, loadStats]);

  const selectedTitle = useMemo(
    () => playables.find((p) => p.id === selectedId)?.title ?? "全部训练",
    [playables, selectedId],
  );

  return (
    <AppShell
      title="PlayableOS 数据看板"
      subtitle="企业训练完成与能力成长数据"
      links={[
        { href: "/studio", label: "Studio" },
        { href: "/", label: "首页" },
      ]}
      footer={false}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="label-caps">Analytics</p>
          <h1 className="mt-1 text-2xl font-bold">{selectedTitle}</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            训练完成情况与能力维度分析
          </p>
        </div>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="glass-card rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400/40"
        >
          <option value="">全部 Playable</option>
          {playables.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="mt-16 flex flex-col items-center gap-4">
          <div className="loading-ring" />
          <p className="text-sm text-[var(--text-muted)]">加载中…</p>
        </div>
      )}

      {!loading && stats && (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="完成人数" value={String(stats.completion_count)} accent="indigo" />
            <StatCard label="平均得分" value={`${stats.average_score}`} suffix="分" accent="violet" />
            <StatCard label="通过率" value={`${stats.pass_rate}`} suffix="%" accent="cyan" />
            <StatCard label="总训练次数" value={String(stats.total_sessions)} accent="pink" />
          </div>

          {Object.keys(stats.dimension_averages).length > 0 && (
            <section className="glass-card glass-card--glow mt-8 p-6">
              <h2 className="text-lg font-semibold">能力维度平均分</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {Object.entries(stats.dimension_averages).map(([dim, score]) => (
                  <div
                    key={dim}
                    className="rounded-xl border border-indigo-400/15 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 p-4 text-center"
                  >
                    <p className="text-3xl font-bold text-gradient-brand">{score}</p>
                    <p className="mt-1 text-xs text-[var(--text-muted)]">{dim}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="glass-card glass-card--glow mt-8 p-6">
            <h2 className="text-lg font-semibold">最近完成记录</h2>
            {stats.recent_sessions.length === 0 ? (
              <p className="mt-4 text-sm text-[var(--text-muted)]">
                暂无训练完成记录。分享 Playable 链接给员工体验后，数据将出现在此处。
              </p>
            ) : (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-[var(--glass-border)] text-[var(--text-muted)]">
                      <th className="pb-3 pr-4 font-medium">学员</th>
                      <th className="pb-3 pr-4 font-medium">训练</th>
                      <th className="pb-3 pr-4 font-medium">得分</th>
                      <th className="pb-3 pr-4 font-medium">结果</th>
                      <th className="pb-3 font-medium">完成时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recent_sessions.map((s) => (
                      <tr
                        key={s.id}
                        className="border-b border-[var(--glass-border)] text-[var(--text-secondary)]"
                      >
                        <td className="py-3 pr-4">{s.playerName}</td>
                        <td className="py-3 pr-4">{s.playableTitle}</td>
                        <td className="py-3 pr-4 font-medium text-indigo-300">
                          {s.score}
                        </td>
                        <td className="py-3 pr-4">
                          {s.passed ? (
                            <span className="badge badge-success">通过</span>
                          ) : (
                            <span className="badge badge-warning">待提升</span>
                          )}
                        </td>
                        <td className="py-3 text-[var(--text-muted)]">
                          {new Date(s.completedAt).toLocaleString("zh-CN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
    </AppShell>
  );
}

function StatCard({
  label,
  value,
  suffix,
  accent,
}: {
  label: string;
  value: string;
  suffix?: string;
  accent: "indigo" | "violet" | "cyan" | "pink";
}) {
  const gradients = {
    indigo: "from-indigo-500/15 to-blue-500/5 border-indigo-400/15",
    violet: "from-violet-500/15 to-purple-500/5 border-violet-400/15",
    cyan: "from-cyan-500/15 to-blue-500/5 border-cyan-400/15",
    pink: "from-fuchsia-500/15 to-pink-500/5 border-fuchsia-400/15",
  };

  return (
    <div
      className={`glass-card glass-card--glow bg-gradient-to-br ${gradients[accent]} p-5`}
    >
      <p className="text-xs text-[var(--text-muted)]">{label}</p>
      <p className="mt-2 text-2xl font-bold">
        {value}
        {suffix && (
          <span className="ml-1 text-sm font-normal text-[var(--text-muted)]">
            {suffix}
          </span>
        )}
      </p>
    </div>
  );
}
