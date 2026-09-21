"use client";

import { useMemo } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  type Edge,
  type NodeTypes,
} from "@xyflow/react";
import type { ProjectGraph } from "@talion/contracts";
import { TalionNode, type TalionFlowNode } from "./talion-node";

const nodeTypes: NodeTypes = {
  talion: TalionNode,
};

const positions: Record<string, { x: number; y: number }> = {
  project: { x: 40, y: 220 },
  runtime: { x: 330, y: 80 },
  network: { x: 330, y: 235 },
  security: { x: 330, y: 390 },
  "finding-console": { x: 655, y: 80 },
  "finding-request": { x: 655, y: 235 },
};

export function XRayCanvas({
  graph,
  target,
}: {
  graph: ProjectGraph;
  target: string;
}) {
  const nodes = useMemo<TalionFlowNode[]>(
    () =>
      graph.nodes.map((node) => ({
        id: node.id,
        type: "talion",
        position: positions[node.id] ?? { x: 0, y: 0 },
        data: {
          label: node.id === "project" ? target : node.label,
          kind: node.kind,
          status: node.status,
          ...(node.kind === "finding" ? { meta: "Evidence attached" } : {}),
        },
      })),
    [graph.nodes, target],
  );

  const edges = useMemo<Edge[]>(
    () =>
      graph.edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        label: edge.relation,
        type: "smoothstep",
        animated: edge.target.startsWith("finding"),
        className: edge.target.startsWith("finding") ? "xray-edge--finding" : "xray-edge",
      })),
    [graph.edges],
  );

  return (
    <div className="xray-canvas">
      <ReactFlow
        defaultEdgeOptions={{ selectable: false }}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        maxZoom={1.6}
        minZoom={0.45}
        nodeTypes={nodeTypes}
        nodes={nodes}
        nodesConnectable={false}
        nodesDraggable={false}
        panOnScroll
        proOptions={{ hideAttribution: false }}
      >
        <Background color="#ddd5ef" gap={24} size={1} variant={BackgroundVariant.Dots} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
