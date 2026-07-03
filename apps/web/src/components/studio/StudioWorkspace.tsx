"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BlueprintVisualizer } from "@/components/BlueprintVisualizer";
import { KnowledgeSummaryCard } from "@/components/studio/KnowledgeSummaryCard";
import { SharePanel } from "@/components/studio/SharePanel";
import { AppShell } from "@/components/ui/AppShell";
import type { KnowledgeSummary } from "@/lib/pge/analyze";
import type { PlayableBlueprint } from "@playableos/blueprint-schema";

type Step = "upload" | "analyzing" | "summary" | "generating" | "preview" | "error";

interface GenerateResponse {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  playUrl: string;
}

interface PlayableListItem {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  sourceFileName?: string;
  createdAt?: string;
  playUrl: string;
}

function isSupportedDocument(file: File): boolean {
  const name = file.name.toLowerCase();
  return name.endsWith(".docx") || name.endsWith(".pdf");
}

export function StudioWorkspace({ initialId }: { initialId?: string }) {
  const [step, setStep] = useState<Step>("upload");
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [blueprint, setBlueprint] = useState<PlayableBlueprint | null>(null);
  const [history, setHistory] = useState<PlayableListItem[]>([]);
  const [deepseekReady, setDeepseekReady] = useState<boolean | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [knowledgeSummary, setKnowledgeSummary] = useState<KnowledgeSummary | null>(null);

  const loadHistory = useCallback(async () => {
    const res = await fetch("/api/playables");
    if (res.ok) setHistory(await res.json());
  }, []);

  const loadPlayable = useCallback(async (id: string) => {
    const res = await fetch(`/api/playables/${id}`);
    if (!res.ok) return;
    const data = await res.json();
    setBlueprint(data.blueprint);
    setResult({
      id: data.id,
      title: data.blueprint.metadata.title,
      description: data.blueprint.metadata.description,
      duration_minutes: data.blueprint.metadata.duration_minutes,
      playUrl: `/play/${data.id}`,
    });
    setStep("preview");
  }, []);

  useEffect(() => {
    void loadHistory();
    void fetch("/api/generate")
      .then((r) => r.json())
      .then((d) => setDeepseekReady(d.configured))
      .catch(() => setDeepseekReady(false));
  }, [loadHistory]);

  useEffect(() => {
    if (initialId) void loadPlayable(initialId);
  }, [initialId, loadPlayable]);

  async function analyzeFile(file: File) {
    if (!isSupportedDocument(file)) {
      setError("请上传 .docx 或 .pdf 格式的文档");
      setStep("error");
      return;
    }

    setStep("analyzing");
    setError("");
    setResult(null);
    setBlueprint(null);
    setPendingFile(file);
    setKnowledgeSummary(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "知识分析失败");

      setKnowledgeSummary(data.summary);
      setStep("summary");
    } catch (e) {
      setError(e instanceof Error ? e.message : "知识分析失败");
      setStep("error");
    }
  }

  async function confirmGenerate() {
    if (!pendingFile || !knowledgeSummary) return;

    setStep("generating");

    const formData = new FormData();
    formData.append("file", pendingFile);
    formData.append("summary", JSON.stringify(knowledgeSummary));

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "生成失败");

      setResult(data);
      await loadPlayable(data.id);
      await loadHistory();
    } catch (e) {
      setError(e instanceof Error ? e.message : "生成失败");
      setStep("error");
    }
  }

  function resetUpload() {
    setStep("upload");
    setError("");
    setPendingFile(null);
    setKnowledgeSummary(null);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) void analyzeFile(file);
  }

  const statusBadge =
    deepseekReady !== null ? (
      <span
        className={`badge hidden sm:inline-flex ${
          deepseekReady ? "badge-success" : "badge-warning"
        }`}
      >
        {deepseekReady ? "DeepSeek 已就绪" : "DeepSeek 未配置"}
      </span>
    ) : null;

  return (
    <AppShell
      title="PlayableOS Studio"
      subtitle="Knowledge → Playable → Capability"
      links={[
        { href: "/dashboard", label: "数据看板" },
        { href: "/", label: "首页" },
      ]}
      badge={statusBadge}
      footer={false}
    >
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-2">
          <section>
            <p className="label-caps">Upload</p>
            <h2 className="mt-1 text-lg font-semibold">上传企业知识</h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              上传 Word 或 PDF 文档，AI 先分析知识要点，确认后再生成训练
            </p>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              className={`glass-card glass-card--glow mt-4 border-2 border-dashed p-8 text-center transition ${
                dragOver
                  ? "border-indigo-400/50 bg-indigo-500/10"
                  : "border-[var(--glass-border)]"
              }`}
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 text-2xl">
                📄
              </div>
              <p className="mt-4 font-medium">拖拽文档到此处</p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">支持 .docx 和 .pdf</p>
              <label className="btn-primary mt-5 inline-block cursor-pointer">
                选择文件
                <input
                  type="file"
                  accept=".docx,.pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void analyzeFile(file);
                  }}
                />
              </label>
            </div>
          </section>

          {history.length > 0 && (
            <section>
              <h3 className="text-sm font-semibold text-[var(--text-secondary)]">
                已生成的 Playable
              </h3>
              <div className="mt-3 space-y-2">
                {history.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => void loadPlayable(item.id)}
                    className="glass-card w-full p-4 text-left transition hover:border-indigo-400/30"
                  >
                    <p className="font-medium">{item.title}</p>
                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                      {item.sourceFileName} · {item.duration_minutes} 分钟
                    </p>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {step === "upload" && (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card glass-card--glow flex h-full min-h-[420px] flex-col items-center justify-center p-10 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/25 to-purple-500/25 text-3xl">
                  🎯
                </div>
                <h3 className="mt-5 text-xl font-bold">等待上传文档</h3>
                <p className="mt-2 max-w-sm text-sm text-[var(--text-secondary)]">
                  KPG 先分析文档核心知识，确认后 PGE 再设计 3 个职场情境与能力评估
                </p>
              </motion.div>
            )}

            {step === "analyzing" && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card glass-card--glow flex h-full min-h-[420px] flex-col items-center justify-center border-cyan-400/20 bg-gradient-to-br from-cyan-500/5 to-indigo-500/5 p-10 text-center"
              >
                <div className="loading-ring" />
                <h3 className="mt-6 text-xl font-bold">AI 正在分析知识…</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  解析文档 → 提取核心知识点 → 规划训练方向
                </p>
                <p className="mt-4 text-xs text-[var(--text-muted)]">通常需要 15–30 秒</p>
              </motion.div>
            )}

            {step === "summary" && knowledgeSummary && pendingFile && (
              <motion.div
                key="summary"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <KnowledgeSummaryCard
                  summary={knowledgeSummary}
                  fileName={pendingFile.name}
                  onConfirm={() => void confirmGenerate()}
                  onCancel={resetUpload}
                />
              </motion.div>
            )}

            {step === "generating" && (
              <motion.div
                key="generating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card glass-card--glow flex h-full min-h-[420px] flex-col items-center justify-center border-indigo-400/20 bg-gradient-to-br from-indigo-500/8 to-purple-500/8 p-10 text-center"
              >
                <div className="loading-ring" />
                <h3 className="mt-6 text-xl font-bold">AI 正在生成 Playable…</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  设计情境 → 编写对话 → 生成 Blueprint
                </p>
                <p className="mt-4 text-xs text-[var(--text-muted)]">通常需要 30–90 秒</p>
              </motion.div>
            )}

            {step === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card rounded-2xl border-red-400/30 bg-red-500/8 p-8"
              >
                <h3 className="text-lg font-bold text-red-300">操作失败</h3>
                <p className="mt-2 text-sm text-red-200/80">{error}</p>
                <button type="button" onClick={resetUpload} className="btn-secondary mt-4">
                  重新上传
                </button>
              </motion.div>
            )}

            {step === "preview" && result && blueprint && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="glass-card glass-card--glow border-emerald-400/25 bg-gradient-to-br from-emerald-500/8 to-indigo-500/5 p-6">
                  <span className="badge badge-success">✓ 生成成功</span>
                  <h3 className="mt-3 text-2xl font-bold">{result.title}</h3>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    {result.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link href={result.playUrl} className="btn-primary">
                      开始体验训练 →
                    </Link>
                    <Link
                      href={`/visualizer?id=${result.id}`}
                      className="btn-secondary"
                    >
                      查看流程图
                    </Link>
                  </div>
                </div>

                <SharePanel playableId={result.id} title={result.title} />

                <div className="glass-card glass-card--glow p-4">
                  <p className="label-caps mb-3">Blueprint</p>
                  <BlueprintVisualizer blueprint={blueprint} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AppShell>
  );
}
