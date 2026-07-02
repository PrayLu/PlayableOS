"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BlueprintVisualizer } from "@/components/BlueprintVisualizer";
import type { PlayableBlueprint } from "@playableos/blueprint-schema";

type Step = "upload" | "generating" | "preview" | "error";

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

export function StudioWorkspace({ initialId }: { initialId?: string }) {
  const [step, setStep] = useState<Step>("upload");
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [blueprint, setBlueprint] = useState<PlayableBlueprint | null>(null);
  const [history, setHistory] = useState<PlayableListItem[]>([]);
  const [deepseekReady, setDeepseekReady] = useState<boolean | null>(null);

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

  async function handleFile(file: File) {
    if (!file.name.toLowerCase().endsWith(".docx")) {
      setError("请上传 .docx 格式的 Word 文档");
      setStep("error");
      return;
    }

    setStep("generating");
    setError("");
    setResult(null);
    setBlueprint(null);

    const formData = new FormData();
    formData.append("file", file);

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

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) void handleFile(file);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500 text-sm font-bold">
              P
            </span>
            <div>
              <p className="font-bold">PlayableOS Studio</p>
              <p className="text-xs text-white/50">Knowledge → Playable → Capability</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {deepseekReady !== null && (
              <span
                className={`hidden rounded-full px-3 py-1 text-xs sm:inline ${
                  deepseekReady
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-amber-500/20 text-amber-300"
                }`}
              >
                {deepseekReady ? "DeepSeek 已就绪" : "DeepSeek 未配置"}
              </span>
            )}
            <Link
              href="/"
              className="text-sm text-white/50 transition hover:text-white"
            >
              首页
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* 左侧：上传 + 历史 */}
          <div className="space-y-6 lg:col-span-2">
            <section>
              <h2 className="text-lg font-semibold">上传企业知识</h2>
              <p className="mt-1 text-sm text-white/50">
                上传 Word 文档，AI 自动分析并生成沉浸式训练
              </p>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                className={`mt-4 rounded-2xl border-2 border-dashed p-8 text-center transition ${
                  dragOver
                    ? "border-indigo-400 bg-indigo-500/10"
                    : "border-white/15 bg-white/5 hover:border-white/25"
                }`}
              >
                <div className="text-4xl">📄</div>
                <p className="mt-3 font-medium">拖拽 Word 文档到此处</p>
                <p className="mt-1 text-sm text-white/40">支持 .docx 格式</p>
                <label className="mt-5 inline-block cursor-pointer rounded-xl bg-indigo-500 px-6 py-3 text-sm font-semibold transition hover:bg-indigo-400">
                  选择文件
                  <input
                    type="file"
                    accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) void handleFile(file);
                    }}
                  />
                </label>
              </div>
            </section>

            {history.length > 0 && (
              <section>
                <h3 className="text-sm font-semibold text-white/70">已生成的 Playable</h3>
                <div className="mt-3 space-y-2">
                  {history.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => void loadPlayable(item.id)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-indigo-400/40 hover:bg-white/10"
                    >
                      <p className="font-medium">{item.title}</p>
                      <p className="mt-1 text-xs text-white/40">
                        {item.sourceFileName} · {item.duration_minutes} 分钟
                      </p>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* 右侧：状态 / 预览 */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {step === "upload" && (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-10 text-center"
                >
                  <div className="text-5xl">🎯</div>
                  <h3 className="mt-4 text-xl font-bold">等待上传文档</h3>
                  <p className="mt-2 max-w-sm text-sm text-white/50">
                    PGE 将分析文档内容，自动设计 3 个职场情境、角色对话和能力评估维度
                  </p>
                </motion.div>
              )}

              {step === "generating" && (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-10 text-center"
                >
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-400 border-t-transparent" />
                  <h3 className="mt-6 text-xl font-bold">AI 正在生成 Playable…</h3>
                  <p className="mt-2 text-sm text-white/60">
                    解析文档 → 设计情境 → 生成 Blueprint
                  </p>
                  <p className="mt-4 text-xs text-white/40">通常需要 30–90 秒</p>
                </motion.div>
              )}

              {step === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-red-400/30 bg-red-500/10 p-8"
                >
                  <h3 className="text-lg font-bold text-red-300">生成失败</h3>
                  <p className="mt-2 text-sm text-red-200/80">{error}</p>
                  <button
                    type="button"
                    onClick={() => setStep("upload")}
                    className="mt-4 rounded-lg bg-white/10 px-4 py-2 text-sm transition hover:bg-white/20"
                  >
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
                  <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-6">
                    <p className="text-sm text-emerald-300">✓ Playable 生成成功</p>
                    <h3 className="mt-1 text-2xl font-bold">{result.title}</h3>
                    <p className="mt-2 text-sm text-white/60">{result.description}</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link
                        href={result.playUrl}
                        className="rounded-xl bg-indigo-500 px-6 py-3 text-sm font-semibold transition hover:bg-indigo-400"
                      >
                        开始体验训练 →
                      </Link>
                      <Link
                        href={`/visualizer?id=${result.id}`}
                        className="rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold transition hover:bg-white/10"
                      >
                        查看流程图
                      </Link>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <h4 className="mb-3 text-sm font-semibold text-white/70">
                      Experience Blueprint
                    </h4>
                    <BlueprintVisualizer blueprint={blueprint} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
