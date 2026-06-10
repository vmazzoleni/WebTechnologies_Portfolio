document.getElementById("footer-year").textContent = new Date().getFullYear();

const romanNumerals = ["I", "II", "III", "IV", "V"];
let currentCategory = null;
let galleryObserver = null;

function getCat(id) {
  return categories.find((cat) => cat.id === id);
}

function createSigilMark() {
  const mark = document.createElement("span");
  mark.className = "sigil-mark";
  mark.setAttribute("aria-hidden", "true");

  mark.innerHTML = `
    <span class="sigil-ring ring-outer"></span>
    <span class="sigil-ring ring-middle"></span>
    <span class="sigil-ring ring-inner"></span>
    <span class="sigil-spine spine-primary"></span>
    <span class="sigil-spine spine-secondary"></span>
    <span class="sigil-spine spine-tilt-a"></span>
    <span class="sigil-spine spine-tilt-b"></span>
    <span class="sigil-scratch scratch-a"></span>
    <span class="sigil-scratch scratch-b"></span>
    <span class="sigil-node node-top"></span>
    <span class="sigil-node node-center"></span>
    <span class="sigil-node node-bottom"></span>
    <span class="sigil-node node-left"></span>
    <span class="sigil-node node-right"></span>
    <span class="sigil-root root-left"></span>
    <span class="sigil-root root-right"></span>
    <span class="sigil-root root-lower"></span>
  `;

  return mark;
}

function buildSigilButton(cat, index, options = {}) {
  const button = document.createElement("button");
  button.className = `sigil-button${options.isAll ? " sigil-all" : ""}`;
  button.type = "button";
  button.dataset.category = cat.id;
  button.style.setProperty("--cat-color", cat.color);
  button.setAttribute("aria-label", options.isAll ? "Show all selected works" : `Open ${cat.name}`);
  button.setAttribute("aria-pressed", options.isAll ? "true" : "false");

  const numeral = document.createElement("span");
  numeral.className = "sigil-index";
  numeral.textContent = options.isAll ? "0" : romanNumerals[index] || String(index + 1);

  const label = document.createElement("span");
  label.className = "sigil-label";
  label.textContent = cat.name;

  button.appendChild(numeral);
  button.appendChild(createSigilMark());
  button.appendChild(label);

  button.addEventListener("click", () => {
    button.classList.add("is-opening");
    window.setTimeout(() => button.classList.remove("is-opening"), 520);
    setArchiveFilter(options.isAll ? "all" : cat.id);
  });

  return button;
}

function renderCategoryLabels() {
  const container = document.getElementById("category-labels");
  container.innerHTML = "";

  const allCategory = {
    id: "all",
    name: "All Works",
    color: "#d8d7cf"
  };

  container.appendChild(buildSigilButton(allCategory, 0, { isAll: true }));

  categories.forEach((cat, index) => {
    container.appendChild(buildSigilButton(cat, index));
  });
}

function updateActiveSigilButton(categoryId) {
  const activeId = categoryId || "all";

  document.querySelectorAll(".sigil-button").forEach((button) => {
    const isActive = button.dataset.category === activeId;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderMedia(item, large = false) {
  if (!item || !item.mediaSrc) {
    return `<div class="card-media-placeholder">No media</div>`;
  }

  if (item.mediaType === "image") {
    return `<img src="${escapeHtml(item.mediaSrc)}" alt="${escapeHtml(item.title || "")}" loading="lazy">`;
  }

  if (item.mediaType === "video") {
    return large
      ? `<video controls preload="metadata"><source src="${escapeHtml(item.mediaSrc)}" type="video/mp4">Your browser does not support video.</video>`
      : `<video muted loop preload="metadata" playsinline><source src="${escapeHtml(item.mediaSrc)}" type="video/mp4"></video>`;
  }

  if (item.mediaType === "youtube" || item.mediaType === "iframe") {
    const src = item.mediaType === "youtube" ? normalizeYoutubeEmbed(item.mediaSrc) : item.mediaSrc;
    return `
      <div style="position:relative;padding-bottom:56.25%;height:0;">
        <iframe
          src="${escapeHtml(src)}"
          title="${escapeHtml(item.title || "")}"
          loading="lazy"
          allowfullscreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style="position:absolute;inset:0;width:100%;height:100%;border:0;"
        ></iframe>
      </div>
    `;
  }

  return `<div class="card-media-placeholder">Media</div>`;
}

function normalizeYoutubeEmbed(url) {
  if (!url) return "";

  if (url.includes("youtube.com/embed/")) {
    return url;
  }

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${id}`;
    }

    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      if (id) {
        return `https://www.youtube.com/embed/${id}`;
      }
    }
  } catch (error) {
    return url;
  }

  return url;
}

