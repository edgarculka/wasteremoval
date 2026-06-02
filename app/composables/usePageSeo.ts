import type { SeoImage } from "~/utils/seo-pages";
import {
  absolutizeStructuredData,
  getAbsoluteAssetUrl,
  getAbsoluteCanonicalUrl,
  normalizeCanonicalPath,
} from "~/utils/seo-url";

interface PageSeoOptions {
  title: string;
  description: string;
  path?: string;
  image?: SeoImage;
  type?: "website" | "article";
  robots?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

export function usePageSeo(options: PageSeoOptions) {
  const config = useRuntimeConfig();
  const route = useRoute();
  const siteUrl =
    (config.public.siteUrl as string | undefined) || "https://www.example.com";
  const siteName =
    (config.public.siteName as string | undefined) || companyDetails.tradingName;
  const canonicalPath = normalizeCanonicalPath(options.path || route.path);
  const canonicalUrl = getAbsoluteCanonicalUrl(siteUrl, canonicalPath);
  const imageUrl = options.image?.src
    ? getAbsoluteAssetUrl(siteUrl, options.image.src)
    : undefined;
  const structuredData = options.structuredData
    ? absolutizeStructuredData(options.structuredData, siteUrl)
    : undefined;

  useSeoMeta({
    title: options.title,
    description: options.description,
    robots: options.robots,
    ogTitle: options.title,
    ogDescription: options.description,
    ogUrl: canonicalUrl,
    ogSiteName: siteName,
    ogType: options.type || "website",
    ogImage: imageUrl,
    twitterCard: imageUrl ? "summary_large_image" : "summary",
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: imageUrl,
  });

  useHead({
    link: [{ rel: "canonical", href: canonicalUrl }],
    script: structuredData
      ? [
          {
            type: "application/ld+json",
            innerHTML: JSON.stringify(structuredData),
          },
        ]
      : [],
  });
}
