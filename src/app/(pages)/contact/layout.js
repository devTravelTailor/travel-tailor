import { buildPageMetadata } from "../../util/metaData";

export const metadata = buildPageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Travel Tailor to plan a custom trip, ask questions, or start your travel enquiry.",
  path: "/contact",
  image: "/images/logoAlt.png",
  imageAlt: "Contact Travel Tailor",
  keywords: [
    "contact travel tailor",
    "travel enquiry",
    "custom trip planning",
    "travel consultation",
  ],
});

export default function ContactLayout({ children }) {
return <>{children}</>;
}
