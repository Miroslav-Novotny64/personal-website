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
  thumbnail?: string;
  readingTime?: string;
};

export async function getMdxContent(locale: string, type: 'experience' | 'education' | 'projects' | 'blog', slug: string) {
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

export async function getAllMdxContent(locale: string, type: 'experience' | 'education' | 'projects' | 'blog') {
  const root = process.cwd();
  const contentPath = path.join(root, 'content', locale, type);
  
  try {
    const files = await fs.readdir(contentPath);
    const mdxFiles = files.filter(file => file.endsWith('.mdx'));
    
    const posts = await Promise.all(mdxFiles.map(async (file) => {
      const slug = file.replace('.mdx', '');
      const data = await getMdxContent(locale, type, slug);
      if (!data) return null;
      return {
        slug,
        ...data.frontmatter
      };
    }));
    
    return posts
      .filter((post): post is (MdxFrontmatter & { slug: string }) => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    return [];
  }
}
