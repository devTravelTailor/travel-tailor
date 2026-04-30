'use client';

import DestinationCard from './DestinationCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

const DEFAULT_TITLE = 'Where solo travellers are going right now';
const DEFAULT_SUBTITLE =
  "Each of these destinations works particularly well for the solo traveller—offering a balance of safety, cultural depth, and the kind of beauty that's best appreciated in silence.";
const DEFAULT_CTA_LABEL = 'Plan your solo journey';

export default function SoloTravellersSection({
  destinations,
  sectionTitle,
  sectionSubtitle,
  ctaLabel,
  ctaHref = '#contact-form',
}) {
  if (!destinations || destinations.length === 0) return null;
  const title = sectionTitle || DEFAULT_TITLE;
  const subtitle = sectionSubtitle || DEFAULT_SUBTITLE;
  const label = ctaLabel || DEFAULT_CTA_LABEL;
  const showMobileArrows = destinations.length > 1;
  const showDesktopArrows = destinations.length > 4;

  return (
    <section className='w-full max-w-[1600px] mx-auto py-24 px-3 sm:px-4 lg:px-12 bg-[#f2f2f2] '>
      <div className='text-center mb-16 relative'>
        <h2
          style={{ fontFamily: 'var(--font-heading)' }}
          className='text-[32px] md:text-[40px] font-extrabold text-gray-900 mb-6 tracking-tighter uppercase relative z-10 inline-block px-6 md:px-10'>
          <span className='absolute top-1/2 left-0 right-0 h-px  -z-10 w-[140%] -translate-x-[15%] hidden md:block' />
          <span className='px-4 md:px-6'>
            Where solo travellers are going right n
            <em className='text-[#f05a22] italic mr-1'>o</em>
            w
          </span>
        </h2>
        <p className='text-gray-500 max-w-2xl mx-auto leading-relaxed text-[15px]'>
          {subtitle}
        </p>
      </div>

      <div className='relative pb-20'>
        <Carousel
          opts={{ align: 'start', loop: destinations.length > 1 }}
          className='relative px-2 lg:px-8'>
          <CarouselContent className='-ml-2 md:-ml-6 lg:-ml-8'>
            {destinations.map((destination) => (
              <CarouselItem
                key={destination._id || destination.slug}
                className='pl-2 md:pl-6 lg:pl-8 basis-full md:basis-1/2 lg:basis-1/4'>
                <DestinationCard destination={destination} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {showMobileArrows && (
            <>
              <CarouselPrevious className='md:hidden -left-2 top-[40%] size-11 bg-transparent shadow-none border-white/60 disabled:opacity-30' />
              <CarouselNext className='md:hidden -right-2 top-[40%] size-11 bg-transparent shadow-none border-white/60 disabled:opacity-30' />
            </>
          )}

          {showDesktopArrows && (
            <>
              <CarouselPrevious className='hidden lg:flex -left-3 top-[40%] size-11 bg-transparent shadow-none border-white/60 disabled:opacity-30' />
              <CarouselNext className='hidden lg:flex -right-3 top-[40%] size-11 bg-transparent shadow-none border-white/60 disabled:opacity-30' />
            </>
          )}
        </Carousel>
      </div>

      <div className='flex justify-center mt-[-30px] relative z-30'>
        <a
          href={ctaHref}
          className='inline-block bg-[#f05a22] hover:bg-[#d64e1c] transition-colors text-white text-[11px] font-bold uppercase tracking-widest px-10 py-5 rounded-full shadow-xl shadow-orange-500/20 text-center'>
          {label}
        </a>
      </div>
    </section>
  );
}
