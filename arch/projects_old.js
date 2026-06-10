// ─────────────────────────────────────────────────────────
// CATEGORIES — non toccare a meno che non aggiungi categorie
// ─────────────────────────────────────────────────────────

const categories = [
  {
    id: "light-space",
    name: "Light & Space",
    color: "#f0a35f",
    description: "Projection, scenography, DMX, spatial light and atmosphere."
  },
  {
    id: "interactive-systems",
    name: "Interactive Systems",
    color: "#7fb7c9",
    description: "TouchDesigner, sensors, physical computing and creative coding."
  },
  {
    id: "three-d-worlds",
    name: "3D Worlds",
    color: "#b79ad9",
    description: "3D modelling, Blender, WebGL, virtual spaces and objects."
  },
  {
    id: "events-communities",
    name: "Events & Communities",
    color: "#d98c8c",
    description: "Collective projects, music, documentation, identity and social media."
  },
  {
    id: "research-design",
    name: "Research & Design",
    color: "#9abf88",
    description: "UX, accessibility, interviews, systems thinking and prototypes."
  }
];

// ─────────────────────────────────────────────────────────
// PROJECTS
//
// mediaSrc  → immagine/video che appare sulla CARD nella griglia
// gallery   → tutte le immagini/video nel SLIDESHOW del dettaglio
//
// mediaType può essere: "image" | "video" | "youtube" | "iframe"
//
// Per YouTube usa: "https://www.youtube.com/embed/ID_DEL_VIDEO"
// ─────────────────────────────────────────────────────────

