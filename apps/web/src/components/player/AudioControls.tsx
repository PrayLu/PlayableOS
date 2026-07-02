"use client";

interface AudioControlsProps {
  muted: boolean;
  voiceEnabled: boolean;
  voiceSpeaking?: boolean;
  voiceProvider?: "volcengine" | "elevenlabs" | "browser" | "idle" | "loading";
  aiVoiceAvailable?: boolean;
  onToggleMute: () => void;
  onToggleVoice: () => void;
  progress: number;
}

export function AudioControls({
  muted,
  voiceEnabled,
  voiceSpeaking = false,
  voiceProvider = "idle",
  aiVoiceAvailable = false,
  onToggleMute,
  onToggleVoice,
  progress,
}: AudioControlsProps) {
  const voiceLabel =
    voiceProvider === "loading"
      ? "检测中…"
      : voiceProvider === "volcengine"
        ? "火山 AI 配音"
        : voiceProvider === "elevenlabs"
          ? "AI 配音"
          : voiceProvider === "browser"
            ? "系统语音"
            : "静音";

  return (
    <div className="absolute right-4 top-4 z-50 flex items-center gap-2 md:right-8 md:top-8">
      <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md sm:flex">
        <span className="text-[10px] uppercase tracking-wider text-white/50">
          进度
        </span>
        <div className="h-1 w-16 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-indigo-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[10px] text-white/70">{progress}%</span>
      </div>

      {voiceEnabled && (
        <div
          className={`hidden items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10px] backdrop-blur-md sm:flex ${
            voiceSpeaking
              ? "border-indigo-400/40 bg-indigo-500/20 text-indigo-200"
              : "border-white/10 bg-black/40 text-white/50"
          }`}
        >
          {voiceSpeaking && (
            <span className="flex gap-0.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="inline-block h-2 w-0.5 animate-pulse rounded-full bg-indigo-300"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </span>
          )}
          <span>
            {aiVoiceAvailable ? "🎙️" : "🔈"} {voiceLabel}
          </span>
        </div>
      )}

      <button
        type="button"
        onClick={onToggleVoice}
        className={`flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition hover:bg-white/10 ${
          voiceEnabled
            ? "border-indigo-400/30 bg-indigo-500/20"
            : "border-white/10 bg-black/40"
        }`}
        title={voiceEnabled ? "关闭配音" : "开启配音"}
      >
        {voiceEnabled ? "🔊" : "🔇"}
      </button>

      <button
        type="button"
        onClick={onToggleMute}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-sm backdrop-blur-md transition hover:bg-white/10"
        title={muted ? "开启音效" : "静音全部"}
      >
        {muted ? "🔕" : "🎵"}
      </button>
    </div>
  );
}
