let data = { categories: [], projects: [] };
let currentIndex = -1;

const fields = [
  "id",
  "title",
  "year",
  "category",
  "tags",
  "duration",
  "mediaType",
  "mediaSrc",
  "shortDescription",
  "longDescription",
  "externalLink"
];

const picker = document.getElementById("project-picker");
const categorySelect = document.getElementById("category");
const galleryItems = document.getElementById("gallery-items");
const preview = document.getElementById("preview");

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function assetPath(file) {
  if (!file) return "";
  const folder = file.type.startsWith("video/") ? "assets/videos" : "assets/images";
  return `${folder}/${file.name}`;
}

function normalizeYoutube(value) {
  const input = value.trim();
  if (!input) return "";
  if (input.includes("youtube.com/embed/")) return input;
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return `https://www.youtube.com/embed/${input}`;

  try {
    const url = new URL(input);
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : input;
    }
    if (url.hostname.includes("youtube.com")) {
      const id = url.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : input;
    }
  } catch (error) {
    return input;
  }

  return input;
}

function normalizeMediaSrc(mediaType, value) {
  return mediaType === "youtube" ? normalizeYoutube(value) : value.trim();
}

function populateCategories() {
  categorySelect.innerHTML = data.categories
    .map((cat) => `<option value="${cat.id}">${cat.name}</option>`)
    .join("");
}

function populatePicker() {
  picker.innerHTML = [
    `<option value="-1">Create new project</option>`,
    ...data.projects.map((project, index) => `<option value="${index}">${project.title}</option>`)
  ].join("");
  picker.value = String(currentIndex);
}

function emptyProject() {
  return {
    id: "",
    title: "",
    year: "",
    category: data.categories[0]?.id || "",
    tags: [],
    duration: "",
    mediaType: "image",
    mediaSrc: "",
    shortDescription: "",
    longDescription: "",
    externalLink: "#",
    gallery: []
  };
}

function setForm(project) {
  fields.forEach((field) => {
    const input = document.getElementById(field);
    if (!input) return;
    input.value = field === "tags" ? (project.tags || []).join(", ") : project[field] || "";
  });

  galleryItems.innerHTML = "";
  (project.gallery || []).forEach((item) => addGalleryRow(item));
  updatePreview();
}

function readForm() {
  const mediaType = document.getElementById("mediaType").value;
  const gallery = [...galleryItems.querySelectorAll(".gallery-row")]
    .map((row) => {
      const itemType = row.querySelector(".gallery-type").value;
      return {
        mediaType: itemType,
        mediaSrc: normalizeMediaSrc(itemType, row.querySelector(".gallery-src").value),
        caption: row.querySelector(".gallery-caption").value.trim()
      };
    })
    .filter((item) => item.mediaSrc);

  return {
    id: document.getElementById("id").value.trim(),
    title: document.getElementById("title").value.trim(),
    year: document.getElementById("year").value.trim(),
    category: document.getElementById("category").value,
    tags: document.getElementById("tags").value.split(",").map((tag) => tag.trim()).filter(Boolean),
    duration: document.getElementById("duration").value.trim(),
    mediaType,
    mediaSrc: normalizeMediaSrc(mediaType, document.getElementById("mediaSrc").value),
    shortDescription: document.getElementById("shortDescription").value.trim(),
    longDescription: document.getElementById("longDescription").value.trim(),
    externalLink: document.getElementById("externalLink").value.trim() || "#",
    gallery
  };
}

function validateProject(project) {
  const required = ["id", "title", "year", "category", "mediaType", "mediaSrc", "shortDescription", "longDescription"];
  const missing = required.filter((field) => !project[field]);
  if (missing.length) {
    throw new Error(`Missing required fields: ${missing.join(", ")}`);
  }
}

function addGalleryRow(item = {}) {
  const row = document.createElement("div");
  row.className = "gallery-row";
  row.innerHTML = `
    <label>
      <span>Type</span>
      <select class="gallery-type">
        <option value="image">image</option>
        <option value="video">video</option>
        <option value="youtube">youtube</option>
        <option value="iframe">iframe</option>
      </select>
    </label>
    <label>
      <span>Path or URL</span>
      <input class="gallery-src" placeholder="assets/images/detail.jpg" />
    </label>
    <label>
      <span>Select file</span>
      <input class="gallery-file" type="file" accept="image/*,video/*" />
    </label>
    <label>
      <span>Caption</span>
      <input class="gallery-caption" />
    </label>
    <button type="button" aria-label="Remove gallery item">X</button>
  `;

  row.querySelector(".gallery-type").value = item.mediaType || "image";
  row.querySelector(".gallery-src").value = item.mediaSrc || "";
  row.querySelector(".gallery-caption").value = item.caption || "";
  row.querySelector(".gallery-file").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;
    row.querySelector(".gallery-src").value = assetPath(file);
    row.querySelector(".gallery-type").value = file.type.startsWith("video/") ? "video" : "image";
    updatePreview();
  });
  row.querySelector("button").addEventListener("click", () => {
    row.remove();
    updatePreview();
  });
  row.querySelectorAll("input, select").forEach((input) => {
    input.addEventListener("input", updatePreview);
    input.addEventListener("change", updatePreview);
  });
  galleryItems.appendChild(row);
}

