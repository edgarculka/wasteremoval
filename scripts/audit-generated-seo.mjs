import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] || ".output/public");
const siteUrl = (
  process.argv[3] ||
  process.env.NUXT_PUBLIC_SITE_URL ||
  "https://dbs-waste.co.uk"
).replace(/\/$/, "");

const expectedNoindex = new Set(["/200.html", "/404.html", "/admin/", "/thank-you/"]);
const ignoredHtmlRoutes = new Set(["/200.html"]);
const requiredIndexableRoutes = new Set([
  "/",
  "/services/",
  "/areas/",
  "/pricing/",
  "/quote/",
  "/recycling-and-disposal/",
]);
const unsupportedClaimPatterns = [
  /\b5-star\b/i,
  /\bfive star\b/i,
  /\brated 5\b/i,
  /\b4\.9\b/i,
  /\b21K\b/i,
  /\b0 missed\b/i,
  /\b95%\b/i,
  /\bCBDU\b/i,
  /\bfully licensed\b/i,
  /\blicensed disposal\b/i,
  /\bcustomer reviews\b/i,
  /\baverage rating\b/i,
  /\bGoogle rating\b/i,
];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function routeFromFile(file) {
  const relative = path.relative(root, file).replaceAll(path.sep, "/");
  if (relative === "index.html") return "/";
  if (relative.endsWith("/index.html")) {
    return `/${relative.slice(0, -"/index.html".length)}/`;
  }
  return `/${relative}`;
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`${name}\\s*=\\s*(['"])(.*?)\\1`, "i"));
  return match?.[2] || "";
}

function meta(html, selector, value) {
  const key = selector === "name" ? "name" : "property";
  const pattern = new RegExp(
    `<meta\\b(?=[^>]*\\b${key}=["']${value}["'])([^>]*)>`,
    "i",
  );
  const tag = html.match(pattern)?.[0] || "";
  return tag ? attr(tag, "content") : "";
}

function allMatches(html, pattern) {
  return Array.from(html.matchAll(pattern), (match) => match);
}

function isAbsoluteUrl(value) {
  return /^https?:\/\//.test(value);
}

function groupBy(items, keyGetter) {
  const grouped = new Map();
  for (const item of items) {
    const key = keyGetter(item);
    grouped.set(key, [...(grouped.get(key) || []), item]);
  }
  return grouped;
}

function collectUrlLikeValues(value, key = "") {
  if (typeof value === "string") {
    return /(?:^|\.|@)(id|url|image|logo|sameAs|target|urlTemplate|contentUrl|thumbnailUrl|embedUrl|downloadUrl|mainEntityOfPage)$/i.test(
      key,
    )
      ? [value]
      : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => collectUrlLikeValues(item, key));
  }

  if (!value || typeof value !== "object") return [];

  return Object.entries(value).flatMap(([entryKey, entryValue]) =>
    collectUrlLikeValues(entryValue, entryKey),
  );
}

function flattenJsonLd(value) {
  if (Array.isArray(value)) return value.flatMap(flattenJsonLd);
  if (value && typeof value === "object" && Array.isArray(value["@graph"])) {
    return value["@graph"].flatMap(flattenJsonLd);
  }
  return [value];
}

if (!fs.existsSync(root)) {
  console.error(`Generated output directory does not exist: ${root}`);
  console.error("Run npm run generate before npm run audit:seo.");
  process.exit(1);
}

