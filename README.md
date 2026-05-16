# Waste Removal

Nuxt 4 static site for a waste removal service, with a component-driven design system and static generation.

## Development

Install dependencies:

```bash
npm ci
```

Run the local development server:

```bash
npm run dev
```

Generate the static site:

```bash
npm run generate
```

The generated site is written to `.output/public`.

## Deployment

GitHub Actions deploys the generated static site to GitHub Pages whenever `main` or `master` is updated. The workflow lives in `.github/workflows/deploy-static.yml`.

To deploy manually from a local machine with Firebase configured:

```bash
npm run deploy
```