function updatePreview() {
  try {
    const project = readForm();
    preview.textContent = JSON.stringify(project, null, 2);
  } catch (error) {
    preview.textContent = error.message;
  }
}

function saveCurrentProject() {
  const project = readForm();
  validateProject(project);

  const existing = data.projects.findIndex((item, index) => item.id === project.id && index !== currentIndex);
  if (existing !== -1) {
    throw new Error("Another project already uses this ID.");
  }

  if (currentIndex === -1) {
    data.projects.push(project);
    currentIndex = data.projects.length - 1;
  } else {
    data.projects[currentIndex] = project;
  }

  populatePicker();
  updatePreview();
}

function download(filename, content, type = "application/json") {
  const blob = new Blob([content], { type });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function exportJson() {
  saveCurrentProject();
  download("projects.json", `${JSON.stringify(data, null, 2)}\n`);
}

function exportJs() {
  saveCurrentProject();
  const content = `window.portfolioData = ${JSON.stringify(data, null, 2)};\n`;
  download("projects.js", content, "text/javascript");
}

async function publishToGithub() {
  saveCurrentProject();

  const owner = document.getElementById("github-owner").value.trim();
  const repo = document.getElementById("github-repo").value.trim();
  const branch = document.getElementById("github-branch").value.trim() || "main";
  const token = document.getElementById("github-token").value.trim();
  const status = document.getElementById("github-status");

  if (!owner || !repo || !token) {
    status.textContent = "Username, repository and token are required.";
    return;
  }

  sessionStorage.setItem("github-owner", owner);
  sessionStorage.setItem("github-repo", repo);
  sessionStorage.setItem("github-branch", branch);

  const api = `https://api.github.com/repos/${owner}/${repo}/contents/projects.json`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json"
  };

  status.textContent = "Checking current file...";
  const current = await fetch(`${api}?ref=${encodeURIComponent(branch)}`, { headers });
  const currentData = current.ok ? await current.json() : {};
  const latestProject = readForm();
  const body = {
    message: `Add project: ${latestProject.title}`,
    content: btoa(unescape(encodeURIComponent(`${JSON.stringify(data, null, 2)}\n`))),
    branch
  };

  if (currentData.sha) {
    body.sha = currentData.sha;
    body.message = `Update project: ${latestProject.title}`;
  }

  status.textContent = "Publishing projects.json...";
  const response = await fetch(api, {
    method: "PUT",
    headers,
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const error = await response.text();
    status.textContent = `GitHub publish failed: ${error}`;
    return;
  }

  status.textContent = "Published projects.json to GitHub.";
}

async function init() {
  const response = await fetch("../projects.json", { cache: "no-cache" });
  data = await response.json();
  populateCategories();
  populatePicker();
  setForm(data.projects[0] || emptyProject());
  currentIndex = data.projects.length ? 0 : -1;
  picker.value = String(currentIndex);

  const savedOwner = sessionStorage.getItem("github-owner");
  const savedRepo = sessionStorage.getItem("github-repo");
  const savedBranch = sessionStorage.getItem("github-branch");
  if (savedOwner) document.getElementById("github-owner").value = savedOwner;
  if (savedRepo) document.getElementById("github-repo").value = savedRepo;
  if (savedBranch) document.getElementById("github-branch").value = savedBranch;
}

picker.addEventListener("change", () => {
  currentIndex = Number(picker.value);
  setForm(currentIndex === -1 ? emptyProject() : data.projects[currentIndex]);
});

document.getElementById("new-project").addEventListener("click", () => {
  currentIndex = -1;
  picker.value = "-1";
  setForm(emptyProject());
});

document.getElementById("save-project").addEventListener("click", () => {
  try {
    saveCurrentProject();
  } catch (error) {
    preview.textContent = error.message;
  }
});

document.getElementById("add-gallery-item").addEventListener("click", () => {
  addGalleryRow();
  updatePreview();
});

document.getElementById("download-json").addEventListener("click", () => {
  try {
    exportJson();
  } catch (error) {
    preview.textContent = error.message;
  }
});

document.getElementById("download-js").addEventListener("click", () => {
  try {
    exportJs();
  } catch (error) {
    preview.textContent = error.message;
  }
});

document.getElementById("publish-github").addEventListener("click", () => {
  publishToGithub().catch((error) => {
    document.getElementById("github-status").textContent = error.message;
  });
});

document.getElementById("title").addEventListener("input", (event) => {
  const idField = document.getElementById("id");
  if (!idField.value || currentIndex === -1) {
    idField.value = slugify(event.target.value);
  }
  updatePreview();
});

document.getElementById("mediaFile").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;
  document.getElementById("mediaSrc").value = assetPath(file);
  document.getElementById("mediaType").value = file.type.startsWith("video/") ? "video" : "image";
  updatePreview();
});

document.querySelectorAll("#project-form input, #project-form select, #project-form textarea").forEach((input) => {
  input.addEventListener("input", updatePreview);
  input.addEventListener("change", updatePreview);
});

init().catch((error) => {
  preview.textContent = `Could not load ../projects.json: ${error.message}`;
});
