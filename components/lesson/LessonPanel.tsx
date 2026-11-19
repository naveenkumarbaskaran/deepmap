"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { serialize } from "next-mdx-remote/serialize";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
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
}

export function LessonPanel({ slug, onClose, onNavigate }: LessonPanelProps) {
  const [source, setSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const { completeLesson, getNodeState } = useProgress();

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setSource(null);

    fetch(`/api/lesson/${slug}`)
      .then((r) => r.json())
      .then(async (data) => {
        setTitle(data.frontmatter?.title ?? slug);
        const mdxSource = await serialize(data.content, {
          mdxOptions: {
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex],
          },
        });
        setSource(mdxSource);
      })
      .catch(() => setSource(null))
      .finally(() => setLoading(false));
  }, [slug]);

  function handleComplete() {
    if (!slug) return;
    completeLesson(slug);
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
          className="absolute right-0 top-0 h-full flex flex-col z-10 shadow-2xl"
          style={{
            width: "60%",
            background: "var(--background)",
            borderLeft: "1px solid var(--border)",
          }}
        >
          {/* Top bar */}
          <div
            className="flex items-center justify-between px-5 py-3 flex-shrink-0"
            style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}
          >
            <h2 className="text-base font-semibold text-white truncate pr-4">{title || slug}</h2>
            <button
              onClick={onClose}
              className="text-xl leading-none transition-colors hover:text-white flex-shrink-0"
              style={{ color: "var(--muted)" }}
            >
              ✕
            </button>
          </div>

          {/* Progress */}
          {slug && <LessonProgress slug={slug} />}

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {loading && (
              <div className="flex items-center justify-center h-32" style={{ color: "var(--muted)" }}>
                <span className="text-sm">Loading lesson…</span>
              </div>
            )}
            {source && <LessonContent source={source} />}
          </div>

          {/* Footer */}
          <div
            className="flex-shrink-0 px-6 py-4 flex items-center justify-between"
            style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}
          >
            <button
              onClick={onClose}
              className="text-sm transition-colors"
              style={{ color: "var(--muted)" }}
            >
              ← Back to map
            </button>
            <button
              onClick={handleComplete}
              className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
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
