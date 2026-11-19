import { NextResponse } from "next/server";
import { getLessonBySlug } from "@/lib/mdx";
import { serialize } from "next-mdx-remote/serialize";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const lesson = await getLessonBySlug(slug);

    const source = await serialize(lesson.content, {
      mdxOptions: {
        remarkPlugins: [remarkMath],
        // @ts-expect-error — rehype plugin types
        rehypePlugins: [rehypeKatex],
      },
    });

    return NextResponse.json({ frontmatter: lesson.frontmatter, source });
  } catch (err) {
    console.error("Lesson API error:", err);
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }
}
