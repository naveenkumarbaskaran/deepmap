import React from "react";
import type { MDXComponents } from "mdx/types";
import { Quiz } from "@/components/interactive/Quiz";
import { CodeRunner } from "@/components/interactive/CodeRunner";
import {
  NeuronDiagram,
  BackpropDiagram,
  AttentionHeatmap,
  ConvolutionViz,
  TransformerBlock,
  DiffusionProcess,
} from "@/components/interactive/diagrams";

function CustomPre({ children }: { children?: React.ReactNode }) {
  const child = React.Children.only(children) as React.ReactElement<{ className?: string; children?: string }> | null;
  if (!child) return <pre>{children}</pre>;

  const className = child.props?.className ?? "";
  const isPython = className.includes("language-python");
  const isQuiz = className.includes("language-quiz");
  const code = typeof child.props?.children === "string" ? child.props.children.trim() : "";

  if (isPython && code) {
    return <CodeRunner code={code} />;
  }

  if (isQuiz && code) {
    try {
      // JS object literal syntax — eval in a safe context
      // eslint-disable-next-line no-new-func
      const questions = new Function(`return ${code}`)();
      return <Quiz questions={questions} />;
    } catch {
      return null;
    }
  }

  return (
    <pre style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", padding: "16px", overflowX: "auto", margin: "16px 0" }}>
      {children}
    </pre>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Quiz,
    CodeRunner,
    NeuronDiagram,
    BackpropDiagram,
    AttentionHeatmap,
    ConvolutionViz,
    TransformerBlock,
    DiffusionProcess,
    pre: CustomPre,
    ...components,
  };
}
