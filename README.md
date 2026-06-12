# Vanessa Mazzoleni — Portfolio

This is a personal portfolio website built with vanilla HTML, CSS and JavaScript.
It presents selected works across interaction design, visual art, light installations, 3D worlds, research and collective projects.

The portfolio is designed as a dark digital archive: a space where projects are not only listed, but organized as fragments of a wider creative practice. The visual language combines cyber-sigilism, biomechanical roots, gothic ornamentation and a black/silver interface system.

## Project concept

The website is structured around five main areas:

- Light & Space
- Interactive Systems
- 3D Worlds
- Events & Communities
- Research & Design

Each area can be explored through a persistent sigil-based navigation. Projects are displayed as large archive entries, with images, descriptions, tags and detail overlays.

The design direction is inspired by dark archive systems, ritual interfaces, organic roots, silver engravings and biomechanical visual references.

## Main features

- Responsive portfolio layout
- Persistent category navigation
- Project archive with large visual entries
- Project detail overlays
- Image, video and YouTube support
- Animated root/cyber-sigil background
- CV modal
- Dark-only visual system
- Lightweight custom CMS/admin page
- Project data separated from the layout
- Built without frameworks or build tools

## CMS / Admin page

The website includes a simple custom CMS interface that allows new projects to be added without manually editing the project data file.

Through the admin page, it is possible to enter:

- project title
- year
- category
- tags
- duration
- short description
- long description
- main media
- gallery media
- YouTube links
- external links

The goal of the CMS is to make the portfolio easier to maintain over time. Instead of editing JavaScript by hand every time a new project is added, the admin interface helps generate or update the project data automatically.

## File structure

```txt
/
├── index.html
├── style.css
├── main.js
├── projects.json
├── assets/
│   ├── images/
│   └── videos/
└── admin/
    ├── index.html
    ├── admin.css
    └── admin.js
```

## Technologies

- HTML
- CSS
- JavaScript
- GitHub Pages
- Custom lightweight CMS/admin interface

No external JavaScript frameworks are used.

## Media

Projects can use different media types:

- images
- local videos
- YouTube embeds
- iframe embeds
- image/video galleries

For YouTube videos, normal watch links are converted into embed links so they can be displayed directly inside the portfolio.

Example:

```txt
https://www.youtube.com/watch?v=VIDEO_ID
```

becomes:

```txt
https://www.youtube.com/embed/VIDEO_ID
```

## Design notes

The interface avoids a traditional clean portfolio style. Instead, it explores a darker and more atmospheric system based on:

- black background
- silver linework
- cyber-sigil navigation
- root-like animated structures
- gothic/biomechanical references
- large project entries
- archive-like detail views

The visual system is intentionally dark-only to avoid contrast and readability issues between light and dark modes.

## How to use locally

Open the project folder and run it with a local server.

For example, using VS Code:

1. Install the Live Server extension
2. Right-click `index.html`
3. Select `Open with Live Server`

The site can also be published through GitHub Pages.

## Deployment

The portfolio is designed to be hosted as a static website on GitHub Pages.

After editing the files or updating the project data through the CMS/admin workflow, changes can be pushed to the GitHub repository and published online through GitHub Pages.

## Status

This portfolio is an ongoing project.
It is designed to grow over time as new works, experiments and research projects are added.
