import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export type MdxFrontmatter = {
  title: string;
  description?: string;
  date: string;
  tech?: string[];
  role?: string;
  link?: string;
};

export async function getMdxContent(locale: string, type: 'experience' | 'education' | 'projects', slug: string) {
  const root = process.cwd();
  const filePath = path.join(root, 'content', locale, type, `${slug}.mdx`);
  
  try {
    const rawContent = await fs.readFile(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(rawContent);
    return { frontmatter: frontmatter as MdxFrontmatter, content };
  } catch (error) {
    return null; // Return null if file not found
  }
}
