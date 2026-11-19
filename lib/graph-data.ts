export type TrackId =
  | "mathematics"
  | "neural-networks"
  | "deep-learning"
  | "transformers"
  | "llms-genai"
  | "agents";

export type NodeState = "locked" | "available" | "in-progress" | "complete";

export interface LessonNode {
  id: string;
  slug: string;
  label: string;
  track: TrackId;
  estimatedMinutes: number;
  position: { x: number; y: number };
}

export interface Track {
  id: TrackId;
  label: string;
  color: string;
  emoji: string;
  description: string;
  x: number;
}

export const TRACKS: Track[] = [
  {
    id: "mathematics",
    label: "Mathematics",
    color: "#6366f1",
    emoji: "📐",
    description: "Linear algebra, calculus, probability — the foundation of everything.",
    x: 80,
  },
  {
    id: "neural-networks",
    label: "Neural Networks",
    color: "#8b5cf6",
    emoji: "🧠",
    description: "Perceptrons to deep networks — how machines learn from data.",
    x: 320,
  },
  {
    id: "deep-learning",
    label: "Deep Learning",
    color: "#3b82f6",
    emoji: "🔬",
    description: "CNNs, RNNs, attention — architectures that power modern AI.",
    x: 560,
  },
  {
    id: "transformers",
    label: "Transformers",
    color: "#06b6d4",
    emoji: "⚡",
    description: "Self-attention, BERT, GPT — the architecture behind LLMs.",
    x: 800,
  },
  {
    id: "llms-genai",
    label: "LLMs & Gen AI",
    color: "#10b981",
    emoji: "🔮",
    description: "Prompting, fine-tuning, RAG, diffusion — building with large models.",
    x: 1040,
  },
  {
    id: "agents",
    label: "Agents",
    color: "#f59e0b",
    emoji: "🤖",
    description: "ReAct, multi-agent systems, MCP — autonomous AI in the wild.",
    x: 1280,
  },
];

const mathNodes: LessonNode[] = [
  { id: "linear-algebra", slug: "linear-algebra", label: "Linear Algebra", track: "mathematics", estimatedMinutes: 12, position: { x: 80, y: 60 } },
  { id: "calculus", slug: "calculus", label: "Calculus", track: "mathematics", estimatedMinutes: 10, position: { x: 80, y: 150 } },
  { id: "probability", slug: "probability", label: "Probability", track: "mathematics", estimatedMinutes: 10, position: { x: 80, y: 240 } },
  { id: "statistics", slug: "statistics", label: "Statistics", track: "mathematics", estimatedMinutes: 10, position: { x: 80, y: 330 } },
  { id: "information-theory", slug: "information-theory", label: "Information Theory", track: "mathematics", estimatedMinutes: 10, position: { x: 80, y: 420 } },
  { id: "matrix-calculus", slug: "matrix-calculus", label: "Matrix Calculus", track: "mathematics", estimatedMinutes: 12, position: { x: 80, y: 510 } },
  { id: "optimization-theory", slug: "optimization-theory", label: "Optimization Theory", track: "mathematics", estimatedMinutes: 10, position: { x: 80, y: 600 } },
  { id: "bayesian-inference", slug: "bayesian-inference", label: "Bayesian Inference", track: "mathematics", estimatedMinutes: 12, position: { x: 80, y: 690 } },
];

