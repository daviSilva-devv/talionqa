"use client";

import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";

export type TalionNodeData = {
  label: string;
  kind: string;
  status: "healthy" | "unknown" | "warning" | "critical";
  meta?: string;
};

export type TalionFlowNode = Node<TalionNodeData, "talion">;

export function TalionNode({ data, selected }: NodeProps<TalionFlowNode>) {
  return (
    <div
      className={[
        "talion-node",
        `talion-node--${data.status}`,
        selected ? "talion-node--selected" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Handle className="talion-handle" position={Position.Left} type="target" />
      <div className="talion-node-topline">
        <span className="talion-node-kind">{data.kind}</span>
        <span className="talion-node-state" aria-label={data.status} />
      </div>
      <strong>{data.label}</strong>
      {data.meta ? <span className="talion-node-meta">{data.meta}</span> : null}
      <Handle className="talion-handle" position={Position.Right} type="source" />
    </div>
  );
}
