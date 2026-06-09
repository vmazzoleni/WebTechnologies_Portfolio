const themeKey = "portfolioTheme";
const languageKey = "portfolioLanguage";

const projectGrid = document.getElementById("project-grid");
const projectCount = document.getElementById("project-count");
const categoryGrid = document.getElementById("category-grid");
const langButtons = document.querySelectorAll(".lang");
const themeToggle = document.getElementById("theme-toggle");

const detail = document.getElementById("project-detail");
const detailContent = document.getElementById("project-detail-content");
const closeDetailButtons = document.querySelectorAll("[data-close-detail]");

let currentLanguage = localStorage.getItem(languageKey) || "en";
let currentCategory = "all";

function getText(object) {
  if (typeof object === "string") return object;
  return object[currentLanguage] || object.en || "";
}

function getCategory(categoryId) {
  return categories.find((category) => category.id === categoryId);
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(themeKey, theme);

  themeToggle.textContent = theme === "dark" ? "Sunset" : "Sunrise";
}

function loadTheme() {
  const savedTheme = localStorage.getItem(themeKey);
  const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  applyTheme(savedTheme || preferredTheme);
}

function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem(languageKey, lang);
  document.documentElement.lang = lang;

  langButtons.forEach((button) => {
    const isActive = button.dataset.lang === lang;
    button.classList.toggle("active", isActive);
  });

  updateStaticText();
  renderCategories();
  renderProjects();
}

function updateStaticText() {
  const text = siteText[currentLanguage] || siteText.en;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = text[key] || siteText.en[key] || "";
  });
}

function createMediaMarkup(project) {
  const title = project.title.replace(/"/g, "&quot;");

  if (!project.mediaSrc) {
    return `<div class="media-placeholder">No media yet</div>`;
  }

  switch (project.mediaType) {
    case "image":
      return `<img src="${project.mediaSrc}" alt="${title}" loading="lazy" />`;

    case "video":
      return `
        <video controls muted preload="metadata">
          <source src="${project.mediaSrc}" type="video/mp4" />
          Your browser does not support video.
        </video>
      `;

    case "youtube":
    case "soundcloud":
    case "iframe":
      return `<iframe src="${project.mediaSrc}" title="${title}" loading="lazy"></iframe>`;

    case "model":
      return `
        <div class="media-placeholder">
          <span>3D model placeholder</span>
          <small>${project.mediaSrc}</small>
        </div>
      `;

    default:
      return `<div class="media-placeholder">Media placeholder</div>`;
  }
}

function renderCategories() {
  const text = siteText[currentLanguage] || siteText.en;

  const allCard = `
    <button class="category-card ${currentCategory === "all" ? "active" : ""}" 
      type="button" 
      data-category="all"
      style="--category-color: var(--accent)">
      <span class="category-symbol">✦</span>
      <strong>${text.all}</strong>
      <small>Complete archive</small>
    </button>
  `;

  const categoryCards = categories
    .map((category) => {
      return `
        <button class="category-card ${currentCategory === category.id ? "active" : ""}"
          type="button"
          data-category="${category.id}"
          style="--category-color: ${category.color}">
          <span class="category-symbol">${category.symbol}</span>
          <strong>${getText(category.label)}</strong>
          <small>${getText(category.description)}</small>
        </button>
      `;
    })
    .join("");

  categoryGrid.innerHTML = allCard + categoryCards;

  document.querySelectorAll(".category-card").forEach((button) => {
    button.addEventListener("click", () => {
      currentCategory = button.dataset.category;
      renderCategories();
      renderProjects();
    });
  });
}

function createProjectCard(project) {
  const category = getCategory(project.category);
  const categoryLabel = category ? getText(category.label) : project.category;
  const categoryColor = category ? category.color : "var(--accent)";
  const hashtags = project.hashtags.map((tag) => `<span class="tag">${tag}</span>`).join("");

  return `
    <article class="project-card" role="listitem" style="--category-color: ${categoryColor}">
      <div class="media">
        ${createMediaMarkup(project)}
      </div>

      <div class="card-body">
        <div class="project-meta">
          <span>${categoryLabel}</span>
          <span>${project.date}</span>
          <span>${project.duration}</span>
        </div>

        <h3>${project.title}</h3>

        <div class="project-tags">
          ${hashtags}
        </div>

        <p>${getText(project.description)}</p>

        <button class="detail-button" type="button" data-project-id="${project.id}">
          ${siteText[currentLanguage].viewDetails}
        </button>
      </div>
    </article>
  `;
}

function getVisibleProjects() {
  if (currentCategory === "all") return projects;
  return projects.filter((project) => project.category === currentCategory);
}

function renderProjects() {
  const visibleProjects = getVisibleProjects();

  projectGrid.innerHTML = visibleProjects.map(createProjectCard).join("");

  projectCount.textContent = `${visibleProjects.length} project${
    visibleProjects.length === 1 ? "" : "s"
  }`;

  document.querySelectorAll(".detail-button").forEach((button) => {
    button.addEventListener("click", () => {
      openProjectDetail(button.dataset.projectId);
    });
  });
}

function openProjectDetail(projectId) {
  const project = projects.find((item) => item.id === projectId);
  if (!project) return;

  const category = getCategory(project.category);
  const categoryLabel = category ? getText(category.label) : project.category;
  const categoryColor = category ? category.color : "var(--accent)";
  const hashtags = project.hashtags.map((tag) => `<span class="tag">${tag}</span>`).join("");

  detailContent.innerHTML = `
    <div class="detail-media" style="--category-color: ${categoryColor}">
      ${createMediaMarkup(project)}
    </div>

    <div class="detail-body">
      <p class="section-label">${categoryLabel}</p>
      <h2>${project.title}</h2>

      <div class="project-meta">
        <span>${project.date}</span>
        <span>${siteText[currentLanguage].duration}: ${project.duration}</span>
      </div>

      <div class="project-tags">
        ${hashtags}
      </div>

      <p>${getText(project.description)}</p>
      <p>${getText(project.detail)}</p>

      ${
        project.externalLink && project.externalLink !== "#"
          ? `<a class="external-link" href="${project.externalLink}" target="_blank" rel="noopener noreferrer">External link</a>`
          : ""
      }
    </div>
  `;

  detail.classList.remove("hidden");
  detail.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function closeProjectDetail() {
  detail.classList.add("hidden");
  detail.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

function attachEvents() {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });

  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.lang);
    });
  });

  closeDetailButtons.forEach((button) => {
    button.addEventListener("click", closeProjectDetail);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeProjectDetail();
  });
}

function init() {
  loadTheme();
  setLanguage(currentLanguage);
  attachEvents();
}

document.addEventListener("DOMContentLoaded", init);