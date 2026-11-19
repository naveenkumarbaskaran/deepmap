"use client";

import { motion } from "framer-motion";

interface TransformerBlockProps {
  showMask?: boolean;
  animate?: boolean;
}

const LAYERS = [
  { label: "Input Embedding", color: "#6366f1" },
  { label: "Multi-Head Attention", color: "#8b5cf6" },
  { label: "Add & Norm", color: "#3b82f6" },
  { label: "Feed Forward", color: "#06b6d4" },
  { label: "Add & Norm", color: "#3b82f6" },
  { label: "Output", color: "#10b981" },
];

export function TransformerBlock({ showMask = false, animate = true }: TransformerBlockProps) {
  return (
    <div className="my-4 rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)", background: "#080810" }}>
      <svg width="100%" viewBox="0 0 320 320" style={{ display: "block" }}>
        {/* Title */}
        <text x={160} y={20} textAnchor="middle" fill="#64748b" fontSize={11} fontWeight="600">
          Transformer Block
        </text>

        {/* Causal mask indicator */}
        {showMask && (
          <g transform="translate(220, 70)">
            <rect x={0} y={0} width={80} height={22} rx={4} fill="#7c3aed20" stroke="#7c3aed" strokeWidth={1} />
            <text x={40} y={15} textAnchor="middle" fill="#a78bfa" fontSize={9}>Causal Mask</text>
          </g>
        )}

        {/* Layers */}
        {LAYERS.map((layer, i) => {
          const y = 35 + i * 44;
          return (
            <g key={i}>
              {/* Connecting arrow */}
              {i > 0 && (
                <motion.line
                  x1={160} y1={y - 8} x2={160} y2={y}
                  stroke="#1e1e2e" strokeWidth={2}
                  markerEnd="url(#arrow)"
                  initial={animate ? { opacity: 0 } : undefined}
                  animate={animate ? { opacity: 1 } : undefined}
                  transition={animate ? { delay: i * 0.15 } : undefined}
                />
              )}
              <motion.rect
                x={60} y={y}
                width={200} height={36}
                rx={6}
                fill={`${layer.color}20`}
                stroke={layer.color}
                strokeWidth={1.5}
                initial={animate ? { opacity: 0, x: -10 } : undefined}
                animate={animate ? { opacity: 1, x: 0 } : undefined}
                transition={animate ? { delay: i * 0.15, duration: 0.3 } : undefined}
              />
              <text x={160} y={y + 22} textAnchor="middle" fill={layer.color} fontSize={11} fontWeight="600">
                {layer.label}
              </text>
            </g>
          );
        })}

        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#1e1e2e" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
