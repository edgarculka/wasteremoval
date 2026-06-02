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
  "/recycling-and-disposal/",
  ...areaSeoPaths,
  ...serviceSeoPaths,
  ...serviceLocationSeoPages.map((page) => page.path),
].map(normalizeCanonicalPath);

const prerenderRoutes = [
  ...commercialSitemapPaths,
  "/thank-you/",
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
