#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";

const apiKey = process.env.PEXELS_API_KEY;
if (!apiKey) {
  console.error("Missing PEXELS_API_KEY environment variable.");
  console.error("Set it in .env and run via `npm run fetch-image -- ...`.");
  process.exit(1);
}

const [query, name, orientationArg] = process.argv.slice(2);
if (!query || !name) {
  console.error("Usage: npm run fetch-image -- \"<query>\" <output-name> [orientation]");
  console.error("       orientation: landscape (default) | portrait | square");
  console.error("Example: npm run fetch-image -- \"moving boxes\" section-demo");
  process.exit(1);
}

const orientation = orientationArg ?? "landscape";

const searchUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=${orientation}`;

const searchRes = await fetch(searchUrl, {
  headers: { Authorization: apiKey },
});

if (!searchRes.ok) {
  console.error(`Pexels search failed: ${searchRes.status} ${searchRes.statusText}`);
  process.exit(1);
}

const data = await searchRes.json();
if (!data.photos?.length) {
  console.error(`No results for "${query}".`);
  process.exit(1);
}

const photo = data.photos[0];
const imageUrl = photo.src.large;

const imageRes = await fetch(imageUrl);
if (!imageRes.ok) {
  console.error(`Image download failed: ${imageRes.status} ${imageRes.statusText}`);
  process.exit(1);
}

const buffer = Buffer.from(await imageRes.arrayBuffer());
const outDir = path.resolve("public/images");
await fs.mkdir(outDir, { recursive: true });

const ext = path.extname(new URL(imageUrl).pathname) || ".jpg";
const outPath = path.join(outDir, `${name}${ext}`);
await fs.writeFile(outPath, buffer);

const publicPath = `/images/${name}${ext}`;
console.log(`Saved ${outPath}`);
console.log(`Public path: ${publicPath}`);
console.log(`Photographer: ${photo.photographer} (${photo.url})`);
console.log(`Alt text: ${photo.alt}`);
