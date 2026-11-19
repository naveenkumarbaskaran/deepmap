"use client";

import { MDXRemote } from "next-mdx-remote";
import { useMDXComponents } from "@/lib/mdx-components";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

interface LessonContentProps {
  source: MDXRemoteSerializeResult;
}

export function LessonContent({ source }: LessonContentProps) {
  const components = useMDXComponents({});

  return (
    <article className="lesson-prose px-6 py-6 max-w-none">
      <MDXRemote {...source} components={components} />
    </article>
  );
}
