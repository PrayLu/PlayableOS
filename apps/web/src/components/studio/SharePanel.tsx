"use client";

import { useCallback, useMemo, useState } from "react";

interface SharePanelProps {
  playableId: string;
  title: string;
}

export function SharePanel({ playableId, title }: SharePanelProps) {
  const [copied, setCopied] = useState(false);

  const playUrl = useMemo(() => {
    if (typeof window === "undefined") return `/play/${playableId}`;
    return `${window.location.origin}/play/${playableId}`;
  }, [playableId]);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(playUrl)}`;

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(playUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback ignored for MVP */
    }
  }, [playUrl]);

  return (
    <div className="glass-card glass-card--glow p-5">
      <p className="label-caps">Publish</p>
      <h4 className="mt-1 text-sm font-semibold">发布与分享</h4>
      <p className="mt-1 text-xs text-[var(--text-muted)]">
        将训练链接分享给员工，扫码或复制链接即可开始体验
      </p>

      <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div className="rounded-xl border border-indigo-400/20 bg-white p-2 shadow-[0_0_24px_rgba(99,102,241,0.15)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrUrl}
            alt={`${title} 训练二维码`}
            width={180}
            height={180}
            className="rounded-lg"
          />
        </div>

        <div className="w-full flex-1 space-y-3">
          <div>
            <p className="text-xs text-[var(--text-muted)]">训练链接</p>
            <p className="mt-1 break-all rounded-lg border border-[var(--glass-border)] bg-black/30 px-3 py-2 text-xs text-[var(--text-secondary)]">
              {playUrl}
            </p>
          </div>
          <button type="button" onClick={() => void copyLink()} className="btn-primary w-full">
            {copied ? "✓ 已复制到剪贴板" : "复制分享链接"}
          </button>
          <a href={`/dashboard?playable=${playableId}`} className="btn-secondary block w-full text-center">
            查看训练数据看板 →
          </a>
        </div>
      </div>
    </div>
  );
}
