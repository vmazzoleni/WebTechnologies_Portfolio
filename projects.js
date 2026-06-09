// PORTFOLIO CATEGORIES
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

// PORTFOLIO PROJECTS
// To add a new project, duplicate the object below and update all properties.
const projects = [
  {
    id: "matazz-basel",
    title: "MATAZZ Basel",
    year: "2025",
    category: "light-space",
    tags: ["projection", "visuals", "event"],
    duration: "event project",
    mediaType: "image",
    mediaSrc: "assets/images/matazz-basel.jpg",
    shortDescription: "A spatial visual setup for a MATAZZ event in Basel.",
    longDescription: "This project explores projected atmospheres, event identity and live visual material. The goal was to support the music and the social energy of the space without overpowering it.",
    externalLink: "#"
  },

  {
    id: "pakshiraj",
    title: "Pakshiraj",
    year: "2025",
    category: "interactive-systems",
    tags: ["schoolproject", "interaction", "prototype"],
    duration: "school project",
    mediaType: "image",
    mediaSrc: "assets/images/pakshiraj.jpg",
    shortDescription: "A school project exploring interaction, symbolic systems and responsive experience.",
    longDescription: "The project shows conceptual thinking, prototyping and the translation of an abstract reference into an interactive system.",
    externalLink: "#"
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
    externalLink: "#"
  },

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
    externalLink: "#"
  },

  {
    id: "giurassia",
    title: "Giurassia",
    year: "2025",
    category: "three-d-worlds",
    tags: ["3Dworld", "environment", "worldbuilding"],
    duration: "3D project",
    mediaType: "image",
    mediaSrc: "assets/images/giurassia.jpg",
    shortDescription: "A 3D worldbuilding project exploring landscape, atmosphere and narrative space.",
    longDescription: "The project belongs to the 3D Worlds section because it shows environment design, visual storytelling and spatial imagination.",
    externalLink: "#"
  },

  {
    id: "matazz-oltre-la-pietra",
    title: "MATAZZ - Oltre la Pietra",
    year: "2025",
    category: "events-communities",
    tags: ["MATAZZ", "projection", "interviews", "website"],
    duration: "exhibition project",
    mediaType: "image",
    mediaSrc: "assets/images/matazz-oltre-la-pietra.jpg",
    shortDescription: "A collective exhibition project at Castelgrande with projections, interviews, documentation and web content.",
    longDescription: "My role moved between visual atmosphere, technical setup, video loops, artist interviews, documentation and the translation of artists voices into written material for the online archive.",
    externalLink: "#"
  },

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
    externalLink: "#"
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
    externalLink: "#"
  }
];