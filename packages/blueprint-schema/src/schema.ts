import { z } from "zod";

export const MetadataSchema = z.object({
  id: z.string(),
  version: z.string(),
  title: z.string(),
  description: z.string(),
  language: z.string().default("zh-CN"),
  duration_minutes: z.number().positive(),
  type: z.enum(["dialogue", "simulation", "challenge"]).default("dialogue"),
  tags: z.array(z.string()).default([]),
});

export const CharacterSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  avatar: z.string().optional(),
  portrait: z.string().optional(),
  position: z.enum(["left", "right", "center"]).default("left"),
  voice: z
    .object({
      rate: z.number().min(0.5).max(2).default(1),
      pitch: z.number().min(0.5).max(2).default(1),
      voice_id: z.string().optional(),
      stability: z.number().min(0).max(1).optional(),
      similarity_boost: z.number().min(0).max(1).optional(),
    })
    .optional(),
});

export const SceneBackgroundSchema = z.object({
  type: z.enum(["image", "gradient", "video"]).default("image"),
  src: z.string().optional(),
  gradient: z.string().optional(),
  overlay: z.string().optional(),
  ken_burns: z.boolean().default(true),
});

export const SceneSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  background: SceneBackgroundSchema,
  mood: z
    .enum(["calm", "warm", "tense", "focus", "success", "neutral"])
    .default("neutral"),
  ambient_track: z.string().optional(),
  particles: z.enum(["none", "dust", "bokeh", "pulse"]).default("none"),
});

export const AudioTrackSchema = z.object({
  src: z.string(),
  loop: z.boolean().default(true),
  volume: z.number().min(0).max(1).default(0.5),
});

export const PresentationSchema = z.object({
  theme: z
    .object({
      accent: z.string().default("#6366f1"),
      accent_glow: z.string().default("rgba(99, 102, 241, 0.4)"),
    })
    .default({}),
  scenes: z.record(z.string(), SceneSchema).default({}),
  node_scenes: z.record(z.string(), z.string()).default({}),
  audio: z
    .object({
      bgm: z.string().optional(),
      tracks: z.record(z.string(), AudioTrackSchema).default({}),
      sfx: z.record(z.string(), z.string()).default({}),
      voice_enabled: z.boolean().default(true),
      tts: z
        .object({
          provider: z
            .enum(["volcengine", "elevenlabs", "browser"])
            .default("volcengine"),
          model_id: z.string().default("eleven_multilingual_v2"),
          fallback: z.enum(["browser", "none"]).default("browser"),
        })
        .optional(),
    })
    .default({}),
  character_overrides: z
    .record(
      z.string(),
      z.object({
        portrait: z.string().optional(),
        position: z.enum(["left", "right", "center"]).optional(),
        emotions: z.record(z.string(), z.string()).optional(),
      }),
    )
    .default({}),
});

export const CapabilitySchema = z.object({
  target: z.string(),
  learning_objective: z.string(),
  rubric: z.array(z.string()).min(1),
});

export const ScenarioSchema = z.object({
  context: z.string(),
  setting: z.string().optional(),
  characters: z.array(CharacterSchema).min(1),
});

export const ExperienceNodeSchema = z.object({
  id: z.string(),
  type: z.enum([
    "intro",
    "dialogue",
    "choice",
    "feedback",
    "reflection",
    "result",
  ]),
  title: z.string().optional(),
  next: z.string().optional(),
  scene_id: z.string().optional(),
  transition: z.enum(["fade", "slide", "dissolve", "zoom"]).default("fade"),
  sfx: z.string().optional(),
});

export const ExperienceSchema = z.object({
  entry: z.string(),
  nodes: z.array(ExperienceNodeSchema).min(1),
});

export const DialogueLineSchema = z.object({
  text: z.string(),
  emotion: z
    .enum(["neutral", "happy", "serious", "concerned", "encouraging"])
    .default("neutral"),
  sfx: z.string().optional(),
});

export const DialogueContentSchema = z.union([
  z.object({
    character_id: z.string(),
    messages: z.array(z.string()).min(1),
  }),
  z.object({
    character_id: z.string(),
    lines: z.array(DialogueLineSchema).min(1),
  }),
]);