function getProjectGallery(project) {
  if (Array.isArray(project.gallery) && project.gallery.length > 0) {
    return project.gallery;
  }

  return [
    {
      mediaSrc: project.mediaSrc,
      mediaType: project.mediaType,
      caption: ""
    }
  ];
}

function createSlideshowMarkup(gallery, idPrefix, projectTitle) {
  const slides = gallery
    .map((item) => {
      const caption = item.caption
        ? `<p class="thumb-caption" style="padding:0.8rem 1rem;">${escapeHtml(item.caption)}</p>`
        : "";

      return `
        <div class="gallery-slide">
          ${renderMedia({ ...item, title: projectTitle }, true)}
          ${caption}
        </div>
      `;
    })
    .join("");

  const dots = gallery
    .map((_, index) => {
      return `<button class="slide-dot${index === 0 ? " active" : ""}" data-slide="${index}" type="button" aria-label="Go to slide ${index + 1}"></button>`;
    })
    .join("");

  return `
    <div class="gallery-project-media gallery-slideshow" id="${idPrefix}">
      <div class="gallery-slideshow-track" id="${idPrefix}-track">${slides}</div>
      <button class="slide-nav slide-prev" type="button" data-slideshow="${idPrefix}" data-dir="-1" aria-label="Previous slide">&#8592;</button>
      <button class="slide-nav slide-next" type="button" data-slideshow="${idPrefix}" data-dir="1" aria-label="Next slide">&#8594;</button>
      <div class="slide-dots" id="${idPrefix}-dots">${dots}</div>
    </div>
  `;
}

function setupSlideshow(idPrefix) {
  const root = document.getElementById(idPrefix);
  if (!root) return;

  const track = document.getElementById(`${idPrefix}-track`);
  const dots = root.querySelectorAll(".slide-dot");
  const prev = root.querySelector('.slide-prev');
  const next = root.querySelector('.slide-next');

  if (!track || dots.length <= 1) return;

  let current = 0;

  function updateDots(index) {
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === index);
    });
  }

  function goTo(index) {
    const total = dots.length;
    current = (index + total) % total;
    track.scrollTo({
      left: current * track.clientWidth,
      behavior: "smooth"
    });
    updateDots(current);
  }

  prev.addEventListener("click", () => goTo(current - 1));
  next.addEventListener("click", () => goTo(current + 1));

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      goTo(Number(dot.dataset.slide));
    });
  });

  track.addEventListener("scroll", () => {
    const width = track.clientWidth || 1;
    const index = Math.round(track.scrollLeft / width);
    current = index;
    updateDots(current);
  });
}

