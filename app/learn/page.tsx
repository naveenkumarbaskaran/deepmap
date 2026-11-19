"use client";

import { useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { KnowledgeGraph } from "@/components/graph/KnowledgeGraph";
import { LessonPanel } from "@/components/lesson/LessonPanel";
import { useProgress } from "@/lib/progress";

export default function LearnPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const { totalProgress } = useProgress();

  const handleNodeClick = useCallback((slug: string) => {
    setActiveSlug(slug);
    router.push(`/learn/${slug}`, { scroll: false });
  }, [router]);

  const handleClose = useCallback(() => {
    setActiveSlug(null);
    router.push("/learn", { scroll: false });
  }, [router]);

  const handleNavigate = useCallback((slug: string) => {
    setActiveSlug(slug);
    router.push(`/learn/${slug}`, { scroll: false });
  }, [router]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Top bar */}
      <div
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-3"
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <a href="/" className="flex items-center gap-2 font-bold text-white hover:opacity-80 transition-opacity">
          <span className="text-lg">🗺</span>
          <span>DeepMap</span>
        </a>
        <div className="flex items-center gap-4">
          <span className="text-sm" style={{ color: "var(--muted)" }}>
            {totalProgress.completed} / {totalProgress.total} complete
          </span>
          <div
            className="w-32 h-1.5 rounded-full overflow-hidden"
            style={{ background: "var(--border)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(totalProgress.completed / totalProgress.total) * 100}%`,
                background: "#6366f1",
              }}
            />
          </div>
        </div>
      </div>

      {/* Graph — shrinks when panel is open */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          top: "48px",
          right: activeSlug ? "60%" : "0",
        }}
      >
        <KnowledgeGraph onNodeClick={handleNodeClick} activeSlug={activeSlug} />
      </div>

      {/* Lesson panel */}
      <div className="absolute inset-0" style={{ top: "48px", pointerEvents: activeSlug ? "auto" : "none" }}>
        <LessonPanel
          slug={activeSlug}
          onClose={handleClose}
          onNavigate={handleNavigate}
        />
      </div>
    </div>
  );
}
