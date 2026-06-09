const siteText = {
  en: {
    eyebrow: "creative portfolio",
    heroTitle: "Light, interaction and digital atmospheres.",
    heroText:
      "Selected works across spatial visuals, interactive systems, 3D worlds, research and collective events.",
    categoryLabel: "Creative fields",
    categoryTitle: "Five connected areas of practice.",
    projectsLabel: "Projects",
    projectsTitle: "Featured works",
    aboutLabel: "About",
    aboutTitle: "A portfolio built to grow slowly.",
    aboutText:
      "This website is designed as a living archive: lightweight, accessible, multilingual and easy to update through a simple project data file.",
    all: "All",
    viewDetails: "View details",
    close: "Close",
    duration: "Duration"
  },

  it: {
    eyebrow: "portfolio creativo",
    heroTitle: "Luce, interazione e atmosfere digitali.",
    heroText:
      "Una selezione di lavori tra visual spaziali, sistemi interattivi, mondi 3D, ricerca e progetti collettivi.",
    categoryLabel: "Campi creativi",
    categoryTitle: "Cinque aree di pratica connesse.",
    projectsLabel: "Progetti",
    projectsTitle: "Lavori selezionati",
    aboutLabel: "About",
    aboutTitle: "Un portfolio pensato per crescere lentamente.",
    aboutText:
      "Questo sito è progettato come un archivio vivo: leggero, accessibile, multilingue e facile da aggiornare tramite un semplice file dati.",
    all: "Tutti",
    viewDetails: "Apri progetto",
    close: "Chiudi",
    duration: "Durata"
  },

  fr: {
    eyebrow: "portfolio créatif",
    heroTitle: "Lumière, interaction et atmosphères numériques.",
    heroText:
      "Une sélection de travaux entre visuels spatiaux, systèmes interactifs, mondes 3D, recherche et projets collectifs.",
    categoryLabel: "Champs créatifs",
    categoryTitle: "Cinq domaines de pratique connectés.",
    projectsLabel: "Projets",
    projectsTitle: "Travaux sélectionnés",
    aboutLabel: "À propos",
    aboutTitle: "Un portfolio conçu pour grandir lentement.",
    aboutText:
      "Ce site est pensé comme une archive vivante: légère, accessible, multilingue et facile à mettre à jour avec un simple fichier de données.",
    all: "Tous",
    viewDetails: "Voir le projet",
    close: "Fermer",
    duration: "Durée"
  },

  de: {
    eyebrow: "kreatives portfolio",
    heroTitle: "Licht, Interaktion und digitale Atmosphären.",
    heroText:
      "Ausgewählte Arbeiten zwischen räumlichen Visuals, interaktiven Systemen, 3D-Welten, Recherche und kollektiven Projekten.",
    categoryLabel: "Kreative Felder",
    categoryTitle: "Fünf verbundene Praxisbereiche.",
    projectsLabel: "Projekte",
    projectsTitle: "Ausgewählte Arbeiten",
    aboutLabel: "Über mich",
    aboutTitle: "Ein Portfolio, das langsam wachsen darf.",
    aboutText:
      "Diese Website ist als lebendiges Archiv gedacht: leicht, zugänglich, mehrsprachig und einfach über eine Datendatei zu aktualisieren.",
    all: "Alle",
    viewDetails: "Projekt öffnen",
    close: "Schließen",
    duration: "Dauer"
  }
};

