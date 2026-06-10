// ─────────────────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────────────────

const categories = [
  {
    id: "light-space",
    name: "Light & Space",
    color: "#ff9800",
    description: "Projection, scenography, DMX, spatial light.",
    deskLabel: "RGB SPOT + PROJECTOR",
    hotspot: "hs-light"
  },
  {
    id: "interactive-systems",
    name: "Interactive Systems",
    color: "#00e5ff",
    description: "TouchDesigner, sensors, physical computing.",
    deskLabel: "SOLDERING STATION",
    hotspot: "hs-interactive"
  },
  {
    id: "three-d-worlds",
    name: "3D Worlds",
    color: "#7c4dff",
    description: "Blender, WebGL, virtual spaces and objects.",
    deskLabel: "3D RENDER MONITOR",
    hotspot: "hs-3d"
  },
  {
    id: "events-communities",
    name: "Events & Communities",
    color: "#ff6e40",
    description: "Collective projects, music, identity.",
    deskLabel: "MIXER + RECORDS",
    hotspot: "hs-events"
  },
  {
    id: "research-design",
    name: "Research & Design",
    color: "#69f0ae",
    description: "UX, accessibility, systems thinking.",
    deskLabel: "NOTEBOOKS + STICKY NOTES",
    hotspot: "hs-research"
  }
];

