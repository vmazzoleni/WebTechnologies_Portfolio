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
    heroTitle: "Lumière, interaction et atmosphères digitales.",
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
];

const projects = [
{
id: “matazz-basel”,
title: “MATAZZ Basel”,
date: “2025”,
category: “light-space”,
hashtags: [”#projection”, “#visuals”, “#eventspace”],
duration: “event project”,
mediaType: “image”,
mediaSrc: “assets/images/matazz-basel.jpg”,
externalLink: “#”,
description: {
en: “A spatial visual setup for a MATAZZ event in Basel, combining projected atmospheres, event identity and live visual material.”,
it: “Un setup visivo spaziale per un evento MATAZZ a Basilea, tra atmosfere proiettate, identità dell’evento e materiale visual live.”,
fr: “Un dispositif visuel spatial pour un événement MATAZZ à Bâle, entre atmosphères projetées, identité de l’événement et visuels live.”,
de: “Ein räumliches Visual-Setup für ein MATAZZ-Event in Basel, zwischen projizierten Atmosphären, Event-Identität und Live-Visuals.”
},
detail: {
en: “The project focused on creating a visual environment that could support the music and the social energy of the event without overpowering the space.”,
it: “Il progetto si è concentrato sulla creazione di un ambiente visivo capace di sostenere la musica e l’energia sociale dell’evento senza sovrastare lo spazio.”,
fr: “Le projet visait à créer un environnement visuel capable de soutenir la musique et l’énergie sociale de l’événement sans dominer l’espace.”,
de: “Das Projekt konzentrierte sich auf eine visuelle Umgebung, die Musik und soziale Energie des Events unterstützt, ohne den Raum zu überladen.”
}
},

{
id: “pakshiraj”,
title: “Pakshiraj”,
date: “2025”,
category: “interactive-systems”,
hashtags: [”#schoolproject”, “#interaction”, “#prototype”],
duration: “school project”,
mediaType: “image”,
mediaSrc: “assets/images/pakshiraj.jpg”,
externalLink: “#”,
description: {
en: “A school project exploring interaction, symbolic systems and the translation of a concept into a responsive experience.”,
it: “Un progetto scolastico che esplora interazione, sistemi simbolici e la traduzione di un concetto in un’esperienza reattiva.”,
fr: “Un projet d’école explorant l’interaction, les systèmes symboliques et la traduction d’un concept en expérience réactive.”,
de: “Ein Schulprojekt über Interaktion, symbolische Systeme und die Übersetzung eines Konzepts in eine reaktive Erfahrung.”
},
detail: {
en: “The project can be used in the portfolio to show conceptual thinking, prototyping and the ability to turn an abstract reference into an interactive system.”,
it: “Nel portfolio il progetto può mostrare pensiero concettuale, prototipazione e capacità di trasformare un riferimento astratto in un sistema interattivo.”,
fr: “Dans le portfolio, le projet peut montrer la pensée conceptuelle, le prototypage et la capacité à transformer une référence abstraite en système interactif.”,
de: “Im Portfolio kann das Projekt konzeptuelles Denken, Prototyping und die Fähigkeit zeigen, eine abstrakte Referenz in ein interaktives System zu übersetzen.”
}
},

{
id: “in-another-light”,
title: “In Another Light”,
date: “2025”,
category: “interactive-systems”,
hashtags: [”#TouchDesigner”, “#DMX”, “#installation”],
duration: “4 weeks”,
mediaType: “video”,
mediaSrc: “assets/videos/in-another-light.mp4”,
externalLink: “#”,
description: {
en: “An interactive installation where sound, presence and darkness influence projected visuals and DMX-controlled light.”,
it: “Un’installazione interattiva in cui suono, presenza e oscurità influenzano visuals proiettati e luce controllata via DMX.”,
fr: “Une installation interactive où le son, la présence et l’obscurité influencent les visuels projetés et la lumière contrôlée par DMX.”,
de: “Eine interaktive Installation, in der Klang, Präsenz und Dunkelheit projizierte Visuals und DMX-gesteuertes Licht beeinflussen.”
},
detail: {
en: “Built with TouchDesigner, microphone input, camera detection and Eurolite DMX lights, the project investigated how a room can react to people through subtle audiovisual changes.”,
it: “Realizzato con TouchDesigner, input microfonico, rilevamento camera e luci Eurolite DMX, il progetto indagava come una stanza possa reagire alle persone attraverso cambiamenti audiovisivi sottili.”,
fr: “Réalisé avec TouchDesigner, entrée microphone, détection caméra et lumières Eurolite DMX, le projet explorait comment une pièce peut réagir aux personnes par des changements audiovisuels subtils.”,
de: “Mit TouchDesigner, Mikrofoneingang, Kameraerkennung und Eurolite-DMX-Lichtern untersucht das Projekt, wie ein Raum durch subtile audiovisuelle Veränderungen auf Menschen reagieren kann.”
}
},

{
id: “classroom-3d-models”,
title: “Classroom 3D Models”,
date: “2025”,
category: “three-d-worlds”,
hashtags: [”#3Dmodeling”, “#Blender”, “#environment”],
duration: “school exercises”,
mediaType: “image”,
mediaSrc: “assets/images/classroom-3d-models.jpg”,
externalLink: “#”,
description: {
en: “Two classroom environments modelled as spatial studies, focusing on proportion, atmosphere and object-based worldbuilding.”,
it: “Due ambienti scolastici modellati come studi spaziali, con attenzione a proporzioni, atmosfera e costruzione del mondo tramite oggetti.”,
fr: “Deux environnements de classe modélisés comme études spatiales, avec attention aux proportions, à l’atmosphère et au worldbuilding par les objets.”,
de: “Zwei modellierte Klassenräume als räumliche Studien mit Fokus auf Proportion, Atmosphäre und objektbasiertes Worldbuilding.”
},
detail: {
en: “These models show technical modelling practice and the ability to read a room as a designed environment made of light, surfaces and small details.”,
it: “Questi modelli mostrano pratica tecnica di modellazione e capacità di leggere una stanza come ambiente progettato fatto di luce, superfici e piccoli dettagli.”,
fr: “Ces modèles montrent une pratique technique de modélisation et la capacité à lire une pièce comme un environnement conçu par la lumière, les surfaces et les détails.”,
de: “Diese Modelle zeigen technische Modellierungspraxis und die Fähigkeit, einen Raum als gestaltete Umgebung aus Licht, Oberflächen und Details zu lesen.”
}
},

{
id: “giurassia”,
title: “Giurassia”,
date: “2025”,
category: “three-d-worlds”,
hashtags: [”#3Dworld”, “#environment”, “#worldbuilding”],
duration: “3D project”,
mediaType: “image”,
mediaSrc: “assets/images/giurassia.jpg”,
externalLink: “#”,
description: {
en: “A 3D worldbuilding project exploring landscape, atmosphere and narrative space.”,
it: “Un progetto di worldbuilding 3D che esplora paesaggio, atmosfera e spazio narrativo.”,
fr: “Un projet de worldbuilding 3D explorant le paysage, l’atmosphère et l’espace narratif.”,
de: “Ein 3D-Worldbuilding-Projekt über Landschaft, Atmosphäre und narrativen Raum.”
},
detail: {
en: “The project can be presented as part of the 3D Worlds section to show environment design, visual storytelling and spatial imagination.”,
it: “Il progetto può essere presentato nella sezione 3D Worlds per mostrare environment design, storytelling visivo e immaginazione spaziale.”,
fr: “Le projet peut être présenté dans la section 3D Worlds pour montrer le design d’environnement, le storytelling visuel et l’imagination spatiale.”,
de: “Das Projekt kann in der Sektion 3D Worlds gezeigt werden, um Environment Design, visuelles Storytelling und räumliche Vorstellungskraft zu zeigen.”
}
},

{
id: “matazz-oltre-la-pietra”,
title: “MATAZZ · Oltre la Pietra”,
date: “2025”,
category: “events-communities”,
hashtags: [”#MATAZZ”, “#projection”, “#interviews”, “#website”],
duration: “exhibition project”,
mediaType: “image”,
mediaSrc: “assets/images/matazz-oltre-la-pietra.jpg”,
externalLink: “#”,
description: {
en: “A collective exhibition project at Castelgrande, combining projections, artist interviews, documentation and web content.”,
it: “Un progetto espositivo collettivo a Castelgrande, tra proiezioni, interviste agli artisti, documentazione e contenuti per il sito.”,
fr: “Un projet d’exposition collectif au Castelgrande, entre projections, entretiens avec les artistes, documentation et contenu web.”,
de: “Ein kollektives Ausstellungsprojekt im Castelgrande mit Projektionen, Künstlerinterviews, Dokumentation und Webinhalten.”
},
detail: {
en: “My role moved between visual atmosphere, technical setup, video loops, documentation and the translation of artists’ voices into written material for the online archive.”,
it: “Il mio ruolo si è mosso tra atmosfera visiva, setup tecnico, loop video, documentazione e traduzione delle voci degli artisti in materiale scritto per l’archivio online.”,
fr: “Mon rôle s’est situé entre atmosphère visuelle, installation technique, boucles vidéo, documentation et traduction des voix des artistes en contenu écrit pour l’archive en ligne.”,
de: “Meine Rolle bewegte sich zwischen visueller Atmosphäre, technischem Setup, Videoloops, Dokumentation und der Übersetzung künstlerischer Stimmen in schriftliches Material für das Online-Archiv.”
}
},

{
id: “permaculture-growing-plants”,
title: “Permaculture & Growing Plants”,
date: “2025”,
category: “research-design”,
hashtags: [”#permaculture”, “#systems”, “#ecology”],
duration: “research project”,
mediaType: “image”,
mediaSrc: “assets/images/permaculture-growing-plants.jpg”,
externalLink: “#”,
description: {
en: “A research-oriented project around plant growth, ecological systems and the relationship between care, time and design.”,
it: “Un progetto di ricerca sulla crescita delle piante, i sistemi ecologici e la relazione tra cura, tempo e design.”,
fr: “Un projet de recherche autour de la croissance des plantes, des systèmes écologiques et du lien entre soin, temps et design.”,
de: “Ein forschungsorientiertes Projekt über Pflanzenwachstum, ökologische Systeme und die Beziehung zwischen Pflege, Zeit und Design.”
},
detail: {
en: “This project belongs to Research & Design because it shows observation, process thinking and sensitivity toward living systems rather than only final visual output.”,
it: “Questo progetto appartiene a Research & Design perché mostra osservazione, pensiero di processo e sensibilità verso sistemi viventi, più che solo un risultato visivo finale.”,
fr: “Ce projet appartient à Recherche & Design car il montre l’observation, la pensée de processus et une sensibilité envers les systèmes vivants, plutôt qu’un simple résultat visuel final.”,
de: “Dieses Projekt gehört zu Research & Design, weil es Beobachtung, Prozessdenken und Sensibilität für lebendige Systeme zeigt, nicht nur ein fertiges visuelles Ergebnis.”
}
},

{
id: “accessible-architecture-tool”,
title: “Accessible Architecture Tool”,
date: “2026”,
category: “research-design”,
hashtags: [”#UX”, “#accessibility”, “#architecture”],
duration: “semester project”,
mediaType: “image”,
mediaSrc: “assets/images/accessible-architecture.jpg”,
externalLink: “#”,
description: {
en: “A digital design tool helping architects consider accessibility earlier in private residential projects.”,
it: “Uno strumento digitale che aiuta gli architetti a considerare l’accessibilità prima nei progetti residenziali privati.”,
fr: “Un outil de design numérique aidant les architectes à considérer l’accessibilité plus tôt dans les projets résidentiels privés.”,
de: “Ein digitales Design-Tool, das Architekt:innen hilft, Barrierefreiheit früher in privaten Wohnprojekten mitzudenken.”
},
detail: {
en: “Based on interviews, spatial analysis and prototyping, the project investigates how accessibility can become part of the design process before it turns into a late technical correction.”,
it: “Basato su interviste, analisi spaziale e prototipazione, il progetto indaga come l’accessibilità possa entrare nel processo progettuale prima di diventare una correzione tecnica tardiva.”,
fr: “Basé sur des entretiens, une analyse spatiale et du prototypage, le projet explore comment l’accessibilité peut entrer dans le processus de conception avant de devenir une correction technique tardive.”,
de: “Basierend auf Interviews, Raumanalyse und Prototyping untersucht das Projekt, wie Barrierefreiheit Teil des Entwurfsprozesses werden kann, bevor sie zu einer späten technischen Korrektur wird.”
}
}
];