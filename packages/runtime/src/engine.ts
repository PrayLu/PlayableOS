import type {
  ExperienceNode,
  PlayableBlueprint,
} from "@playableos/blueprint-schema";
import { parsePlayableBlueprint } from "@playableos/blueprint-schema";

function getDialogueLineCount(
  dialogue: PlayableBlueprint["interactions"]["dialogues"][string],
): number {
  if ("lines" in dialogue) return dialogue.lines.length;
  return dialogue.messages.length;
}

export type BehaviorEventType =
  | "session_started"
  | "node_entered"
  | "dialogue_viewed"
  | "choice_made"
  | "reflection_submitted"
  | "session_completed";

export interface BehaviorEvent {
  type: BehaviorEventType;
  timestamp: number;
  node_id: string;
  payload?: Record<string, unknown>;
}

export interface ChoiceRecord {
  node_id: string;
  option_id: string;
  score: number;
  feedback: string;
}

export interface SessionResult {
  score: number;
  passed: boolean;
  dimension_scores: Record<string, number>;
  choices: ChoiceRecord[];
  reflection?: string;
  growth_suggestions: string[];
  completed_at: number;
}

export interface RuntimeState {
  blueprint: PlayableBlueprint;
  currentNodeId: string;
  events: BehaviorEvent[];
  choices: ChoiceRecord[];
  reflection?: string;
  dialogueMessageIndex: number;
  status: "active" | "completed";
  startedAt: number;
}

export class PlayableRuntime {
  private state: RuntimeState;

  constructor(blueprint: PlayableBlueprint) {
    this.state = {
      blueprint,
      currentNodeId: blueprint.experience.entry,
      events: [],
      choices: [],
      dialogueMessageIndex: 0,
      status: "active",
      startedAt: Date.now(),
    };
    this.emit("session_started", this.state.currentNodeId);
    this.emit("node_entered", this.state.currentNodeId);
  }

  static fromJSON(data: unknown): PlayableRuntime {
    const blueprint = parsePlayableBlueprint(data);
    return new PlayableRuntime(blueprint);
  }

  getBlueprint(): PlayableBlueprint {
    return this.state.blueprint;
  }

  getState(): Readonly<RuntimeState> {
    return this.state;
  }

  getEvents(): readonly BehaviorEvent[] {
    return this.state.events;
  }

  getCurrentNode(): ExperienceNode | undefined {
    return this.state.blueprint.experience.nodes.find(
      (n) => n.id === this.state.currentNodeId,
    );
  }

  getCharacter(id: string) {
    return this.state.blueprint.scenario.characters.find((c) => c.id === id);
  }

  getDialogueContent(nodeId: string) {
    return this.state.blueprint.interactions.dialogues[nodeId];
  }

  getChoiceContent(nodeId: string) {
    return this.state.blueprint.interactions.choices[nodeId];
  }

  getFeedbackContent(nodeId: string) {
    return this.state.blueprint.interactions.feedbacks[nodeId];
  }

  getReflectionContent(nodeId: string) {
    return this.state.blueprint.interactions.reflections[nodeId];
  }

  getIntroContent(nodeId: string) {
    return this.state.blueprint.interactions.intros[nodeId];
  }

  getResultContent(nodeId: string) {
    return this.state.blueprint.interactions.results[nodeId];
  }

  getDialogueMessageIndex(): number {
    return this.state.dialogueMessageIndex;
  }

  isCompleted(): boolean {
    return this.state.status === "completed";
  }

  advanceDialogue(): boolean {
    const node = this.getCurrentNode();
    if (!node || node.type !== "dialogue") return false;

    const dialogue = this.getDialogueContent(node.id);
    if (!dialogue) return false;

    if (
      this.state.dialogueMessageIndex <
      getDialogueLineCount(dialogue) - 1
    ) {
      this.state.dialogueMessageIndex += 1;
      this.emit("dialogue_viewed", node.id, {
        message_index: this.state.dialogueMessageIndex,
      });
      return true;
    }

    return false;
  }

  isDialogueComplete(): boolean {
    const node = this.getCurrentNode();
    if (!node || node.type !== "dialogue") return true;

    const dialogue = this.getDialogueContent(node.id);
    if (!dialogue) return true;

    return (
      this.state.dialogueMessageIndex >= getDialogueLineCount(dialogue) - 1
    );
  }

