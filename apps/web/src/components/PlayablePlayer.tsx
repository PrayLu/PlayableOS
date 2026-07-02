"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PlayableBlueprint } from "@playableos/blueprint-schema";
import {
  PlayableRuntime,
  type ChoiceRecord,
  type SessionResult,
} from "@playableos/runtime";
import { usePlayableAudio } from "@/hooks/usePlayableAudio";
import { useTypewriter } from "@/hooks/useTypewriter";
import {
  getCharacterPortrait,
  getCharacterPosition,
  getSceneForNode,
  normalizeDialogue,
} from "@/lib/presentation";
import { SceneStage } from "./player/SceneStage";
import { AudioControls } from "./player/AudioControls";

interface PlayablePlayerProps {
  blueprint: PlayableBlueprint;
}

export function PlayablePlayer({ blueprint }: PlayablePlayerProps) {
  const [runtime] = useState(() => new PlayableRuntime(blueprint));
  const [, tick] = useState(0);
  const refresh = useCallback(() => tick((n) => n + 1), []);
  const [pendingChoice, setPendingChoice] = useState<ChoiceRecord | null>(null);
  const [started, setStarted] = useState(false);

  const audio = usePlayableAudio({ blueprint });
  const node = runtime.getCurrentNode();
  const state = runtime.getState();
  const result = runtime.isCompleted() ? runtime.getResult() : null;
  const scene = node ? getSceneForNode(blueprint, node.id) : null;

  const progress = useMemo(() => {
    const playableNodes = blueprint.experience.nodes.filter(
      (n) => n.type !== "result",
    );
    const idx = playableNodes.findIndex((n) => n.id === state.currentNodeId);
    if (runtime.isCompleted()) return 100;
    return Math.round(((idx + 1) / playableNodes.length) * 100);
  }, [blueprint.experience.nodes, runtime, state.currentNodeId]);

  useEffect(() => {
    if (!node || !started) return;
    if (node.sfx) audio.playSfx(node.sfx);
    if (scene?.ambient_track) audio.setAmbient(scene.ambient_track);
  }, [node?.id, started]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!node) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-red-400">
        Blueprint 节点加载失败
      </div>
    );
  }

  return (
    <SceneStage scene={scene} transitionKey={node.id}>
      <AudioControls
        muted={audio.muted}
        voiceEnabled={audio.voiceEnabled}
        voiceSpeaking={audio.voiceSpeaking}
        voiceProvider={audio.voiceProvider}
        aiVoiceAvailable={audio.aiVoiceAvailable}
        onToggleMute={() => audio.setMuted((m) => !m)}
        onToggleVoice={() => audio.setVoiceEnabled((v) => !v)}
        progress={progress}
      />

      <div className="flex flex-1 flex-col justify-end px-4 pb-6 pt-24 md:px-10 md:pb-10">
        <AnimatePresence mode="wait">
          {node.type === "intro" && (
            <IntroCinematic
              key="intro"
              blueprint={blueprint}
              content={runtime.getIntroContent(node.id)!}
              onStart={() => {
                setStarted(true);
                audio.startBgm();
                audio.playSfx("reveal");
                runtime.proceed();
                refresh();
              }}
            />
          )}

          {node.type === "dialogue" && (
            <DialogueCinematic
              key={node.id}
              blueprint={blueprint}
              runtime={runtime}
              nodeId={node.id}
              audio={audio}
              onNext={() => {
                audio.playSfx("tap");
                runtime.proceed();
                refresh();
              }}
            />
          )}

          {node.type === "choice" && !pendingChoice && (
            <ChoiceCinematic
              key={node.id}
              blueprint={blueprint}
              runtime={runtime}
              nodeId={node.id}
              audio={audio}
              onChoose={(record) => {
                setPendingChoice(record);
                audio.playSfx(record.score >= 70 ? "success" : "warning");
                refresh();
              }}
            />
          )}

          {node.type === "choice" && pendingChoice && (
            <ChoiceFeedbackCinematic
              key={`${node.id}-fb`}
              choice={pendingChoice}
              audio={audio}
              onContinue={() => {
                setPendingChoice(null);
                audio.playSfx("whoosh");
                runtime.proceed();
                refresh();
              }}
            />
          )}

          {node.type === "feedback" && (
            <FeedbackCinematic
              key={node.id}
              content={runtime.getFeedbackContent(node.id)!}
              onContinue={() => {
                audio.playSfx("whoosh");
                runtime.proceed();
                refresh();
              }}
            />
          )}

          {node.type === "reflection" && (
            <ReflectionCinematic
              key={node.id}
              content={runtime.getReflectionContent(node.id)!}
              onSubmit={(text) => {
                audio.playSfx("success");
                runtime.submitReflection(text);
                refresh();
              }}
            />
          )}

          {node.type === "result" && result && (
            <ResultCinematic
              key="result"
              blueprint={blueprint}
              result={result}
              content={runtime.getResultContent(node.id)!}
            />
          )}
        </AnimatePresence>
      </div>
    </SceneStage>
  );
}