export const ChoiceOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
  feedback: z.string(),
  score: z.number().min(0).max(100),
  next_node: z.string().optional(),
});

export const ChoiceContentSchema = z.object({
  prompt: z.string(),
  character_id: z.string().optional(),
  options: z.array(ChoiceOptionSchema).min(2),
  sfx: z.string().optional(),
  timer_seconds: z.number().positive().optional(),
});

export const FeedbackContentSchema = z.object({
  title: z.string(),
  body: z.string(),
  tone: z.enum(["positive", "neutral", "constructive"]).default("neutral"),
});

export const ReflectionContentSchema = z.object({
  prompt: z.string(),
  placeholder: z.string().optional(),
});

export const IntroContentSchema = z.object({
  headline: z.string(),
  body: z.string(),
  cta: z.string().default("开始训练"),
  tagline: z.string().optional(),
  logo_text: z.string().optional(),
});

export const ResultContentSchema = z.object({
  headline: z.string(),
  summary_template: z.string(),
  growth_suggestions: z.array(z.string()).min(1),
});

export const InteractionSchema = z.object({
  dialogues: z.record(z.string(), DialogueContentSchema).default({}),
  choices: z.record(z.string(), ChoiceContentSchema).default({}),
  feedbacks: z.record(z.string(), FeedbackContentSchema).default({}),
  reflections: z.record(z.string(), ReflectionContentSchema).default({}),
  intros: z.record(z.string(), IntroContentSchema).default({}),
  results: z.record(z.string(), ResultContentSchema).default({}),
});

export const AssessmentDimensionSchema = z.object({
  name: z.string(),
  weight: z.number().min(0).max(1),
});

export const AssessmentSchema = z.object({
  passing_score: z.number().min(0).max(100).default(60),
  dimensions: z.array(AssessmentDimensionSchema).min(1),
});

export const PlayableBlueprintSchema = z.object({
  metadata: MetadataSchema,
  capability: CapabilitySchema,
  scenario: ScenarioSchema,
  experience: ExperienceSchema,
  interactions: InteractionSchema,
  assessment: AssessmentSchema,
  presentation: PresentationSchema.optional(),
});

/** PGE 输出 Schema — metadata.id/version 由 enrich 阶段补充 */
export const PgeMetadataSchema = z.object({
  id: z.string().optional(),
  version: z.string().optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  language: z.string().default("zh-CN"),
  duration_minutes: z.coerce.number().positive(),
  type: z.enum(["dialogue", "simulation", "challenge"]).default("simulation"),
  tags: z.array(z.string()).default([]),
});

export const PgeBlueprintSchema = z.object({
  metadata: PgeMetadataSchema,
  capability: CapabilitySchema,
  scenario: ScenarioSchema,
  experience: ExperienceSchema,
  interactions: InteractionSchema,
  assessment: AssessmentSchema,
  presentation: PresentationSchema.optional(),
});

export type Metadata = z.infer<typeof MetadataSchema>;
export type Character = z.infer<typeof CharacterSchema>;
export type Scene = z.infer<typeof SceneSchema>;
export type Presentation = z.infer<typeof PresentationSchema>;
export type DialogueLine = z.infer<typeof DialogueLineSchema>;
export type Capability = z.infer<typeof CapabilitySchema>;
export type Scenario = z.infer<typeof ScenarioSchema>;
export type ExperienceNode = z.infer<typeof ExperienceNodeSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type ChoiceOption = z.infer<typeof ChoiceOptionSchema>;
export type Interaction = z.infer<typeof InteractionSchema>;
export type Assessment = z.infer<typeof AssessmentSchema>;
export type PlayableBlueprint = z.infer<typeof PlayableBlueprintSchema>;
export type PgeBlueprint = z.infer<typeof PgeBlueprintSchema>;

export function parsePlayableBlueprint(data: unknown): PlayableBlueprint {
  return PlayableBlueprintSchema.parse(data);
}

export function safeParsePlayableBlueprint(data: unknown) {
  return PlayableBlueprintSchema.safeParse(data);
}

export function safeParsePgeBlueprint(data: unknown) {
  return PgeBlueprintSchema.safeParse(data);
}