const categories = [
  {
    id: "light-space",
    symbol: "☀",
    color: "#f0a35f",
    label: {
      en: "Light & Space",
      it: "Luce & Spazio",
      fr: "Lumière & Espace",
      de: "Licht & Raum"
    },
    description: {
      en: "Projection, scenography, DMX, spatial light and atmosphere.",
      it: "Proiezioni, scenografia, DMX, luce spaziale e atmosfera.",
      fr: "Projection, scénographie, DMX, lumière spatiale et atmosphère.",
      de: "Projektion, Szenografie, DMX, räumliches Licht und Atmosphäre."
    }
  },
  {
    id: "interactive-systems",
    symbol: "◉",
    color: "#7fb7c9",
    label: {
      en: "Interactive Systems",
      it: "Sistemi Interattivi",
      fr: "Systèmes Interactifs",
      de: "Interaktive Systeme"
    },
    description: {
      en: "TouchDesigner, sensors, physical computing and creative coding.",
      it: "TouchDesigner, sensori, physical computing e creative coding.",
      fr: "TouchDesigner, capteurs, physical computing et creative coding.",
      de: "TouchDesigner, Sensoren, Physical Computing und Creative Coding."
    }
  },
  {
    id: "three-d-worlds",
    symbol: "⬡",
    color: "#b79ad9",
    label: {
      en: "3D Worlds",
      it: "Mondi 3D",
      fr: "Mondes 3D",
      de: "3D-Welten"
    },
    description: {
      en: "3D modelling, Blender, WebGL, virtual spaces and objects.",
      it: "Modellazione 3D, Blender, WebGL, spazi e oggetti virtuali.",
      fr: "Modélisation 3D, Blender, WebGL, espaces et objets virtuels.",
      de: "3D-Modellierung, Blender, WebGL, virtuelle Räume und Objekte."
    }
  },
  {
    id: "research-design",
    symbol: "⌁",
    color: "#9abf88",
    label: {
      en: "Research & Design",
      it: "Ricerca & Design",
      fr: "Recherche & Design",
      de: "Recherche & Design"
    },
    description: {
      en: "UX, accessibility, interviews, systems thinking and prototypes.",
      it: "UX, accessibilità, interviste, pensiero sistemico e prototipi.",
      fr: "UX, accessibilité, entretiens, pensée systémique et prototypes.",
      de: "UX, Barrierefreiheit, Interviews, Systemdenken und Prototypen."
    }
  },
  {
    id: "events-communities",
    symbol: "♫",
    color: "#d98c8c",
    label: {
      en: "Events & Communities",
      it: "Eventi & Comunità",
      fr: "Événements & Communautés",
      de: "Events & Communities"
    },
    description: {
      en: "Collective projects, music, documentation, identity and social media.",
      it: "Progetti collettivi, musica, documentazione, identità e social media.",
      fr: "Projets collectifs, musique, documentation, identité et réseaux sociaux.",
      de: "Kollektive Projekte, Musik, Dokumentation, Identität und Social Media."
    }
  }
];