function IntroCinematic({
  blueprint,
  content,
  onStart,
}: {
  blueprint: PlayableBlueprint;
  content: {
    headline: string;
    body: string;
    cta: string;
    tagline?: string;
    logo_text?: string;
  };
  onStart: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mx-auto flex w-full max-w-3xl flex-col items-center text-center"
    >
      {content.logo_text && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-2xl font-bold text-white backdrop-blur-xl"
        >
          {content.logo_text}
        </motion.div>
      )}

      {content.tagline && (
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-indigo-300/80">
          {content.tagline}
        </p>
      )}

      <h1 className="text-3xl font-bold leading-tight text-white md:text-5xl">
        {content.headline}
      </h1>
      <p className="mt-6 max-w-xl whitespace-pre-line text-base leading-relaxed text-white/70 md:text-lg">
        {content.body}
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {blueprint.capability.rubric.slice(0, 4).map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 backdrop-blur-sm"
          >
            {item.slice(0, 12)}…
          </span>
        ))}
      </div>

      <motion.button
        type="button"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStart}
        className="mt-10 rounded-2xl bg-indigo-500 px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400"
      >
        {content.cta}
      </motion.button>

      <p className="mt-4 text-xs text-white/40">
        建议佩戴耳机 · 约 {blueprint.metadata.duration_minutes} 分钟
      </p>
    </motion.div>
  );
}

function CharacterPortrait({
  blueprint,
  characterId,
  emotion,
  speaking,
}: {
  blueprint: PlayableBlueprint;
  characterId: string;
  emotion?: string;
  speaking?: boolean;
}) {
  const character = blueprint.scenario.characters.find(
    (c) => c.id === characterId,
  );
  const portrait = getCharacterPortrait(blueprint, characterId, emotion);
  const position = getCharacterPosition(blueprint, characterId);

  const positionClass =
    position === "right"
      ? "md:justify-end"
      : position === "center"
        ? "justify-center"
        : "md:justify-start";

  return (
    <motion.div
      initial={{ opacity: 0, x: position === "right" ? 40 : -40 }}
      animate={{ opacity: 1, x: 0 }}
      className={`mb-4 flex ${positionClass}`}
    >
      <div className="relative">
        <div
          className={`relative h-28 w-28 overflow-hidden rounded-2xl border-2 border-white/20 shadow-2xl md:h-36 md:w-36 ${
            speaking ? "animate-speak-glow" : ""
          }`}
        >
          {portrait ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={portrait}
              alt={character?.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-indigo-900/50 text-5xl">
              {character?.avatar ?? "👤"}
            </div>
          )}
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-md">
          {character?.name} · {character?.role}
        </div>
      </div>
    </motion.div>
  );
}

