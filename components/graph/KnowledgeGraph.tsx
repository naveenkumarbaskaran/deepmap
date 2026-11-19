"use client";

import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { NODES, EDGES, TRACKS } from "@/lib/graph-data";
import { GraphNode, type GraphNodeData } from "./GraphNode";
import { useProgress } from "@/lib/progress";

const nodeTypes = { lesson: GraphNode };

interface KnowledgeGraphProps {
  onNodeClick: (slug: string) => void;
  activeSlug?: string | null;
}

export function KnowledgeGraph({ onNodeClick, activeSlug }: KnowledgeGraphProps) {
  const { getNodeState } = useProgress();

  const nodes: Node[] = useMemo(
    () =>
      NODES.map((n) => ({
        id: n.id,
        type: "lesson",
        position: n.position,
        data: {
          label: n.label,
          track: n.track,
          slug: n.slug,
          estimatedMinutes: n.estimatedMinutes,
          state: n.slug === activeSlug ? "in-progress" : getNodeState(n.slug),
        } satisfies GraphNodeData,
        selected: n.slug === activeSlug,
      })),
    [getNodeState, activeSlug]
  );

  const edges: Edge[] = useMemo(
    () =>
      EDGES.map((e) => ({
        ...e,
        style: { stroke: "#1e1e2e", strokeWidth: 2 },
        animated: false,
      })),
    []
  );

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      const data = node.data as GraphNodeData;
      if (data.state !== "locked") {
        onNodeClick(data.slug);
      }
    },
    [onNodeClick]
  );

  const trackColors = TRACKS.reduce(
    (acc, t) => ({ ...acc, [t.id]: t.color }),
    {} as Record<string, string>
  );

  return (
    <div style={{ width: "100%", height: "100%", minHeight: "400px", background: "var(--background)" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
        nodesDraggable={false}
        nodesConnectable={false}
        fitView
        fitViewOptions={{ padding: 0.1 }}
        minZoom={0.2}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="#1e1e2e"
        />
        <Controls
          className="!bottom-4 !left-4"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        />
        <MiniMap
          nodeColor={(node) => {
            const data = node.data as GraphNodeData;
            if (data.state === "locked") return "#1e1e2e";
            if (data.state === "complete") return "#10b981";
            return trackColors[data.track] ?? "#6366f1";
          }}
          nodeStrokeWidth={0}
          maskColor="rgba(0,0,0,0.5)"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            width: 160,
            height: 100,
          }}
          className="!bottom-4 !right-4"
        />
      </ReactFlow>
    </div>
  );
}
