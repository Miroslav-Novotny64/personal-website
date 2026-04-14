import fs from "node:fs/promises";
import path from "node:path";

async function createPost() {
  const title = process.argv[2];
  if (!title) {
    console.error('Please provide a title: bun scripts/new-post.ts "My Title"');
    process.exit(1);
  }

  const slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-p]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const date = new Date().toISOString().split("T")[0];
  const root = process.cwd();

  const locales = ["cs", "en"];

  for (const locale of locales) {
    const dir = path.join(root, "content", locale, "blog");
    await fs.mkdir(dir, { recursive: true });

    const filePath = path.join(dir, `${slug}.mdx`);

    // Check if file already exists
    try {
      await fs.access(filePath);
      console.warn(`⚠️  Post already exists for ${locale}: ${filePath}`);
      continue;
    } catch {}

    const content = `---
title: "${title}"
date: "${date}"
description: "Brief description of ${title}."
readingTime: "5 min ${locale === "cs" ? "čtení" : "read"}"
---

Write your content here in Markdown...
`;

    await fs.writeFile(filePath, content, "utf-8");
    console.log(`Created ${locale} post: ${filePath}`);
  }

  console.log("\nSuccess! You can now start writing your articles.");
}

createPost().catch(console.error);
