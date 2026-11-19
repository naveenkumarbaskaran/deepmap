"use client";

import { motion } from "framer-motion";

const DEFAULT_TOKENS = ["The", "cat", "sat", "on", "mat"];
const DEFAULT_WEIGHTS = [
  [0.8, 0.1, 0.05, 0.03, 0.02],
  [0.2, 0.7, 0.05, 0.03, 0.02],
  [0.05, 0.1, 0.75, 0.05, 0.05],
  [0.03, 0.05, 0.1, 0.72, 0.1],
  [0.02, 0.03, 0.05, 0.15, 0.75],
];

interface AttentionHeatmapProps {
  tokens?: string[];
  weights?: number[][];
  animate?: boolean;
}

export function AttentionHeatmap({
  tokens = DEFAULT_TOKENS,
  weights = DEFAULT_WEIGHTS,
  animate = true,
}: AttentionHeatmapProps) {
  const n = tokens.length;
  const cellSize = 44;
  const labelOffset = 50;
  const svgSize = labelOffset + n * cellSize + 10;

  return (
    <div className="my-4 rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
      <svg width="100%" viewBox={`0 0 ${svgSize} ${svgSize}`} style={{ display: "block" }}>
        {/* Column labels (top) */}
        {tokens.map((t, i) => (
          <text
            key={`col-${i}`}
            x={labelOffset + i * cellSize + cellSize / 2}
            y={labelOffset - 8}
            textAnchor="middle"
            fill="#64748b"
            fontSize={10}
          >
            {t}
          </text>
        ))}

        {/* Row labels (left) */}
        {tokens.map((t, i) => (
          <text
            key={`row-${i}`}
            x={labelOffset - 6}
            y={labelOffset + i * cellSize + cellSize / 2 + 4}
            textAnchor="end"
            fill="#64748b"
            fontSize={10}
          >
            {t}
          </text>
        ))}

        {/* Cells */}
        {weights.map((row, ri) =>
          row.map((w, ci) => (
            <motion.rect
              key={`${ri}-${ci}`}
              x={labelOffset + ci * cellSize + 1}
              y={labelOffset + ri * cellSize + 1}
              width={cellSize - 2}
              height={cellSize - 2}
              rx={4}
              fill={`rgba(99, 102, 241, ${w})`}
              initial={animate ? { opacity: 0 } : undefined}
              animate={animate ? { opacity: 1 } : undefined}
              transition={animate ? { delay: ri * 0.08 + ci * 0.03, duration: 0.3 } : undefined}
            />
          ))
        )}

        {/* Weight values */}
        {weights.map((row, ri) =>
          row.map((w, ci) => (
            <text
              key={`val-${ri}-${ci}`}
              x={labelOffset + ci * cellSize + cellSize / 2}
              y={labelOffset + ri * cellSize + cellSize / 2 + 4}
              textAnchor="middle"
              fill={w > 0.4 ? "white" : "#475569"}
              fontSize={9}
            >
              {w.toFixed(2)}
            </text>
          ))
        )}
      </svg>
    </div>
  );
}
