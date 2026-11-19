"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  onComplete?: () => void;
}

export function Quiz({ questions, onComplete }: QuizProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[currentQ];
  const isCorrect = selected === q.correct;

  function handleSelect(i: number) {
    if (revealed) return;
    setSelected(i);
  }

  function handleCheck() {
    if (selected === null) return;
    setRevealed(true);
    if (selected === q.correct) setScore((s) => s + 1);
  }

  function handleNext() {
    if (currentQ + 1 >= questions.length) {
      setFinished(true);
      onComplete?.();
      return;
    }
    setCurrentQ((q) => q + 1);
    setSelected(null);
    setRevealed(false);
  }

  if (finished) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl p-6 text-center"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <div className="text-4xl mb-3">{score === questions.length ? "🎉" : "📚"}</div>
        <div className="text-xl font-bold text-white mb-1">
          {score} / {questions.length} correct
        </div>
        <div className="text-sm" style={{ color: "var(--muted)" }}>
          {score === questions.length
            ? "Perfect score! Ready for the next topic."
            : "Review the explanations above and try again anytime."}
        </div>
      </motion.div>
    );
  }

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid var(--border)" }}
    >
      {/* Header */}
      <div
        className="px-5 py-3 flex items-center justify-between"
        style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}
      >
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#6366f1" }}>
          Quick Check
        </span>
        <span className="text-xs" style={{ color: "var(--muted)" }}>
          {currentQ + 1} / {questions.length}
        </span>
      </div>

      <div className="p-5" style={{ background: "#0d0d1a" }}>
        {/* Question */}
        <p className="text-sm font-medium text-white mb-4">{q.question}</p>

        {/* Options */}
        <div className="flex flex-col gap-2 mb-4">
          {q.options.map((opt, i) => {
            let borderColor = "var(--border)";
            let bg = "var(--surface)";
            let textColor = "#94a3b8";

            if (revealed) {
              if (i === q.correct) {
                borderColor = "#10b981";
                bg = "#10b98115";
                textColor = "#6ee7b7";
              } else if (i === selected && i !== q.correct) {
                borderColor = "#ef4444";
                bg = "#ef444415";
                textColor = "#fca5a5";
              }
            } else if (selected === i) {
              borderColor = "#6366f1";
              bg = "#6366f115";
              textColor = "#a5b4fc";
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className="text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-150"
                style={{ background: bg, border: `1px solid ${borderColor}`, color: textColor }}
              >
                <span className="font-medium mr-2" style={{ color: "#475569" }}>
                  {String.fromCharCode(65 + i)}.
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="rounded-lg px-4 py-3 mb-4 text-sm"
              style={{
                background: isCorrect ? "#10b98110" : "#ef444410",
                border: `1px solid ${isCorrect ? "#10b98130" : "#ef444430"}`,
                color: isCorrect ? "#6ee7b7" : "#fca5a5",
              }}
            >
              <span className="font-semibold">{isCorrect ? "Correct! " : "Not quite. "}</span>
              {q.explanation}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          {!revealed ? (
            <button
              onClick={handleCheck}
              disabled={selected === null}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: selected !== null ? "#6366f1" : "var(--surface)",
                color: selected !== null ? "white" : "#475569",
                border: "1px solid",
                borderColor: selected !== null ? "#6366f1" : "var(--border)",
                cursor: selected !== null ? "pointer" : "not-allowed",
              }}
            >
              Check
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white"
              style={{ background: "#6366f1" }}
            >
              {currentQ + 1 >= questions.length ? "See results" : "Next →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
