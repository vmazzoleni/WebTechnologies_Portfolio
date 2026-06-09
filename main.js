const themeKey = "portfolioTheme";
const projectGrid = document.getElementById("project-grid");
const projectCount = document.getElementById("project-count");
const categoryButtons = document.querySelectorAll(".category-button");
const langButtons = document.querySelectorAll(".lang");
const themeToggle = document.getElementById("theme-toggle");

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(themeKey, theme);
  themeToggle.textContent = theme === "dark" ? "Sunset" : "Sunrise";
  themeToggle.setAttribute("aria-pressed", theme === "dark");
}

function loadTheme() {
  const savedTheme = localStorage.getItem(themeKey);
  const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  applyTheme(savedTheme || preferredTheme);
}

function setLanguage(lang) {
  document.documentElement.lang = lang;
  langButtons.forEach((button) => {
    const active = button.dataset.lang === lang;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active);
  });
}

function createMediaMarkup(project) {
  const title = project.title.replace(/"/g, "&quot;");

  switch (project.mediaType) {
    case "image":
      return `<img src="${project.mediaSrc}" alt="${title} visual preview" loading="lazy" />`;
    case "video":
      return `<video src="${project.mediaSrc}" controls muted preload="metadata" aria-label="${title} video preview">Your browser does not support video.</video>`;
    case "iframe":
      return `<iframe srcdoc='${project.mediaSrc}' title="${title} iframe preview"></iframe>`;
    case "soundcloud":
      return `<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="${project.mediaSrc}" title="${title} SoundCloud preview"></iframe>`;
    case "youtube":
      return `<iframe width="100%" height="220" src="${project.mediaSrc}" title="${title} YouTube preview" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    case "gdrive":
      return `<iframe srcdoc='${project.mediaSrc}' title="${title} Google Drive preview"></iframe>`;
    case "model":
      return `<div class="model-placeholder"><div><span>GLB / GLTF model placeholder</span><p>${project.mediaSrc}</p></div></div>`;
    default:
      return `<div class="model-placeholder"><div><span>Media placeholder</span><p>Type: ${project.mediaType}</p></div></div>`;
  }
}

function createProjectCard(project) {
  const hashtags = project.hashtags
    .map((tag) => `<span class="tag">${tag}</span>`)
    .join("");

  return `
    <article class="project-card" role="listitem">
      <div class="media">${createMediaMarkup(project)}</div>
      <div class="card-body">
        <div class="project-meta">
          <span>${project.category}</span>
          <span>${project.date}</span>
          <span>${project.duration}</span>
        </div>
        <h4>${project.title}</h4>
        <div class="project-tags">${hashtags}</div>
        <p>${project.description}</p>
        <div class="project-actions">
          <a href="${project.externalLink}" target="_blank" rel="noopener noreferrer">View details</a>
        </div>
      </div>
    </article>
  `;
}

function renderProjects(list) {
  projectGrid.innerHTML = list.map(createProjectCard).join("");
  projectCount.textContent = `${list.length} project${list.length === 1 ? "" : "s"}`;
}

function updateActiveCategory(button) {
  categoryButtons.forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
}

function filterProjects(category) {
  if (category === "all") {
    renderProjects(projects);
    return;
  }

  const filtered = projects.filter((project) => project.category === category);
  renderProjects(filtered);
}

function attachEvents() {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      updateActiveCategory(button);
      filterProjects(button.dataset.category);
    });
  });

  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.lang);
    });
  });
}

function init() {
  loadTheme();
  setLanguage("en");
  renderProjects(projects);
  attachEvents();
}

document.addEventListener("DOMContentLoaded", init);
