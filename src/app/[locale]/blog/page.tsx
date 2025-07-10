import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';
import Link from 'next/link';

export default function BlogPage() {
  const postsDirectory = path.join(process.cwd(), 'content', 'blog');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug: filename.replace(/\.md$/, ''),
      title: data.title,
      date: data.date,
      author: data.author,
      description: data.description,
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date, newest first

  return (
    <div className="min-h-screen bg-black text-white py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-12">AI & Tech Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="block bg-white/5 p-6 rounded-lg hover:bg-white/10 transition-colors">
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="text-white/60 text-sm mb-4">{new Date(post.date).toLocaleDateString()} by {post.author}</p>
              <p className="text-white/80">{post.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
