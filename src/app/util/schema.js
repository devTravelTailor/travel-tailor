import { getCanonicalUrl, getSiteUrl, toAbsoluteUrl } from "./seo";

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Travel Tailor",
    url: getSiteUrl(),
    logo: toAbsoluteUrl("/images/logo.png"),
    email: "hi@traveltailor.in",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "hi@traveltailor.in",
        telephone: "+91 9165070409",
        areaServed: "IN",
        availableLanguage: ["en"],
      },
    ],
    sameAs: [
      "https://www.instagram.com/traveltailor_in",
      "https://www.linkedin.com/company/travel-tailor-in/",
      "https://www.facebook.com/share/1EPxiFRpiR/?mibextid=wwXIfr",
    ],
  };
}

export function buildWebsiteSchema() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Travel Tailor",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${getCanonicalUrl("/search")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildBreadcrumbSchema(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildCollectionPageSchema({
  name,
  description,
  path,
  itemList = [],
}) {
  const url = getCanonicalUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: "Travel Tailor",
      url: getSiteUrl(),
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: itemList.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: getCanonicalUrl(`${path}/${item.slug}`),
        name: item.title || item.name || `Item ${index + 1}`,
      })),
    },
  };
}

export function buildTourSchema({
  name,
  description,
  path,
  image,
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name,
    description,
    url: getCanonicalUrl(path),
    image: image ? [toAbsoluteUrl(image)] : undefined,
    provider: {
      "@type": "Organization",
      name: "Travel Tailor",
      url: getSiteUrl(),
    },
  };
}

export function buildDestinationSchema({
  name,
  description,
  path,
  image,
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name,
    description,
    url: getCanonicalUrl(path),
    image: image ? [toAbsoluteUrl(image)] : undefined,
  };
}

export function buildServiceSchema({
  name,
  description,
  path,
  image,
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: getCanonicalUrl(path),
    image: image ? [toAbsoluteUrl(image)] : undefined,
    provider: {
      "@type": "Organization",
      name: "Travel Tailor",
      url: getSiteUrl(),
    },
  };
}
