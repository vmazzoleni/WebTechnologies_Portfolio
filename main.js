// ═══════════════════════════════════════════════════════
//  MAIN.JS — Tron Portfolio
// ═══════════════════════════════════════════════════════

document.getElementById('footer-year').textContent = new Date().getFullYear();

// ── CATEGORY COLOR MAP ───────────────────────────────────
function getCat(id) { return categories.find(c => c.id === id); }
function getCatColor(id) { return getCat(id)?.color || '#00e5ff'; }

// ── CATEGORY SIGIL NAVIGATION ──────────────────────────

// ── CATEGORY LABEL BUTTONS ───────────────────────────────
(function renderCategoryLabels() {
  const container = document.getElementById('category-labels');
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'sigil-button';
    btn.style.setProperty('--cat-color', cat.color);
    btn.innerHTML = `<span class="sigil-mark">✠</span><strong>${cat.name}</strong><small>${cat.description}</small>`;
    btn.addEventListener('click', () => openGallery(cat.id));
    container.appendChild(btn);
  });
})();

// ── MEDIA HELPER ─────────────────────────────────────────
function renderMedia(item, large = false) {
  if (!item.mediaSrc) {
    return `<div class="card-media-placeholder"><span>// NO MEDIA</span></div>`;
  }
  const maxH = large ? 'max-height:600px' : 'height:240px';
  switch (item.mediaType) {
    case 'image':
      return `<img src="${item.mediaSrc}" alt="${item.title || ''}" loading="lazy" style="${maxH};width:100%;object-fit:cover;display:block"/>`;
    case 'video':
      return `<video controls muted preload="metadata" style="${maxH};width:100%;object-fit:cover;display:block"><source src="${item.mediaSrc}" type="video/mp4"/>Your browser does not support video.</video>`;
    case 'youtube':
    case 'iframe':
      return `<div style="position:relative;padding-bottom:56.25%;height:0"><iframe src="${item.mediaSrc}" title="${item.title || ''}" frameborder="0" allowfullscreen loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0"></iframe></div>`;
    default:
      return `<div class="card-media-placeholder"><span>// MEDIA</span></div>`;
  }
}

// ── GALLERY SECTION ──────────────────────────────────────
let currentCategory = null;

