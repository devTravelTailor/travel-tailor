import { buildPageMetadata } from "../../util/metaData";
import { buildCollectionPageSchema } from "../../util/schema";

export const metadata = buildPageMetadata({
  title: "Tours",
  description:
    "Explore curated tours, small-group journeys, and custom travel itineraries from Travel Tailor.",
  path: "/tours",
  image: "/images/logoAlt.png",
  imageAlt: "Travel Tailor tours",
  keywords: [
    "travel tours",
    "curated tours",
    "custom itineraries",
    "small group journeys",
    "travel tailor tours",
  ],
});

export default function ToursLayout({ children }) {
  const schema = buildCollectionPageSchema({
    name: "Travel Tailor Tours",
    description:
      "Curated tours, fixed-date journeys, and custom travel itineraries from Travel Tailor.",
    path: "/tours",
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
