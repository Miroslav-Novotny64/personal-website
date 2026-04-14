import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type MdxFrontmatter = {
  title: string;
  description?: string;
  date: string;
  tech?: string[];
  role?: string;
  link?: string;
  thumbnail?: string;
  readingTime?: string;
  seo_title?: string;
  seo_description?: string;
};

export function parseSafeDate(dateStr: string): Date {
  const date = new Date(dateStr);
  if (!isNaN(date.getTime())) {
    return date;
  }

  // Fallback for strings like "Sep 2022 – May 2026"
  // Try to find the first 4-digit year
  const yearMatch = dateStr.match(/\d{4}/);
  if (yearMatch) {
    return new Date(yearMatch[0]);
  }

  return new Date(0); // Epoch fallback
}

export async function getMdxContent(
  locale: string,
  type: "experience" | "education" | "projects" | "blog",
  slug: string,
) {
  const root = process.cwd();
  const filePath = path.join(root, "content", locale, type, `${slug}.mdx`);

  try {
    const rawContent = await fs.readFile(filePath, "utf-8");
    const { data: frontmatter, content } = matter(rawContent);
    return { frontmatter: frontmatter as MdxFrontmatter, content };
  } catch (_error) {
    return null; // Return null if file not found
  }
}

export async function getAllMdxContent(
  locale: string,
  type: "experience" | "education" | "projects" | "blog",
) {
  const root = process.cwd();
  const contentPath = path.join(root, "content", locale, type);

  try {
    const files = await fs.readdir(contentPath);
    const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        const slug = file.replace(".mdx", "");
        const data = await getMdxContent(locale, type, slug);
        if (!data) return null;
        return {
          slug,
          ...data.frontmatter,
        };
      }),
    );

    return posts
      .filter(
        (post): post is MdxFrontmatter & { slug: string } => post !== null,
      )
      .sort((a, b) => {
        const dateA = parseSafeDate(a.date).getTime();
        const dateB = parseSafeDate(b.date).getTime();
        return dateB - dateA;
      });
  } catch (_error) {
    return [];
  }
}
