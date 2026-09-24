import { buildPageMetadata } from "../../util/metaData";
import { buildCollectionPageSchema } from "../../util/schema";

export const metadata = buildPageMetadata({
  title: "Destinations",
  description:
    "Discover destination guides, travel inspiration, and curated places to explore with Travel Tailor.",
  path: "/destinations",
  image: "/images/logoAlt.png",
  imageAlt: "Travel Tailor destinations",
  keywords: [
    "travel destinations",
    "destination guides",
    "places to visit",
    "travel inspiration",
    "travel tailor destinations",
  ],
});

export default function DestinationsLayout({ children }) {
  const schema = buildCollectionPageSchema({
    name: "Travel Tailor Destinations",
    description:
      "Destination guides, places to visit, and travel inspiration curated by Travel Tailor.",
    path: "/destinations",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
