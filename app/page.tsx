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
          }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
            style={{ background: "#6366f120", border: "1px solid #6366f140", color: "#a5b4fc" }}
          >
            <span>✦</span>
            <span>{NODES.length} lessons · {totalHours}+ hours · {TRACKS.length} tracks</span>
          </div>

          <h1
            className="text-5xl sm:text-7xl font-black tracking-tight mb-6"
            style={{ color: "var(--foreground)", lineHeight: 1.05 }}
          >
            Learn AI the way
            <br />
            <span style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              it actually connects.
            </span>
          </h1>

          <p className="text-lg sm:text-xl max-w-2xl mb-10" style={{ color: "var(--muted)", lineHeight: 1.6 }}>
            A knowledge graph of AI — not a linear course. 50 topics across 6 tracks. Run Python in your browser. No login needed.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/learn"
              className="px-8 py-3.5 rounded-xl text-base font-bold text-white transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)", boxShadow: "0 0 30px #6366f130" }}
            >
              Explore the Map →
            </Link>
            <a
              href="https://github.com/naveenkumarbaskaran/deepmap"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl text-base font-semibold transition-all hover:opacity-80"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--foreground)" }}
            >
              GitHub →
            </a>
          </div>
        </div>
      </section>

      {/* Track cards */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3" style={{ color: "var(--foreground)" }}>
          6 Tracks. {NODES.length} Lessons.
        </h2>
        <p className="text-center mb-12" style={{ color: "var(--muted)" }}>
          Each track builds on the last. Each lesson has a visual explanation, runnable code, and a quiz.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TRACKS.map((track) => {
            const trackNodes = NODES.filter((n) => n.track === track.id);
            const mins = trackNodes.reduce((s, n) => s + n.estimatedMinutes, 0);
            return (
              <Link
                key={track.id}
                href="/learn"
                className="group rounded-2xl p-6 transition-all hover:scale-[1.02]"
                style={{ background: "var(--surface)", border: `1px solid ${track.color}30` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${track.color}20` }}>
                    {track.emoji}
                  </div>
                  <div>
                    <div className="font-bold text-sm" style={{ color: "var(--foreground)" }}>{track.label}</div>
                    <div className="text-xs" style={{ color: "var(--muted)" }}>{trackNodes.length} lessons · ~{Math.round(mins / 60)}h</div>
                  </div>
                </div>
                <p className="text-sm mb-4" style={{ color: "var(--muted)", lineHeight: 1.5 }}>{track.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {trackNodes.slice(0, 3).map((n) => (
                    <span key={n.slug} className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${track.color}15`, color: track.color, border: `1px solid ${track.color}30` }}>
                      {n.label}
                    </span>
                  ))}
                  {trackNodes.length > 3 && <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: "var(--muted)" }}>+{trackNodes.length - 3} more</span>}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-20" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: "var(--foreground)" }}>How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { emoji: "🗺", title: "Explore the graph", desc: "Browse 50 topics on an interactive map. See how concepts connect. Click any node to open the lesson." },
              { emoji: "💻", title: "Run the code", desc: "Every lesson has editable Python that runs in your browser — no setup, no installs, powered by Pyodide." },
              { emoji: "🧪", title: "Test yourself", desc: "Short quizzes after each concept. Instant feedback. Progress saved locally — no login needed." },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="font-bold mb-2" style={{ color: "var(--foreground)" }}>{item.title}</h3>
                <p className="text-sm" style={{ color: "var(--muted)", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 text-center text-sm" style={{ borderTop: "1px solid var(--border)", color: "var(--muted)" }}>
        Built by{" "}
        <a href="https://github.com/naveenkumarbaskaran" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" style={{ color: "#6366f1" }}>
          Naveen Kumar Baskaran
        </a>
        {" "}· Open source
      </footer>
    </div>
  );
}
