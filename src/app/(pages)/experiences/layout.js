import { buildPageMetadata } from "../../util/metaData";
import { buildCollectionPageSchema } from "../../util/schema";

export const metadata = buildPageMetadata({
  title: "Experiences",
  description:
    "Browse curated travel experiences for couples, families, solo travellers, wellness, wildlife, and more.",
  path: "/experiences",
  image: "/images/logoAlt.png",
  imageAlt: "Travel Tailor experiences",
  keywords: [
    "travel experiences",
    "solo travel experiences",
    "family travel experiences",
    "wellness travel",
    "travel tailor experiences",
  ],
});

export default function ExperiencesLayout({ children }) {
  const schema = buildCollectionPageSchema({
    name: "Travel Tailor Experiences",
    description:
      "Curated travel experiences for couples, families, solo travellers, wellness, culture, and adventure.",
    path: "/experiences",
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