const nnNodes: LessonNode[] = [
  { id: "perceptron", slug: "perceptron", label: "Perceptron & MLP", track: "neural-networks", estimatedMinutes: 10, position: { x: 320, y: 60 } },
  { id: "activation-functions", slug: "activation-functions", label: "Activation Functions", track: "neural-networks", estimatedMinutes: 8, position: { x: 320, y: 150 } },
  { id: "backpropagation", slug: "backpropagation", label: "Backpropagation", track: "neural-networks", estimatedMinutes: 12, position: { x: 320, y: 240 } },
  { id: "optimizers", slug: "optimizers", label: "Optimizers", track: "neural-networks", estimatedMinutes: 10, position: { x: 320, y: 330 } },
  { id: "loss-functions", slug: "loss-functions", label: "Loss Functions", track: "neural-networks", estimatedMinutes: 8, position: { x: 320, y: 420 } },
  { id: "regularization", slug: "regularization", label: "Regularization", track: "neural-networks", estimatedMinutes: 10, position: { x: 320, y: 510 } },
  { id: "weight-initialization", slug: "weight-initialization", label: "Weight Initialization", track: "neural-networks", estimatedMinutes: 8, position: { x: 320, y: 600 } },
  { id: "universal-approximation", slug: "universal-approximation", label: "Universal Approximation", track: "neural-networks", estimatedMinutes: 10, position: { x: 320, y: 690 } },
];

const dlNodes: LessonNode[] = [
  { id: "cnns", slug: "cnns", label: "CNNs", track: "deep-learning", estimatedMinutes: 12, position: { x: 560, y: 60 } },
  { id: "rnns-lstms", slug: "rnns-lstms", label: "RNNs & LSTMs", track: "deep-learning", estimatedMinutes: 12, position: { x: 560, y: 150 } },
  { id: "seq2seq", slug: "seq2seq", label: "Seq2Seq", track: "deep-learning", estimatedMinutes: 10, position: { x: 560, y: 240 } },
  { id: "attention-mechanism", slug: "attention-mechanism", label: "Attention Mechanism", track: "deep-learning", estimatedMinutes: 12, position: { x: 560, y: 330 } },
  { id: "transfer-learning", slug: "transfer-learning", label: "Transfer Learning", track: "deep-learning", estimatedMinutes: 10, position: { x: 560, y: 420 } },
  { id: "batch-normalization", slug: "batch-normalization", label: "Batch Normalization", track: "deep-learning", estimatedMinutes: 8, position: { x: 560, y: 510 } },
  { id: "residual-networks", slug: "residual-networks", label: "Residual Networks", track: "deep-learning", estimatedMinutes: 10, position: { x: 560, y: 600 } },
  { id: "object-detection", slug: "object-detection", label: "Object Detection", track: "deep-learning", estimatedMinutes: 12, position: { x: 560, y: 690 } },
  { id: "image-segmentation", slug: "image-segmentation", label: "Image Segmentation", track: "deep-learning", estimatedMinutes: 10, position: { x: 560, y: 780 } },
  { id: "generative-models-intro", slug: "generative-models-intro", label: "Generative Models", track: "deep-learning", estimatedMinutes: 10, position: { x: 560, y: 870 } },
];

const transformerNodes: LessonNode[] = [
  { id: "self-attention", slug: "self-attention", label: "Self-Attention", track: "transformers", estimatedMinutes: 12, position: { x: 800, y: 60 } },
  { id: "multi-head-attention", slug: "multi-head-attention", label: "Multi-Head Attention", track: "transformers", estimatedMinutes: 12, position: { x: 800, y: 150 } },
  { id: "positional-encoding", slug: "positional-encoding", label: "Positional Encoding", track: "transformers", estimatedMinutes: 8, position: { x: 800, y: 240 } },
  { id: "transformer-architecture", slug: "transformer-architecture", label: "Transformer Architecture", track: "transformers", estimatedMinutes: 15, position: { x: 800, y: 330 } },
  { id: "bert", slug: "bert", label: "BERT", track: "transformers", estimatedMinutes: 10, position: { x: 800, y: 420 } },
  { id: "gpt-architecture", slug: "gpt-architecture", label: "GPT Architecture", track: "transformers", estimatedMinutes: 12, position: { x: 800, y: 510 } },
  { id: "vision-transformers", slug: "vision-transformers", label: "Vision Transformers", track: "transformers", estimatedMinutes: 10, position: { x: 800, y: 600 } },
  { id: "efficient-transformers", slug: "efficient-transformers", label: "Efficient Transformers", track: "transformers", estimatedMinutes: 10, position: { x: 800, y: 690 } },
];

