import tailwindcss from "@tailwindcss/vite";
import { serviceLocationSeoPages } from "./app/utils/seo-pages";

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || "https://dbs-waste.co.uk";
const siteName = process.env.NUXT_PUBLIC_SITE_NAME || "DBS Waste";

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
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      titleTemplate: `%s | ${siteName}`,
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },

  site: {
    url: siteUrl,
    name: siteName,
  },

  nitro: {
    preset: "static",
    prerender: {
      crawlLinks: true,
      routes: [
        "/",
        "/pricing",
        "/services",
        "/thank-you",
        "/design-system",
        "/robots.txt",
        "/sitemap.xml",
        ...serviceLocationSeoPages.map((page) => page.path),
      ],
      ignore: [],
    },
  },

  robots: {
    allow: "/",
    disallow: ["/design-system"],
    sitemap: `${siteUrl}/sitemap.xml`,
  },
});
