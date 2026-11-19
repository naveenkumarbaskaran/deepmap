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
    ...components,
  };
}
