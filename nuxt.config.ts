import tailwindcss from "@tailwindcss/vite";
import {
  areaSeoPaths,
  serviceLocationSeoPages,
  serviceSeoPaths,
} from "./app/utils/seo-pages";
import { normalizeCanonicalPath } from "./app/utils/seo-url";

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || "https://dbs-waste.co.uk";
const siteName = process.env.NUXT_PUBLIC_SITE_NAME || "DBS Waste";
const enableDesignSystem = process.env.NUXT_PUBLIC_ENABLE_DESIGN_SYSTEM === "true";

const commercialSitemapPaths = [
  "/",
  "/pricing/",
  "/quote/",
  "/services/",
  "/areas/",
  "/additional-charges/",
  "/recycling-and-disposal/",
  ...areaSeoPaths,
  ...serviceSeoPaths,
  ...serviceLocationSeoPages.map((page) => page.path),
].map(normalizeCanonicalPath);

const prerenderRoutes = [
  ...commercialSitemapPaths,
  "/thank-you/",
  "/admin/",
  "/robots.txt",
  "/sitemap.xml",
  ...(enableDesignSystem ? ["/design-system/"] : []),
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
      script: [
        {
          type: "text/javascript",
          innerHTML: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "x0tf1bhgic");`,
        },
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

  sitemap: {
    excludeAppSources: true,
    discoverImages: false,
    urls: commercialSitemapPaths.map((loc) => ({ loc })),
  },

  robots: {
    allow: "/",
    disallow: [],
    sitemap: `${siteUrl}/sitemap.xml`,
  },
});
