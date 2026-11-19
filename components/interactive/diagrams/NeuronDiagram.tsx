"use client";

import { motion } from "framer-motion";

interface NeuronDiagramProps {
  layers?: number[];
  animate?: boolean;
}

export function NeuronDiagram({ layers = [2, 4, 3, 1], animate = true }: NeuronDiagramProps) {
  const width = 480;
  const height = 220;
  const maxNodes = Math.max(...layers);
  const layerSpacing = width / (layers.length + 1);
  const nodeRadius = 14;

  type NodePos = { x: number; y: number; layer: number; index: number };
  const nodePositions: NodePos[] = [];

  layers.forEach((count, li) => {
    const x = layerSpacing * (li + 1);
    for (let i = 0; i < count; i++) {
      const nodeSpacing = height / (count + 1);
      const y = nodeSpacing * (i + 1);
      nodePositions.push({ x, y, layer: li, index: i });
    }
  });

  const edges: Array<[NodePos, NodePos]> = [];
  layers.forEach((count, li) => {
    if (li === layers.length - 1) return;
    const fromNodes = nodePositions.filter((n) => n.layer === li);
    const toNodes = nodePositions.filter((n) => n.layer === li + 1);
    fromNodes.forEach((from) => toNodes.forEach((to) => edges.push([from, to])));
  });

  const TRACK_COLORS = ["#6366f1", "#8b5cf6", "#3b82f6", "#10b981"];

  return (
    <div className="my-4 rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
      <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ display: "block" }}>
        {/* Edges */}
        {edges.map(([from, to], i) => (
          <line
            key={i}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="#1e1e2e"
            strokeWidth={1}
          />
        ))}

        {/* Layer labels */}
        {layers.map((_, li) => {
          const labels = ["Input", "Hidden", "Hidden", "Output"];
          return (
            <text
              key={li}
              x={layerSpacing * (li + 1)}
              y={height - 4}
              textAnchor="middle"
              fill="#374151"
              fontSize={10}
            >
              {labels[Math.min(li, labels.length - 1)]}
            </text>
          );
        })}

        {/* Nodes */}
        {nodePositions.map((n, i) => {
          const color = TRACK_COLORS[Math.min(n.layer, TRACK_COLORS.length - 1)];
          return (
            <motion.circle
              key={i}
              cx={n.x}
              cy={n.y}
              r={nodeRadius}
              fill={`${color}30`}
              stroke={color}
              strokeWidth={1.5}
              initial={animate ? { opacity: 0.3 } : undefined}
              animate={
                animate
                  ? {
                      opacity: [0.3, 1, 0.3],
                      r: [nodeRadius, nodeRadius + 2, nodeRadius],
                    }
                  : undefined
              }
              transition={
                animate
                  ? {
                      duration: 2,
                      repeat: Infinity,
                      delay: n.layer * 0.4 + n.index * 0.15,
                    }
                  : undefined
              }
            />
          );
        })}
      </svg>
    </div>
  );
}