function openGallery(categoryId) {
  currentCategory = categoryId;
  const cat = getCat(categoryId);
  const catProjects = projects.filter(p => p.category === categoryId);

  const gallerySection = document.getElementById('gallery-section');

  document.getElementById('gallery-category-label').textContent = `// ${cat.name.toUpperCase()}`;
  document.getElementById('gallery-category-label').style.color = cat.color;
  document.getElementById('gallery-title').textContent = cat.name;
  document.getElementById('gallery-count').textContent = `${catProjects.length} project${catProjects.length !== 1 ? 's' : ''}`;

  // Thumbnails
  const thumbsEl = document.getElementById('gallery-thumbs');
  thumbsEl.innerHTML = '';
  catProjects.forEach((p, i) => {
    const thumb = document.createElement('div');
    thumb.className = 'thumb-item' + (i === 0 ? ' active' : '');
    thumb.dataset.idx = i;
    thumb.innerHTML = `
      <div>
        ${p.mediaSrc && p.mediaType === 'image'
          ? `<img class="thumb-img" src="${p.mediaSrc}" alt="${p.title}" loading="lazy"/>`
          : `<div class="thumb-placeholder" style="background:color-mix(in srgb,${cat.color} 8%,transparent)">//</div>`}
        <div class="thumb-label" style="color:${cat.color}">${p.title}</div>
      </div>`;
    thumb.addEventListener('click', () => {
      document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const target = document.getElementById('gp-' + p.id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    thumbsEl.appendChild(thumb);
  });

  // Main projects
  const mainEl = document.getElementById('gallery-main');
  mainEl.innerHTML = '';
  catProjects.forEach((p, idx) => {
    const div = document.createElement('div');
    div.className = 'gallery-project animate-in';
    div.id = 'gp-' + p.id;
    div.style.animationDelay = (idx * 0.08) + 's';

    const gallery = (p.gallery && p.gallery.length > 0) ? p.gallery : [{ mediaSrc: p.mediaSrc, mediaType: p.mediaType }];
    const tags = (p.tags || []).map(t => `<span class="ptag" style="--cat-color:${cat.color}">${t}</span>`).join('');

    let mediaHtml = '';
    if (gallery.length === 1) {
      mediaHtml = `<div class="gallery-project-media">${renderMedia({ ...gallery[0], title: p.title }, true)}</div>`;
    } else {
      const slides = gallery.map((item, si) =>
        `<div class="gallery-slide">${renderMedia({ ...item, title: p.title }, true)}${item.caption ? `<p style="padding:0.5rem 1rem;font-family:var(--mono);font-size:0.75rem;color:var(--text-dim)">${item.caption}</p>` : ''}</div>`
      ).join('');
      const dots = gallery.map((_, si) =>
        `<button class="slide-dot${si === 0 ? ' active' : ''}" data-si="${si}" aria-label="Slide ${si + 1}"></button>`
      ).join('');
      mediaHtml = `<div class="gallery-project-media gallery-slideshow" id="ss-${p.id}">
        <div class="gallery-slideshow-track" id="sst-${p.id}">${slides}</div>
        <button class="slide-nav slide-prev" data-ssid="${p.id}">&#8592;</button>
        <button class="slide-nav slide-next" data-ssid="${p.id}">&#8594;</button>
        <div class="slide-dots" id="ssd-${p.id}">${dots}</div>
      </div>`;
    }

    div.innerHTML = `
      ${mediaHtml}
      <div class="gallery-project-info">
        <div class="gallery-project-meta">
          <span style="color:${cat.color}">${p.year}</span>
          <span>${p.duration}</span>
        </div>
        <h3 class="gallery-project-title">${p.title}</h3>
        <div class="gallery-project-tags">${tags}</div>
        <p class="gallery-project-desc">${p.shortDescription}</p>
        <p class="gallery-project-long">${p.longDescription}</p>
        ${p.externalLink && p.externalLink !== '#' ? `<a class="ext-link" href="${p.externalLink}" target="_blank" rel="noopener">↗ EXTERNAL LINK</a>` : ''}
      </div>
      ${idx < catProjects.length - 1 ? '<hr class="gallery-divider" style="margin-top:4rem">' : ''}`;

    mainEl.appendChild(div);
  });

  // Attach slideshow events
  catProjects.forEach(p => {
    const track = document.getElementById('sst-' + p.id);
    if (!track) return;
    const slides = track.querySelectorAll('.gallery-slide');
    if (slides.length <= 1) return;
    const dots = document.querySelectorAll(`#ssd-${p.id} .slide-dot`);
    let cur = 0;
    function goTo(idx) {
      cur = (idx + slides.length) % slides.length;
      track.scrollTo({ left: cur * track.offsetWidth, behavior: 'smooth' });
      dots.forEach((d, i) => d.classList.toggle('active', i === cur));
    }
    document.querySelector(`[data-ssid="${p.id}"].slide-prev`)?.addEventListener('click', () => goTo(cur - 1));
    document.querySelector(`[data-ssid="${p.id}"].slide-next`)?.addEventListener('click', () => goTo(cur + 1));
    dots.forEach(dot => dot.addEventListener('click', () => goTo(Number(dot.dataset.si))));
    track.addEventListener('scrollend', () => {
      const i = Math.round(track.scrollLeft / track.offsetWidth);
      dots.forEach((d, j) => d.classList.toggle('active', j === i));
      cur = i;
      // sync thumbnails
      document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
      document.querySelector(`.thumb-item[data-idx="${i}"]`)?.classList.add('active');
    });
  });

  // Intersection observer for thumbnail sync
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const pid = entry.target.id.replace('gp-', '');
        const idx = catProjects.findIndex(p => p.id === pid);
        if (idx >= 0) {
          document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
          document.querySelector(`.thumb-item[data-idx="${idx}"]`)?.classList.add('active');
        }
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' });

  mainEl.querySelectorAll('.gallery-project').forEach(el => io.observe(el));

  // Show/hide
  gallerySection.classList.remove('hidden');
  gallerySection.scrollIntoView({ behavior: 'smooth' });
}

