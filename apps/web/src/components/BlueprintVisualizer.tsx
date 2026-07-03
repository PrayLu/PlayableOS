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
  choice: "#a855f7",
  feedback: "#22d3ee",
  reflection: "#34d399",
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
          style: { stroke: "#818cf8" },
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
              style: { stroke: "#c084fc", strokeDasharray: "4 4" },
            });
          }
        });
      }
    }

    return { nodes: flowNodes, edges: flowEdges };
  }, [blueprint]);

  return (
    <div className="flow-dark h-[520px] overflow-hidden rounded-xl">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={20} size={1} color="rgba(129,140,248,0.08)" />
        <Controls showInteractive={false} />
        <MiniMap
          nodeColor={(n) => {
            const type = blueprint.experience.nodes.find(
              (node) => node.id === n.id,
            )?.type;
            return NODE_COLORS[type ?? ""] ?? "#64748b";
          }}
          maskColor="rgba(3,7,18,0.85)"
          style={{ background: "rgba(15,23,42,0.6)" }}
        />
      </ReactFlow>
    </div>
  );
}
