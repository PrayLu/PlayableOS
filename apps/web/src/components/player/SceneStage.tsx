"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Scene } from "@playableos/blueprint-schema";
import { MOOD_OVERLAYS } from "@/lib/presentation";

interface SceneStageProps {
  scene: Scene | null;
  transitionKey: string;
  children: React.ReactNode;
}

export function SceneStage({ scene, transitionKey, children }: SceneStageProps) {
  const bg = scene?.background;
  const overlay =
    bg?.overlay ?? (scene ? MOOD_OVERLAYS[scene.mood] : MOOD_OVERLAYS.neutral);

  return (
    <div className="relative h-full min-h-[100dvh] w-full overflow-hidden bg-slate-950">
      <AnimatePresence mode="wait">
        <motion.div
          key={transitionKey}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {bg?.type === "image" && bg.src && (
            <div
              className={`absolute inset-0 bg-cover bg-center ${
                bg.ken_burns ? "animate-ken-burns" : ""
              }`}
              style={{ backgroundImage: `url(${bg.src})` }}
            />
          )}
          {bg?.type === "gradient" && (
            <div
              className="absolute inset-0"
              style={{
                background:
                  bg.gradient ??
                  "linear-gradient(135deg, #1e1b4b 0%, #0f172a 50%, #020617 100%)",
              }}
            />
          )}
          {!bg && (
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-black" />
          )}

          <div className="absolute inset-0" style={{ background: overlay }} />

          {scene?.particles === "bokeh" && <BokehParticles />}
          {scene?.particles === "dust" && <DustParticles />}
          {scene?.particles === "pulse" && <PulseOverlay mood={scene.mood} />}
        </motion.div>
      </AnimatePresence>

      {scene && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-0 right-0 top-0 z-10 px-6 pt-6 md:px-10"
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
            {scene.subtitle ?? "PlayableOS Experience"}
          </p>
          <h2 className="mt-1 text-lg font-semibold text-white/90 md:text-xl">
            {scene.title}
          </h2>
        </motion.div>
      )}

      <div className="relative z-20 flex h-full min-h-[100dvh] flex-col">
        {children}
      </div>
    </div>
  );
}

function BokehParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="animate-float absolute rounded-full bg-white/10 blur-sm"
          style={{
            width: `${8 + (i % 5) * 6}px`,
            height: `${8 + (i % 5) * 6}px`,
            left: `${(i * 17) % 100}%`,
            top: `${(i * 23) % 100}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${4 + (i % 4)}s`,
          }}
        />
      ))}
    </div>
  );
}

function DustParticles() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {Array.from({ length: 24 }).map((_, i) => (
        <span
          key={i}
          className="animate-drift absolute h-px w-px rounded-full bg-white/30"
          style={{
            left: `${(i * 13) % 100}%`,
            top: `${(i * 19) % 100}%`,
            animationDelay: `${i * 0.25}s`,
          }}
        />
      ))}
    </div>
  );
}

function PulseOverlay({ mood }: { mood: string }) {
  if (mood !== "tense") return null;
  return <div className="animate-pulse-tense pointer-events-none absolute inset-0 bg-red-900/10" />;
}