// Back button
document.getElementById('back-btn').addEventListener('click', () => {
  document.getElementById('gallery-section').classList.add('hidden');
  currentCategory = null;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── ALL PROJECTS GRID ────────────────────────────────────
(function initProjectsGrid() {
  let activeFilter = 'all';

  // Filter buttons
  const filterRow = document.getElementById('filter-row');
  const allBtn = document.createElement('button');
  allBtn.className = 'filter-btn active'; allBtn.textContent = 'ALL';
  allBtn.addEventListener('click', () => setFilter('all', allBtn));
  filterRow.appendChild(allBtn);

  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn'; btn.textContent = cat.name.toUpperCase();
    btn.style.setProperty('--cyan', cat.color);
    btn.addEventListener('click', () => setFilter(cat.id, btn));
    filterRow.appendChild(btn);
  });

  function setFilter(id, clickedBtn) {
    activeFilter = id;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    clickedBtn.classList.add('active');
    renderGrid();
  }

  function renderGrid() {
    const grid = document.getElementById('projects-grid');
    const visible = activeFilter === 'all' ? projects : projects.filter(p => p.category === activeFilter);
    grid.innerHTML = '';
    visible.forEach((p, i) => {
      const cat = getCat(p.category);
      const color = cat?.color || '#00e5ff';
      const tags = (p.tags || []).map(t => `<span class="ptag" style="--cat-color:${color}">${t}</span>`).join('');
      const card = document.createElement('div');
      card.className = 'project-card animate-in';
      card.style.setProperty('--cat-color', color);
      card.style.animationDelay = (i * 0.05) + 's';
      card.innerHTML = `
        <div class="card-corner"></div>
        <div class="card-media">
          ${p.mediaSrc
            ? (p.mediaType === 'image'
              ? `<img src="${p.mediaSrc}" alt="${p.title}" loading="lazy"/>`
              : p.mediaType === 'video'
                ? `<video muted preload="metadata" loop style="pointer-events:none"><source src="${p.mediaSrc}" type="video/mp4"/></video>`
                : `<div class="card-media-placeholder">//</div>`)
            : `<div class="card-media-placeholder" style="background:color-mix(in srgb,${color} 8%,transparent)">//</div>`}
        </div>
        <div class="card-body">
          <div class="card-meta">
            <span class="card-cat">${cat?.name || p.category}</span>
            <span>${p.year}</span>
            <span>${p.duration}</span>
          </div>
          <h3 class="card-title">${p.title}</h3>
          <div class="card-tags">${tags}</div>
          <p class="card-desc">${p.shortDescription}</p>
          <button class="view-btn" data-id="${p.id}">▶ VIEW PROJECT</button>
        </div>`;
      grid.appendChild(card);
    });

    // Video hover play
    grid.querySelectorAll('.project-card video').forEach(v => {
      v.closest('.project-card').addEventListener('mouseenter', () => v.play());
      v.closest('.project-card').addEventListener('mouseleave', () => { v.pause(); v.currentTime = 0; });
    });

    grid.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', () => openProjectModal(btn.dataset.id));
    });

    grid.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', e => {
        if (!e.target.closest('.view-btn')) {
          const btn = card.querySelector('.view-btn');
          if (btn) openProjectModal(btn.dataset.id);
        }
      });
    });
  }

  renderGrid();
})();

// ── PROJECT MODAL ────────────────────────────────────────
function openProjectModal(projectId) {
  const p = projects.find(x => x.id === projectId);
  if (!p) return;
  const cat = getCat(p.category);
  const color = cat?.color || '#00e5ff';
  const tags = (p.tags || []).map(t => `<span class="ptag" style="--cat-color:${color}">${t}</span>`).join('');

  const gallery = (p.gallery && p.gallery.length > 0) ? p.gallery : [{ mediaSrc: p.mediaSrc, mediaType: p.mediaType }];
  let mediaHtml = '';
  if (gallery.length === 1) {
    mediaHtml = `<div class="modal-media">${renderMedia({ ...gallery[0], title: p.title }, true)}</div>`;
  } else {
    const slides = gallery.map((item, si) =>
      `<div class="gallery-slide">${renderMedia({ ...item, title: p.title }, true)}${item.caption ? `<p style="padding:0.5rem 1.5rem;font-family:var(--mono);font-size:0.75rem;color:var(--text-dim)">${item.caption}</p>` : ''}</div>`
    ).join('');
    const dots = gallery.map((_, si) =>
      `<button class="slide-dot${si === 0 ? ' active' : ''}" data-si="${si}" aria-label="Slide ${si + 1}"></button>`
    ).join('');
    mediaHtml = `<div class="modal-media gallery-slideshow" id="mss-${p.id}">
      <div class="gallery-slideshow-track" id="msst-${p.id}">${slides}</div>
      <button class="slide-nav slide-prev" data-ssid="m${p.id}">&#8592;</button>
      <button class="slide-nav slide-next" data-ssid="m${p.id}">&#8594;</button>
      <div class="slide-dots" id="mssd-${p.id}">${dots}</div>
    </div>`;
  }

  document.getElementById('modal-content').innerHTML = `
    ${mediaHtml}
    <div class="modal-body">
      <span class="modal-cat-label" style="color:${color}">// ${cat?.name.toUpperCase()}</span>
      <h2 class="modal-title">${p.title}</h2>
      <div class="modal-meta">
        <span>${p.year}</span>
        <span>Duration: ${p.duration}</span>
      </div>
      <div class="gallery-project-tags" style="margin-bottom:1.2rem">${tags}</div>
      <p class="modal-desc">${p.shortDescription}</p>
      <p class="modal-long">${p.longDescription}</p>
      ${p.externalLink && p.externalLink !== '#' ? `<a class="ext-link" href="${p.externalLink}" target="_blank" rel="noopener">↗ EXTERNAL LINK</a>` : ''}
    </div>`;

  // Slideshow for modal
  const mtrack = document.getElementById('msst-' + p.id);
  if (mtrack) {
    const slides = mtrack.querySelectorAll('.gallery-slide');
    if (slides.length > 1) {
      const dots = document.querySelectorAll(`#mssd-${p.id} .slide-dot`);
      let cur = 0;
      function goTo(idx) {
        cur = (idx + slides.length) % slides.length;
        mtrack.scrollTo({ left: cur * mtrack.offsetWidth, behavior: 'smooth' });
        dots.forEach((d, i) => d.classList.toggle('active', i === cur));
      }
      document.querySelector(`[data-ssid="m${p.id}"].slide-prev`)?.addEventListener('click', () => goTo(cur - 1));
      document.querySelector(`[data-ssid="m${p.id}"].slide-next`)?.addEventListener('click', () => goTo(cur + 1));
      dots.forEach(dot => dot.addEventListener('click', () => goTo(Number(dot.dataset.si))));
    }
  }

  const modal = document.getElementById('project-modal');
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-backdrop').addEventListener('click', closeModal);
function closeModal() {
  document.getElementById('project-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

// ── CV MODAL ─────────────────────────────────────────────
document.getElementById('cv-open').addEventListener('click', () => {
  document.getElementById('cv-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
});
document.getElementById('cv-close').addEventListener('click', closeCV);
document.getElementById('cv-backdrop').addEventListener('click', closeCV);
function closeCV() {
  document.getElementById('cv-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

// ── KEYBOARD ─────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); closeCV(); }
});
