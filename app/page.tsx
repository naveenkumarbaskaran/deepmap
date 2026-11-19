import Link from "next/link";
import { TRACKS, NODES } from "@/lib/graph-data";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { HeroSection } from "@/components/graph/HeroSection";

export default function HomePage() {
  const totalHours = Math.round(NODES.reduce((s, n) => s + n.estimatedMinutes, 0) / 60);

  return (
    <div style={{ minHeight: "100vh", background: "var(--background)" }}>
      {/* Nav */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 24px",
          background: "rgba(10,10,15,0.85)",
          borderBottom: "1px solid var(--border)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "1.25rem" }}>🗺</span>
          <span style={{ fontWeight: 700, fontSize: "1.125rem", color: "var(--foreground)" }}>DeepMap</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <ThemeToggle />
          <Link
            href="/learn"
            style={{
              padding: "8px 16px", borderRadius: "8px", fontSize: "0.875rem",
              fontWeight: 600, color: "white", background: "#6366f1",
              textDecoration: "none", display: "inline-block",
            }}
          >
            Explore the Map →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden", paddingTop: "64px" }}>
        <HeroSection />
        <div
          style={{
            position: "relative",
            zIndex: 10,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 24px",
            background: "radial-gradient(ellipse at center, rgba(10,10,15,0.5) 0%, rgba(10,10,15,0.15) 70%)",
          }}
        >
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "6px 12px", borderRadius: "9999px", fontSize: "0.75rem",
              fontWeight: 500, marginBottom: "24px",
              background: "#6366f120", border: "1px solid #6366f140", color: "#a5b4fc"
            }}
          >
            <span>✦</span>
            <span>{NODES.length} lessons · {totalHours}+ hours · {TRACKS.length} tracks</span>
          </div>

          <h1 style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 900, lineHeight: 1.05, marginBottom: "24px", color: "var(--foreground)" }}>
            Learn AI the way
            <br />
            <span style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              it actually connects.
            </span>
          </h1>

          <p style={{ fontSize: "1.125rem", maxWidth: "600px", marginBottom: "40px", color: "var(--muted)", lineHeight: 1.6 }}>
            A knowledge graph of AI — not a linear course. 50 topics across 6 tracks. Run Python in your browser. No login needed.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
            <Link
              href="/learn"
              style={{
                padding: "14px 32px", borderRadius: "12px", fontSize: "1rem",
                fontWeight: 700, color: "white", textDecoration: "none",
                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                boxShadow: "0 0 30px #6366f150",
                display: "inline-block",
              }}
            >
              Explore the Map →
            </Link>
            <a
              href="https://github.com/naveenkumarbaskaran/deepmap"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "14px 32px", borderRadius: "12px", fontSize: "1rem",
                fontWeight: 600, color: "#e2e8f0", textDecoration: "none",
                background: "rgba(17,17,24,0.8)", border: "1px solid rgba(255,255,255,0.1)",
                display: "inline-block",
              }}
            >
              GitHub →
            </a>
          </div>
        </div>
      </section>

      {/* Track cards */}
      <section style={{ padding: "80px 24px", maxWidth: "1152px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.875rem", fontWeight: 700, textAlign: "center", marginBottom: "12px", color: "var(--foreground)" }}>
          6 Tracks. {NODES.length} Lessons.
        </h2>
        <p style={{ textAlign: "center", marginBottom: "48px", color: "var(--muted)" }}>
          Each track builds on the last. Each lesson has a visual explanation, runnable code, and a quiz.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {TRACKS.map((track) => {
            const trackNodes = NODES.filter((n) => n.track === track.id);
            const mins = trackNodes.reduce((s, n) => s + n.estimatedMinutes, 0);
            return (
              <Link
                key={track.id}
                href="/learn"
                style={{
                  borderRadius: "16px", padding: "24px", textDecoration: "none", display: "block",
                  background: "var(--surface)", border: `1px solid ${track.color}30`,
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", background: `${track.color}20`, flexShrink: 0 }}>
                    {track.emoji}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--foreground)" }}>{track.label}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{trackNodes.length} lessons · ~{Math.round(mins / 60)}h</div>
                  </div>
                </div>
                <p style={{ fontSize: "0.875rem", marginBottom: "16px", color: "var(--muted)", lineHeight: 1.5 }}>{track.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {trackNodes.slice(0, 3).map((n) => (
                    <span key={n.slug} style={{ fontSize: "0.75rem", padding: "2px 8px", borderRadius: "9999px", background: `${track.color}15`, color: track.color, border: `1px solid ${track.color}30` }}>
                      {n.label}
                    </span>
                  ))}
                  {trackNodes.length > 3 && <span style={{ fontSize: "0.75rem", padding: "2px 8px", borderRadius: "9999px", color: "var(--muted)" }}>+{trackNodes.length - 3} more</span>}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "80px 24px", background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "896px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.875rem", fontWeight: 700, textAlign: "center", marginBottom: "48px", color: "var(--foreground)" }}>How it works</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
            {[
              { emoji: "🗺", title: "Explore the graph", desc: "Browse 50 topics on an interactive map. See how concepts connect. Click any node to open the lesson." },
              { emoji: "💻", title: "Run the code", desc: "Every lesson has editable Python that runs in your browser — no setup, no installs, powered by Pyodide." },
              { emoji: "🧪", title: "Test yourself", desc: "Short quizzes after each concept. Instant feedback. Progress saved locally — no login needed." },
            ].map((item) => (
              <div key={item.title} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>{item.emoji}</div>
                <h3 style={{ fontWeight: 700, marginBottom: "8px", color: "var(--foreground)" }}>{item.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "32px 24px", textAlign: "center", fontSize: "0.875rem", borderTop: "1px solid var(--border)", color: "var(--muted)" }}>
        Built by{" "}
        <a href="https://github.com/naveenkumarbaskaran" target="_blank" rel="noopener noreferrer" style={{ color: "#6366f1", textDecoration: "none" }}>
          Naveen Kumar Baskaran
        </a>
        {" "}· Open source
      </footer>
    </div>
  );
}
