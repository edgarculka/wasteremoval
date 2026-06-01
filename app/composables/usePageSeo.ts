interface PageSeoOptions {
  title: string;
  description: string;
  path?: string;
  image?: SeoImage;
  type?: "website" | "article";
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

function getAbsoluteUrl(siteUrl: string, path: string) {
  return new URL(path, siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`).href;
}

export function usePageSeo(options: PageSeoOptions) {
  const config = useRuntimeConfig();
  const route = useRoute();
  const siteUrl =
    (config.public.siteUrl as string | undefined) || "https://www.example.com";
  const siteName =
    (config.public.siteName as string | undefined) || companyDetails.tradingName;
  const canonicalPath = options.path || route.path;
  const canonicalUrl = getAbsoluteUrl(siteUrl, canonicalPath);
  const imageUrl = options.image?.src
    ? getAbsoluteUrl(siteUrl, options.image.src)
    : undefined;

  useSeoMeta({
    title: options.title,
    description: options.description,
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
    script: options.structuredData
      ? [
          {
            type: "application/ld+json",
            innerHTML: JSON.stringify(options.structuredData),
          },
        ]
      : [],
  });
}
