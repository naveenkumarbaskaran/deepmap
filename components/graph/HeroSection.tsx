"use client";

import dynamic from "next/dynamic";

const HeroGraph = dynamic(
  () => import("@/components/graph/HeroGraph").then((m) => ({ default: m.HeroGraph })),
  { ssr: false, loading: () => <div style={{ width: "100%", height: "100%" }} /> }
);

export function HeroSection() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, width: "100%", height: "100%" }}>
      <HeroGraph />
    </div>
  );
}
