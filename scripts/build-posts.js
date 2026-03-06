// scripts/build-posts.js
// Node 16+
// Reads ./_posts/*.md, parses front matter, converts markdown to HTML, writes posts.json

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const MarkdownIt = require('markdown-it');

const POSTS_DIR = path.join(__dirname, '..', '_posts');
const OUT_FILE = path.join(__dirname, '..', 'posts.json');

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

function readPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md') || f.endsWith('.markdown'));
  const posts = files.map(fname => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, fname), 'utf8');
    const { data, content } = matter(raw);

    // required fields guard
    if (!data.title || !data.date) {
      throw new Error(`Post ${fname} missing required front-matter: title and date are required.`);
    }

    const html = md.render(content);
    const id = fname.replace(/\.md|\.markdown$/, '');

    // build object - keep flexible but include common fields BlogApp may expect
    return {
      id,
      title: data.title,
      date: data.date,          // keep as string (ISO yyyy-mm-dd recommended)
      tags: data.tags || [],
      excerpt: data.excerpt || getExcerpt(content),
      content: html
    };
  });

  // sort newest first by date
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  return posts;
}

function getExcerpt(markdownContent) {
  const text = markdownContent.replace(/\n/g, ' ').replace(/[#*_>`~\-]{1,}/g, '').trim();
  return text.slice(0, 200) + (text.length > 200 ? '…' : '');
}

function writeOut(posts) {
  fs.writeFileSync(OUT_FILE, JSON.stringify(posts, null, 2), 'utf8');
  console.log(`Wrote ${posts.length} posts to ${OUT_FILE}`);
}

try {
  const posts = readPosts();
  writeOut(posts);
} catch (err) {
  console.error(err);
  process.exit(1);
}