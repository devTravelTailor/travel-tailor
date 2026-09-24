import { buildPageMetadata } from "../../util/metaData";

export const metadata = buildPageMetadata({
  title: "Search",
  description: "Search Travel Tailor for destinations, blogs, tours, and experiences.",
  path: "/search",
  image: "/images/logoAlt.png",
  imageAlt: "Search Travel Tailor",
  noIndex: true,
});

export default function SearchLayout({ children }) {
return <>{children}</>;
}