  proceed(): boolean {
    const node = this.getCurrentNode();
    if (!node || this.state.status === "completed") return false;

    if (node.type === "dialogue" && !this.isDialogueComplete()) {
      return this.advanceDialogue();
    }

    if (node.type === "result") {
      this.completeSession();
      return false;
    }

    const nextId = node.next;
    if (!nextId) {
      return false;
    }

    return this.goToNode(nextId);
  }

  makeChoice(optionId: string): ChoiceRecord | null {
    const node = this.getCurrentNode();
    if (!node || node.type !== "choice") return null;

    const choice = this.getChoiceContent(node.id);
    if (!choice) return null;

    const option = choice.options.find((o) => o.id === optionId);
    if (!option) return null;

    const record: ChoiceRecord = {
      node_id: node.id,
      option_id: option.id,
      score: option.score,
      feedback: option.feedback,
    };

    this.state.choices.push(record);
    this.emit("choice_made", node.id, {
      option_id: option.id,
      score: option.score,
    });

    return record;
  }

  submitReflection(text: string): void {
    const node = this.getCurrentNode();
    if (!node || node.type !== "reflection") return;

    this.state.reflection = text.trim();
    this.emit("reflection_submitted", node.id, { text: this.state.reflection });

    if (node.next) {
      this.goToNode(node.next);
    }
  }

  getResult(): SessionResult | null {
    if (this.state.status !== "completed") return null;

    const { assessment, capability } = this.state.blueprint;
    const choiceScores = this.state.choices.map((c) => c.score);
    const avgScore =
      choiceScores.length > 0
        ? Math.round(
            choiceScores.reduce((a, b) => a + b, 0) / choiceScores.length,
          )
        : 0;

    const dimensionScores: Record<string, number> = {};
    for (const dim of assessment.dimensions) {
      dimensionScores[dim.name] = avgScore;
    }

    const resultNode = this.state.blueprint.experience.nodes.find(
      (n) => n.type === "result",
    );
    const resultContent = resultNode
      ? this.getResultContent(resultNode.id)
      : null;

    return {
      score: avgScore,
      passed: avgScore >= assessment.passing_score,
      dimension_scores: dimensionScores,
      choices: [...this.state.choices],
      reflection: this.state.reflection,
      growth_suggestions:
        resultContent?.growth_suggestions ?? capability.rubric.slice(0, 3),
      completed_at: Date.now(),
    };
  }

  private goToNode(nodeId: string): boolean {
    const node = this.state.blueprint.experience.nodes.find(
      (n) => n.id === nodeId,
    );
    if (!node) return false;

    this.state.currentNodeId = nodeId;
    this.state.dialogueMessageIndex = 0;
    this.emit("node_entered", nodeId);

    if (node.type === "result") {
      this.completeSession();
    }

    return true;
  }

  private completeSession(): void {
    if (this.state.status === "completed") return;
    this.state.status = "completed";
    this.emit("session_completed", this.state.currentNodeId, {
      result: this.getResult(),
    });
  }

  private emit(
    type: BehaviorEventType,
    node_id: string,
    payload?: Record<string, unknown>,
  ): void {
    this.state.events.push({
      type,
      timestamp: Date.now(),
      node_id,
      payload,
    });
  }
}

export function validateBlueprintFlow(blueprint: PlayableBlueprint): string[] {
  const errors: string[] = [];
  const nodeIds = new Set(blueprint.experience.nodes.map((n) => n.id));

  if (!nodeIds.has(blueprint.experience.entry)) {
    errors.push(`Entry node "${blueprint.experience.entry}" not found`);
  }

  for (const node of blueprint.experience.nodes) {
    if (node.next && !nodeIds.has(node.next)) {
      errors.push(`Node "${node.id}" references missing next "${node.next}"`);
    }

    if (node.type === "choice") {
      const choice = blueprint.interactions.choices[node.id];
      if (!choice) {
        errors.push(`Choice node "${node.id}" has no interaction content`);
      } else {
        for (const opt of choice.options) {
          if (opt.next_node && !nodeIds.has(opt.next_node)) {
            errors.push(
              `Choice option "${opt.id}" references missing node "${opt.next_node}"`,
            );
          }
        }
      }
    }
  }

  return errors;
}
