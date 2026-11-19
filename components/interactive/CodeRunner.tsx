"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface CodeRunnerProps {
  code: string;
  language?: string;
}

let pyodideInstance: unknown = null;

export function CodeRunner({ code, language = "python" }: CodeRunnerProps) {
  const [userCode, setUserCode] = useState(code);
  const [output, setOutput] = useState<string>("");
  const [running, setRunning] = useState(false);
  const [pyodideReady, setPyodideReady] = useState<boolean | "loading">(false);
  const loadStarted = useRef(false);

  async function loadPyodide() {
    if (pyodideInstance) return pyodideInstance;
    // @ts-expect-error — pyodide loaded from CDN
    const { loadPyodide: load } = await import("https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.mjs");
    pyodideInstance = await load();
    return pyodideInstance;
  }

  async function runCode() {
    if (running) return;
    setRunning(true);
    setOutput("");

    if (!pyodideReady) {
      if (!loadStarted.current) {
        loadStarted.current = true;
        setPyodideReady("loading");
      }
    }

    try {
      const pyodide = await loadPyodide() as {
        runPythonAsync: (code: string) => Promise<unknown>;
        globals: { get: (key: string) => unknown };
        setStdout: (opts: { batched: (s: string) => void }) => void;
        setStderr: (opts: { batched: (s: string) => void }) => void;
      };
      setPyodideReady(true);

      const lines: string[] = [];
      pyodide.setStdout({ batched: (s) => lines.push(s) });
      pyodide.setStderr({ batched: (s) => lines.push(`[err] ${s}`) });

      const result = await pyodide.runPythonAsync(userCode);
      if (result !== undefined && result !== null) {
        lines.push(String(result));
      }

      setOutput(lines.join("\n") || "(no output)");
    } catch (err) {
      setOutput(`Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setRunning(false);
    }
  }

  return (
    <div
      className="rounded-xl overflow-hidden my-4"
      style={{ border: "1px solid var(--border)" }}
    >
      {/* Header */}
      <div
        className="px-4 py-2.5 flex items-center justify-between"
        style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500/60" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <div className="w-2 h-2 rounded-full bg-green-500/60" />
          <span className="ml-2 text-xs font-medium" style={{ color: "var(--muted)" }}>
            {language} · editable
          </span>
        </div>
        <button
          onClick={runCode}
          disabled={running}
          className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all"
          style={{
            background: running ? "var(--border)" : "#6366f1",
            color: running ? "var(--muted)" : "white",
            cursor: running ? "not-allowed" : "pointer",
          }}
        >
          {running ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                ⟳
              </motion.span>
              {pyodideReady === "loading" ? "Loading runtime…" : "Running…"}
            </>
          ) : (
            <>▶ Run</>
          )}
        </button>
      </div>

      {/* Editor */}
      <textarea
        value={userCode}
        onChange={(e) => setUserCode(e.target.value)}
        spellCheck={false}
        className="w-full resize-none text-sm font-mono outline-none p-4"
        style={{
          background: "#0d0d1a",
          color: "#a5b4fc",
          minHeight: "120px",
          caretColor: "#6366f1",
        }}
        rows={Math.max(4, userCode.split("\n").length + 1)}
      />

      {/* Output */}
      {output && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div
            className="px-4 py-1.5 text-xs font-medium uppercase tracking-wide"
            style={{ background: "var(--surface)", color: "var(--muted)" }}
          >
            Output
          </div>
          <pre
            className="p-4 text-sm font-mono overflow-x-auto"
            style={{
              background: "#080810",
              color: output.startsWith("Error:") ? "#fca5a5" : "#6ee7b7",
              margin: 0,
            }}
          >
            {output}
          </pre>
        </motion.div>
      )}
    </div>
  );
}
