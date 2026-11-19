"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

interface ConvolutionVizProps {
  inputSize?: number;
  kernelSize?: number;
  animate?: boolean;
}

export function ConvolutionViz({ inputSize = 5, kernelSize = 3, animate = true }: ConvolutionVizProps) {
  const cellSize = 36;
  const outputSize = inputSize - kernelSize + 1;
  const [kernelPos, setKernelPos] = useState({ row: 0, col: 0 });
  const [activeOutput, setActiveOutput] = useState({ row: 0, col: 0 });

  useEffect(() => {
    if (!animate) return;
    let row = 0;
    let col = 0;
    const interval = setInterval(() => {
      setKernelPos({ row, col });
      setActiveOutput({ row, col });
      col++;
      if (col > outputSize - 1) { col = 0; row++; }
      if (row > outputSize - 1) { row = 0; col = 0; }
    }, 500);
    return () => clearInterval(interval);
  }, [animate, outputSize]);

  const inputValues = Array.from({ length: inputSize }, (_, r) =>
    Array.from({ length: inputSize }, (_, c) => ((r * inputSize + c) % 9) + 1)
  );

  const kernelValues = [[1, 0, -1], [2, 0, -2], [1, 0, -1]];

  const isKernelCell = (r: number, c: number) =>
    r >= kernelPos.row && r < kernelPos.row + kernelSize &&
    c >= kernelPos.col && c < kernelPos.col + kernelSize;

  const gap = 40;
  const inputWidth = inputSize * cellSize;
  const outputWidth = outputSize * cellSize;
  const totalWidth = inputWidth + gap + kernelSize * cellSize + gap + outputWidth + 40;

  return (
    <div className="my-4 rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)", background: "#080810" }}>
      <svg width="100%" viewBox={`0 0 ${totalWidth} ${inputSize * cellSize + 50}`} style={{ display: "block" }}>
        {/* Input grid */}
        <text x={inputWidth / 2} y={18} textAnchor="middle" fill="#64748b" fontSize={10}>Input ({inputSize}×{inputSize})</text>
        {inputValues.map((row, ri) =>
          row.map((val, ci) => (
            <g key={`inp-${ri}-${ci}`}>
              <rect
                x={ci * cellSize + 1}
                y={ri * cellSize + 24}
                width={cellSize - 2}
                height={cellSize - 2}
                rx={3}
                fill={isKernelCell(ri, ci) ? "#6366f130" : "var(--surface)"}
                stroke={isKernelCell(ri, ci) ? "#6366f1" : "var(--border)"}
                strokeWidth={isKernelCell(ri, ci) ? 1.5 : 1}
              />
              <text x={ci * cellSize + cellSize / 2} y={ri * cellSize + 24 + cellSize / 2 + 4} textAnchor="middle" fill="#94a3b8" fontSize={10}>{val}</text>
            </g>
          ))
        )}

        {/* Kernel */}
        <text x={inputWidth + gap + (kernelSize * cellSize) / 2} y={18} textAnchor="middle" fill="#64748b" fontSize={10}>Kernel</text>
        {kernelValues.map((row, ri) =>
          row.map((val, ci) => (
            <g key={`k-${ri}-${ci}`}>
              <rect
                x={inputWidth + gap + ci * cellSize + 1}
                y={ri * cellSize + 24}
                width={cellSize - 2}
                height={cellSize - 2}
                rx={3}
                fill="#8b5cf620"
                stroke="#8b5cf6"
                strokeWidth={1}
              />
              <text x={inputWidth + gap + ci * cellSize + cellSize / 2} y={ri * cellSize + 24 + cellSize / 2 + 4} textAnchor="middle" fill="#c4b5fd" fontSize={10}>{val}</text>
            </g>
          ))
        )}

        {/* Arrow */}
        <text x={inputWidth + gap + kernelSize * cellSize + gap / 2} y={inputSize * cellSize / 2 + 30} textAnchor="middle" fill="#6366f1" fontSize={18}>→</text>

        {/* Output grid */}
        <text x={inputWidth + gap + kernelSize * cellSize + gap + outputWidth / 2} y={18} textAnchor="middle" fill="#64748b" fontSize={10}>Output ({outputSize}×{outputSize})</text>
        {Array.from({ length: outputSize }, (_, ri) =>
          Array.from({ length: outputSize }, (_, ci) => (
            <g key={`out-${ri}-${ci}`}>
              <rect
                x={inputWidth + gap + kernelSize * cellSize + gap + ci * cellSize + 1}
                y={ri * cellSize + 24}
                width={cellSize - 2}
                height={cellSize - 2}
                rx={3}
                fill={activeOutput.row === ri && activeOutput.col === ci ? "#10b98130" : "var(--surface)"}
                stroke={activeOutput.row === ri && activeOutput.col === ci ? "#10b981" : "var(--border)"}
                strokeWidth={activeOutput.row === ri && activeOutput.col === ci ? 1.5 : 1}
              />
            </g>
          ))
        )}
      </svg>
    </div>
  );
}
