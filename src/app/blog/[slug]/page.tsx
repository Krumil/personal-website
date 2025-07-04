import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;
  const postsDirectory = path.join(process.cwd(), 'content', 'blog');
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return (
    <div className="min-h-screen bg-black text-white py-20 px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">{data.title}</h1>
        <p className="text-white/60 text-sm mb-8">{new Date(data.date).toLocaleDateString()} by {data.author}</p>
        <div className="prose prose-invert" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
    </div>
  );
}
