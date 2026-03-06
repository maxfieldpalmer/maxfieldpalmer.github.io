// scripts/build-posts.js
// Reads _posts/*.md, parses front matter, converts markdown -> HTML,
// writes posts.json at repo root.
// Usage: node scripts/build-posts.js

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const POSTS_DIR = path.join(process.cwd(), '_posts');
const OUT_FILE = path.join(process.cwd(), 'posts.json'); // change to 'docs/posts.json' if your GitHub Pages serves from docs/

function readPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md') || f.endsWith('.markdown'));
  const posts = files.map(fname => {
    const fpath = path.join(POSTS_DIR, fname);
    const raw = fs.readFileSync(fpath, 'utf8');
    const parsed = matter(raw);
    const meta = parsed.data || {};
    const contentMd = parsed.content || '';
    const contentHtml = marked.parse(contentMd);
    // prefer meta.date else use file mtime
    let date = meta.date || fs.statSync(fpath).mtime.toISOString();
    // tags normalization
    const tags = Array.isArray(meta.tags) ? meta.tags : (meta.tags ? String(meta.tags).split(',').map(s=>s.trim()).filter(Boolean) : []);
    return {
      id: meta.slug || fname.replace(/\.md$/,''),
      title: meta.title || 'Untitled',
      date,
      tags,
      content: contentHtml
    };
  });

  // sort newest-first by date
  posts.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

function writeOut(posts) {
  fs.writeFileSync(OUT_FILE, JSON.stringify(posts, null, 2), 'utf8');
  console.log('Wrote', OUT_FILE);
}

function main() {
  const posts = readPosts();
  writeOut(posts);
}

main();