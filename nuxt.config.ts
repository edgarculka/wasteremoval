import tailwindcss from "@tailwindcss/vite";

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || "https://www.example.com";
const siteName = process.env.NUXT_PUBLIC_SITE_NAME || "Waste Removal";

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
        "/thank-you",
        "/design-system",
        "/robots.txt",
        "/sitemap.xml",
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
