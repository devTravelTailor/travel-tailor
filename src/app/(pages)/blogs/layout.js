import { buildPageMetadata } from "../../util/metaData";
import { buildCollectionPageSchema } from "../../util/schema";

export const metadata = buildPageMetadata({
  title: "Blogs",
  description:
    "Read Travel Tailor blogs for destination guides, travel tips, itinerary ideas, and curated inspiration.",
  path: "/blogs",
  image: "/images/logoAlt.png",
  imageAlt: "Travel Tailor blogs",
  keywords: [
    "travel blogs",
    "destination guides",
    "travel tips",
    "itinerary ideas",
    "travel tailor blog",
  ],
});

export default function BlogsLayout({ children }) {
  const schema = buildCollectionPageSchema({
    name: "Travel Tailor Blogs",
    description:
      "Travel stories, destination guides, itinerary ideas, and practical travel tips from Travel Tailor.",
    path: "/blogs",
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