function DialogueCinematic({
  blueprint,
  runtime,
  nodeId,
  audio,
  onNext,
}: {
  blueprint: PlayableBlueprint;
  runtime: PlayableRuntime;
  nodeId: string;
  audio: ReturnType<typeof usePlayableAudio>;
  onNext: () => void;
}) {
  const raw = runtime.getDialogueContent(nodeId)!;
  const dialogue = normalizeDialogue(raw);
  const msgIndex = runtime.getDialogueMessageIndex();
  const currentLine = dialogue.lines[msgIndex];
  const isComplete = runtime.isDialogueComplete();

  const { displayed, done, skip } = useTypewriter(
    currentLine?.text ?? "",
    32,
    true,
  );

  useEffect(() => {
    if (currentLine && !audio.muted) {
      audio.speak(currentLine.text, dialogue.character_id, currentLine?.emotion);
    }
    if (currentLine?.sfx) audio.playSfx(currentLine.sfx);
  }, [msgIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="mx-auto w-full max-w-3xl"
    >
      <CharacterPortrait
        blueprint={blueprint}
        characterId={dialogue.character_id}
        emotion={currentLine?.emotion}
        speaking={!done}
      />

      <div
        className="cursor-pointer rounded-2xl border border-white/10 bg-black/50 p-5 backdrop-blur-xl md:p-6"
        onClick={() => !done && skip()}
      >
        <p className="min-h-[4rem] text-base leading-relaxed text-white/90 md:text-lg">
          {displayed}
          {!done && <span className="animate-blink ml-0.5 inline-block">|</span>}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-white/40">
            {msgIndex + 1} / {dialogue.lines.length}
          </span>
          <button
            type="button"
            onClick={onNext}
            className="rounded-xl bg-white/10 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/20"
          >
            {isComplete ? "继续 →" : done ? "下一句 →" : "跳过"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ChoiceCinematic({
  blueprint,
  runtime,
  nodeId,
  audio,
  onChoose,
}: {
  blueprint: PlayableBlueprint;
  runtime: PlayableRuntime;
  nodeId: string;
  audio: ReturnType<typeof usePlayableAudio>;
  onChoose: (record: ChoiceRecord) => void;
}) {
  const choice = runtime.getChoiceContent(nodeId)!;
  const characterId = choice.character_id;

  useEffect(() => {
    if (choice.sfx) audio.playSfx(choice.sfx);
  }, [choice.sfx]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="mx-auto w-full max-w-3xl"
    >
      {characterId && (
        <CharacterPortrait blueprint={blueprint} characterId={characterId} />
      )}

      <div className="rounded-2xl border border-amber-400/20 bg-black/55 p-5 backdrop-blur-xl md:p-6">
        <p className="text-base font-medium leading-relaxed text-white md:text-lg">
          {choice.prompt}
        </p>

        <div className="mt-5 space-y-3">
          {choice.options.map((opt, i) => (
            <motion.button
              key={opt.id}
              type="button"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.01, x: 4 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => {
                audio.playSfx("click");
                const record = runtime.makeChoice(opt.id);
                if (record) onChoose(record);
              }}
              className="group flex w-full items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-indigo-400/40 hover:bg-indigo-500/10"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/30 text-sm font-bold text-indigo-200">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-sm leading-relaxed text-white/85 group-hover:text-white md:text-base">
                {opt.text}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ChoiceFeedbackCinematic({
  choice,
  audio,
  onContinue,
}: {
  choice: ChoiceRecord;
  audio: ReturnType<typeof usePlayableAudio>;
  onContinue: () => void;
}) {
  const isGood = choice.score >= 70;

  useEffect(() => {
    audio.speak(choice.feedback);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto w-full max-w-3xl"
    >
      <div
        className={`rounded-2xl border p-6 backdrop-blur-xl ${
          isGood
            ? "border-emerald-400/30 bg-emerald-950/40"
            : "border-amber-400/30 bg-amber-950/40"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">{isGood ? "✨" : "💡"}</span>
          <div>
            <p className="font-semibold text-white">
              {isGood ? "很好的判断" : "值得思考"}
            </p>
            <p className="text-sm text-white/60">能力评分 {choice.score} 分</p>
          </div>
        </div>
        <p className="mt-4 leading-relaxed text-white/80">{choice.feedback}</p>
        <button
          type="button"
          onClick={onContinue}
          className="mt-6 w-full rounded-xl bg-white/10 py-3 font-medium text-white transition hover:bg-white/20"
        >
          继续
        </button>
      </div>
    </motion.div>
  );
}

function FeedbackCinematic({
  content,
  onContinue,
}: {
  content: { title: string; body: string; tone: string };
  onContinue: () => void;
}) {
  const icon =
    content.tone === "positive"
      ? "🌟"
      : content.tone === "constructive"
        ? "📋"
        : "📌";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-3xl rounded-2xl border border-cyan-400/20 bg-black/55 p-6 backdrop-blur-xl"
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl">{icon}</span>
        <div>
          <h3 className="text-lg font-bold text-white">{content.title}</h3>
          <p className="mt-2 leading-relaxed text-white/75">{content.body}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onContinue}
        className="mt-6 w-full rounded-xl bg-cyan-500/20 py-3 font-medium text-cyan-100 transition hover:bg-cyan-500/30"
      >
        进入下一情境 →
      </button>
    </motion.div>
  );
}

function ReflectionCinematic({
  content,
  onSubmit,
}: {
  content: { prompt: string; placeholder?: string };
  onSubmit: (text: string) => void;
}) {
  const [text, setText] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-3xl rounded-2xl border border-white/10 bg-black/55 p-6 backdrop-blur-xl"
    >
      <h3 className="text-lg font-bold text-white">✍️ 写下你的反思</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/65">
        {content.prompt}
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={content.placeholder}
        rows={4}
        className="mt-4 w-full resize-none rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-indigo-400/50"
      />
      <button
        type="button"
        disabled={text.trim().length < 5}
        onClick={() => onSubmit(text)}
        className="mt-4 w-full rounded-xl bg-indigo-500 py-3.5 font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-40"
      >
        提交反思，查看成长报告
      </button>
    </motion.div>
  );
}

function ResultCinematic({
  blueprint,
  result,
  content,
}: {
  blueprint: PlayableBlueprint;
  result: SessionResult;
  content: {
    headline: string;
    summary_template: string;
    growth_suggestions: string[];
  };
}) {
  const passedMessage = result.passed
    ? "你已很好地理解了公司核心价值观！"
    : "还有提升空间，建议重温相关制度并再次演练。";

  const summary = content.summary_template
    .replace("{score}", String(result.score))
    .replace("{passed_message}", passedMessage);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl"
    >
      <div className="bg-gradient-to-r from-indigo-600/30 to-purple-600/30 p-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="text-6xl"
        >
          {result.passed ? "🎉" : "📚"}
        </motion.div>
        <h2 className="mt-4 text-2xl font-bold text-white">{content.headline}</h2>
        <p className="mt-2 text-white/70">{summary}</p>
      </div>

      <div className="grid grid-cols-3 gap-px bg-white/5 p-4">
        {Object.entries(result.dimension_scores).map(([name, score], i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="rounded-xl bg-white/5 p-4 text-center"
          >
            <p className="text-3xl font-bold text-indigo-300">{score}</p>
            <p className="mt-1 text-xs text-white/50">{name}</p>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4 p-6">
        <div>
          <h3 className="text-sm font-semibold text-white/80">训练目标</h3>
          <p className="mt-1 text-sm text-white/55">
            {blueprint.capability.learning_objective}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white/80">成长建议</h3>
          <ul className="mt-2 space-y-2">
            {content.growth_suggestions.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-white/60">
                <span className="text-indigo-400">→</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {result.reflection && (
          <div className="rounded-xl border border-indigo-400/20 bg-indigo-950/30 p-4">
            <h3 className="text-sm font-semibold text-indigo-200">你的反思</h3>
            <p className="mt-1 text-sm leading-relaxed text-white/70">
              {result.reflection}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
