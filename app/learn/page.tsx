"use client";

import { useState, useCallback } from "react";
import { KnowledgeGraph } from "@/components/graph/KnowledgeGraph";
import { LessonPanel } from "@/components/lesson/LessonPanel";
import { useProgress } from "@/lib/progress";

const TOP_BAR_H = 48;

export default function LearnPage() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const { totalProgress, completeLesson } = useProgress();

  const handleNodeClick = useCallback((slug: string) => {
    setActiveSlug(slug);
    window.history.replaceState(null, "", `/learn/${slug}`);
  }, []);

  const handleClose = useCallback(() => {
    setActiveSlug(null);
    window.history.replaceState(null, "", `/learn`);
  }, []);

  const handleNavigate = useCallback((slug: string) => {
    setActiveSlug(slug);
    window.history.replaceState(null, "", `/learn/${slug}`);
  }, []);

  const pct = totalProgress.total > 0
    ? (totalProgress.completed / totalProgress.total) * 100
    : 0;

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", background: "var(--background)" }}>

      {/* Top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 20,
        height: `${TOP_BAR_H}px`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 20px",
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
      }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, color: "white", textDecoration: "none" }}>
          <span>🗺</span>
          <span>DeepMap</span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "0.875rem", color: "var(--muted)" }}>
            {totalProgress.completed} / {totalProgress.total} complete
          </span>
          <div style={{ width: "128px", height: "6px", borderRadius: "9999px", background: "var(--border)", overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: "9999px",
              width: `${pct}%`,
              background: "#6366f1",
              transition: "width 0.5s ease",
            }} />
          </div>
        </div>
      </div>

      {/* Graph */}
      <div style={{
        position: "absolute",
        top: `${TOP_BAR_H}px`,
        left: 0,
        bottom: 0,
        right: activeSlug ? "60%" : "0",
        height: `calc(100vh - ${TOP_BAR_H}px)`,
        transition: "right 0.3s ease",
      }}>
        <KnowledgeGraph onNodeClick={handleNodeClick} activeSlug={activeSlug} />
      </div>

      {/* Lesson panel */}
      <div style={{
        position: "absolute",
        top: `${TOP_BAR_H}px`,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: activeSlug ? "auto" : "none",
      }}>
        <LessonPanel
          slug={activeSlug}
          onClose={handleClose}
          onNavigate={handleNavigate}
          onComplete={completeLesson}
        />
      </div>
    </div>
  );
}
