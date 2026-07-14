# Zhenyu Chen Portfolio

Personal portfolio site for Zhenyu (Bella) Chen, built with Next.js, React, TypeScript, and a custom animated water-refraction visual system.

## Overview

This site presents my background in AI engineering, software development, machine learning, and full-stack systems. It includes sections for About, Skills, Projects, Education, Experience, Resume, and Contact.

Live site: https://zchen868.github.io/

## Features

- Interactive pastel water-refraction background with pointer-driven ripple effects
- Responsive single-page portfolio layout
- Project cards linked to selected GitHub repositories
- Education and experience timelines
- Downloadable resume PDF
- Contact form that opens a prefilled email draft
- Static export for GitHub Pages hosting

## Tech Stack

- Next.js
- React
- TypeScript
- Three.js
- Custom CSS
- GitHub Pages

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Build

Create a production static export:

```bash
npm run build
```

The exported site is generated in `out/`.

## Deployment

The repository includes a GitHub Actions workflow that builds the Next.js static export and deploys `out/` to GitHub Pages whenever changes are pushed to `main`.

## Assets

Key assets live in `public/`, including:

- `avatar-kuromi.jpg`
- `Zhenyu_Chen_resume.pdf`
- pastel water and ripple background images