function openGallery(categoryId) {
  currentCategory = categoryId;

  const category = getCat(categoryId);
  const categoryProjects = projects.filter((project) => project.category === categoryId);

  const gallerySection = document.getElementById("gallery-section");
  const galleryCategoryLabel = document.getElementById("gallery-category-label");
  const galleryTitle = document.getElementById("gallery-title");
  const galleryCount = document.getElementById("gallery-count");
  const thumbsEl = document.getElementById("gallery-thumbs");
  const mainEl = document.getElementById("gallery-main");

  galleryCategoryLabel.textContent = "Category";
  galleryTitle.textContent = category ? category.name : "Projects";
  galleryCount.textContent = `${categoryProjects.length} project${categoryProjects.length === 1 ? "" : "s"}`;

  thumbsEl.innerHTML = "";
  mainEl.innerHTML = "";

  categoryProjects.forEach((project, index) => {
    const thumb = document.createElement("button");
    thumb.className = `thumb-item${index === 0 ? " active" : ""}`;
    thumb.type = "button";
    thumb.dataset.index = String(index);
    thumb.setAttribute("aria-label", `Jump to ${project.title}`);

    thumb.innerHTML = `
      ${
        project.mediaSrc && project.mediaType === "image"
          ? `<img class="thumb-img" src="${escapeHtml(project.mediaSrc)}" alt="${escapeHtml(project.title)}" loading="lazy">`
          : `<div class="thumb-placeholder">Preview</div>`
      }
      <span class="thumb-caption">${escapeHtml(project.title)}</span>
    `;

    thumb.addEventListener("click", () => {
      const target = document.getElementById(`gallery-project-${project.id}`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    thumbsEl.appendChild(thumb);

    const galleryItems = getProjectGallery(project);
    const tags = (project.tags || [])
      .map((tag) => `<span class="ptag">${escapeHtml(tag)}</span>`)
      .join("");

    const mediaHtml =
      galleryItems.length > 1
        ? createSlideshowMarkup(galleryItems, `gallery-slideshow-${project.id}`, project.title)
        : `<div class="gallery-project-media">${renderMedia({ ...galleryItems[0], title: project.title }, true)}</div>`;

    const article = document.createElement("article");
    article.className = "gallery-project";
    article.id = `gallery-project-${project.id}`;

    article.innerHTML = `
      ${mediaHtml}
      <div class="gallery-project-info">
        <div class="gallery-project-meta">
          <span>${escapeHtml(project.year || "")}</span>
          <span>${escapeHtml(project.duration || "")}</span>
        </div>
        <h3 class="gallery-project-title">${escapeHtml(project.title)}</h3>
        <div class="gallery-project-tags">${tags}</div>
        <p class="gallery-project-desc">${escapeHtml(project.shortDescription || "")}</p>
        <p class="gallery-project-long">${escapeHtml(project.longDescription || "")}</p>
        ${
          project.externalLink && project.externalLink !== "#"
            ? `<a class="ext-link" href="${escapeHtml(project.externalLink)}" target="_blank" rel="noopener">Open external link</a>`
            : ""
        }
      </div>
      ${index < categoryProjects.length - 1 ? '<hr class="gallery-divider">' : ""}
    `;

    mainEl.appendChild(article);

    if (galleryItems.length > 1) {
      setupSlideshow(`gallery-slideshow-${project.id}`);
    }
  });

  if (galleryObserver) {
    galleryObserver.disconnect();
  }

  galleryObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.id.replace("gallery-project-", "");
        const activeIndex = categoryProjects.findIndex((project) => project.id === id);

        document.querySelectorAll(".thumb-item").forEach((item, index) => {
          item.classList.toggle("active", index === activeIndex);
        });
      });
    },
    {
      threshold: 0.35,
      rootMargin: "-10% 0px -40% 0px"
    }
  );

  mainEl.querySelectorAll(".gallery-project").forEach((item) => {
    galleryObserver.observe(item);
  });

  gallerySection.classList.remove("hidden");
  gallerySection.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.getElementById("back-btn").addEventListener("click", () => {
  currentCategory = null;
  updateActiveSigilButton(null);
  document.getElementById("gallery-section").classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

let activeArchiveFilter = "all";

function setArchiveFilter(filterId) {
  activeArchiveFilter = filterId || "all";
  updateActiveSigilButton(activeArchiveFilter);
  renderProjectsArchive();

  const archive = document.getElementById("all-projects-section");
  if (archive) {
    archive.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function initProjectsGrid() {
  renderProjectsArchive();
}

function renderProjectsArchive() {
  const grid = document.getElementById("projects-grid");
  const status = document.getElementById("archive-status");
  if (!grid) return;

  const visibleProjects =
    activeArchiveFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeArchiveFilter);

  const selectedCategory = activeArchiveFilter === "all" ? null : getCat(activeArchiveFilter);
  if (status) {
    status.textContent = selectedCategory
      ? `${selectedCategory.name} / ${visibleProjects.length} project${visibleProjects.length === 1 ? "" : "s"}`
      : `All selected works / ${visibleProjects.length} projects`;
  }

  grid.innerHTML = "";

  visibleProjects.forEach((project, index) => {
    const category = getCat(project.category);
    const revealDelay = Math.min(index * 70, 420);
    const limitedTags = (project.tags || []).slice(0, 3);
    const tags = limitedTags.map((tag) => `<span class="ptag">${escapeHtml(tag)}</span>`).join("");

    const card = document.createElement("article");
    card.className = "project-card archive-entry";
    card.dataset.category = project.category;
    card.style.setProperty("--reveal-delay", `${revealDelay}ms`);
    if (category) {
      card.style.setProperty("--cat-color", category.color);
    }

    card.innerHTML = `
      <div class="card-media">
        ${renderMedia({ ...project, title: project.title }, false)}
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span>${escapeHtml(project.year || "")}</span>
          <span>${escapeHtml(category ? category.name : project.category)}</span>
          <span>${escapeHtml(project.duration || "")}</span>
        </div>
        <h3 class="card-title">${escapeHtml(project.title)}</h3>
        <div class="card-tags">${tags}</div>
        <p class="card-desc">${escapeHtml(project.shortDescription || "")}</p>
        <p class="card-long">${escapeHtml(project.longDescription || "")}</p>
        <button class="view-btn" type="button" data-id="${escapeHtml(project.id)}">View project</button>
      </div>
    `;

    grid.appendChild(card);
  });

  grid.querySelectorAll(".project-card video").forEach((video) => {
    const card = video.closest(".project-card");
    if (!card) return;

    card.addEventListener("mouseenter", () => {
      video.play().catch(() => {});
    });

    card.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  });

  grid.querySelectorAll(".view-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openProjectModal(button.dataset.id);
    });
  });

  setupArchiveReveals(grid);

  grid.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("pointermove", handleArchivePointerMove);
    card.addEventListener("pointerleave", resetArchivePointerMove);
    card.addEventListener("click", (event) => {
      if (event.target.closest("a, button")) return;
      const button = card.querySelector(".view-btn");
      if (button) openProjectModal(button.dataset.id);
    });
  });
}

