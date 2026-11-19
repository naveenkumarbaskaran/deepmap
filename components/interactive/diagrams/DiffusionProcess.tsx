"use client";

import { motion } from "framer-motion";

interface DiffusionProcessProps {
  steps?: number;
  animate?: boolean;
}

export function DiffusionProcess({ steps = 5, animate = true }: DiffusionProcessProps) {
  const noiseColors = ["#1e1e2e", "#2d2d4e", "#3d3d6e", "#4d4d8e", "#6366f1"];

  return (
    <div className="my-4 rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
      <svg width="100%" viewBox={`0 0 ${steps * 80 + 40} 120`} style={{ display: "block" }}>
        <text x={(steps * 80 + 40) / 2} y={16} textAnchor="middle" fill="#64748b" fontSize={10}>
          Denoising Process (right to left)
        </text>

        {Array.from({ length: steps }, (_, i) => {
          const x = 20 + i * 80;
          const noiseLevel = steps - 1 - i; // rightmost = most noisy
          const color = noiseColors[Math.min(noiseLevel, noiseColors.length - 1)];
          const noiseOpacity = noiseLevel / (steps - 1);

          return (
            <g key={i}>
              {/* Arrow between steps */}
              {i > 0 && (
                <motion.text
                  x={x - 20}
                  y={68}
                  textAnchor="middle"
                  fill="#6366f1"
                  fontSize={16}
                  initial={animate ? { opacity: 0 } : undefined}
                  animate={animate ? { opacity: 1 } : undefined}
                  transition={animate ? { delay: (steps - i) * 0.2 } : undefined}
                >
                  ←
                </motion.text>
              )}

              {/* Circle */}
              <motion.circle
                cx={x + 20}
                cy={60}
                r={28}
                fill={i === 0 ? "#6366f130" : "#0d0d1a"}
                stroke={color}
                strokeWidth={2}
                initial={animate ? { opacity: 0 } : undefined}
                animate={animate ? { opacity: 1 } : undefined}
                transition={animate ? { delay: (steps - i) * 0.2, duration: 0.4 } : undefined}
              />

              {/* Noise texture dots */}
              {noiseLevel > 0 &&
                Array.from({ length: noiseLevel * 4 }, (_, di) => {
                  const angle = (di / (noiseLevel * 4)) * Math.PI * 2;
                  const r = 8 + (di % 3) * 5;
                  const nx = x + 20 + Math.cos(angle) * r;
                  const ny = 60 + Math.sin(angle) * r;
                  return (
                    <circle key={di} cx={nx} cy={ny} r={1.5} fill="#374151" opacity={noiseOpacity * 0.8} />
                  );
                })}

              {/* Label */}
              <text
                x={x + 20}
                y={100}
                textAnchor="middle"
                fill="#475569"
                fontSize={9}
              >
                {i === 0 ? "Clean" : i === steps - 1 ? "Noisy" : `t=${steps - 1 - i}`}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
