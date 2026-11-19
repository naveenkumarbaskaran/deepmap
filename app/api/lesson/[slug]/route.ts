import { NextResponse } from "next/server";
import { getLessonBySlug } from "@/lib/mdx";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const lesson = await getLessonBySlug(slug);
    return NextResponse.json(lesson);
  } catch {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }
}
