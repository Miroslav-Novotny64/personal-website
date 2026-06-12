import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

import fsSync from "node:fs";

export function getFallbackDate(filePath: string): Date {
  try {
    const stat = fsSync.statSync(filePath);
    return stat.birthtime || stat.mtime || new Date();
  } catch (_error) {
    return new Date();
  }
}

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
  links?: { type: "live" | "repo" | "paper"; url: string; label?: string }[];
};

const czechMonths: Record<string, string> = {
  leden: "January",
  unor: "February",
  "únor": "February",
  brezen: "March",
  "březen": "March",
  duben: "April",
  kveten: "May",
  "květen": "May",
  cerven: "June",
  "červen": "June",
  cervenec: "July",
  "červenec": "July",
  srpen: "August",
  zari: "September",
  "září": "September",
  rijen: "October",
  "říjen": "October",
  listopad: "November",
  prosinec: "December",
};

export function parseSafeDate(dateStr: string, fallbackDate?: Date): Date {
  let cleanStr = dateStr.toLowerCase().split(/[-–]/)[0].trim();

  for (const [cz, en] of Object.entries(czechMonths)) {
    if (cleanStr.includes(cz)) {
      cleanStr = cleanStr.replace(cz, en);
      break;
    }
  }

  const date = new Date(cleanStr);
  if (!Number.isNaN(date.getTime())) {
    return date;
  }

  const yearMatch = dateStr.match(/\d{4}/);
  if (yearMatch) {
    return new Date(yearMatch[0]);
  }

  return fallbackDate || new Date();
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
    const fallbackDate = getFallbackDate(filePath);
    const parsedDate = parseSafeDate(frontmatter.date, fallbackDate);
    return {
      frontmatter: frontmatter as MdxFrontmatter,
      content,
      parsedDate,
    };
  } catch (_error) {
    return null;
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
          parsedDate: data.parsedDate,
          ...data.frontmatter,
        };
      }),
    );

    return posts
      .filter(
        (post): post is MdxFrontmatter & { slug: string; parsedDate: Date } => post !== null,
      )
      .sort((a, b) => {
        const dateA = a.parsedDate.getTime();
        const dateB = b.parsedDate.getTime();
        return dateB - dateA;
      });
  } catch (_error) {
    return [];
  }
}
