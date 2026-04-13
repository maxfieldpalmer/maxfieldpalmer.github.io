
  // NAV
  const nav = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', nav.classList.contains('open'));
  });

  document.querySelectorAll('.nav-links').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 760) {
        nav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // SCROLL EFFECT
window.addEventListener('scroll', () => {
  const bg = document.getElementById('bg-fade');
  let scrollPos = window.scrollY;

  const isMobile = window.innerWidth <= 760;
  const fadeCutoff = isMobile ? 150 : 500;
  

  // Hero fades out
  let bgOpacity = 1 - (scrollPos / fadeCutoff);
  bg.style.opacity = bgOpacity >= 0 ? bgOpacity : 0;

  // Nav background fades in (inverse)
  let navOpacity = scrollPos / fadeCutoff;
nav.style.background = `linear-gradient(to right, rgba(120, 151, 171, ${Math.min(navOpacity, 1)}), rgba(180, 193, 204, ${Math.min(navOpacity, 1)}))`;});

  // LATEST POST
  document.addEventListener('DOMContentLoaded', () => {
    if (!window.POSTS || POSTS.length === 0) return;

    const post = POSTS[0];

    document.getElementById('latest-title').textContent = post.title;
    document.getElementById('latest-date').textContent = post.date;
    document.getElementById('latest-tag').textContent = post.tags?.[0] || '';
    document.getElementById('latest-excerpt').textContent = post.excerpt;

    const img = document.getElementById('latest-img');
    img.src = post.image;
    img.alt = post.title;

    // 🔥 THIS is what enables "Read post"
    document.getElementById('latest-card').href = `blog.html#post-${post.id}`;
  });