// ─────────────────────────────────────────────────────────
// PROJECTS
//
// mediaType: "image" | "video" | "youtube" | "iframe"
// For YouTube: use embed URL "https://www.youtube.com/embed/VIDEO_ID"
// gallery: array of { mediaSrc, mediaType, caption }
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

    mediaType: "image",
    mediaSrc: "assets/images/matazz_2.jpg",

    shortDescription: "A spatial visual setup for a MATAZZ event in Basel.",
    longDescription: "This project explores projected atmospheres, event identity and live visual material. The goal was to support the music and the social energy of the space without overpowering it.",
    externalLink: "#",

    gallery: [
      { mediaSrc: "assets/images/matazz_1.jpg",  mediaType: "image", caption: "Setup overview" },
      { mediaSrc: "assets/images/matazz_2.jpg",  mediaType: "image", caption: "Live projection" },
      // { mediaSrc: "assets/videos/matazz-basel.mp4", mediaType: "video", caption: "Documentation" },
    ]
  },

  // ── INTERACTIVE SYSTEMS ────────────────────────────────

  {
    id: "pakshiraj",
    title: "Pakshiraj",
    year: "2025",
    category: "interactive-systems",
    tags: ["mask", "electromagnetic", "birds", "LED", "headphones", "prototype"],
    duration: "school project",

    mediaType: "image",
    mediaSrc: "assets/images/pakshiraj_2.jpeg",

    shortDescription: "A sensory mask designed to make people feel how birds perceive electromagnetic fields — with LEDs and ambient soundscapes evoking the dizziness of hyperacute perception.",
    longDescription: "Pakshiraj is inspired by the heightened sensitivity birds have to electromagnetic fields, which they use for navigation. The project translates this alien sense into a wearable experience: a mask embedded with reactive LEDs and headphones playing spatial ambient noise. When worn, the user experiences a disorienting, dizzying sensation meant to approximate what a bird might perceive when flying through areas of electromagnetic interference — as if the world itself becomes unstable and signal-saturated.",
    externalLink: "#",

    gallery: [
      { mediaSrc: "assets/images/pakshiraj_2.jpeg", mediaType: "image", caption: "Mask front view" },
      { mediaSrc: "assets/images/pakshiraj_3.jpeg", mediaType: "image", caption: "Detail" },
      // To add YouTube: { mediaSrc: "https://www.youtube.com/embed/YOUR_VIDEO_ID", mediaType: "youtube", caption: "Demo video" },
    ]
  },

  {
  id: "AddictiveFarbMischung",
  title: "Addictive FarbMischung",
  year: "2026",
  category: "interactive-systems",
  tags: ["Arduino", "TouchDesigner", "RGB", "light", "interaction"],
  duration: "school project",
  mediaType: "image",
  mediaSrc: "assets/images/lichtfarbe_1.jpeg",
  shortDescription: "An interactive light system using a joystick, Arduino and TouchDesigner to control three RGB light sources.",
  longDescription: "Created for Licht, Farbe und Interaktion, this project explores additive color mixing through space, layers and interaction. A joystick connected to Arduino sends control data to TouchDesigner, which drives three RGB lights. The lights converge toward a wall to create white light. Between the lamps and the wall, two layers of tulle make the mixing process visible: the first layer shows the primary colors separately, the second layer reveals the secondary colors cyan, yellow and magenta, and the final wall surface receives the combined white light.",
externalLink: "#",
    gallery: [
      { mediaSrc: "assets/images/lichtfarbe_1.jpeg", mediaType: "image", caption: "Classroom A" },
      { mediaSrc: "assets/images/lichtfarbe_2.jpeg", mediaType: "image", caption: "Classroom B" },
      { mediaSrc: "assets/images/lichtfarbe_3.jpeg", mediaType: "image", caption: "Classroom C" },


    ]
  },

  // ── 3D WORLDS ──────────────────────────────────────────

  {
    id: "classroom-3d-models",
    title: "Classroom 3D Models",
    year: "2025",
    category: "three-d-worlds",
    tags: ["3D modeling", "Blender", "environment"],
    duration: "school exercises",

    mediaType: "image",
    mediaSrc: "assets/images/classroom-3d-models.jpg",

    shortDescription: "Two classroom environments modelled as spatial studies — proportion, atmosphere and object-based worldbuilding.",
    longDescription: "These models focus on proportion, atmosphere and object-based worldbuilding. Technical modelling practice with attention to light, surfaces and details.",
    externalLink: "#",

    gallery: [
      { mediaSrc: "assets/images/classroom-3d-models.jpg", mediaType: "image", caption: "Classroom A" },
      // { mediaSrc: "assets/images/classroom-3d-models-b.jpg", mediaType: "image", caption: "Classroom B" },
    ]
  },

  {
    id: "Jurassia",
    title: "Jurassia",
    year: "2025",
    category: "three-d-worlds",
    tags: ["3D world", "environment", "worldbuilding"],
    duration: "3D project",

    mediaType: "image",
    mediaSrc: "assets/images/jurassia.jpg",

    shortDescription: "A 3D worldbuilding project exploring landscape, atmosphere and narrative space.",
    longDescription: "Environment design, visual storytelling and spatial imagination — a world built from light and geometry.",
    externalLink: "#",

    gallery: [
      { mediaSrc: "assets/images/jurassia.jpg", mediaType: "image", caption: "World overview" },
      // { mediaSrc: "assets/images/jurassia-2.jpg", mediaType: "image", caption: "" },
    ]
  },

  // ── EVENTS & COMMUNITIES ───────────────────────────────

  {
    id: "matazz-oltre-la-pietra",
    title: "MATAZZ — Oltre la Pietra",
    year: "2025",
    category: "events-communities",
    tags: ["MATAZZ", "projection", "interviews", "exhibition"],
    duration: "exhibition project",

    mediaType: "image",
    mediaSrc: "assets/images/oltrelapietra_1.jpg",

    shortDescription: "Collective exhibition at Castelgrande with projections, interviews, documentation and web content.",
    longDescription: "My role moved between visual atmosphere, technical setup, video loops, artist interviews, documentation and the translation of artists' voices into written material for the online archive.",
    externalLink: "#",

    gallery: [
      { mediaSrc: "assets/images/oltrelapietra_1.jpg", mediaType: "image", caption: "Exhibition view" },
      { mediaSrc: "assets/images/oltrelapietra_2.jpg", mediaType: "image", caption: "Exhibition view" },
      { mediaSrc: "assets/images/oltrelapietra_3.jpg", mediaType: "image", caption: "Exhibition view" },
      { mediaSrc: "assets/images/oltrelapietra_4.jpg", mediaType: "image", caption: "Exhibition view" },
      { mediaSrc: "https://www.youtube.com/watch?v=OehcBk7lPQ4", mediaType: "youtube", caption: "Extended cut" },

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

    mediaType: "video",
    mediaSrc: "assets/videos/permaculture_1.mp4",

    shortDescription: "A research-oriented project around plant growth, ecological systems and care.",
    longDescription: "Observation, process thinking and sensitivity toward living systems. Connecting ecology, time and design.",
    externalLink: "#",

    gallery: [
//      { mediaSrc: "assets/images/permaculture-growing-plants.jpg", mediaType: "image", caption: "" },
      { mediaSrc: "assets/videos/permaculture_1.mp4", mediaType: "video", caption: "Documentation" },

]
  },

  {
    id: "accessible-architecture-tool",
    title: "Accessible Architecture Tool",
    year: "2025",
    category: "research-design",
    tags: ["UX", "accessibility", "design tool"],
    duration: "research project",

    mediaType: "image",
    mediaSrc: "assets/images/accessible-architecture-tool.jpg",

    shortDescription: "A digital design tool helping architects consider accessibility earlier in private residential projects.",
    longDescription: "Based on interviews, spatial analysis and prototyping — how accessibility can become part of the design process before it turns into a late technical correction.",
    externalLink: "#",

    gallery: [
      { mediaSrc: "assets/images/accessible-architecture-tool.jpg", mediaType: "image", caption: "" },
      // { mediaSrc: "assets/videos/accessible-architecture-tool.mp4", mediaType: "video", caption: "Prototype demo" },
    ]
  }

];
