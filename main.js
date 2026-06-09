const themeKey = "portfolioTheme";

const projectGrid = document.getElementById("project-grid");
const projectCount = document.getElementById("project-count");
const categoryGrid = document.getElementById("category-grid");
const themeToggle = document.getElementById("theme-toggle");

const detail = document.getElementById("project-detail");
const detailContent = document.getElementById("project-detail-content");
const closeDetailButtons = document.querySelectorAll("[data-close-detail]");

const cvModal = document.getElementById("cv-modal");
const cvOpenButton = document.getElementById("cv-open");
const closeCvButtons = document.querySelectorAll("[data-close-cv]");

let currentCategory = "all";

// ─── HELPERS ──────────────────────────────────────────────

function getCategoryName(c) { return c?.name || ""; }
function getCategoryDescription(c) { return c?.description || ""; }
function getCategory(id) { return categories.find((c) => c.id === id); }

// ─── THEME ────────────────────────────────────────────────
// light mode = day = button says "Sunset" (click to go dark/sunset)
// dark mode  = night = button says "Sunrise" (click to go back to light)

function applyTheme(theme, animate = false) {
  if (animate) {
    document.documentElement.classList.add("theme-transitioning");
    setTimeout(() => document.documentElement.classList.remove("theme-transitioning"), 700);
  }
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(themeKey, theme);
  themeToggle.textContent = theme === "dark" ? "Sunrise" : "Sunset";
}

function loadTheme() {
  const saved = localStorage.getItem(themeKey);
  const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  applyTheme(saved || preferred, false);
}

// ─── MEDIA ────────────────────────────────────────────────

function createMediaMarkup(item) {
  const title = item.title ? item.title.replace(/"/g, "&quot;") : "";

  if (!item.mediaSrc) {
    return `<div class="media-placeholder"><span>No media yet</span></div>`;
  }

  switch (item.mediaType) {
    case "image":
      return `<img src="${item.mediaSrc}" alt="${title}" loading="lazy" />`;
    case "video":
      return `<video controls muted preload="metadata"><source src="${item.mediaSrc}" type="video/mp4" />Your browser does not support video.</video>`;
    case "youtube":
    case "soundcloud":
    case "iframe":
      return `<iframe src="${item.mediaSrc}" title="${title}" loading="lazy"></iframe>`;
    case "model":
      return `<div class="media-placeholder"><span>3D model</span><small>${item.mediaSrc}</small></div>`;
    default:
      return `<div class="media-placeholder"><span>Media placeholder</span></div>`;
  }
}

// ─── SLIDESHOW ────────────────────────────────────────────
// project.gallery = array of { mediaSrc, mediaType, caption? }
// Falls back to the single mediaSrc/mediaType if no gallery.

function buildGallery(project) {
  const items = (project.gallery && project.gallery.length > 0)
    ? project.gallery
    : [{ mediaSrc: project.mediaSrc, mediaType: project.mediaType, caption: "" }];
  return items;
}

function createSlideshow(project) {
  const items = buildGallery(project);
  if (items.length === 1) {
    // Single media — no arrows or dots needed
    return `
      <div class="detail-slideshow">
        <div class="slideshow-track" id="slideshow-track">
          <div class="slideshow-slide">${createMediaMarkup(items[0])}</div>
        </div>
      </div>`;
  }

  const slides = items.map((item, i) =>
    `<div class="slideshow-slide" data-index="${i}">
      ${createMediaMarkup(item)}
      ${item.caption ? `<p class="slide-caption">${item.caption}</p>` : ""}
    </div>`
  ).join("");

  const dots = items.map((_, i) =>
    `<button class="slideshow-dot${i === 0 ? " active" : ""}" data-dot="${i}" aria-label="Slide ${i + 1}"></button>`
  ).join("");

  return `
    <div class="detail-slideshow">
      <div class="slideshow-track" id="slideshow-track">${slides}</div>
      <button class="slideshow-prev" id="slideshow-prev" aria-label="Previous">&#8592;</button>
      <button class="slideshow-next" id="slideshow-next" aria-label="Next">&#8594;</button>
      <div class="slideshow-dots" id="slideshow-dots">${dots}</div>
    </div>`;
}

function attachSlideshowEvents() {
  const track = document.getElementById("slideshow-track");
  if (!track) return;

  const slides = track.querySelectorAll(".slideshow-slide");
  if (slides.length <= 1) return;

  const dots = document.querySelectorAll(".slideshow-dot");
  const prev = document.getElementById("slideshow-prev");
  const next = document.getElementById("slideshow-next");
  let current = 0;

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.scrollTo({ left: current * track.offsetWidth, behavior: "smooth" });
    dots.forEach((d, i) => d.classList.toggle("active", i === current));
  }

  prev?.addEventListener("click", () => goTo(current - 1));
  next?.addEventListener("click", () => goTo(current + 1));
  dots.forEach((dot) => dot.addEventListener("click", () => goTo(Number(dot.dataset.dot))));

  // Sync dots on manual swipe
  track.addEventListener("scrollend", () => {
    const index = Math.round(track.scrollLeft / track.offsetWidth);
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
    current = index;
  });
}

