import { notFound } from 'next/navigation';
import {
  ArrowUpRight,
  CalendarRange,
  Sparkles,
  Users,
  Wallet,
} from 'lucide-react';
import Banner from '../../../components/Banner/Banner';
import SectionGrid from '../../../components/Destinations/SectionGrid';
import ThingsToDoAlt from '../../../components/Destinations/ThingsToDoAlt';
import PlacesCarousel from '../../../components/Destinations/PlacesCarousel';
import TourRow from '../../../components/Destinations/TourRow';
import Highlights from '../../../components/Sections/Highlights';
import ParallaxScrollImg from '../../../components/CustomUI/Animation/ParallaxScrollImg';
import parseUrl from '../../../util/parseUrl';

// Keep this route dynamic so dashboard edits (e.g., idealFor) show up immediately
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Separate function to fetch destination data
async function fetchDestinationData(slug) {
  try {
    // *** Adjust API endpoint for a single destination ***
    const response = await fetch(
      `${process.env.API_URL}/api/destinations/${slug}`,
      {
        cache: 'no-store',
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      },
    );

    if (!response.ok) {
      // Log the error for debugging purposes on the server during build
      console.error(
        `Failed to fetch destination ${slug}: ${response.status} ${response.statusText}`,
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
      title: 'Destination Not Found',
      description: 'The requested destination could not be found.',
    };
  }

  // *** Adjust metadata fields based on expected destination data structure ***
  const title = destination.title || 'Destination Details'; // Use specific meta title if available, fallback to title
  const description =
    destination.description || 'Explore this amazing destination.'; // Use specific meta description
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
      card: 'summary_large_image',
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
      },
    );

    // console.log(response);

    if (!response.ok) {
      console.error(
        `Failed to fetch destination slugs: ${response.status} ${response.statusText}`,
      );
      return [];
    }

    const destinations = await response.json();

    if (!Array.isArray(destinations)) {
      console.error('Fetched destination slugs is not an array:', destinations);
      return [];
    }

    return destinations.map((dest) => ({
      slug: dest.slug,
    }));
  } catch (error) {
    console.error('Error fetching destination slugs:', error);
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

  console.log(destinationData);

  const heroImage =
    destinationData.heroImg ||
    destinationData.displayImg ||
    destinationData.highlight?.imgUrl ||
    destinationData.highlight?.img;

  const rawTagMonths = destinationData.tagMonths;
  const bestTimeMonths = Array.isArray(rawTagMonths)
    ? rawTagMonths
    : typeof rawTagMonths === 'string'
    ? rawTagMonths
        .split(/[,/|]+/)
        .map((m) => m.trim())
        .filter(Boolean)
    : [];
  const bestTimeDisplay =
    bestTimeMonths.length > 0
      ? bestTimeMonths
          .map((m) =>
            typeof m === 'string'
              ? m
              : m?.name ||
                m?.title ||
                m?.monthTag ||
                m?.tag ||
                m?.label ||
                m?.month ||
                '',
          )
          .filter(Boolean)
          .join(' / ')
      : '';

  const startingPrice =
    destinationData.startingPrice ||
    destinationData.approxCost ||
    destinationData.price ||
    destinationData.budget;

  const idealFor =
    destinationData.idealFor ||
    destinationData.travellers ||
    destinationData.travelers ||
    destinationData.travelerType;

  const thingsToDo = Array.isArray(destinationData.thingsToDo)
    ? destinationData.thingsToDo
    : [];
  const experiences = Array.isArray(destinationData.experiences)
    ? destinationData.experiences
    : [];

  const placesToVisit = Array.isArray(destinationData.placesToVisit)
    ? destinationData.placesToVisit
    : Array.isArray(destinationData.spotlights)
    ? destinationData.spotlights
    : [];

  const tours = Array.isArray(destinationData.tours)
    ? destinationData.tours
    : [];

  const blogs = Array.isArray(destinationData.blogs)
    ? destinationData.blogs
    : [];
  const experienceTags = (
    experiences.length > 0 ? experiences : thingsToDo
  ).slice(0, 12);
  const highlightTitle =
    destinationData.highlight?.title || `Why ${destinationData.title}`;
  const highlightSubtitle =
    destinationData.highlight?.brief ||
    `Signature moments and must-see details from ${destinationData.title}.`;
  const highlightHeader = `Highlight for ${
    destinationData.location || destinationData.title || 'this destination'
  }`;
  const highlightSubheader = `Check out the highlights of ${
    destinationData.location || destinationData.title || 'this destination'
  }.`;

  const renderAccentHeading = (text) => {
    const parts = String(text || '').split(' ');
    const first = parts.shift() || '';
    const rest = parts.join(' ');
    return (
      <h2 className='text-2xl md:text-3xl font-semibold text-center text-gray-900'>
        <span className='text-[#ff5b06] text-3xl md:text-4xl font-handwriting mr-2'>
          {first}
        </span>
        {rest ? ` ${rest}` : ''}
      </h2>
    );
  };

  const navItems = [
    {
      label: 'Things to do',
      href: '#things-to-do',
      hasData: thingsToDo.length > 0,
    },
    {
      label: 'Places to visit',
      href: '#places-to-visit',
      hasData: placesToVisit.length > 0,
    },
    { label: 'Tours', href: '#tours', hasData: tours.length > 0 },

    { label: 'Blogs', href: '#blogs', hasData: blogs.length > 0 },
  ].filter((item) => item.hasData);

  return (
    <main>
      <section className='pt-8 md:pt-12 pb-4'>
        <div className='w-full px-4 md:px-8'>
          {/* Mobile-first hero */}
          <div className='md:hidden'>
            <div className='relative rounded-3xl overflow-hidden border border-gray-100 shadow-sm'>
              <div className='relative min-h-[500px] w-full'>
                {heroImage ? (
                  <>
                    <img
                      src={parseUrl(heroImage)}
                      alt={destinationData.title}
                      className='h-full w-full object-cover'
                    />
                    <div className='absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black/70' />
                    {destinationData?.location && (
                      <div className='absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 text-xs font-semibold text-[#ff5b06] shadow-sm'>
                        {destinationData.location}
                      </div>
                    )}
                  </>
                ) : (
                  <div className='h-full w-full grid place-items-center bg-gradient-to-br from-gray-50 to-gray-100 text-muted-foreground'>
                    <span>No image available</span>
                  </div>
                )}

                <div className='absolute inset-0 flex items-end p-3 sm:p-4'>
                  <div className='w-full bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-5 space-y-4 shadow-lg'>
                    <p className='text-[11px] uppercase tracking-[0.18em] text-[#ff5b06] font-semibold'>
                      Destination spotlight
                    </p>
                    <h1 className='text-xl sm:text-2xl font-semibold leading-tight text-gray-900'>
                      {destinationData.title}
                    </h1>
                    {destinationData.description && (
                      <p className='text-sm sm:text-base text-gray-600 leading-relaxed'>
                        {destinationData.description}
                      </p>
                    )}

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3'>
                      {[
                        bestTimeDisplay && {
                          label: 'Best time',
                          value: bestTimeDisplay,
                          icon: CalendarRange,
                        },
                        {
                          label: 'Budget',
                          value: startingPrice
                            ? `From ${startingPrice}`
                            : 'On request',
                          icon: Wallet,
                        },
                      ]
                        .filter(Boolean)
                        .map((item, idx) => (
                          <div
                            key={idx}
                            className='rounded-xl border border-gray-100 bg-gray-50/80 p-3 sm:p-3.5 flex gap-2 items-start'>
                            <item.icon className='w-4 h-4 text-[#ff5b06] mt-0.5 shrink-0' />
                            <div className='space-y-0.5'>
                              <p className='text-[10px] uppercase tracking-[0.12em] text-gray-500 font-semibold'>
                                {item.label}
                              </p>
                              <p className='text-xs font-semibold text-gray-900 leading-snug break-words whitespace-normal'>
                                {item.value}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>

                    <a
                      href={`/contact?src=${resolvedParams.slug || ''}`}
                      className='mt-3 inline-flex items-center justify-center gap-2 w-full rounded-full bg-[#ff5b06] text-white border border-[#ff5b06] px-4 py-2 text-sm font-semibold shadow-sm hover:-translate-y-0.5 hover:bg-transparent hover:text-[#ff5b06] hover:border-[#ff5b06] transition'>
                      Enquire now
                      <ArrowUpRight className='w-4 h-4' />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop / tablet hero */}
          <div className='hidden md:grid md:grid-cols-[1.05fr_1fr] items-stretch gap-8 rounded-3xl border border-gray-100 bg-white shadow-sm overflow-hidden min-h-[280px] md:min-h-fit'>
            <div className='relative min-h-[320px] md:min-h-[460px] h-full'>
              {heroImage ? (
                <>
                  <ParallaxScrollImg speed={2.5} direction='up'>
                    <img
                      src={parseUrl(heroImage)}
                      alt={destinationData.title}
                      className='h-full w-full object-cover scale-[1.25]'
                    />
                  </ParallaxScrollImg>
                  <div className='absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent' />
                  {destinationData?.location && (
                    <div className='absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/85 text-xs font-semibold text-[#ff5b06] shadow-sm'>
                      {destinationData.location}
                    </div>
                  )}
                </>
              ) : (
                <div className='h-full w-full grid place-items-center bg-gradient-to-br from-gray-50 to-gray-100 text-muted-foreground'>
                  <span>No image available</span>
                </div>
              )}
            </div>

            <div className='p-6 md:p-10 h-full flex flex-col gap-4 md:gap-6 justify-center'>
              <p className='text-xs uppercase tracking-[0.25em] text-[#ff5b06]/80 font-semibold'>
                Destination spotlight
              </p>
              <h1 className='text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900'>
                {destinationData.title}
              </h1>
              {destinationData.description && (
                <p className='text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed break-words'>
                  {destinationData.description}
                </p>
              )}

              <div className='grid scrollbar-hidden sm:grid-cols-3 gap-3 mt-2'>
                {[
                  bestTimeDisplay && {
                    label: 'Best time to visit',
                    value: bestTimeDisplay,
                    icon: CalendarRange,
                  },
                  {
                    label: 'Pricing',
                    value: startingPrice
                      ? `Starting from ${startingPrice}`
                      : 'Request a quote',
                    icon: Wallet,
                  },
                  {
                    label: 'Ideal for',
                    value: idealFor || 'Travellers & small groups',
                    icon: Users,
                  },
                ]
                  .filter(Boolean)
                  .map((item, idx) => (
                    <div
                      key={idx}
                      className='rounded-2xl border border-gray-100 bg-gray-50/60 p-4 flex gap-3 items-start'>
                      <item.icon className='w-5 h-5 text-[#ff5b06] mt-0.5' />
                      <div className='space-y-1'>
                        <p className='text-[11px] uppercase tracking-[0.15em] text-gray-500 font-semibold'>
                          {item.label}
                        </p>
                        <p className='text-sm font-medium text-gray-900'>
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              {(bestTimeDisplay || experienceTags.length > 0) && (
                <div className='grid lg:grid-cols-[1.25fr_0.9fr] gap-3 lg:gap-4 mt-4'>
                  {experienceTags.length > 0 && (
                    <div className='rounded-2xl bg-white p-5 border border-gray-100 shadow-sm flex flex-col gap-4'>
                      <div className='flex items-start gap-3 justify-between'>
                        <div className='flex items-center gap-3'>
                          <span className='inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ff5b06]/10 text-[#ff5b06] border border-[#ff5b06]/15 shadow-sm'>
                            <Sparkles className='w-4 h-4' />
                          </span>
                          <div className='space-y-1'>
                            <p className='text-[11px] uppercase tracking-[0.15em] text-[#ff5b06] font-semibold'>
                              Signature experiences
                            </p>
                            <p className='text-sm font-semibold text-gray-900'>
                              Curated for this destination
                            </p>
                          </div>
                        </div>
                        <span className='hidden sm:inline-flex px-3 py-1 rounded-full border border-gray-200 bg-gray-50 text-[11px] font-semibold text-[#ff5b06]'>
                          {experienceTags.length} ideas
                        </span>
                      </div>

                      <div className='flex flex-wrap gap-2'>
                        {experienceTags.map((exp, idx) => {
                          const label =
                            exp.title ||
                            exp.name ||
                            exp.heading ||
                            'Experience';
                          const slug = exp.slug || exp._id;
                          const href = slug ? `/experiences/${slug}` : '#';

                          return (
                            <a
                              key={`${slug || idx}`}
                              href={href}
                              className='group inline-flex items-center gap-2 rounded-full bg-[#ff5b06]/10 text-[#ff5b06] border border-[#ff5b06]/25 px-3 py-2 text-xs font-semibold shadow-sm transition hover:bg-[#ff5b06] hover:text-white'>
                              <span className='h-2 w-2 rounded-full bg-[#ff5b06] transition-colors duration-200 group-hover:bg-white'></span>
                              {label}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className='flex flex-col gap-3'>
                    <div className='rounded-2xl bg-white text-gray-900 p-5 border border-gray-100 shadow-sm flex flex-col gap-4'>
                      <div className='space-y-1'>
                        <p className='text-[11px] uppercase tracking-[0.15em] text-[#ff5b06] font-semibold'>
                          Ready to tailor it?
                        </p>
                        <p className='text-base font-semibold leading-snug text-gray-900'>
                          Tell us your vibe and get a crafted plan in 24 hours.
                        </p>
                        <p className='text-sm text-gray-600'>
                          Our specialists refine every detail, from stays to
                          hidden spots, just for you.
                        </p>
                      </div>
                      <a
                        href={`/contact?src=${resolvedParams.slug || ''}`}
                        className='inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-full bg-[#ff5b06] text-white border border-[#ff5b06] px-4 py-2 text-sm font-semibold shadow-sm hover:-translate-y-0.5 hover:bg-transparent hover:text-[#ff5b06] hover:border-[#ff5b06] transition'>
                        Enquire now
                        <ArrowUpRight className='w-4 h-4' />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {navItems.length > 0 && (
        <div className='sticky top-14 scrollbar-hidden md:top-15 z-30 bg-white/95 backdrop-blur border-y border-gray-100 py-3 md:py-4 w-full'>
          <div className='w-full max-w-6xl mx-auto px-4 md:px-8 flex flex-nowrap md:flex-wrap items-center justify-start md:justify-center gap-3 overflow-x-auto scrollbar-thin'>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className='px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:text-[#ff5b06] hover:border-[#ff5b06] transition-colors whitespace-nowrap'>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {destinationData.highlight && (
        <section className='pt-8 md:pt-12'>
          <div className='max-w-4xl mx-auto px-4 md:px-8 text-center space-y-3'>
            {renderAccentHeading(highlightHeader)}
            <p className='text-base md:text-lg text-muted-foreground leading-relaxed break-words'>
              {highlightSubheader}
            </p>
          </div>
          <Highlights
            title={highlightTitle}
            brief={destinationData.highlight.brief}
            imgUrl={
              destinationData.highlight.imgUrl || destinationData.highlight.img
            }
            img={destinationData.highlight.img}
            url={`/contact?src=${resolvedParams.slug}`}
            noBtn
          />
        </section>
      )}

      {thingsToDo.length > 0 && (
        <ThingsToDoAlt
          id='things-to-do'
          title='Things to do'
          subtitle='Signature experiences and hands-on ways to explore this place.'
          items={thingsToDo}
        />
      )}

      {placesToVisit.length > 0 && (
        <PlacesCarousel
          id='places-to-visit'
          title='Places to visit'
          subtitle='Landscapes, landmarks, and moments you should not miss.'
          items={placesToVisit}
        />
      )}

      {tours.length > 0 && (
        <TourRow
          id='tours'
          title='Top Tours'
          subtitle='Curated journeys that pair perfectly with this destination.'
          items={tours}
          limit={4}
          viewMoreHref='/tours'
          viewMoreLabel='View more tours'
          fallbackLocation={destinationData.title}
        />
      )}

      {blogs.length > 0 && (
        <SectionGrid
          id='blogs'
          title='Travel Stories'
          subtitle='Blogs, notes, and highlights from travellers and our team.'
          items={blogs}
          type='blogs'
          limit={4}
          viewMoreHref='/blogs'
          viewMoreLabel='View more blogs'
          fullWidth
          forceSingleRow
        />
      )}

      {/* Render Banner - Using specific data or fallbacks */}
      <Banner
        title={
          destinationData.bannerTitle ||
          "Ready to Explore?\nLet's Plan Your Trip!"
        }
        cta={destinationData.bannerCta || 'Get a Quote'}
        url={`/contact?src=${resolvedParams.slug}`}
      />
    </main>
  );
}
