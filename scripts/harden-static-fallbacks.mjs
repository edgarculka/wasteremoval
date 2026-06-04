import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] || ".output/public");
const brandName = process.env.NUXT_PUBLIC_SITE_NAME || "DBS-Waste";

function readHtml(fileName) {
  const filePath = path.join(root, fileName);
  if (!fs.existsSync(filePath)) return null;

  return {
    filePath,
    html: fs.readFileSync(filePath, "utf8"),
  };
}

function replaceOrInsertMeta(html, attribute, name, content) {
  const pattern = new RegExp(
    `<meta\\b(?=[^>]*\\b${attribute}=["']${name}["'])[^>]*>`,
    "i",
  );
  const tag = `<meta ${attribute}="${name}" content="${content}">`;

  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }

  return html.replace("</head>", `${tag}</head>`);
}

function replaceTitle(html, title) {
  const tag = `<title>${title}</title>`;

  if (/<title>[\s\S]*?<\/title>/i.test(html)) {
    return html.replace(/<title>[\s\S]*?<\/title>/i, tag);
  }

  return html.replace("</head>", `${tag}</head>`);
}

function write404() {
  const page = readHtml("404.html");
  if (!page) return false;

  const title = `Page not found | ${brandName}`;
  const description = "The page you requested could not be found.";
  const staticFallback = `<div id="__nuxt"><main class="min-h-screen bg-background px-6 py-16 text-foreground" data-static-fallback="404"><section class="mx-auto flex max-w-3xl flex-col gap-6"><p class="text-sm font-bold uppercase tracking-wide text-accent">404</p><h1 class="text-4xl font-bold leading-tight sm:text-5xl">Page not found</h1><p class="max-w-xl text-lg text-current/70">${description}</p><div class="flex flex-wrap gap-3"><a href="/" class="inline-flex rounded-md border border-transparent bg-accent px-5 py-3 font-bold text-accent-foreground">Back to homepage</a><a href="/services/" class="inline-flex rounded-md border border-border px-5 py-3 font-bold">View services</a></div></section></main></div>`;

  let html = page.html;
  html = replaceTitle(html, title);
  html = replaceOrInsertMeta(html, "name", "description", description);
  html = replaceOrInsertMeta(html, "name", "robots", "noindex, nofollow");
  html = html.replace(/<div id="__nuxt">[\s\S]*?<\/div>/i, staticFallback);

  fs.writeFileSync(page.filePath, html);
  return true;
}

function write200() {
  const page = readHtml("200.html");
  if (!page) return false;

  let html = page.html;
  html = replaceTitle(html, brandName);
  html = replaceOrInsertMeta(html, "name", "robots", "noindex, nofollow");

  fs.writeFileSync(page.filePath, html);
  return true;
}

const hardened = [
  write404() && "404.html",
  write200() && "200.html",
].filter(Boolean);

if (hardened.length === 0) {
  console.log("No static fallback files found to harden.");
} else {
  console.log(`Hardened static fallback files: ${hardened.join(", ")}.`);
}
