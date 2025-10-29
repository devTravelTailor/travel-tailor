import { notFound } from "next/navigation";
import MonthHero from "../../../components/Hero/MonthHero";
import Highlights from "../../../components/Sections/Highlights";
import Spotlights from "../../../components/Sections/Spotlights";
import Destinations from "../../../components/Sections/Destinations";
import Blogs from "../../../components/Featured/Blogs";
import Banner from "../../../components/Banner/Banner";

import parseUrl from "../../../util/parseUrl";

// Configure the page to be statically generated
export const dynamic = "force-static";
export const revalidate = false; // Rebuild to update content

// Separate function to fetch experience type data
async function fetchExperienceData(slug) {
  const url = `${process.env.API_URL}/api/experiences/${slug}`;
  console.log("👉 Fetching:", url);

  try {
    console.log(`Fetching experience data for ${slug}`);

    const response = await fetch(
      `${process.env.API_URL}/api/experiences/${slug}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`, // If auth is needed
        },
      }
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch experience data for ${slug}: ${response.status} ${response.statusText}`
      );
      return null; // Indicate failure
    }

    const expData = await response.json();

    return expData.data;
  } catch (error) {
    console.error(`Error fetching experience data for ${slug}:`, error);
    return null; // Indicate failure
  }
}

// Generate metadata for the experience type page
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const experienceData = await fetchExperienceData(resolvedParams.slug);

  if (!experienceData) {
    return {
      title: "Experience Type Not Found",
      description:
        "Information for the requested experience type could not be found.",
    };
  }

  // *** Adjust metadata fields based on expected experience data structure ***
  const title =
    experienceData.title ||
    `${
      resolvedParams.slug.charAt(0).toUpperCase() + resolvedParams.slug.slice(1)
    } Experiences`;
  const description =
    experienceData.metaDescription ||
    experienceData.description ||
    `Discover the best ${resolvedParams.slug} experiences and destinations.`;
  // Use hero image or a specific display image for meta
  // const imageUrl = parseUrl(experienceData.heroImg);
  const imageUrl = parseUrl(
    `https://storage.googleapis.com/tt-media/photo_1527824404775_dce343118ebc_9e67a75db2/photo_1527824404775_dce343118ebc_9e67a75db2.jpeg`
  );

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

// Generate static params for pre-rendering experience type pages
export async function generateStaticParams() {
  try {
    // *** Adjust API endpoint for experience type slugs ***
    const response = await fetch(
      `${process.env.API_URL}/apihome/slugs/experience`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`, // If auth is needed
        },
      }
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch experience slugs: ${response.status} ${response.statusText}`
      );
      return [];
    }

    const slugsData = await response.json(); // Expecting [{ slug: '...' }] or ['...']

    // Adapt based on API response structure
    if (Array.isArray(slugsData) && slugsData.length > 0) {
      if (typeof slugsData[0] === "string") {
        return slugsData.map((slugStr) => ({ slug: slugStr }));
      } else if (typeof slugsData[0] === "object" && slugsData[0].slug) {
        return slugsData.map((item) => ({ slug: item.slug })); // Ensure only slug is passed
      }
    }
    console.error("Fetched experience slugs format is unexpected:", slugsData);
    return [];
  } catch (error) {
    console.error("Error fetching experience slugs:", error);
    return [];
  }
}

// Main Page Component for Experience Types (Consider renaming to ExperienceTypePage)
export default async function ExperiencePage({ params }) {
  const resolvedParams = await params;
  const experienceData = await fetchExperienceData(resolvedParams.slug);
  console.log("experienceData", experienceData);

  // Handle case where data isn't found
  if (!experienceData) {
    notFound();
  }

  // Define default headings using the experience type name (slug)
  const defaultSpotlightsHeading = {
    title: `Don't miss /nto /s explore \\s`, // Using 's' might be grammatically tricky, adjust as needed
    description: `Discover top spotlight locations experiences.`,
  };
  const defaultDestinationsHeading = {
    title: `Popular destinations /nto /s explore\\s`,
    description: `Explore amazing places.`,
  };

  return (
    <main>
      {experienceData.heroImg && (
        <MonthHero
          imgUrl={experienceData.heroImg}
          month={experienceData.title}
        />
      )}

      {experienceData.highlight && (
        <Highlights
          title={experienceData.highlight.title || `Enjoy your /n journey with`}
          img={experienceData.highlight.img}
          url={`/contact?src=${resolvedParams.slug}`}
          brief={experienceData.highlight.brief}
        />
      )}

      {experienceData.spotlights && experienceData.spotlights.length > 0 && (
        <Spotlights
          heading={defaultSpotlightsHeading}
          spotlights={experienceData.spotlights}
        />
      )}

      {experienceData.destinations &&
        experienceData.destinations.length > 0 && (
          <Destinations
            heading={defaultDestinationsHeading}
            destinations={experienceData.destinations}
          />
        )}

      {experienceData.blogs && experienceData.blogs.length > 0 && (
        <Blogs blogs={experienceData.blogs} />
      )}

      <Banner
        title={experienceData.banner?.title || `Ready for an /nAdventure?`}
        cta={experienceData.banner?.cta || "Enquire Now"}
        url={`/contact?src=${resolvedParams.slug}`}
      />
    </main>
  );
}
