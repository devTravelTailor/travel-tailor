import { notFound } from "next/navigation";
import ToursHero from "../../../components/Hero/ToursHero";
import ToursInfo from "../../../components/Features/TourInfo";
import Brief from "../../../components/CustomUI/Card/Brief";
import TripDays from "../../../components/Featured/TripDays";
import Inclusions from "../../../components/Featured/Inclusions";
import RollingCarousel from "../../../components/CustomUI/Rolling/ImgCarousal";
import Blogs from "../../../components/Featured/Blogs";
import Banner from "../../../components/Banner/Banner";
import Reviews from "../../../components/Featured/Reviews";
import Button from "../../../components/CustomUI/Button/Button";

import parseUrl from "../../../util/parseUrl";
import parsePrice from "../../../util/parsePrice";
import Tours from "../../../components/Sections/Tours";
import Destinations from "../../../components/Sections/Destinations";
import Experiences from "../../../components/Sections/Experiences";

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

    // console.log(tours);

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

  console.log(tourData);

  const reviews = Array.isArray(tourData.reviews)
    ? tourData.reviews
    : Array.isArray(tourData.testimonials)
    ? tourData.testimonials
    : [];

  const formattedReviews = reviews
    .map((review) => ({
      name: review?.name || review?.reviewer || review?.title || "Traveller",
      review:
        review?.review ||
        review?.text ||
        review?.content ||
        review?.message ||
        "",
      source: review?.source || review?.platform || "google",
    }))
    .filter((review) => review.review);

  const navItems = [
    { label: "Overview", href: "#overview", hasData: true },
    {
      label: "Itinerary",
      href: "#itinerary",
      hasData: Array.isArray(tourData.days) && tourData.days.length > 0,
    },
    {
      label: "Inclusions",
      href: "#inclusions",
      hasData: Boolean(tourData.inclusions),
    },
    {
      label: "Gallery",
      href: "#gallery",
      hasData: Array.isArray(tourData.images) && tourData.images.length > 0,
    },
    {
      label: "Reviews",
      href: "#reviews",
      hasData: formattedReviews.length > 0,
    },
  ].filter((item) => item.hasData);

  const tourTitle =
    tourData.title ||
    tourData.hero?.title ||
    tourData.info?.title ||
    "Tour";
  const priceValue =
    tourData.info?.price ?? tourData.price ?? tourData.details?.price ?? null;
  const priceDisplay =
    priceValue !== null &&
    priceValue !== undefined &&
    !Number.isNaN(Number(priceValue))
      ? parsePrice(priceValue)
      : typeof priceValue === "string" && priceValue.trim().length > 0
      ? priceValue
      : null;

  const nights = tourData.info?.nights;
  const durationDisplay =
    typeof nights === "number" && Number.isFinite(nights)
      ? `${nights} night${nights === 1 ? "" : "s"}`
      : Array.isArray(tourData.days) && tourData.days.length > 0
      ? `${tourData.days.length} day${tourData.days.length === 1 ? "" : "s"}`
      : tourData.info?.timeline || "";

  return (
    <main>
      {/* Always render Hero and Info sections */}
      <section id="overview" className="scroll-mt-28">
        <ToursHero heroData={tourData.hero} />
        <ToursInfo {...tourData.info} />
      </section>

      <div className="sticky top-14 md:top-15 z-30 bg-white/95 backdrop-blur border-y border-gray-100 py-3 md:py-4 w-full">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
              <div className="flex-1 min-w-0">
                {navItems.length > 0 && (
                  <div className="flex flex-nowrap md:flex-wrap items-center justify-start gap-3 overflow-x-auto scrollbar-thin">
                    {navItems.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:text-[#ff5b06] hover:border-[#ff5b06] transition-colors whitespace-nowrap"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
                <p className="mt-2 text-base md:text-lg font-semibold text-gray-900 truncate">
                  {tourTitle}
                </p>
              </div>

              <div className="flex flex-col items-stretch md:items-end gap-2 shrink-0">
                <Button
                  varient="color"
                  href={`/contact?src=${resolvedParams.slug || ""}`}
                  className="whitespace-nowrap"
                >
                  Plan your journey
                </Button>
                <div className="flex flex-wrap items-center justify-start md:justify-end gap-3 text-xs md:text-sm text-gray-600">
                  {priceDisplay && (
                    <span className="font-semibold text-[#ff5b06]">
                      {priceDisplay}
                    </span>
                  )}
                  {durationDisplay && (
                    <span className="font-medium text-gray-800">
                      {durationDisplay}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conditionally render Brief section */}
      {tourData.brief && (
        <section className="scroll-mt-28">
          <Brief
            description={tourData.brief}
            imgUrl={parseUrl(tourData.displayImg)}
            url={`/contact?src=${resolvedParams.slug}`}
          />
        </section>
      )}

      {/* Conditionally render Trip Days */}
      {tourData.days && tourData.days.length > 0 && (
        <section id="itinerary" className="scroll-mt-28">
          <TripDays days={tourData.days} />
        </section>
      )}

      {/* Conditionally render Inclusions */}
      {tourData.inclusions && (
        <section id="inclusions" className="scroll-mt-28">
          <Inclusions
            {...tourData.inclusions}
            url={`/contact?src=${resolvedParams.slug}`}
          />
        </section>
      )}

      {/* Conditionally render Image Carousel */}
      {tourData.images && tourData.images.length > 0 && (
        <section id="gallery" className="scroll-mt-28">
          <RollingCarousel images={tourData.images} speed={110} />
        </section>
      )}

      {formattedReviews.length > 0 && (
        <section id="reviews" className="scroll-mt-28">
          <Reviews reviews={formattedReviews} />
        </section>
      )}

      {/* Conditionally render Tours Component */}
      {tourData.tours && tourData.tours.length > 0 && (
        <Tours
          tours={tourData.tours}
          heading={{
            title: "/sTours\\s you might /n enjoy",
            description: "Explore the world with our curated tours",
          }}
        />
      )}

      {/* Conditionally render Blogs */}
      {tourData.blogs && tourData.blogs.length > 0 && (
        <Blogs
          blogs={tourData.blogs}
          heading={{
            title: "Similar /sPosts\\s",
            description: "You might like these blogs",
          }}
        />
      )}

      {tourData?.destinations?.length > 0 && (
        <Destinations
          destinations={tourData.destinations}
          heading={{
            title: "/sDestinations\\s you might /n enjoy",
            description: "Explore the world with our curated destinations",
          }}
        />
      )}
      {tourData.experiences && tourData.experiences.length > 2 && (
        <Experiences experiences={tourData.experiences} />
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
