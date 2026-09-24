import { buildPageMetadata } from "../../util/metaData";

export const metadata = buildPageMetadata({
  title: "Travel Calendar",
  description:
    "Browse Travel Tailor's travel calendar for upcoming travel ideas and seasonal inspiration.",
  path: "/calendar",
  image: "/images/logoAlt.png",
  imageAlt: "Travel Tailor calendar",
  noIndex: true,
});

export default function CalendarLayout({ children }) {
return <>{children}</>;
}
