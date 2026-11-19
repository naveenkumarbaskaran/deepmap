"use client";

import { type TrackId, TRACKS } from "@/lib/graph-data";

interface TrackBadgeProps {
  track: TrackId;
  size?: "sm" | "md";
}

export function TrackBadge({ track, size = "md" }: TrackBadgeProps) {
  const trackData = TRACKS.find((t) => t.id === track);
  if (!trackData) return null;

  const sizeClasses = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${sizeClasses}`}
      style={{
        background: `${trackData.color}20`,
        color: trackData.color,
        border: `1px solid ${trackData.color}40`,
      }}
    >
      <span>{trackData.emoji}</span>
      <span>{trackData.label}</span>
    </span>
  );
}
