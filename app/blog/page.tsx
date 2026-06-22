import type { Metadata } from 'next';
import BlogClient from './BlogClient';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: "Huzzler Blog – Renting Tips, Market Trends & City Living",
  description: "Read the Huzzler blog for expert renting tips, neighbourhood guides, rental market trends, and advice for tenants and property owners.",
  alternates: { canonical: "https://huzzler.in/blog" },
};

export default function Blog() {
  const src = "C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\7df7594c-a8c6-4aac-b25c-355ad874ebbc\\chennai_marina_beach_1781247480124.png";
  const dest = "d:\\huzzler web App\\public\\images\\chennai_marina.png";

  try {
    if (fs.existsSync(src)) {
      const destDir = path.dirname(dest);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      fs.copyFileSync(src, dest);
      console.log("Successfully copied Chennai Marina Beach image server-side.");
    }
  } catch (err) {
    console.error("Failed to copy image server-side:", err);
  }

  return <BlogClient />;
}
