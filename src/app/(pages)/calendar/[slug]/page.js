"use client"; // Add this directive at the very top

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import MonthHero from "../../../components/Hero/MonthHero";
import Highlights from "../../../components/Sections/Highlights";
import Destinations from "../../../components/Sections/Destinations";
import Tours from "../../../components/Sections/Tours";
import Experiences from "../../../components/Sections/Experiences";
import Blogs from "../../../components/Featured/Blogs";
import Banner from "../../../components/Banner/Banner";
import Spinner from "../../../components/CustomUI/Spinner/Spinner";

async function fetchCalendarData(slug) {
  try {
    // Use NEXT_PUBLIC_ prefixed variables for client-side access
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

    if (!apiUrl || !apiToken) {
      console.error(
        "API URL or Token is not defined in environment variables for client-side fetching."
      );
      // Return null to indicate an issue that should lead to notFound()
      return null;
    }

    const response = await fetch(`${apiUrl}/api/months/${slug.toLowerCase()}`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });

    // If response status indicates not found (e.g., 404)
    if (response.status === 404) {
      return null; // Indicate not found specifically
    }

    // Handle other non-successful responses
    if (!response.ok) {
      console.error(
        `Failed to fetch calendar data for ${slug}: ${response.status} ${response.statusText}`
      );
      // Throw an error for other failures, which will be caught and trigger notFound()
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    const months = await response.json();
    console.log(months);

    return months.data;
  } catch (error) {
    console.error(`Error fetching calendar data for ${slug}:`, error);
    // Re-throw the error so it's caught by the useEffect and triggers notFound()
    throw error;
  }
}

// Main Page Component for Calendar Months (Client-Side Rendering)
export default function CalendarPage() {
  const params = useParams(); // Get route parameters client-side
  const slug = params?.slug; // Access the slug safely

  const [calendarData, setCalendarData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // No need for error state, as all errors will trigger notFound()
  // const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      // setError(null); // No longer needed
      try {
        const data = await fetchCalendarData(slug);
        if (data === null) {
          // Handle case where fetchCalendarData explicitly returned null (e.g., 404, missing env vars)
          notFound(); // Trigger Next.js not found page
        } else {
          setCalendarData(data);
        }
      } catch (err) {
        // Catch ANY error from fetchCalendarData (network issue, API error, JSON parsing error)
        console.error(
          "Failed to load calendar data, triggering Not Found:",
          err
        );
        notFound(); // Trigger Next.js not found page for any fetch error
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [slug]); // Re-run effect when slug changes

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (!calendarData) {
    // If loading is finished but we still have no data, treat as Not Found.
    // This could happen if the initial slug check returns early,
    // or if fetch logic somehow completes without data and without error/null.
    notFound();
    return null; // Return null while Next.js handles the notFound() transition
  }

  // --- Success State ---
  // Prepare data needed for rendering
  const heroImageUrl = calendarData.heroImg;
  // Ensure slug exists before deriving monthName (should be guaranteed by checks above)
  const monthName = slug
    ? slug.charAt(0).toUpperCase() + slug.slice(1)
    : "Month";

  const defaultDestinationsHeading = {
    title: `Best places /n to /svisit in ${monthName}\\s`,
    description: "Discover amazing places recommended for this month",
  };
  const defaultToursHeading = {
    title: `/sTrips\\s in /n ${monthName}`,
    description: "Check out these tours perfect for this time of year",
  };

  return (
    <main>
      {/* Hero Section - Conditionally render */}
      {heroImageUrl && <MonthHero imgUrl={heroImageUrl} month={monthName} />}

      {/* Highlights Section - Conditionally render */}
      {calendarData.highlight && <Highlights {...calendarData.highlight} />}

      {/* Destinations Section */}
      {calendarData.tagDestinations &&
        calendarData.tagDestinations.length > 0 && (
          <Destinations
            heading={defaultDestinationsHeading}
            destinations={calendarData.tagDestinations}
          />
        )}

      {/* Experiences Section */}
      {calendarData.tagExperiences &&
        calendarData.tagExperiences.length > 2 && (
          <Experiences experiences={calendarData.tagExperiences} />
        )}

      {/* Tours Section */}
      {calendarData.tagTours && calendarData.tagTours.length > 0 && (
        <Tours heading={defaultToursHeading} tours={calendarData.tagTours} />
      )}

      {/* Blogs Section */}
      {calendarData.tagBlogs && calendarData.tagBlogs.length > 0 && (
        <Blogs blogs={calendarData.tagBlogs} />
      )}

      {/* Banner Section */}
      <Banner
        title={calendarData.bannerTitle || `Plan Your ${monthName} Adventure!`}
        cta={calendarData.bannerCta || "Get Inspired"}
        url={`/contact?src=${slug}`}
      />
    </main>
  );
}
