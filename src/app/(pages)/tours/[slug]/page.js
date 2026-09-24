import TourClientPage from "../../creator/tour/[slug]/page.jsx";
import { getCanonicalUrl } from "../../../util/seo";
import { buildBreadcrumbSchema, buildTourSchema } from "../../../util/schema";
import parseUrl from "../../../util/parseUrl";

async function fetchTourData(slug) {
  try {
    const response = await fetch(`${process.env.API_URL}/api/tour/${slug}`, {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;
    const result = await response.json();
    return result?.data || result || null;
  } catch (error) {
    console.error(`Failed to fetch SEO data for tour ${slug}:`, error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tour = await fetchTourData(slug);
  const canonicalUrl = getCanonicalUrl(`/tours/${slug}`);

  if (!tour) {
    return {
      title: "Tour Not Found",
      description: "The requested tour could not be found.",
      alternates: { canonical: canonicalUrl },
      robots: { index: false, follow: false },
    };
  }

  const title = tour?.seo?.metaTitle || tour?.title || "Tour";
  const description =
    tour?.seo?.metaDescription || tour?.brief || tour?.description || "";
  const image =
    tour?.seo?.shareImage ||
    tour?.heroImg ||
    (Array.isArray(tour?.galleryImgs) ? tour.galleryImgs[0] : "");
  const absoluteImage = image ? parseUrl(image) : null;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Travel Tailor",
      type: "website",
      images: absoluteImage ? [{ url: absoluteImage, alt: title }] : [],
    },
    twitter: {
      card: absoluteImage ? "summary_large_image" : "summary",
      title,
      description,
      images: absoluteImage ? [absoluteImage] : [],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function TourPage({ params }) {
  const { slug } = await params;
  const tour = await fetchTourData(slug);

  const tourSchema = tour
    ? buildTourSchema({
        name: tour?.title || "Tour",
        description: tour?.brief || tour?.description || "",
        path: `/tours/${slug}`,
        image:
          tour?.heroImg ||
          (Array.isArray(tour?.galleryImgs) ? tour.galleryImgs[0] : ""),
      })
    : null;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: getCanonicalUrl("/") },
    { name: "Tours", url: getCanonicalUrl("/tours") },
    { name: tour?.title || "Tour", url: getCanonicalUrl(`/tours/${slug}`) },
  ]);

  return (
    <>
      {tourSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([tourSchema, breadcrumbSchema]),
          }}
        />
      ) : null}
      <TourClientPage />
    </>
  );
}
