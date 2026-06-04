import tailwindcss from "@tailwindcss/vite";
import {
  areaSeoPaths,
  buildAreaPath,
  buildServicePath,
  seoLocations,
  seoServices,
  serviceLocationSeoPages,
  serviceSeoPaths,
  type SeoImage,
} from "./app/utils/seo-pages";
import type { SitemapUrl } from "@nuxtjs/sitemap";
import { companyDetails } from "./app/utils/company";
import { normalizeCanonicalPath } from "./app/utils/seo-url";

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || "https://dbs-waste.co.uk";
const siteName = process.env.NUXT_PUBLIC_SITE_NAME || companyDetails.tradingName;
const enableDesignSystem =
  process.env.NUXT_PUBLIC_ENABLE_DESIGN_SYSTEM !== "false";

const designSystemRoutes = [
  "/design-system/",
  "/design-system/booking-wizard/",
  "/design-system/buttons/",
  "/design-system/calendar/",
  "/design-system/call-to-action/",
  "/design-system/card/",
  "/design-system/colors/",
  "/design-system/faq/",
  "/design-system/footer/",
  "/design-system/header/",
  "/design-system/hero/",
  "/design-system/icons/",
  "/design-system/input/",
  "/design-system/logo/",
  "/design-system/marquee/",
  "/design-system/pricing/",
  "/design-system/rating/",
  "/design-system/reviews/",
  "/design-system/section/",
  "/design-system/service-coverage/",
  "/design-system/service-process/",
  "/design-system/services/",
  "/design-system/sidebar/",
  "/design-system/skip-comparison/",
  "/design-system/tag/",
  "/design-system/thank-you/",
  "/design-system/tick-list/",
  "/design-system/time-picker/",
  "/design-system/tone-of-voice/",
  "/design-system/trust-strip/",
  "/design-system/typography/",
];

const commercialSitemapPaths = [
  "/",
  "/pricing/",
  "/quote/",
  "/services/",
  "/areas/",
  "/additional-charges/",
  "/recycling-and-disposal/",
  "/terms/",
  "/privacy/",
  ...areaSeoPaths,
  ...serviceSeoPaths,
  ...serviceLocationSeoPages.map((page) => page.path),
].map(normalizeCanonicalPath);

function sitemapImage(image?: SeoImage) {
  return image ? [{ loc: image.src, title: image.alt }] : undefined;
}

const staticSitemapImages = new Map<string, SeoImage>([
  [
    "/",
    {
      src: "/images/rubbish-removal.webp",
      alt: "Rubbish removal van loaded with household waste",
      width: 1200,
      height: 800,
    },
  ],
  [
    "/pricing/",
    {
      src: "/images/truck.webp",
      alt: "Waste removal truck ready for collection",
      width: 1200,
      height: 800,
    },
  ],
  [
    "/quote/",
    {
      src: "/images/truck.webp",
      alt: "Waste removal truck ready for collection",
      width: 1200,
      height: 800,
    },
  ],
  ["/services/", seoServices[0]!.image],
  ["/areas/", seoLocations[0]!.image],
  [
    "/additional-charges/",
    {
      src: "/images/additional-charges/mattress.webp",
      alt: "Mattress ready for specialist disposal",
      width: 960,
      height: 640,
    },
  ],
  [
    "/recycling-and-disposal/",
    {
      src: "/images/truck.webp",
      alt: "Waste removal truck ready for recycling and disposal",
      width: 1200,
      height: 800,
    },
  ],
  [
    "/terms/",
    {
      src: "/images/hero.jpeg",
      alt: "Waste removal team loading a collection vehicle",
      width: 1920,
      height: 1280,
    },
  ],
  [
    "/privacy/",
    {
      src: "/images/hero.jpeg",
      alt: "Waste removal team loading a collection vehicle",
      width: 1920,
      height: 1280,
    },
  ],
]);

const commercialSitemapEntries: SitemapUrl[] = commercialSitemapPaths.map((loc) => {
  const service = seoServices.find((item) => buildServicePath(item) === loc);
  const area = seoLocations.find((item) => buildAreaPath(item) === loc);
  const serviceLocation = serviceLocationSeoPages.find((page) => page.path === loc);
  const image = staticSitemapImages.get(loc) || service?.image || area?.image || serviceLocation?.image;

  return {
    loc,
    images: sitemapImage(image),
  };
});

const prerenderRoutes = [
  ...commercialSitemapPaths,
  "/thank-you/",
  "/admin/",
  "/robots.txt",
  "/sitemap.xml",
  ...(enableDesignSystem ? designSystemRoutes : []),
];

export default defineNuxtConfig({
  compatibilityDate: "2025-11-01",

  modules: ["@nuxtjs/sitemap", "@nuxtjs/robots"],

  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  typescript: {
    strict: true,
  },

  runtimeConfig: {
    public: {
      siteUrl,
      siteName,
      enableDesignSystem,
      adminEmailDomain:
        process.env.NUXT_PUBLIC_ADMIN_EMAIL_DOMAIN || "dbs-waste.co.uk",
      firebase: {
        apiKey:
          process.env.NUXT_PUBLIC_FIREBASE_API_KEY ||
          "AIzaSyAHdtlqYpiTPLGA0-cs0Kzd31GsrvQHGvQ",
        authDomain:
          process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
          "wasteremoval-3276.firebaseapp.com",
        projectId:
          process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID || "wasteremoval-3276",
        storageBucket:
          process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
          "wasteremoval-3276.firebasestorage.app",
        messagingSenderId:
          process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
          "112080630299",
        appId:
          process.env.NUXT_PUBLIC_FIREBASE_APP_ID ||
          "1:112080630299:web:7ee64305d04016de3bbebe",
      },
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      title: siteName,
      titleTemplate: "%s",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#d7f55d" },
      ],
      link: [
        { rel: "icon", href: "/favicon.ico", sizes: "any" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
  },

  site: {
    url: siteUrl,
    name: siteName,
    trailingSlash: true,
  },

  nitro: {
    preset: "static",
    prerender: {
      crawlLinks: false,
      routes: prerenderRoutes,
      ignore: enableDesignSystem ? [] : [/^\/design-system(?:\/|$)/],
    },
  },

  routeRules: {
    "/": { prerender: true, noScripts: true },
  },

  sitemap: {
    excludeAppSources: true,
    discoverImages: false,
    urls: commercialSitemapEntries,
  },

  robots: {
    allow: "/",
    disallow: [],
    sitemap: `${siteUrl}/sitemap.xml`,
  },
});
