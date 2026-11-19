# DeepMap — Claude Instructions

## What this project is

DeepMap is an interactive AI/ML learning platform. 50 lessons across 6 tracks, delivered as a knowledge graph. Every lesson has prose, KaTeX math, runnable Python (Pyodide), and a quiz — all in a single MDX file.

## Running locally

```bash
npm install
npm run dev        # → http://localhost:3000
```

No environment variables. No database. No external API key needed.

## Key paths

| Path | Purpose |
|---|---|
| `content/<track>/<slug>.mdx` | 50 lesson files — the main content |
| `lib/graph-data.ts` | Node positions, edges, track colours, TRACK_ORDER |
| `lib/mdx-components.tsx` | Custom `pre` intercept: python fence → CodeRunner, quiz fence → Quiz |
| `lib/progress.ts` | `useProgress` hook — localStorage, track unlocking |
| `app/learn/page.tsx` | Knowledge graph + lesson panel (React Flow) |
| `app/api/lesson/[slug]/route.ts` | Server-side MDX compilation (remark-math + rehype-katex) |
| `components/interactive/CodeRunner.tsx` | Pyodide executor |
| `components/interactive/Quiz.tsx` | Multiple choice quiz |
| `components/graph/KnowledgeGraph.tsx` | React Flow canvas, 50 nodes |
| `components/graph/GraphNode.tsx` | Node card — locked / available / complete states |
| `app/globals.css` | CSS variables for dark/light theme |

## Track order

```
mathematics → neural-networks → deep-learning → transformers → llms-and-gen-ai → agents
```

Completing all lessons in a track unlocks the next one (enforced in `lib/progress.ts`).

## How a lesson file works

````md
---
title: "Linear Algebra"
track: "mathematics"
estimatedMinutes: 12
description: "Vectors, matrices, and the foundations of everything in ML"
---

Prose with inline math $\mathbf{a} \cdot \mathbf{b} = \sum_i a_i b_i$ and display math:

$$A = U \Sigma V^\top$$

```python runnable
import numpy as np
# code here — runs in-browser via Pyodide
print(np.linalg.eigvals(np.array([[1,2],[3,4]])))
```

```quiz
[{
  question: "What does SVD decompose a matrix into?",
  options: ["3 rotation matrices", "Rotate → Stretch → Rotate", "Scale → Translate", "Eigenvalues only"],
  correct: 1,
  explanation: "A = UΣVᵀ: rotate (U), stretch (Σ), rotate (Vᵀ)"
}]
```
````

- Use `$...$` for inline math and `$$...$$` for display math (remark-math + rehype-katex)
- ` ```python runnable ` → intercepted by CustomPre → `<CodeRunner>` — Pyodide loads numpy/pandas/scipy automatically
- ` ```quiz ` → intercepted by CustomPre → `<Quiz>` — evaluated with `new Function('return ' + code)()`

## Adding a lesson

1. Create `content/<track>/<slug>.mdx` with frontmatter
2. Add a node in `lib/graph-data.ts`:
   ```ts
   { id: "my-topic", slug: "my-topic", label: "My Topic", track: "mathematics",
     position: { x: 0, y: 420 }, estimatedMinutes: 10 }
   ```
3. Add prerequisite edges in the `EDGES` array
4. `npm run dev` → click the node

## Architecture decisions (do not change without reason)

**Server-side MDX** — `serialize()` runs in `app/api/lesson/[slug]/route.ts`, not the client. Client-side serialize drops JS expressions in JSX props.

**Pyodide CDN import** — Uses `new Function('url', 'return import(url)')` to bypass Turbopack's module bundler. Do not change to a direct `import()` — it will break.

**Shallow URL updates** — `window.history.replaceState` not `router.push`. There is no `app/learn/[slug]/page.tsx`. Direct navigation to `/learn/linear-algebra` returns 404.

**Inline styles everywhere** — Tailwind v4 CSS-only mode does not reliably apply utility classes in this setup. All layout uses inline styles. CSS variables (`var(--background)`, `var(--foreground)`, etc.) handle theming.

---

## Learning with Claude

You can use Claude Code to learn from this codebase interactively. Here are prompts that work well:

### Understand a concept from first principles

```
Explain backpropagation to me. Walk through the math step by step,
then show me which part of content/neural-networks/backpropagation.mdx
captures each step.
```

```
I just read the attention mechanisms lesson. I don't understand why
we divide by √d_k in the softmax. Explain it intuitively.
```

### Run and modify the Python examples

```
Open content/mathematics/linear-algebra.mdx and run the SVD code for me.
Then modify it to show a rank-2 approximation of a 4×4 matrix.
```

```
The calculus lesson has a gradient descent example. Can you extend it
to show momentum — add a beta parameter and plot how it changes convergence?
```

### Quiz yourself

```
Give me a harder quiz on the content in content/transformers/self-attention.mdx.
5 questions, increasing difficulty. Quiz me one at a time and explain each answer.
```

```
I want to test my understanding of backpropagation. Ask me to derive
the gradient of the cross-entropy loss w.r.t. the pre-activation — step by step.
```

### Go deeper than the lesson

```
The linear algebra lesson covers SVD but doesn't explain the connection to PCA.
Walk me through how SVD gives you principal components.
```

```
The transformers track covers BERT and GPT but not the differences in training
objectives. Explain masked language modelling vs causal LM and why it matters.
```

### Add a lesson

```
Add a new lesson on "Contrastive Learning" to the deep-learning track.
Cover: intuition, SimCLR loss, NT-Xent, positive/negative pairs,
a runnable Python example, and 3 quiz questions.
```

```
The agents track is missing a lesson on "Retrieval-Augmented Generation" basics.
Create content/agents/rag-basics.mdx and wire it into graph-data.ts.
```

### Debug interactively

```
The Quiz component is not showing the explanation text after I answer.
Check components/interactive/Quiz.tsx and find the bug.
```

```
My new lesson node isn't appearing on the graph. I added it to graph-data.ts
but it's not visible. Help me debug.
```

### Understand the architecture

```
How does a lesson get from the MDX file on disk to rendered React in the browser?
Trace the full pipeline: file read → serialize → API response → MDXRemote → DOM.
```

```
How does track unlocking work? Trace the logic from completing a lesson
to the locked/available state changing on the graph nodes.
```

---

## Branch protection

`main` is protected: 1 required review, stale reviews dismissed, force push blocked.

To contribute: create a branch, make changes, open a PR.

```bash
git checkout -b lesson/contrastive-learning
# ... edit files ...
git push origin lesson/contrastive-learning
gh pr create --title "feat: add Contrastive Learning lesson" --body "..."
```
