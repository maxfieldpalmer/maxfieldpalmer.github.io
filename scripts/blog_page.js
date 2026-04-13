
    // ── Tag filters ────────────────────────────────────────────
    const allTags = ['all', ...new Set(POSTS.flatMap(p => p.tags))];
    let activeTag = 'all';
    let searchQuery = '';

    const filterContainer = document.getElementById('tag-filters');
    allTags.forEach(tag => {
      const btn = document.createElement('button');
      btn.className = 'tag-btn' + (tag === 'all' ? ' active' : '');
      btn.textContent = tag === 'all' ? 'All posts' : tag;
      btn.dataset.tag = tag;
      btn.addEventListener('click', () => {
        activeTag = tag;
        document.querySelectorAll('.tag-btn').forEach(b => b.classList.toggle('active', b.dataset.tag === tag));
        render();
      });
      filterContainer.appendChild(btn);
    });

    // ── Search ─────────────────────────────────────────────────
    document.getElementById('search').addEventListener('input', e => {
      searchQuery = e.target.value.toLowerCase().trim();
      render();
    });

    // ── Render post grid ───────────────────────────────────────
    function render() {
      const grid = document.getElementById('post-grid');
      const countEl = document.getElementById('result-count');
      grid.innerHTML = '';

      const filtered = POSTS.filter(post => {
        const matchTag = activeTag === 'all' || post.tags.includes(activeTag);
        const matchSearch = !searchQuery ||
          post.title.toLowerCase().includes(searchQuery) ||
          post.excerpt.toLowerCase().includes(searchQuery) ||
          post.tags.some(t => t.toLowerCase().includes(searchQuery));
        return matchTag && matchSearch;
      });

      const isFiltering = activeTag !== 'all' || searchQuery;
      countEl.textContent = isFiltering
        ? `${filtered.length} post${filtered.length !== 1 ? 's' : ''} found`
        : '';

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div class="empty">
            <strong>No posts found</strong>
            <p>Try a different search or tag.</p>
          </div>`;
        return;
      }

      filtered.forEach(post => {
        const a = document.createElement('a');
        a.className = 'post-card';
        a.href = '#';
        a.setAttribute('aria-label', post.title);
        a.innerHTML = `
          <div class="card-image">
            <img src="${post.image}" alt="${post.title}" loading="lazy" />
          </div>
          <div class="card-body">
            <div class="card-meta">
              ${post.tags.map(t => `<span class="card-tag">${t}</span>`).join('')}
              <span class="card-date">${post.date}</span>
            </div>
            <h2>${post.title}</h2>
            <p>${post.excerpt}</p>
          </div>`;
        a.addEventListener('click', e => { e.preventDefault(); openModal(post); });
        grid.appendChild(a);
      });
    }

    // ── Modal ──────────────────────────────────────────────────
    const overlay  = document.getElementById('modal-overlay');
    const modalEl  = document.getElementById('modal');

    function openModal(post) {
      document.getElementById('modal-img').src = post.image;
      document.getElementById('modal-img').alt = post.title;
      document.getElementById('modal-title').textContent = post.title;
      document.getElementById('modal-content').innerHTML = post.content;
      document.getElementById('modal-meta').innerHTML =
        post.tags.map(t => `<span class="modal-tag">${t}</span>`).join('') +
        `<span class="modal-date">${post.date}</span>`;
      overlay.classList.add('open');
      overlay.scrollTop = 0;
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    document.getElementById('modal-close').addEventListener('click', closeModal);

    // Close when clicking the dark backdrop (not the modal itself)
    overlay.addEventListener('click', e => {
      if (!modalEl.contains(e.target)) closeModal();
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });

    render();

function openPostFromHash() {
  const hash = window.location.hash;
  if (!hash) return;

  const id = hash.replace('#post-', '');
  const post = POSTS.find(p => String(p.id) === id);

  if (post) {
    openModal(post);
  }
}

window.addEventListener('hashchange', openPostFromHash);
window.addEventListener('DOMContentLoaded', openPostFromHash);