// ─── CATEGORIES ───────────────────────────────────────────

function renderCategories() {
  const allCard = `
    <button class="category-card ${currentCategory === "all" ? "active" : ""}"
      type="button" data-category="all"
      style="--category-color: var(--accent)">
      <span class="category-symbol">✦</span>
      <strong>All</strong>
      <small>Complete archive</small>
    </button>`;

  const cards = categories.map((c) => `
    <button class="category-card ${currentCategory === c.id ? "active" : ""}"
      type="button" data-category="${c.id}"
      style="--category-color: ${c.color}">
      <strong>${getCategoryName(c)}</strong>
      <small>${getCategoryDescription(c)}</small>
    </button>`).join("");

  categoryGrid.innerHTML = allCard + cards;

  categoryGrid.querySelectorAll(".category-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentCategory = btn.dataset.category;
      renderCategories();
      renderProjects();
    });
  });
}

// ─── PROJECT CARDS ────────────────────────────────────────

function createProjectCard(project) {
  const cat = getCategory(project.category);
  const label = cat ? getCategoryName(cat) : project.category;
  const color = cat ? cat.color : "var(--accent)";
  const tags = (project.tags || []).map((t) => `<span class="tag">${t}</span>`).join("");

  return `
    <article class="project-card" role="listitem" style="--category-color: ${color}">
      <div class="media">${createMediaMarkup(project)}</div>
      <div class="card-body">
        <div class="project-meta">
          <span>${label}</span>
          <span>${project.year}</span>
          <span>${project.duration}</span>
        </div>
        <h3>${project.title}</h3>
        <div class="project-tags">${tags}</div>
        <p>${project.shortDescription}</p>
        <button class="detail-button" type="button" data-project-id="${project.id}">View details</button>
      </div>
    </article>`;
}

function getVisibleProjects() {
  if (currentCategory === "all") return projects;
  return projects.filter((p) => p.category === currentCategory);
}

function renderProjects() {
  const visible = getVisibleProjects();
  projectGrid.innerHTML = visible.map(createProjectCard).join("");
  projectCount.textContent = `${visible.length} project${visible.length === 1 ? "" : "s"}`;

  projectGrid.querySelectorAll(".detail-button").forEach((btn) => {
    btn.addEventListener("click", () => openProjectDetail(btn.dataset.projectId));
  });
}

// ─── PROJECT DETAIL ───────────────────────────────────────

function openProjectDetail(projectId) {
  const project = projects.find((p) => p.id === projectId);
  if (!project) return;

  const cat = getCategory(project.category);
  const label = cat ? getCategoryName(cat) : project.category;
  const color = cat ? cat.color : "var(--accent)";
  const tags = (project.tags || []).map((t) => `<span class="tag">${t}</span>`).join("");

  detailContent.innerHTML = `
    <div style="--category-color: ${color}">
      ${createSlideshow(project)}
      <div class="detail-body">
        <p class="section-label">${label}</p>
        <h2>${project.title}</h2>
        <div class="project-meta">
          <span>${project.year}</span>
          <span>Duration: ${project.duration}</span>
        </div>
        <div class="project-tags">${tags}</div>
        <p>${project.shortDescription}</p>
        <p>${project.longDescription}</p>
        ${project.externalLink && project.externalLink !== "#"
          ? `<a class="external-link" href="${project.externalLink}" target="_blank" rel="noopener noreferrer">External link</a>`
          : ""}
      </div>
    </div>`;

  attachSlideshowEvents();
  detail.classList.remove("hidden");
  detail.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function closeProjectDetail() {
  detail.classList.add("hidden");
  detail.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

// ─── CV MODAL ─────────────────────────────────────────────

function openCV() {
  cvModal.classList.remove("hidden");
  cvModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function closeCV() {
  cvModal.classList.add("hidden");
  cvModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

// ─── EVENTS ───────────────────────────────────────────────

function attachEvents() {
  themeToggle.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next, true);
  });

  closeDetailButtons.forEach((btn) => btn.addEventListener("click", closeProjectDetail));

  cvOpenButton.addEventListener("click", openCV);
  closeCvButtons.forEach((btn) => btn.addEventListener("click", closeCV));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProjectDetail();
      closeCV();
    }
  });
}

// ─── INIT ─────────────────────────────────────────────────

function init() {
  loadTheme();
  renderCategories();
  renderProjects();
  attachEvents();
}

document.addEventListener("DOMContentLoaded", init);