const projects = [

  // ── LIGHT & SPACE ──────────────────────────────────────

  {
    id: "matazz-basel",
    title: "MATAZZ Basel",
    year: "2025",
    category: "light-space",
    tags: ["projection", "visuals", "event"],
    duration: "event project",

    // Foto principale sulla card:
    mediaType: "image",
    mediaSrc: "assets/images/matazz_2.jpg",

    shortDescription: "A spatial visual setup for a MATAZZ event in Basel.",
    longDescription: "This project explores projected atmospheres, event identity and live visual material. The goal was to support the music and the social energy of the space without overpowering it.",
    externalLink: "#",

    gallery: [
      { mediaSrc: "assets/images/matazz_1.jpg",   mediaType: "image", caption: "" },
      { mediaSrc: "assets/images/matazz_2.jpg",   mediaType: "image", caption: "" },
      // { mediaSrc: "assets/images/matazz_3.jpg", mediaType: "image", caption: "" },
      // { mediaSrc: "assets/videos/matazz-basel.mp4",   mediaType: "video", caption: "" },
    ]
  },

  // ── INTERACTIVE SYSTEMS ────────────────────────────────

  {
    id: "pakshiraj",
    title: "Pakshiraj",
    year: "2025",
    category: "interactive-systems",
    tags: ["schoolproject", "interaction", "prototype"],
    duration: "school project",

    mediaType: "image",
    mediaSrc: "assets/images/pakshiraj_2.jpeg",

    shortDescription: "A school project exploring interaction, symbolic systems and responsive experience.",
    longDescription: "The project shows conceptual thinking, prototyping and the translation of an abstract reference into an interactive system.",
    externalLink: "#",

    gallery: [
      { mediaSrc: "assets/images/pakshiraj_2.jpeg",   mediaType: "image", caption: "" },
      { mediaSrc: "assets/images/pakshiraj_3.jpeg", mediaType: "image", caption: "" },
      // { mediaSrc: "assets/videos/pakshiraj.mp4",   mediaType: "video", caption: "" },
    ]
  },

  {
    id: "in-another-light",
    title: "In Another Light",
    year: "2025",
    category: "interactive-systems",
    tags: ["TouchDesigner", "DMX", "installation"],
    duration: "4 weeks",

    mediaType: "video",
    mediaSrc: "assets/videos/in-another-light.mp4",

    shortDescription: "An interactive installation where sound, presence and darkness influence projected visuals and DMX-controlled light.",
    longDescription: "Built with TouchDesigner, microphone input, camera detection and Eurolite DMX lights, the project investigated how a room can react to people through subtle audiovisual changes.",
    externalLink: "#",

    gallery: [
      { mediaSrc: "assets/videos/in-another-light.mp4",      mediaType: "video", caption: "Documentation" },
      // { mediaSrc: "assets/images/in-another-light-1.jpg",    mediaType: "image", caption: "" },
      // { mediaSrc: "assets/images/in-another-light-2.jpg",    mediaType: "image", caption: "" },
      // { mediaSrc: "https://www.youtube.com/embed/ID_VIDEO",  mediaType: "youtube", caption: "" },
    ]
  },

  // ── 3D WORLDS ──────────────────────────────────────────

  {
    id: "classroom-3d-models",
    title: "Classroom 3D Models",
    year: "2025",
    category: "three-d-worlds",
    tags: ["3Dmodeling", "Blender", "environment"],
    duration: "school exercises",

    mediaType: "image",
    mediaSrc: "assets/images/classroom-3d-models.jpg",

    shortDescription: "Two classroom environments modelled as spatial studies.",
    longDescription: "These models focus on proportion, atmosphere and object-based worldbuilding. They show technical modelling practice and attention to light, surfaces and details.",
    externalLink: "#",

    gallery: [
      { mediaSrc: "assets/images/classroom-3d-models.jpg",   mediaType: "image", caption: "Classroom A" },
      // { mediaSrc: "assets/images/classroom-3d-models-b.jpg", mediaType: "image", caption: "Classroom B" },
      // { mediaSrc: "assets/images/classroom-3d-models-c.jpg", mediaType: "image", caption: "" },
      // { mediaSrc: "assets/videos/classroom-3d-models.mp4",   mediaType: "video", caption: "Walkthrough" },
    ]
  },

  {
    id: "Jurassia",
    title: "Jurassia",
    year: "2025",
    category: "three-d-worlds",
    tags: ["3Dworld", "environment", "worldbuilding"],
    duration: "3D project",

    mediaType: "image",
    mediaSrc: "assets/images/jurassia.jpg",

    shortDescription: "A 3D worldbuilding project exploring landscape, atmosphere and narrative space.",
    longDescription: "The project belongs to the 3D Worlds section because it shows environment design, visual storytelling and spatial imagination.",
    externalLink: "#",

    gallery: [
      { mediaSrc: "assets/images/jurassia.jpg",   mediaType: "image", caption: "" },
      // { mediaSrc: "assets/images/jurassia-2.jpg", mediaType: "image", caption: "" },
      // { mediaSrc: "assets/images/jurassia-3.jpg", mediaType: "image", caption: "" },
      // { mediaSrc: "assets/videos/jurassia.mp4",   mediaType: "video", caption: "" },
    ]
  },

  // ── EVENTS & COMMUNITIES ───────────────────────────────

  {
    id: "matazz-oltre-la-pietra",
    title: "MATAZZ — Oltre la Pietra",
    year: "2025",
    category: "events-communities",
    tags: ["MATAZZ", "projection", "interviews", "website"],
    duration: "exhibition project",

    mediaType: "image",
    mediaSrc: "assets/images/oltrelapietra_1.jpg",

    shortDescription: "A collective exhibition project at Castelgrande with projections, interviews, documentation and web content.",
    longDescription: "My role moved between visual atmosphere, technical setup, video loops, artist interviews, documentation and the translation of artists' voices into written material for the online archive.",
    externalLink: "#",

    gallery: [
      { mediaSrc: "assets/images/oltrelapietra_1.jpg",   mediaType: "image", caption: "Exhibition view" },
      { mediaSrc: "assets/images/oltrelapietra_2.jpg", mediaType: "image", caption: "" },
      { mediaSrc: "assets/images/oltrelapietra_3.jpg", mediaType: "image", caption: "" },
      { mediaSrc: "assets/videos/oltrelapietra_4.jpg",   mediaType: "video", caption: "Documentation" },
    ]
  },

  // ── RESEARCH & DESIGN ──────────────────────────────────

  {
    id: "permaculture-growing-plants",
    title: "Permaculture and Growing Plants",
    year: "2025",
    category: "research-design",
    tags: ["research", "ecology", "observation"],
    duration: "research project",

    mediaType: "image",
    mediaSrc: "assets/images/permaculture-growing-plants.jpg",

    shortDescription: "A research-oriented project around plant growth, ecological systems and care.",
    longDescription: "This project explores observation, process thinking and sensitivity toward living systems, connecting ecology, time and design.",
    externalLink: "#",

    gallery: [
      { mediaSrc: "assets/images/permaculture-growing-plants.jpg",   mediaType: "image", caption: "" },
      // { mediaSrc: "assets/images/permaculture-growing-plants-2.jpg", mediaType: "image", caption: "" },
      // { mediaSrc: "assets/images/permaculture-growing-plants-3.jpg", mediaType: "image", caption: "" },
    ]
  },

  {
    id: "accessible-architecture-tool",
    title: "Accessible Architecture Tool",
    year: "2025",
    category: "research-design",
    tags: ["UX", "accessibility", "design-tool"],
    duration: "research project",

    mediaType: "image",
    mediaSrc: "assets/images/accessible-architecture-tool.jpg",

    shortDescription: "A digital design tool helping architects consider accessibility earlier in private residential projects.",
    longDescription: "Based on interviews, spatial analysis and prototyping, the project investigates how accessibility can become part of the design process before it turns into a late technical correction.",
    externalLink: "#",

    gallery: [
      { mediaSrc: "assets/images/accessible-architecture-tool.jpg",   mediaType: "image", caption: "" },
      // { mediaSrc: "assets/images/accessible-architecture-tool-2.jpg", mediaType: "image", caption: "" },
      // { mediaSrc: "assets/images/accessible-architecture-tool-3.jpg", mediaType: "image", caption: "" },
      // { mediaSrc: "assets/videos/accessible-architecture-tool.mp4",   mediaType: "video", caption: "Prototype demo" },
    ]
  }

];