const files = walk(root);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const pages = htmlFiles.map((file) => {
  const html = fs.readFileSync(file, "utf8");
  const route = routeFromFile(file);
  const robots = meta(html, "name", "robots");
  const noindex = /\bnoindex\b/i.test(robots);
  const canonicalTag =
    html.match(/<link\b(?=[^>]*\brel=["']canonical["'])([^>]*)>/i)?.[0] ||
    "";
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() || "";
  const images = allMatches(html, /<img\b[^>]*>/gi).map((match) => match[0]);
  const jsonLdTags = allMatches(
    html,
    /<script\b(?=[^>]*type=["']application\/ld\+json["'])[^>]*>([\s\S]*?)<\/script>/gi,
  );
  const jsonLd = jsonLdTags.map((match) => {
    try {
      return { ok: true, value: JSON.parse(match[1]) };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  });

  return {
    file,
    route,
    html,
    noindex,
    robots,
    title,
    description: meta(html, "name", "description"),
    canonicalHref: canonicalTag ? attr(canonicalTag, "href") : "",
    ogTitle: meta(html, "property", "og:title"),
    ogDescription: meta(html, "property", "og:description"),
    ogUrl: meta(html, "property", "og:url"),
    ogImage: meta(html, "property", "og:image"),
    twitterTitle: meta(html, "name", "twitter:title"),
    twitterDescription: meta(html, "name", "twitter:description"),
    twitterImage: meta(html, "name", "twitter:image"),
    h1Count: allMatches(html, /<h1\b[\s\S]*?<\/h1>/gi).length,
    images,
    jsonLd,
    anchors: allMatches(html, /<a\b[^>]*\bhref=(["'])(.*?)\1/gi).map(
      (match) => match[2],
    ),
  };
});

const sitemapPath = path.join(root, "sitemap.xml");
const sitemapXml = fs.existsSync(sitemapPath)
  ? fs.readFileSync(sitemapPath, "utf8")
  : "";
const sitemapUrls = Array.from(
  sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g),
  (match) => match[1],
);
const robotsPath = path.join(root, "robots.txt");
const robotsTxt = fs.existsSync(robotsPath)
  ? fs.readFileSync(robotsPath, "utf8")
  : "";

const indexable = pages.filter(
  (page) =>
    !page.noindex &&
    !expectedNoindex.has(page.route) &&
    !ignoredHtmlRoutes.has(page.route),
);
const indexableCanonicals = indexable.map((page) => page.canonicalHref).sort();
const sortedSitemap = [...sitemapUrls].sort();
const titleGroups = groupBy(indexable, (page) => page.title);
const descriptionGroups = groupBy(indexable, (page) => page.description);

const issues = {
  noSitemap: sitemapXml ? [] : ["sitemap.xml missing"],
  noRobots: robotsTxt ? [] : ["robots.txt missing"],
  robotsMissingSitemap:
    robotsTxt && !robotsTxt.includes(`${siteUrl}/sitemap.xml`)
      ? ["robots.txt missing sitemap URL"]
      : [],
  sitemapMismatch:
    JSON.stringify(indexableCanonicals) === JSON.stringify(sortedSitemap)
      ? []
      : [{ indexableCanonicals, sitemapUrls: sortedSitemap }],
  missingRequiredIndexableRoutes: [...requiredIndexableRoutes].filter(
    (route) => !indexable.some((page) => page.route === route),
  ),
  designSystemOutput: pages
    .filter((page) => page.route.includes("design-system"))
    .map((page) => page.route),
  missingTitle: indexable.filter((page) => !page.title).map((page) => page.route),
  weakTitleLength: indexable
    .filter(
      (page) => page.title && (page.title.length < 25 || page.title.length > 70),
    )
    .map((page) => ({ route: page.route, length: page.title.length, title: page.title })),
  duplicateTitles: Array.from(titleGroups.entries())
    .filter(([title, grouped]) => title && grouped.length > 1)
    .map(([title, grouped]) => ({ title, routes: grouped.map((page) => page.route) })),
  missingDescription: indexable
    .filter((page) => !page.description)
    .map((page) => page.route),
  weakDescriptionLength: indexable
    .filter(
      (page) =>
        page.description &&
        (page.description.length < 80 || page.description.length > 170),
    )
    .map((page) => ({
      route: page.route,
      length: page.description.length,
      description: page.description,
    })),
  duplicateDescriptions: Array.from(descriptionGroups.entries())
    .filter(([description, grouped]) => description && grouped.length > 1)
    .map(([description, grouped]) => ({
      description,
      routes: grouped.map((page) => page.route),
    })),
  missingCanonical: indexable
    .filter((page) => !page.canonicalHref)
    .map((page) => page.route),
  nonAbsoluteCanonical: indexable
    .filter((page) => page.canonicalHref && !isAbsoluteUrl(page.canonicalHref))
    .map((page) => ({ route: page.route, canonical: page.canonicalHref })),
  canonicalRouteMismatch: indexable
    .filter(
      (page) =>
        page.canonicalHref !== `${siteUrl}${page.route === "/" ? "/" : page.route}`,
    )
    .map((page) => ({ route: page.route, canonical: page.canonicalHref })),
  h1NotOne: indexable
    .filter((page) => page.h1Count !== 1)
    .map((page) => ({ route: page.route, h1Count: page.h1Count })),
  missingSocial: indexable
    .filter(
      (page) =>
        !page.ogTitle ||
        !page.ogDescription ||
        !page.ogUrl ||
        !page.ogImage ||
        !page.twitterTitle ||
        !page.twitterDescription ||
        !page.twitterImage,
    )
    .map((page) => ({
      route: page.route,
      missing: [
        ["og:title", page.ogTitle],
        ["og:description", page.ogDescription],
        ["og:url", page.ogUrl],
        ["og:image", page.ogImage],
        ["twitter:title", page.twitterTitle],
        ["twitter:description", page.twitterDescription],
        ["twitter:image", page.twitterImage],
      ]
        .filter(([, present]) => !present)
        .map(([name]) => name),
    })),
  nonAbsoluteSocialUrls: indexable.flatMap((page) =>
    [
      ["og:url", page.ogUrl],
      ["og:image", page.ogImage],
      ["twitter:image", page.twitterImage],
    ]
      .filter(([, value]) => value && !isAbsoluteUrl(value))
      .map(([name, value]) => ({ route: page.route, name, value })),
  ),
  invalidJsonLd: indexable.flatMap((page) =>
    page.jsonLd
      .filter((entry) => !entry.ok)
      .map((entry) => ({ route: page.route, error: entry.error })),
  ),
  missingJsonLd: indexable
    .filter((page) => page.jsonLd.length === 0)
    .map((page) => page.route),
  relativeJsonLdUrls: indexable.flatMap((page) =>
    page.jsonLd.flatMap((entry) => {
      if (!entry.ok) return [];
      return collectUrlLikeValues(entry.value)
        .filter(
          (url) =>
            typeof url === "string" && (url.startsWith("/") || url.startsWith("./")),
        )
        .map((url) => ({ route: page.route, url }));
    }),
  ),
  missingBusinessSchema: indexable
    .filter((page) => {
      const types = page.jsonLd.flatMap((entry) =>
        entry.ok
          ? flattenJsonLd(entry.value)
              .map((item) => item?.["@type"])
              .flat()
          : [],
      );
      return page.route === "/" && !types.includes("LocalBusiness");
    })
    .map((page) => page.route),
  expectedNoindexMissing: [...expectedNoindex].filter(
    (route) => !pages.find((page) => page.route === route && page.noindex),
  ),
  weakFallbackTitles: pages
    .filter((page) => ["/200.html", "/404.html"].includes(page.route))
    .filter((page) => !page.title || page.title.startsWith("|"))
    .map((page) => ({ route: page.route, title: page.title })),
  missing404StaticContent: pages
    .filter(
      (page) =>
        page.route === "/404.html" &&
        !/<h1\b[^>]*>\s*Page not found\s*<\/h1>/i.test(page.html),
    )
    .map((page) => page.route),
  unexpectedNoindex: pages
    .filter((page) => page.noindex && !expectedNoindex.has(page.route))
    .map((page) => page.route),
  imagesMissingSrc: indexable.flatMap((page) =>
    page.images
      .filter((img) => !attr(img, "src"))
      .map((img) => ({ route: page.route, img })),
  ),
  imagesMissingAlt: indexable.flatMap((page) =>
    page.images
      .filter((img) => !attr(img, "alt"))
      .map((img) => ({ route: page.route, img })),
  ),
  rasterImagesMissingDimensions: indexable.flatMap((page) =>
    page.images
      .filter((img) => {
        const src = attr(img, "src");
        if (!src || src.endsWith(".svg")) return false;
        return !attr(img, "width") || !attr(img, "height");
      })
      .map((img) => ({ route: page.route, src: attr(img, "src") })),
  ),
  missingImageFiles: indexable.flatMap((page) =>
    page.images.flatMap((img) => {
      const src = attr(img, "src");
      const sources = [
        src,
        ...attr(img, "srcset")
          .split(",")
          .map((part) => part.trim().split(/\s+/)[0])
          .filter(Boolean),
      ].filter((value) => value?.startsWith("/"));
      return sources
        .filter((value) => !fs.existsSync(path.join(root, value)))
        .map((value) => ({ route: page.route, src: value }));
    }),
  ),
  pngReferences: pages
    .filter((page) => /\.png\b/i.test(page.html))
    .map((page) => page.route),
  linksToNonCanonicalInternalPaths: indexable.flatMap((page) =>
    page.anchors
      .filter((href) => {
        if (!href.startsWith("/")) return false;
        if (href.startsWith("/_nuxt") || href.startsWith("/images")) return false;
        if (href.includes("#") || href === "/") return false;
        return !href.endsWith("/");
      })
      .map((href) => ({ route: page.route, href })),
  ),
  unsupportedClaims: pages.flatMap((page) =>
    unsupportedClaimPatterns
      .filter((pattern) => pattern.test(page.html))
      .map((pattern) => ({ route: page.route, pattern: pattern.source })),
  ),
};

const counts = Object.fromEntries(
  Object.entries(issues).map(([key, value]) => [key, value.length]),
);
const report = {
  root,
  siteUrl,
  totals: {
    htmlPages: pages.length,
    indexablePages: indexable.length,
    sitemapUrls: sitemapUrls.length,
    designSystemPages: issues.designSystemOutput.length,
  },
  counts,
  issues,
};

const informationalCounts = new Set(["pngReferences"]);
const failed = Object.entries(counts).some(
  ([key, count]) => count > 0 && !informationalCounts.has(key),
);

if (failed || process.argv.includes("--json")) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(
    `Generated SEO audit passed: ${indexable.length} indexable pages, ${sitemapUrls.length} sitemap URLs, ${pages.length} HTML files.`,
  );
}

process.exit(failed ? 1 : 0);