const projects = [
  {
    id: "oltre-la-pietra",
    title: "Oltre la Pietra",
    date: "2025",
    category: "light-space",
    hashtags: ["#projection", "#installation", "#scenography"],
    duration: "3 months",
    mediaType: "image",
    mediaSrc: "assets/images/oltre-la-pietra.jpg",
    externalLink: "#",
    description: {
      en: "A projection and light installation exploring stone, memory and spatial atmosphere.",
      it: "Un’installazione di proiezione e luce che esplora pietra, memoria e atmosfera spaziale.",
      fr: "Une installation de projection et de lumière explorant la pierre, la mémoire et l’atmosphère spatiale.",
      de: "Eine Projektions- und Lichtinstallation, die Stein, Erinnerung und räumliche Atmosphäre erforscht."
    },
    detail: {
      en: "Developed for the exhibition context of Castelgrande in Bellinzona, the project connects historical architecture, projected textures and a quiet visual rhythm.",
      it: "Sviluppato nel contesto espositivo di Castelgrande a Bellinzona, il progetto collega architettura storica, texture proiettate e un ritmo visivo silenzioso.",
      fr: "Développé dans le contexte d’exposition du Castelgrande à Bellinzone, le projet relie architecture historique, textures projetées et rythme visuel silencieux.",
      de: "Entwickelt im Ausstellungskontext von Castelgrande in Bellinzona verbindet das Projekt historische Architektur, projizierte Texturen und einen ruhigen visuellen Rhythmus."
    }
  },

  {
    id: "in-another-light",
    title: "In Another Light",
    date: "2025",
    category: "interactive-systems",
    hashtags: ["#TouchDesigner", "#sensors", "#interaction"],
    duration: "4 weeks",
    mediaType: "video",
    mediaSrc: "assets/videos/in-another-light.mp4",
    externalLink: "#",
    description: {
      en: "An interactive installation using sound and presence to transform light, color and projected visuals.",
      it: "Un’installazione interattiva che usa suono e presenza per trasformare luce, colore e visuals proiettati.",
      fr: "Une installation interactive utilisant le son et la présence pour transformer la lumière, la couleur et les visuels projetés.",
      de: "Eine interaktive Installation, die Klang und Präsenz nutzt, um Licht, Farbe und Projektionen zu verändern."
    },
    detail: {
      en: "The system combined microphone input, camera detection, TouchDesigner and DMX lights to create a responsive spatial experience.",
      it: "Il sistema combinava input microfonico, rilevamento camera, TouchDesigner e luci DMX per creare un’esperienza spaziale reattiva.",
      fr: "Le système combinait entrée microphone, détection caméra, TouchDesigner et lumières DMX pour créer une expérience spatiale réactive.",
      de: "Das System kombinierte Mikrofoneingang, Kameraerkennung, TouchDesigner und DMX-Lichter zu einer reaktiven Raumerfahrung."
    }
  },

  {
    id: "reactive-signs",
    title: "Reactive Signs",
    date: "2025",
    category: "interactive-systems",
    hashtags: ["#creativecoding", "#camera", "#motion"],
    duration: "2 weeks",
    mediaType: "image",
    mediaSrc: "assets/images/reactive-signs.jpg",
    externalLink: "#",
    description: {
      en: "A generative poster system where numbers emerge through camera input, foam-like textures and thresholded movement.",
      it: "Un sistema di poster generativo dove i numeri emergono tramite input camera, texture simili a schiuma e movimento in threshold.",
      fr: "Un système d’affiche générative où les chiffres émergent par caméra, textures proches de l’écume et mouvement en seuil.",
      de: "Ein generatives Postersystem, bei dem Zahlen durch Kamera-Input, schaumartige Texturen und Threshold-Bewegung entstehen."
    },
    detail: {
      en: "The work explores how signage can feel alive, unstable and responsive rather than static.",
      it: "Il progetto esplora come la segnaletica possa sembrare viva, instabile e reattiva invece che statica.",
      fr: "Le projet explore comment la signalétique peut devenir vivante, instable et réactive plutôt que statique.",
      de: "Die Arbeit untersucht, wie Beschilderung lebendig, instabil und reaktiv wirken kann, statt statisch zu bleiben."
    }
  },

  {
    id: "rift",
    title: "RIFT",
    date: "2026",
    category: "events-communities",
    hashtags: ["#event", "#community", "#sound"],
    duration: "ongoing",
    mediaType: "image",
    mediaSrc: "assets/images/rift.jpg",
    externalLink: "#",
    description: {
      en: "A techno-oriented event platform and visual identity for a collective party environment.",
      it: "Una piattaforma evento e identità visiva techno-oriented per un ambiente di festa collettivo.",
      fr: "Une plateforme événementielle et une identité visuelle techno pour un environnement festif collectif.",
      de: "Eine techno-orientierte Eventplattform und visuelle Identität für eine kollektive Partyumgebung."
    },
    detail: {
      en: "The project combines RSVP, guest flow, hidden pages, NFC access ideas, visuals, music and atmosphere design.",
      it: "Il progetto combina RSVP, flusso ospiti, pagine nascoste, idee NFC, visuals, musica e design dell’atmosfera.",
      fr: "Le projet combine RSVP, parcours invité, pages cachées, idées NFC, visuels, musique et design d’atmosphère.",
      de: "Das Projekt verbindet RSVP, Gästefluss, versteckte Seiten, NFC-Ideen, Visuals, Musik und Atmosphärendesign."
    }
  },

  {
    id: "accessible-architecture-tool",
    title: "Accessible Architecture Tool",
    date: "2026",
    category: "research-design",
    hashtags: ["#UX", "#accessibility", "#architecture"],
    duration: "semester project",
    mediaType: "image",
    mediaSrc: "assets/images/accessible-architecture.jpg",
    externalLink: "#",
    description: {
      en: "A digital prototype helping architects integrate accessibility earlier in residential design processes.",
      it: "Un prototipo digitale che aiuta gli architetti a integrare l’accessibilità prima nei processi di progettazione residenziale.",
      fr: "Un prototype numérique aidant les architectes à intégrer l’accessibilité plus tôt dans la conception résidentielle.",
      de: "Ein digitaler Prototyp, der Architekt:innen hilft, Barrierefreiheit früher im Wohnungsdesign zu integrieren."
    },
    detail: {
      en: "Based on interviews, spatial analysis and design research, the tool supports early awareness of accessible choices.",
      it: "Basato su interviste, analisi spaziale e design research, lo strumento supporta una consapevolezza precoce delle scelte accessibili.",
      fr: "Basé sur des entretiens, une analyse spatiale et une recherche en design, l’outil soutient une prise de conscience précoce.",
      de: "Basierend auf Interviews, Raumanalyse und Design Research unterstützt das Tool ein frühes Bewusstsein für barrierefreie Entscheidungen."
    }
  },

  {
    id: "three-d-portfolio-menu",
    title: "3D Portfolio Menu Concept",
    date: "2026",
    category: "three-d-worlds",
    hashtags: ["#Blender", "#3D", "#GLB"],
    duration: "concept",
    mediaType: "model",
    mediaSrc: "assets/models/portfolio-menu.glb",
    externalLink: "#",
    description: {
      en: "A future spatial navigation system where 3D objects become entry points into different creative fields.",
      it: "Un futuro sistema di navigazione spaziale dove oggetti 3D diventano porte d’accesso ai diversi campi creativi.",
      fr: "Un futur système de navigation spatiale où des objets 3D deviennent des points d’entrée vers différents champs créatifs.",
      de: "Ein zukünftiges räumliches Navigationssystem, in dem 3D-Objekte zu Zugängen verschiedener kreativer Felder werden."
    },
    detail: {
      en: "The idea is to transform the portfolio from a flat archive into an explorable world.",
      it: "L’idea è trasformare il portfolio da archivio piatto a mondo esplorabile.",
      fr: "L’idée est de transformer le portfolio d’une archive plate en monde exploratoire.",
      de: "Die Idee ist, das Portfolio von einem flachen Archiv in eine erkundbare Welt zu verwandeln."
    }
  }
];