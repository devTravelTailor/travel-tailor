import { notFound } from "next/navigation";
import ToursHero from "../../../components/Hero/ToursHero";
import ToursInfo from "../../../components/Features/TourInfo";
import Brief from "../../../components/CustomUI/Card/Brief";
import TripDays from "../../../components/Featured/TripDays";
import Inclusions from "../../../components/Featured/Inclusions";
import RollingCarousel from "../../../components/CustomUI/Rolling/ImgCarousal";
import ToursComponet from "../../../components/Sections/Tours";
import Blogs from "../../../components/Featured/Blogs";
import Banner from "../../../components/Banner/Banner";

import parseUrl from "../../../util/parseUrl";

// Configure the page to be statically generated
export const dynamic = "force-static";
export const revalidate = false;

// Separate function to fetch tour metadata
async function fetchTourMetadata(slug) {
  try {
    const response = await fetch(`${process.env.API_URL}/api/tour/${slug}`, {
      // cache: "force-cache",
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    return null;
  }
}

// Generate metadata for the tour
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const tour = await fetchTourMetadata(resolvedParams.slug);

  if (!tour) {
    return {
      title: "Tour Not Found",
      description: "The requested tour could not be found.",
    };
  }

  return {
    title: `${tour.title} | Travel Tailor` || "Tour Details",
    description: tour.description || "Description of the tour",
    openGraph: {
      title: tour.title,
      description: tour.description,
      images: tour.displayImg ? [{ url: parseUrl(tour.displayImg) }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: tour.title,
      description: tour.description,
      images: tour.displayImg ? [parseUrl(tour.displayImg)] : [],
    },
  };
}

// Generate static params for pre-rendering
export async function generateStaticParams() {
  try {
    const response = await fetch(`${process.env.API_URL}/apihome/slugs/tour`, {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });

    const tours = await response.json();

    console.log(tours);

    return tours.map((tour) => ({
      slug: tour.slug,
    }));
  } catch (error) {
    return [];
  }
}

// Main Page Component
export default async function TourPage({ params }) {
  const resolvedParams = await params;
  const tourData = await fetchTourMetadata(resolvedParams.slug);

  if (!tourData) {
    return notFound();
  }

  return (
    <main>
      {/* Always render Hero and Info sections */}
      <ToursHero heroData={tourData.hero} />
      <ToursInfo {...tourData.info} />

      {/* Conditionally render Brief section */}
      {tourData.brief && (
        <Brief
          description={tourData.brief}
          imgUrl={parseUrl(tourData.displayImg)}
          url={`/contact?src=${resolvedParams.slug}`}
        />
      )}

      {/* Conditionally render Trip Days */}
      {tourData.days && tourData.days.length > 0 && (
        <TripDays days={tourData.days} />
      )}

      {/* Conditionally render Inclusions */}
      {tourData.inclusions && (
        <Inclusions
          {...tourData.inclusions}
          url={`/contact?src=${resolvedParams.slug}`}
        />
      )}

      {/* Conditionally render Image Carousel */}
      {tourData.images && tourData.images.length > 0 && (
        <RollingCarousel images={tourData.images} speed={110} />
      )}

      {/* Conditionally render Tours Component */}
      {tourData.tours && tourData.tours.length > 0 && (
        <ToursComponet tours={tourData.tours} />
      )}

      {/* Conditionally render Blogs */}
      {tourData.blogs && tourData.blogs.length > 0 && (
        <Blogs blogs={tourData.blogs} />
      )}

      {/* Banner with fallback values */}
      <Banner
        title={tourData.bannerTitle || "Dreaming of an Adventure?\nLet's Talk!"}
        cta={tourData.bannerCta || "Enquire now"}
        url={`/contact?src=${resolvedParams.slug}`}
      />
    </main>
  );
}
