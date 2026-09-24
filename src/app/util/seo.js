const DEFAULT_SITE_URL = "https://traveltailor.in";
const INVALID_DOMAIN_VALUES = new Set([
  "your-domain.com",
  "http://your-domain.com",
  "https://your-domain.com",
]);

function normalizeUrl(rawUrl) {
  if (!rawUrl) return "";

  const trimmed = String(rawUrl).trim();
  if (!trimmed || INVALID_DOMAIN_VALUES.has(trimmed)) return "";

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  return withProtocol.replace(/\/+$/, "");
}

export function getSiteUrl() {
  return (
    normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL) ||
    normalizeUrl(process.env.SITE_URL) ||
    normalizeUrl(process.env.DOMAIN) ||
    normalizeUrl(process.env.NEXT_PUBLIC_DOMAIN) ||
    DEFAULT_SITE_URL
  );
}

export function getCanonicalUrl(path = "/") {
  const siteUrl = getSiteUrl();
  const normalizedPath = String(path || "/").startsWith("/")
    ? String(path || "/")
    : `/${String(path || "/")}`;

  return normalizedPath === "/" ? siteUrl : `${siteUrl}${normalizedPath}`;
}

export function toAbsoluteUrl(path = "/") {
  if (!path) return "";

  const value = String(path).trim();
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;

  return getCanonicalUrl(value.startsWith("/") ? value : `/${value}`);
}
