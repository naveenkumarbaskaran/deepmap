"use client";

import { NODES, TRACKS } from "@/lib/graph-data";
import { useProgress } from "@/lib/progress";
import { TrackBadge } from "@/components/ui/TrackBadge";
import { ProgressRing } from "@/components/ui/ProgressRing";
import type { TrackId } from "@/lib/graph-data";

interface LessonProgressProps {
  slug: string;
}

export function LessonProgress({ slug }: LessonProgressProps) {
  const node = NODES.find((n) => n.slug === slug);
  const { getTrackProgress } = useProgress();

  if (!node) return null;

  const track = TRACKS.find((t) => t.id === node.track);
  const progress = getTrackProgress(node.track as TrackId);
  const lessonIndex = NODES.filter((n) => n.track === node.track).findIndex((n) => n.slug === slug);

  return (
    <div
      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderBottom: "1px solid var(--border)" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <TrackBadge track={node.track as TrackId} size="sm" />
        <span style={{ fontSize: "0.875rem", color: "var(--muted)" }}>
          Lesson {lessonIndex + 1} of {progress.total}
        </span>
        <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
          · {node.estimatedMinutes}m
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
          {progress.completed}/{progress.total}
        </span>
        <ProgressRing
          value={progress.completed}
          max={progress.total}
          size={32}
          color={track?.color}
        />
      </div>
    </div>
  );
}
