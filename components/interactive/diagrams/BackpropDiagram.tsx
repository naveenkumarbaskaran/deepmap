"use client";

import { motion } from "framer-motion";

interface BackpropDiagramProps {
  showGradients?: boolean;
  animate?: boolean;
}

export function BackpropDiagram({ showGradients = true, animate = true }: BackpropDiagramProps) {
  const nodes = [
    { id: "input", label: "Input", x: 60, y: 100 },
    { id: "hidden1", label: "Hidden 1", x: 180, y: 60 },
    { id: "hidden2", label: "Hidden 2", x: 180, y: 140 },
    { id: "output", label: "Output", x: 300, y: 100 },
    { id: "loss", label: "Loss", x: 420, y: 100 },
  ];

  const forwardEdges = [
    { from: "input", to: "hidden1" },
    { from: "input", to: "hidden2" },
    { from: "hidden1", to: "output" },
    { from: "hidden2", to: "output" },
    { from: "output", to: "loss" },
  ];

  const backwardEdges = [
    { from: "loss", to: "output", label: "∂L/∂ŷ" },
    { from: "output", to: "hidden1", label: "∂L/∂w" },
    { from: "output", to: "hidden2", label: "∂L/∂w" },
  ];

  const getPos = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <div className="my-4 rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
      <svg width="100%" viewBox="0 0 480 200" style={{ display: "block" }}>
        {/* Forward pass edges */}
        {forwardEdges.map((e, i) => {
          const from = getPos(e.from);
          const to = getPos(e.to);
          return (
            <motion.line
              key={`fwd-${i}`}
              x1={from.x + 28}
              y1={from.y}
              x2={to.x - 28}
              y2={to.y}
              stroke="#6366f1"
              strokeWidth={1.5}
              initial={animate ? { pathLength: 0, opacity: 0 } : undefined}
              animate={animate ? { pathLength: 1, opacity: 0.6 } : undefined}
              transition={animate ? { delay: i * 0.15, duration: 0.5 } : undefined}
            />
          );
        })}

        {/* Backward pass edges */}
        {backwardEdges.map((e, i) => {
          const from = getPos(e.from);
          const to = getPos(e.to);
          return (
            <g key={`bwd-${i}`}>
              <motion.line
                x1={from.x - 28}
                y1={from.y + 12}
                x2={to.x + 28}
                y2={to.y + 12}
                stroke="#ef4444"
                strokeWidth={1.5}
                strokeDasharray="4 3"
                initial={animate ? { opacity: 0 } : undefined}
                animate={animate ? { opacity: 0.7 } : undefined}
                transition={animate ? { delay: 1 + i * 0.2 } : undefined}
              />
              {showGradients && (
                <motion.text
                  x={(from.x - 28 + to.x + 28) / 2}
                  y={from.y + 24}
                  textAnchor="middle"
                  fill="#fca5a5"
                  fontSize={9}
                  initial={animate ? { opacity: 0 } : undefined}
                  animate={animate ? { opacity: 1 } : undefined}
                  transition={animate ? { delay: 1.3 + i * 0.2 } : undefined}
                >
                  {e.label}
                </motion.text>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((n, i) => (
          <g key={n.id}>
            <motion.rect
              x={n.x - 28}
              y={n.y - 16}
              width={56}
              height={32}
              rx={6}
              fill={n.id === "loss" ? "#7f1d1d30" : "#6366f120"}
              stroke={n.id === "loss" ? "#ef4444" : "#6366f1"}
              strokeWidth={1.5}
              initial={animate ? { opacity: 0, scale: 0.8 } : undefined}
              animate={animate ? { opacity: 1, scale: 1 } : undefined}
              transition={animate ? { delay: i * 0.08 } : undefined}
            />
            <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#c7d2fe" fontSize={9} fontWeight="600">
              {n.label}
            </text>
          </g>
        ))}

        {/* Legend */}
        <g transform="translate(20, 170)">
          <line x1={0} y1={6} x2={20} y2={6} stroke="#6366f1" strokeWidth={1.5} opacity={0.6} />
          <text x={24} y={10} fill="#64748b" fontSize={9}>Forward pass</text>
          <line x1={80} y1={6} x2={100} y2={6} stroke="#ef4444" strokeWidth={1.5} strokeDasharray="4 3" opacity={0.7} />
          <text x={104} y={10} fill="#64748b" fontSize={9}>Backward pass (gradients)</text>
        </g>
      </svg>
    </div>
  );
}
