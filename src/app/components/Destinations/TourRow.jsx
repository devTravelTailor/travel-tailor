'use client';

import { TourCard } from '../TourList/TourCard';

function formatDate(val) {
  if (!val) return undefined;
  const d = new Date(val);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function TourRow({
  id = 'tours',
  title = 'Tours',
  subtitle,
  items = [],
  limit = 4,
  viewMoreHref = '/tours',
  viewMoreLabel = 'View more tours',
  fallbackLocation,
}) {
  const safeItems = Array.isArray(items) ? items.slice(0, limit) : [];
  if (safeItems.length === 0) return null;

  const renderHeading = (text) => {
    const parts = String(text || '').split(' ');
    const first = parts.shift() || '';
    const rest = parts.join(' ');
    return (
      <h2 className='text-3xl md:text-4xl font-semibold text-center text-gray-900'>
        <span className='font-semibold text-gray-900'>{first}</span>
        {rest ? (
          <span className='text-[#ff5b06] text-4xl md:text-5xl font-handwriting'>{` ${rest}`}</span>
        ) : null}
      </h2>
    );
  };

  return (
    <section id={id} className='py-12 md:py-16 scroll-mt-28'>
      <div className='w-full mx-auto px-5 sm:px-6 md:px-8'>
        <div className='flex flex-col gap-3 mb-8'>
          <div className='space-y-2 text-center'>
            {renderHeading(title)}
            {subtitle && (
              <p className='text-base text-muted-foreground max-w-2xl mx-auto'>
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5'>
          {safeItems.map((tour, idx) => (
            <TourCard
              key={tour._id || tour.slug || idx}
              title={tour.title}
              description={tour.description || tour.brief}
              heroImg={tour.heroImg || tour.displayImg || tour.coverImg}
              tourType={tour.tourType}
              date={formatDate(
                tour.dateRange?.startDate ||
                  tour.startDate ||
                  tour.departureDate ||
                  tour.date,
              )}
              slug={tour.slug}
              duration={
                tour.details?.totalDays ||
                tour.details?.duration ||
                tour.duration ||
                tour.days ||
                tour.nights ||
                '7 days'
              }
              groupSize={tour.groupSize}
              experiences={tour.experiences}
              location={
                tour.location ||
                tour.place ||
                tour.destination ||
                fallbackLocation ||
                (Array.isArray(tour.destinations) &&
                  tour.destinations[0]?.title) ||
                (Array.isArray(tour.destinations) && tour.destinations[0]?.name)
              }
            />
          ))}
        </div>

        {viewMoreHref && safeItems.length >= limit && (
          <div className='mt-6 flex justify-center'>
            <a
              href={viewMoreHref}
              className='px-4 py-2 rounded-full border border-[#ff5b06] text-[#ff5b06] hover:bg-[#ff5b06] hover:text-white transition'>
              {viewMoreLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
