"use client";

import { useState, useEffect, useCallback } from "react";
import { NODES, TRACKS, TRACK_ORDER, type TrackId, type NodeState } from "./graph-data";

const STORAGE_KEY = "deepmap-progress";

function getTrackForSlug(slug: string): TrackId | null {
  const node = NODES.find((n) => n.slug === slug);
  return node?.track ?? null;
}

function getTrackNodes(track: TrackId): string[] {
  return NODES.filter((n) => n.track === track).map((n) => n.slug);
}

export function useProgress() {
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCompletedSlugs(new Set(JSON.parse(stored) as string[]));
      }
    } catch {
      // corrupted storage — start fresh
    }
  }, []);

  const completeLesson = useCallback((slug: string) => {
    setCompletedSlugs((prev) => {
      const next = new Set(prev);
      next.add(slug);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      }
      return next;
    });
  }, []);

  const isTrackUnlocked = useCallback(
    (track: TrackId): boolean => {
      const trackIndex = TRACK_ORDER.indexOf(track);
      if (trackIndex === 0) return true; // mathematics always unlocked
      const prevTrack = TRACK_ORDER[trackIndex - 1];
      const prevNodes = getTrackNodes(prevTrack);
      return prevNodes.every((slug) => completedSlugs.has(slug));
    },
    [completedSlugs]
  );

  const getNodeState = useCallback(
    (slug: string): NodeState => {
      if (completedSlugs.has(slug)) return "complete";
      const track = getTrackForSlug(slug);
      if (!track) return "locked";
      if (!isTrackUnlocked(track)) return "locked";
      return "available";
    },
    [completedSlugs, isTrackUnlocked]
  );

  const getTrackProgress = useCallback(
    (track: TrackId) => {
      const nodes = getTrackNodes(track);
      const completed = nodes.filter((s) => completedSlugs.has(s)).length;
      return { completed, total: nodes.length };
    },
    [completedSlugs]
  );

  const totalProgress = {
    completed: completedSlugs.size,
    total: NODES.length,
  };

  return { completedSlugs, completeLesson, getNodeState, getTrackProgress, isTrackUnlocked, totalProgress };
}