function setupArchiveReveals(grid) {
  const cards = grid.querySelectorAll(".project-card");

  if (!("IntersectionObserver" in window)) {
    cards.forEach((card) => card.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        activeObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  cards.forEach((card) => observer.observe(card));
}

function handleArchivePointerMove(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
  const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
  event.currentTarget.style.setProperty("--tilt-x", `${(-y * 1.2).toFixed(2)}deg`);
  event.currentTarget.style.setProperty("--tilt-y", `${(x * 1.6).toFixed(2)}deg`);
  event.currentTarget.style.setProperty("--glow-x", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--glow-y", `${event.clientY - rect.top}px`);
}

function resetArchivePointerMove(event) {
  event.currentTarget.style.setProperty("--tilt-x", "0deg");
  event.currentTarget.style.setProperty("--tilt-y", "0deg");
}

function openProjectModal(projectId) {
  const project = projects.find((item) => item.id === projectId);
  if (!project) return;

  const category = getCat(project.category);
  const modal = document.getElementById("project-modal");
  const modalContent = document.getElementById("modal-content");

  const tags = (project.tags || [])
    .map((tag) => `<span class="ptag">${escapeHtml(tag)}</span>`)
    .join("");

  const gallery = getProjectGallery(project);

  const mediaHtml =
    gallery.length > 1
      ? createSlideshowMarkup(gallery, `modal-slideshow-${project.id}`, project.title)
      : `<div class="modal-media">${renderMedia({ ...gallery[0], title: project.title }, true)}</div>`;

  modalContent.innerHTML = `
    ${mediaHtml}
    <div class="modal-body">
      <p class="modal-cat-label">${escapeHtml(category ? category.name : project.category)}</p>
      <h2 class="modal-title" id="modal-title">${escapeHtml(project.title)}</h2>
      <div class="modal-meta">
        <span>${escapeHtml(project.year || "")}</span>
        <span>${escapeHtml(project.duration || "")}</span>
      </div>
      <div class="modal-tags" style="margin-top:1rem;">${tags}</div>
      <p class="modal-desc" style="margin-top:1rem;">${escapeHtml(project.shortDescription || "")}</p>
      <p class="modal-long">${escapeHtml(project.longDescription || "")}</p>
      ${
        project.externalLink && project.externalLink !== "#"
          ? `<a class="ext-link" href="${escapeHtml(project.externalLink)}" target="_blank" rel="noopener">Open external link</a>`
          : ""
      }
    </div>
  `;

  if (gallery.length > 1) {
    setupSlideshow(`modal-slideshow-${project.id}`);
  }

  modal.classList.remove("hidden");
  requestAnimationFrame(() => modal.classList.add("is-open"));
  document.body.style.overflow = "hidden";
  document.getElementById("modal-close").focus({ preventScroll: true });
}

function closeProjectModal() {
  const modal = document.getElementById("project-modal");
  modal.classList.remove("is-open");
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

function openCvModal() {
  const modal = document.getElementById("cv-modal");
  modal.classList.remove("hidden");
  requestAnimationFrame(() => modal.classList.add("is-open"));
  document.body.style.overflow = "hidden";
  document.getElementById("cv-close").focus({ preventScroll: true });
}

function closeCvModal() {
  const modal = document.getElementById("cv-modal");
  modal.classList.remove("is-open");
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

document.getElementById("modal-close").addEventListener("click", closeProjectModal);
document.getElementById("modal-backdrop").addEventListener("click", closeProjectModal);
document.getElementById("cv-open").addEventListener("click", openCvModal);
document.getElementById("cv-close").addEventListener("click", closeCvModal);
document.getElementById("cv-backdrop").addEventListener("click", closeCvModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProjectModal();
    closeCvModal();
  }
});

class Root {
  constructor(x, y, angle, options = {}) {
    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;
    this.angle = angle;
    this.life = options.life ?? 90 + Math.random() * 70;
    this.thickness = options.thickness ?? 0.4 + Math.random() * 0.5;
    this.speed = options.speed ?? 0.35 + Math.random() * 0.25;
    this.opacity = options.opacity ?? 0.2 + Math.random() * 0.18;
    this.wander = options.wander ?? 0.2;
    this.branchChance = options.branchChance ?? 0.018;
  }

  step(width, height, pointer) {
    this.prevX = this.x;
    this.prevY = this.y;

    this.angle += (Math.random() - 0.5) * this.wander;

    if (pointer && pointer.active) {
      const dx = pointer.x - this.x;
      const dy = pointer.y - this.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 180 && distance > 1) {
        const pull = (1 - distance / 180) * 0.018;
        this.angle += Math.sin(Math.atan2(dy, dx) - this.angle) * pull;
      }
    }

    const pulse = 0.82 + Math.random() * 0.36;
    this.x += Math.cos(this.angle) * this.speed * pulse;
    this.y += Math.sin(this.angle) * this.speed * pulse;

    this.life -= 1;
    this.thickness *= 0.995;
    this.opacity *= 0.997;

    return (
      this.life > 0 &&
      this.x > -50 &&
      this.x < width + 50 &&
      this.y > -50 &&
      this.y < height + 50
    );
  }
}

class RootCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.roots = [];
    this.maxRoots = window.innerWidth < 700 ? 10 : 22;
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.smallScreen = window.innerWidth < 520;
    this.spawnPoints = [];
    this.pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false, lastSpawn: 0 };

    this.resize();
    this.collectSpawnPoints();
    window.addEventListener("resize", () => {
      this.resize();
      this.collectSpawnPoints();
    });

    window.addEventListener("pointermove", (event) => this.handlePointerMove(event), { passive: true });
    window.addEventListener("pointerleave", () => {
      this.pointer.active = false;
    });

    if (!this.reducedMotion && !this.smallScreen) {
      this.seedRoots(16);
      this.animate();
    } else {
      this.drawStatic();
    }
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  collectSpawnPoints() {
    this.spawnPoints = [];
    this.pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false, lastSpawn: 0 };

    const heroOrganism = document.getElementById("hero-organism");
    if (heroOrganism) {
      const rect = heroOrganism.getBoundingClientRect();
      this.spawnPoints.push({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    }

    document.querySelectorAll(".sigil-button").forEach((button) => {
      const rect = button.getBoundingClientRect();
      this.spawnPoints.push({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    });
  }

  handlePointerMove(event) {
    this.pointer.x = event.clientX;
    this.pointer.y = event.clientY;
    this.pointer.active = true;

    const now = performance.now();
    if (now - this.pointer.lastSpawn > 180 && this.roots.length < this.maxRoots) {
      this.pointer.lastSpawn = now;
      this.spawnRootNear(event.clientX, event.clientY, 46);
    }
  }

  randomEdgeSpawn() {
    const edge = Math.floor(Math.random() * 4);

    if (edge === 0) {
      return {
        x: Math.random() * this.canvas.width,
        y: -10,
        angle: Math.PI / 2 + (Math.random() - 0.5) * 0.8
      };
    }

    if (edge === 1) {
      return {
        x: this.canvas.width + 10,
        y: Math.random() * this.canvas.height,
        angle: Math.PI + (Math.random() - 0.5) * 0.8
      };
    }

    if (edge === 2) {
      return {
        x: Math.random() * this.canvas.width,
        y: this.canvas.height + 10,
        angle: -Math.PI / 2 + (Math.random() - 0.5) * 0.8
      };
    }

    return {
      x: -10,
      y: Math.random() * this.canvas.height,
      angle: (Math.random() - 0.5) * 0.8
    };
  }

  spawnRoot() {
    if (this.roots.length >= this.maxRoots) return;

    let x;
    let y;
    let angle;

    if (this.spawnPoints.length > 0 && Math.random() < 0.45) {
      const point = this.spawnPoints[Math.floor(Math.random() * this.spawnPoints.length)];
      const offsetAngle = Math.random() * Math.PI * 2;
      const offsetRadius = 30 + Math.random() * 90;
      x = point.x + Math.cos(offsetAngle) * offsetRadius;
      y = point.y + Math.sin(offsetAngle) * offsetRadius;
      angle = offsetAngle + Math.PI + (Math.random() - 0.5) * 0.8;
    } else {
      const spawn = this.randomEdgeSpawn();
      x = spawn.x;
      y = spawn.y;
      angle = spawn.angle;
    }

    this.roots.push(
      new Root(x, y, angle, {
        life: 70 + Math.random() * 80,
        thickness: 0.3 + Math.random() * 0.45,
        speed: 0.3 + Math.random() * 0.22,
        opacity: 0.14 + Math.random() * 0.14
      })
    );
  }

  spawnRootNear(x, y, radius = 40) {
    if (this.roots.length >= this.maxRoots) return;

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * radius;
    this.roots.push(
      new Root(
        x + Math.cos(angle) * distance,
        y + Math.sin(angle) * distance,
        angle + Math.PI + (Math.random() - 0.5) * 1.4,
        {
          life: 48 + Math.random() * 56,
          thickness: 0.22 + Math.random() * 0.36,
          speed: 0.25 + Math.random() * 0.22,
          opacity: 0.09 + Math.random() * 0.11,
          wander: 0.24 + Math.random() * 0.16,
          branchChance: 0.012
        }
      )
    );
  }

  seedRoots(count) {
    for (let i = 0; i < count; i += 1) {
      this.spawnRoot();
    }
  }

  drawLine(root) {
    const palette = [
      `rgba(230,230,220,${root.opacity})`,
      `rgba(255,255,255,${root.opacity * 0.8})`,
      `rgba(180,180,170,${root.opacity * 0.7})`
    ];
    const color = palette[Math.floor(Math.random() * palette.length)];

    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = Math.max(0.15, root.thickness);
    this.ctx.lineCap = "round";

    this.ctx.beginPath();
    this.ctx.moveTo(root.prevX, root.prevY);
    this.ctx.lineTo(root.x, root.y);
    this.ctx.stroke();

    if (this.roots.length < this.maxRoots + 8 && Math.random() < root.branchChance) {
      const branchAngle = root.angle + (Math.random() - 0.5) * 1.2;
      this.roots.push(
        new Root(root.x, root.y, branchAngle, {
          life: root.life * 0.55,
          thickness: root.thickness * 0.72,
          speed: root.speed * 0.92,
          opacity: root.opacity * 0.76,
          wander: root.wander * 1.08,
          branchChance: root.branchChance * 0.6
        })
      );
    }
  }

  animate() {
    this.ctx.fillStyle = "rgba(2,2,2,0.06)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    if (Math.random() < 0.08) {
      this.spawnRoot();
    }

    this.roots = this.roots.filter((root) => {
      const alive = root.step(this.canvas.width, this.canvas.height, this.pointer);
      if (alive) {
        this.drawLine(root);
      }
      return alive;
    });

    requestAnimationFrame(() => this.animate());
  }

  drawStatic() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "rgba(2,2,2,0.01)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const points = this.spawnPoints.length ? this.spawnPoints : [{ x: this.canvas.width / 2, y: this.canvas.height / 3 }];

    points.slice(0, 6).forEach((point) => {
      for (let i = 0; i < 3; i += 1) {
        let x = point.x;
        let y = point.y;
        let angle = Math.random() * Math.PI * 2;
        let opacity = 0.12 + Math.random() * 0.08;

        for (let step = 0; step < 36; step += 1) {
          const prevX = x;
          const prevY = y;
          angle += (Math.random() - 0.5) * 0.35;
          x += Math.cos(angle) * (0.8 + Math.random() * 1.2);
          y += Math.sin(angle) * (0.8 + Math.random() * 1.2);

          this.ctx.strokeStyle = `rgba(230,230,220,${opacity})`;
          this.ctx.lineWidth = 0.35;
          this.ctx.beginPath();
          this.ctx.moveTo(prevX, prevY);
          this.ctx.lineTo(x, y);
          this.ctx.stroke();

          opacity *= 0.97;
        }
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderCategoryLabels();
  updateActiveSigilButton("all");
  initProjectsGrid();

  const canvas = document.getElementById("root-canvas");
  if (canvas) {
    new RootCanvas(canvas);
  }
});
