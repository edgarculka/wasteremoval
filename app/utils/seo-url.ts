const fileLikeSegmentPattern = /\.[a-z0-9]+$/i;

function getBaseUrl(siteUrl: string) {
  return siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`;
}

function hasProtocol(value: string) {
  return /^[a-z][a-z0-9+.-]*:/i.test(value);
}

export function normalizeCanonicalPath(path: string) {
  const [withoutHash] = path.split("#", 1);
  const [withoutQuery] = (withoutHash || "/").split("?", 1);
  let cleanPath = withoutQuery || "/";

  if (!cleanPath.startsWith("/")) cleanPath = `/${cleanPath}`;
  if (cleanPath === "/") return cleanPath;

  const lastSegment = cleanPath.split("/").filter(Boolean).at(-1) || "";
  if (fileLikeSegmentPattern.test(lastSegment)) return cleanPath;

  return cleanPath.endsWith("/") ? cleanPath : `${cleanPath}/`;
}

export function getAbsoluteCanonicalUrl(siteUrl: string, path: string) {
  if (hasProtocol(path)) return path;
  return new URL(normalizeCanonicalPath(path), getBaseUrl(siteUrl)).href;
}

export function getAbsoluteAssetUrl(siteUrl: string, path: string) {
  if (hasProtocol(path)) return path;
  return new URL(path, getBaseUrl(siteUrl)).href;
}

function absolutizeStructuredUrl(siteUrl: string, value: string) {
  if (!value.startsWith("/")) return value;

  const [pathWithoutHash = "/", hash] = value.split("#", 2);
  const path = pathWithoutHash || "/";
  const lastSegment = path.split("/").filter(Boolean).at(-1) || "";
  const absoluteUrl = fileLikeSegmentPattern.test(lastSegment)
    ? getAbsoluteAssetUrl(siteUrl, path)
    : getAbsoluteCanonicalUrl(siteUrl, path);

  if (!hash) return absoluteUrl;

  const withHash = new URL(absoluteUrl);
  withHash.hash = hash;

  return withHash.href;
}

const structuredUrlKeys = new Set([
  "@id",
  "contentUrl",
  "discussionUrl",
  "downloadUrl",
  "embedUrl",
  "hasMap",
  "image",
  "item",
  "license",
  "logo",
  "mainEntityOfPage",
  "paymentUrl",
  "relatedLink",
  "sameAs",
  "significantLink",
  "target",
  "thumbnailUrl",
  "url",
  "urlTemplate",
]);

function absolutizeStructuredEntry<T>(key: string, value: T, siteUrl: string): T {
  if (!structuredUrlKeys.has(key)) return absolutizeStructuredData(value, siteUrl);

  if (typeof value === "string") {
    return absolutizeStructuredUrl(siteUrl, value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) =>
      typeof item === "string"
        ? absolutizeStructuredUrl(siteUrl, item)
        : absolutizeStructuredData(item, siteUrl),
    ) as T;
  }

  return absolutizeStructuredData(value, siteUrl);
}

export function absolutizeStructuredData<T>(value: T, siteUrl: string): T {
  if (Array.isArray(value)) {
    return value.map((item) => absolutizeStructuredData(item, siteUrl)) as T;
  }

  if (!value || typeof value !== "object") return value;

  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [
      key,
      absolutizeStructuredEntry(key, entry, siteUrl),
    ]),
  ) as T;
}
