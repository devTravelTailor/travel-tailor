import { getCanonicalUrl, toAbsoluteUrl } from "./seo";

const DEFAULT_OG_IMAGE = "/images/logoAlt.png";

export const metadata = {
  title: "Home | Travel Tailor",
  description:
    "Travel Tailor is a travel booking website that helps travelers find the best deals on Tours and help them plan their trips.",
  keywords:
    "travel consultant, custom trip planner, customised itinerary, travel advisor, travel agent and travel consultant",

  icons: {
    icon: "/images/logoAlt.png",
    shortcut: "/images/logoAlt.png",
    apple: "/images/logoAlt.png",
  },

  openGraph: {
    title: "Home | Travel Tailor",
    description:
      "Travel Tailor is a travel booking website that helps travelers find the best deals on Tours and help them plan their trips.",
    url: getCanonicalUrl("/"),
    siteName: "Travel Tailor",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: toAbsoluteUrl(DEFAULT_OG_IMAGE),
        alt: "Travel Tailor",
      },
    ],
  },
};

export function buildPageMetadata({
  title,
  description,
  path = "/",
  image,
  imageAlt,
  type = "website",
  noIndex = false,
  openGraphTitle,
  twitterTitle,
  keywords,
  extra = {},
}) {
  const canonical = getCanonicalUrl(path);
  const normalizedTitle = String(title || "Travel Tailor");
  const normalizedDescription = String(description || "");
  const normalizedImage = toAbsoluteUrl(image || DEFAULT_OG_IMAGE);
  const images = normalizedImage
    ? [
        {
          url: normalizedImage,
          alt: imageAlt || normalizedTitle,
        },
      ]
    : [];

  return {
    title: normalizedTitle,
    description: normalizedDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: openGraphTitle || normalizedTitle,
      description: normalizedDescription,
      url: canonical,
      siteName: "Travel Tailor",
      type,
      images,
    },
    twitter: {
      card: normalizedImage ? "summary_large_image" : "summary",
      title: twitterTitle || normalizedTitle,
      description: normalizedDescription,
      images: normalizedImage ? [normalizedImage] : [],
    },
    keywords,
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    ...extra,
  };
}
