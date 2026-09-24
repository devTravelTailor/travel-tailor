import { getCanonicalUrl } from "../../../../util/seo";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  return {
    alternates: {
      canonical: getCanonicalUrl(`/tours/${slug}`),
    },
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
  };
}

export default function CreatorTourLayout({ children }) {
  return <>{children}</>;
}
