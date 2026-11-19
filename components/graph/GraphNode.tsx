"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { motion } from "framer-motion";
import { TRACKS } from "@/lib/graph-data";
import type { NodeState, TrackId } from "@/lib/graph-data";

export interface GraphNodeData {
  label: string;
  track: TrackId;
  slug: string;
  estimatedMinutes: number;
  state: NodeState;
}

function GraphNodeComponent({ data, selected }: NodeProps) {
  const nodeData = data as GraphNodeData;
  const trackData = TRACKS.find((t) => t.id === nodeData.track);
  const color = trackData?.color ?? "#6366f1";

  const isLocked = nodeData.state === "locked";
  const isComplete = nodeData.state === "complete";
  const isInProgress = nodeData.state === "in-progress";

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative select-none"
    >
      {/* Pulse ring for in-progress */}
      {isInProgress && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{ border: `2px solid ${color}` }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      <div
        className="relative rounded-xl px-3 py-2 min-w-[120px] max-w-[150px] cursor-pointer transition-all duration-200"
        style={{
          background: isLocked
            ? "var(--surface)"
            : isComplete
            ? `${color}25`
            : selected
            ? `${color}20`
            : "var(--surface)",
          border: `1.5px solid ${
            isLocked
              ? "var(--border)"
              : isComplete
              ? color
              : selected
              ? color
              : `${color}60`
          }`,
          boxShadow: selected ? `0 0 0 2px ${color}60` : undefined,
          opacity: isLocked ? 0.4 : 1,
        }}
      >
        {/* Track color dot */}
        <div className="flex items-center gap-1.5 mb-1">
          <div
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: isLocked ? "#64748b" : color }}
          />
          <span
            className="text-[10px] font-medium uppercase tracking-wide"
            style={{ color: isLocked ? "#475569" : `${color}cc` }}
          >
            {trackData?.emoji}
          </span>
        </div>

        {/* Label */}
        <div
          className="text-[11px] font-semibold leading-tight"
          style={{ color: isLocked ? "#475569" : "#f1f5f9" }}
        >
          {nodeData.label}
        </div>

        {/* Time + state */}
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[9px]" style={{ color: "#64748b" }}>
            {nodeData.estimatedMinutes}m
          </span>
          {isComplete && (
            <span className="text-[10px]" style={{ color: "#10b981" }}>
              ✓
            </span>
          )}
          {isLocked && (
            <span className="text-[9px]" style={{ color: "#475569" }}>
              🔒
            </span>
          )}
        </div>
      </div>

      <Handle type="target" position={Position.Left} className="opacity-0" />
      <Handle type="source" position={Position.Right} className="opacity-0" />
    </motion.div>
  );
}

export const GraphNode = memo(GraphNodeComponent);
