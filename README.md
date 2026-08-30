# Day 2 Product Configurator Workshop

This repository now maps each workshop section to its own Scene component.

## Workshop Sections

Each section is implemented in code:

1. Section 1: `src/Scenes/Section1.tsx`
2. Section 2: `src/Scenes/Section2.tsx`
3. Section 3: `src/Scenes/Section3.tsx`
4. Section 4: `src/Scenes/Section4.tsx`
5. Section 5: `src/Scenes/Section5.tsx`
6. Section 6: `src/Scenes/Section6.tsx`
7. Section 7: `src/Scenes/Section7.tsx`

Section routing is handled in:

- `src/Scene.tsx`
- `src/Scenes/workshopSection.ts`

## Running A Specific Section

Use query params in the browser URL:

- `?section=1` through `?section=7`
- Optional inspector in section 6+: `?section=6&inspector=1`

You can also set an environment default:

```bash
VITE_WORKSHOP_SECTION=3 yarn dev
```

## Local Development

```bash
yarn install
yarn dev
```

## Build And Preview

```bash
yarn build
yarn preview
```

## Key Tech

- React + Vite + TypeScript
- three.js (WebGPU)
- @react-three/fiber
- @react-three/drei
- Zustand
- Tailwind CSS

## Deploy

GitHub Pages deployment is configured in `.github/workflows/deploy.yml` and uses the Vite `base` path from `vite.config.ts`.
