"use client";

import { useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  MarkerType,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { PlayableBlueprint } from "@playableos/blueprint-schema";

const NODE_COLORS: Record<string, string> = {
  intro: "#6366f1",
  dialogue: "#8b5cf6",
  choice: "#f59e0b",
  feedback: "#06b6d4",
  reflection: "#10b981",
  result: "#ec4899",
};

const NODE_LABELS: Record<string, string> = {
  intro: "开场",
  dialogue: "对话",
  choice: "选择",
  feedback: "反馈",
  reflection: "反思",
  result: "结果",
};

interface BlueprintVisualizerProps {
  blueprint: PlayableBlueprint;
}

export function BlueprintVisualizer({ blueprint }: BlueprintVisualizerProps) {
  const { nodes, edges } = useMemo(() => {
    const flowNodes: Node[] = blueprint.experience.nodes.map((node, i) => ({
      id: node.id,
      position: { x: (i % 3) * 260, y: Math.floor(i / 3) * 120 },
      data: {
        label: (
          <div className="text-center">
            <div className="text-[10px] uppercase opacity-70">
              {NODE_LABELS[node.type] ?? node.type}
            </div>
            <div className="mt-0.5 text-xs font-semibold">
              {node.title ?? node.id}
            </div>
          </div>
        ),
      },
      style: {
        background: NODE_COLORS[node.type] ?? "#94a3b8",
        color: "#fff",
        border: "none",
        borderRadius: 12,
        padding: "8px 12px",
        fontSize: 12,
        width: 180,
      },
    }));

    const flowEdges: Edge[] = [];
    for (const node of blueprint.experience.nodes) {
      if (node.next) {
        flowEdges.push({
          id: `${node.id}->${node.next}`,
          source: node.id,
          target: node.next,
          markerEnd: { type: MarkerType.ArrowClosed },
          style: { stroke: "#94a3b8" },
        });
      }

      if (node.type === "choice") {
        const choice = blueprint.interactions.choices[node.id];
        choice?.options.forEach((opt) => {
          if (opt.next_node && opt.next_node !== node.next) {
            flowEdges.push({
              id: `${node.id}-${opt.id}->${opt.next_node}`,
              source: node.id,
              target: opt.next_node,
              label: opt.id.toUpperCase(),
              markerEnd: { type: MarkerType.ArrowClosed },
              style: { stroke: "#f59e0b", strokeDasharray: "4 4" },
            });
          }
        });
      }
    }

    return { nodes: flowNodes, edges: flowEdges };
  }, [blueprint]);

  return (
    <div className="h-[520px] overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={16} size={1} color="#e2e8f0" />
        <Controls showInteractive={false} />
        <MiniMap
          nodeColor={(n) => {
            const type = blueprint.experience.nodes.find(
              (node) => node.id === n.id,
            )?.type;
            return NODE_COLORS[type ?? ""] ?? "#94a3b8";
          }}
          maskColor="rgba(255,255,255,0.7)"
        />
      </ReactFlow>
    </div>
  );
}
