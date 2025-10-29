import { notFound } from "next/navigation";
import DestinationsHero from "../../../components/Hero/DestinationsHero";
import Highlights from "../../../components/Sections/Highlights";
import Tours from "../../../components/Sections/Tours";
import Spotlights from "../../../components/Sections/Spotlights";
import Experiences from "../../../components/Sections/Experiences";
import Blogs from "../../../components/Featured/Blogs";
import Banner from "../../../components/Banner/Banner";

// Configure the page to be statically generated
export const dynamic = "force-static";
export const revalidate = false;

// Separate function to fetch destination data
async function fetchDestinationData(slug) {
  try {
    // *** Adjust API endpoint for a single destination ***
    const response = await fetch(
      `${process.env.API_URL}/api/destinations/${slug}`,
      {
        // cache: "force-cache",
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      // Log the error for debugging purposes on the server during build
      console.error(
        `Failed to fetch destination ${slug}: ${response.status} ${response.statusText}`
      );
      return null; // Indicate data fetch failure
    }

    const destination = await response.json();
    return destination.data;
  } catch (error) {
    // Log network or parsing errors
    console.error(`Error fetching destination ${slug}:`, error);
    return null; // Indicate data fetch failure
  }
}

// Generate metadata for the destination
export async function generateMetadata({ params }) {
  const resolvedParams = await params;

  const destination = await fetchDestinationData(resolvedParams.slug);

  if (!destination) {
    return {
      title: "Destination Not Found",
      description: "The requested destination could not be found.",
    };
  }

  // *** Adjust metadata fields based on expected destination data structure ***
  const title = destination.title || "Destination Details"; // Use specific meta title if available, fallback to title
  const description =
    destination.description || "Explore this amazing destination."; // Use specific meta description
  const imageUrl = destination.displayImg
    ? process.env.NEXT_PUBLIC_API_URL + destination.displayImg
    : null; // Construct image URL

  return {
    title: `${title} | Travel Tailor`,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

// Generate static params for pre-rendering destination pages
export async function generateStaticParams() {
  try {
    const response = await fetch(
      `${process.env.API_URL}/apihome/slugs/destination`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`, // Assuming auth is needed
        },
      }
    );

    console.log(response);

    if (!response.ok) {
      console.error(
        `Failed to fetch destination slugs: ${response.status} ${response.statusText}`
      );
      return [];
    }

    const destinations = await response.json();

    if (!Array.isArray(destinations)) {
      console.error("Fetched destination slugs is not an array:", destinations);
      return [];
    }

    return destinations.map((dest) => ({
      slug: dest.slug,
    }));
  } catch (error) {
    console.error("Error fetching destination slugs:", error);
    return [];
  }
}

// Main Page Component for Destinations
export default async function DestinationPage({ params }) {
  const resolvedParams = await params;
  const destinationData = await fetchDestinationData(resolvedParams.slug);

  if (!destinationData) {
    notFound();
  }

  // Default heading for Tours section if not provided by API
  const defaultToursHeading = {
    title: `Explore /s${destinationData.title || "the Destination"}\\s`, // Use fetched title if available
    description: "You might be interested in these tours",
  };

  console.log(destinationData.highlight);

  return (
    <main>
      {destinationData.heroImg && (
        <DestinationsHero
          imgUrl={`${destinationData.heroImg}`}
          title={destinationData.title}
          description={destinationData.description}
        />
      )}

      {destinationData.highlight && (
        <Highlights
          title={destinationData.highlight.title}
          brief={destinationData.highlight.brief}
          imgUrl={destinationData.highlight.imgUrl}
          img={destinationData.highlight.img}
          url={`/contact?src=${resolvedParams.slug}`}
        />
      )}

      {destinationData.tours && destinationData.tours.length > 0 && (
        <Tours
          heading={destinationData.toursHeading || defaultToursHeading}
          tours={destinationData.tours}
        />
      )}

      {destinationData.spotlights && destinationData.spotlights.length > 0 && (
        <Spotlights spotlights={destinationData.spotlights} />
      )}

      {/* Render Experiences - Assuming data structure like destinationData.experiences (an array) */}
      {destinationData.experiences &&
        destinationData.experiences.length > 2 && (
          <Experiences experiences={destinationData.experiences} />
        )}

      {/* Render Blogs - Assuming data structure like destinationData.blogs (an array) */}
      {destinationData.blogs && destinationData.blogs.length > 0 && (
        <Blogs blogs={destinationData.blogs} />
      )}

      {/* Render Banner - Using specific data or fallbacks */}
      <Banner
        title={
          destinationData.bannerTitle ||
          "Ready to Explore?\nLet's Plan Your Trip!"
        }
        cta={destinationData.bannerCta || "Get a Quote"}
        url={`/contact?src=${resolvedParams.slug}`}
      />
    </main>
  );
}
