import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { NODES, type TrackId } from "./graph-data";

export interface LessonMeta {
  title: string;
  track: TrackId;
  slug: string;
  estimatedMinutes: number;
  prerequisites: string[];
}

function slugToTrack(slug: string): TrackId | null {
  const node = NODES.find((n) => n.slug === slug);
  return node?.track ?? null;
}

export async function getLessonBySlug(
  slug: string
): Promise<{ frontmatter: LessonMeta; content: string }> {
  const track = slugToTrack(slug);
  if (!track) {
    throw new Error(`Unknown slug: ${slug}`);
  }

  const filePath = path.join(process.cwd(), "content", track, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const frontmatter: LessonMeta = {
    title: data.title ?? slug,
    track: data.track ?? track,
    slug: data.slug ?? slug,
    estimatedMinutes: data.estimatedMinutes ?? 10,
    prerequisites: data.prerequisites ?? [],
  };

  return { frontmatter, content };
}

export function getAllSlugs(): string[] {
  return NODES.map((n) => n.slug);
}
