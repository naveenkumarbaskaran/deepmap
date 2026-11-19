"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { LessonContent } from "./LessonContent";
import { LessonProgress } from "./LessonProgress";
import { NODES } from "@/lib/graph-data";
import { useProgress } from "@/lib/progress";
import type { TrackId } from "@/lib/graph-data";

interface LessonPanelProps {
  slug: string | null;
  onClose: () => void;
  onNavigate: (slug: string) => void;
  onComplete?: (slug: string) => void;
}

export function LessonPanel({ slug, onClose, onNavigate, onComplete }: LessonPanelProps) {
  const [source, setSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const { completeLesson: localComplete, getNodeState } = useProgress();

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setSource(null);

    fetch(`/api/lesson/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        setTitle(data.frontmatter?.title ?? slug);
        setSource(data.source);
      })
      .catch(() => setSource(null))
      .finally(() => setLoading(false));
  }, [slug]);

  function handleComplete() {
    if (!slug) return;
    // Update both parent state and local state for immediate UI feedback
    if (onComplete) onComplete(slug);
    localComplete(slug);
    // Navigate to next lesson in track
    const node = NODES.find((n) => n.slug === slug);
    if (!node) return;
    const trackNodes = NODES.filter((n) => n.track === node.track);
    const idx = trackNodes.findIndex((n) => n.slug === slug);
    if (idx < trackNodes.length - 1) {
      onNavigate(trackNodes[idx + 1].slug);
    } else {
      // Track complete — find first node of next track
      const { TRACK_ORDER } = require("@/lib/graph-data");
      const trackIdx = TRACK_ORDER.indexOf(node.track as TrackId);
      if (trackIdx < TRACK_ORDER.length - 1) {
        const nextTrack = TRACK_ORDER[trackIdx + 1];
        const firstNext = NODES.find((n) => n.track === nextTrack);
        if (firstNext) onNavigate(firstNext.slug);
      }
    }
  }

  const isComplete = slug ? getNodeState(slug) === "complete" : false;

  return (
    <AnimatePresence>
      {slug && (
        <motion.div
          key={slug}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 220 }}
          style={{
            position: "absolute", right: 0, top: 0, height: "100%",
            width: "60%", zIndex: 10,
            display: "flex", flexDirection: "column",
            background: "var(--background)",
            borderLeft: "1px solid var(--border)",
            boxShadow: "-8px 0 32px rgba(0,0,0,0.4)",
          }}
        >
          {/* Top bar */}
          <div
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "12px 20px", flexShrink: 0,
              borderBottom: "1px solid var(--border)", background: "var(--surface)"
            }}
          >
            <h2 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "white", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: "16px", margin: 0 }}>{title || slug}</h2>
            <button
              onClick={onClose}
              style={{ fontSize: "1.25rem", lineHeight: 1, color: "var(--muted)", background: "none", border: "none", cursor: "pointer", flexShrink: 0, padding: 0 }}
            >
              ✕
            </button>
          </div>

          {/* Progress */}
          {slug && <LessonProgress slug={slug} />}

          {/* Content */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {loading && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "128px", color: "var(--muted)" }}>
                <span style={{ fontSize: "0.875rem" }}>Loading lesson…</span>
              </div>
            )}
            {!loading && !source && (
              <div style={{ padding: "32px 24px", color: "var(--muted)", fontSize: "0.875rem" }}>
                Lesson content coming soon. Check back after all 50 lessons are written!
              </div>
            )}
            {source && <LessonContent source={source} />}
          </div>

          {/* Footer */}
          <div
            style={{
              flexShrink: 0, padding: "16px 24px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              borderTop: "1px solid var(--border)", background: "var(--surface)"
            }}
          >
            <button
              onClick={onClose}
              style={{ fontSize: "0.875rem", color: "var(--muted)", background: "none", border: "none", cursor: "pointer" }}
            >
              ← Back to map
            </button>
            <button
              onClick={handleComplete}
              style={{
                padding: "8px 20px", borderRadius: "8px", fontSize: "0.875rem", fontWeight: 600,
                cursor: "pointer", transition: "all 0.2s",
                background: isComplete ? "#10b98130" : "#6366f1",
                color: isComplete ? "#6ee7b7" : "white",
                border: isComplete ? "1px solid #10b981" : "none",
              }}
            >
              {isComplete ? "✓ Complete" : "Mark Complete + Next →"}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