const llmNodes: LessonNode[] = [
  { id: "prompting", slug: "prompting", label: "Prompting", track: "llms-genai", estimatedMinutes: 10, position: { x: 1040, y: 60 } },
  { id: "in-context-learning", slug: "in-context-learning", label: "In-Context Learning", track: "llms-genai", estimatedMinutes: 10, position: { x: 1040, y: 150 } },
  { id: "fine-tuning-sft", slug: "fine-tuning-sft", label: "Fine-Tuning (SFT)", track: "llms-genai", estimatedMinutes: 12, position: { x: 1040, y: 240 } },
  { id: "rlhf-dpo", slug: "rlhf-dpo", label: "RLHF & DPO", track: "llms-genai", estimatedMinutes: 12, position: { x: 1040, y: 330 } },
  { id: "rag", slug: "rag", label: "RAG", track: "llms-genai", estimatedMinutes: 12, position: { x: 1040, y: 420 } },
  { id: "diffusion-models", slug: "diffusion-models", label: "Diffusion Models", track: "llms-genai", estimatedMinutes: 12, position: { x: 1040, y: 510 } },
  { id: "vaes", slug: "vaes", label: "VAEs", track: "llms-genai", estimatedMinutes: 10, position: { x: 1040, y: 600 } },
  { id: "gans", slug: "gans", label: "GANs", track: "llms-genai", estimatedMinutes: 10, position: { x: 1040, y: 690 } },
  { id: "scaling-laws", slug: "scaling-laws", label: "Scaling Laws", track: "llms-genai", estimatedMinutes: 10, position: { x: 1040, y: 780 } },
  { id: "multimodal-models", slug: "multimodal-models", label: "Multimodal Models", track: "llms-genai", estimatedMinutes: 10, position: { x: 1040, y: 870 } },
];

const agentNodes: LessonNode[] = [
  { id: "react-tool-use", slug: "react-tool-use", label: "ReAct & Tool Use", track: "agents", estimatedMinutes: 12, position: { x: 1280, y: 60 } },
  { id: "multi-agent-systems", slug: "multi-agent-systems", label: "Multi-Agent Systems", track: "agents", estimatedMinutes: 12, position: { x: 1280, y: 150 } },
  { id: "memory-context", slug: "memory-context", label: "Memory & Context", track: "agents", estimatedMinutes: 10, position: { x: 1280, y: 240 } },
  { id: "mcp-a2a", slug: "mcp-a2a", label: "MCP & A2A", track: "agents", estimatedMinutes: 10, position: { x: 1280, y: 330 } },
  { id: "agent-evaluation", slug: "agent-evaluation", label: "Agent Evaluation", track: "agents", estimatedMinutes: 10, position: { x: 1280, y: 420 } },
  { id: "agentic-rag", slug: "agentic-rag", label: "Agentic RAG", track: "agents", estimatedMinutes: 12, position: { x: 1280, y: 510 } },
];

export const NODES: LessonNode[] = [
  ...mathNodes,
  ...nnNodes,
  ...dlNodes,
  ...transformerNodes,
  ...llmNodes,
  ...agentNodes,
];

// Track-level prerequisite order
export const TRACK_ORDER: TrackId[] = [
  "mathematics",
  "neural-networks",
  "deep-learning",
  "transformers",
  "llms-genai",
  "agents",
];

// Edges: track-to-track connectors (first node of next track ← last node of prev track)
export const EDGES = [
  // Math → NN
  { id: "math-nn", source: "bayesian-inference", target: "perceptron", type: "smoothstep" },
  // NN → DL
  { id: "nn-dl", source: "universal-approximation", target: "cnns", type: "smoothstep" },
  // DL → Transformers
  { id: "dl-tr", source: "attention-mechanism", target: "self-attention", type: "smoothstep" },
  // Transformers → LLMs
  { id: "tr-llm", source: "gpt-architecture", target: "prompting", type: "smoothstep" },
  // LLMs → Agents
  { id: "llm-ag", source: "rag", target: "react-tool-use", type: "smoothstep" },
];
