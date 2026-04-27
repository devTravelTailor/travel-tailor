import { notFound } from 'next/navigation';
import MonthHero from '../../../components/Hero/MonthHero';
import Highlights from '../../../components/Sections/Highlights';
import Destinations from '../../../components/Sections/Destinations';
import Tours from '../../../components/Sections/Tours';
import Experiences from '../../../components/Sections/Experiences';
import Blogs from '../../../components/Featured/Blogs';
import ContactFormSection from '../../../components/Shared/ContactFormSection';

export const revalidate = 300;

async function fetchCalendarData(slug) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

  if (!apiUrl || !apiToken) {
    return null;
  }

  const response = await fetch(`${apiUrl}/api/months/${slug.toLowerCase()}`, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    cache: 'force-cache',
    next: { revalidate: 300 },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const months = await response.json();
  return months.data;
}

export default async function CalendarPage({ params }) {
  const slug = params?.slug;

  if (!slug) {
    notFound();
  }

  const calendarData = await fetchCalendarData(slug);

  if (!calendarData) {
    notFound();
  }

  const heroImageUrl = calendarData.heroImg;
  const monthName = slug.charAt(0).toUpperCase() + slug.slice(1);

  const defaultDestinationsHeading = {
    title: `Best places /n to /svisit in ${monthName}\\s`,
    description: 'Discover amazing places recommended for this month',
  };
  const defaultToursHeading = {
    title: `/sTrips\\s in /n ${monthName}`,
    description: 'Check out these tours perfect for this time of year',
  };

  return (
    <main>
      {heroImageUrl && <MonthHero imgUrl={heroImageUrl} month={monthName} />}
      {calendarData.highlight && <Highlights {...calendarData.highlight} />}
      {calendarData.tagDestinations &&
        calendarData.tagDestinations.length > 0 && (
          <Destinations
            heading={defaultDestinationsHeading}
            destinations={calendarData.tagDestinations}
          />
        )}
      {calendarData.tagTours && calendarData.tagTours.length > 0 && (
        <Tours heading={defaultToursHeading} tours={calendarData.tagTours} />
      )}
      {calendarData.tagBlogs && calendarData.tagBlogs.length > 0 && (
        <Blogs blogs={calendarData.tagBlogs} />
      )}
      {calendarData.tagExperiences &&
        calendarData.tagExperiences.length > 2 && (
          <Experiences experiences={calendarData.tagExperiences} />
        )}
      <ContactFormSection source={slug} />
    </main>
  );
}
