'use client';

import { useRef, useEffect, useMemo } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import parseUrl from '../../util/parseUrl';

function TestimonialItem({ testimonial, reverse }) {
  const review = typeof testimonial?.review === 'string' ? testimonial.review.trim() : '';
  const name = typeof testimonial?.name === 'string' ? testimonial.name.trim() : '';
  const place = typeof testimonial?.place === 'string' ? testimonial.place.trim() : '';
  const imageUrl = testimonial?.profileImg
    ? parseUrl(testimonial.profileImg)
    : testimonial?.img?.[0]
      ? parseUrl(testimonial.img[0])
      : '';

  if (!testimonial || !review || !name || !imageUrl) return null;

  const author = `— ${name}${place ? `, ${place}` : ''}`;

  return (
    <div
      className={`relative min-w-[85vw] sm:min-w-full lg:min-w-0 w-full z-10 flex flex-col ${reverse ? 'lg:flex-row-reverse lg:ml-auto' : 'lg:flex-row lg:mr-auto'} items-center gap-6 lg:gap-10 lg:px-0 max-w-3xl xl:max-w-4xl snap-center shrink-0`}>
      {/* Big Circular Image */}
      <div className='flex-shrink-0 w-48 h-48 lg:w-[180px] lg:h-[180px] xl:w-[220px] xl:h-[220px] rounded-full overflow-hidden border-[6px] border-white/60 shadow-xl'>
        <img
          src={imageUrl}
          alt={testimonial?.name || 'Traveller'}
          className='w-full h-full object-cover'
        />
      </div>

      {/* Review */}
      <div className='relative flex flex-col max-w-sm md:max-w-md xl:max-w-lg w-full px-4 lg:px-0'>
        <p
          className={`text-xl md:text-2xl lg:text-[20px] xl:text-[24px] text-gray-800 font-serif italic font-medium leading-[1.4] mb-4 text-center ${reverse ? 'lg:text-right' : 'lg:text-left'}`}>
          {review}
        </p>
        <p
          className={`text-gray-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-center ${reverse ? 'lg:text-right' : 'lg:text-left'}`}>
          {author}
        </p>
      </div>
    </div>
  );
}

export default function ExperienceTestimonial({ testimonials }) {
  const list = Array.isArray(testimonials) ? testimonials : [];
  const shouldShowControls = list.length > 2;
  const slides = useMemo(() => {
    if (list.length === 0) return [];

    const grouped = [];
    for (let i = 0; i < list.length; i += 2) {
      const slide = list
        .slice(i, i + 2)
        .filter((item) => {
          const review = typeof item?.review === 'string' ? item.review.trim() : '';
          const name = typeof item?.name === 'string' ? item.name.trim() : '';
          const image = item?.profileImg || item?.img?.[0];
          return review && name && image;
        });

      if (slide.length > 0) grouped.push(slide);
    }
    return grouped;
  }, [list]);

  const scrollRef = useRef(null);

  const handlePrev = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      // If at the start, loop to the end
      if (scrollLeft <= 10) {
        scrollRef.current.scrollTo({
          left: scrollWidth,
          behavior: 'smooth',
        });
      } else {
        scrollRef.current.scrollTo({
          left: scrollLeft - clientWidth,
          behavior: 'smooth',
        });
      }
    }
  };

  const handleNext = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (!shouldShowControls) return;

    const interval = setInterval(handleNext, 5000); // Scroll every 5 seconds

    return () => clearInterval(interval);
  }, [shouldShowControls]);

  if (slides.length === 0) return null;

  return (
    <section
      className='bg-[#ffefe7] max-w-[1600px] mx-auto w-full py-16 lg:py-24 relative overflow-visible flex flex-col items-center justify-center min-h-[500px]'
      style={{
        backgroundImage: 'url("/images/testimonial-doodle-bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
      <div className='absolute inset-0 bg-[#ffefe7]/5 pointer-events-none' />

      <h4
        style={{ fontFamily: 'var(--font-heading)' }}
        className='text-[#f05a22] font-bold tracking-[0.2em] text-[10px] mb-12 lg:mb-16 uppercase relative z-10 px-6'>
        What solo travellers say
      </h4>

      {/* Fixed-width horizontal carousel: 2 testimonials per slide */}
      <div className='relative w-full max-w-[88rem] mx-auto'>
        <div
          ref={scrollRef}
          className='flex overflow-x-auto snap-x snap-mandatory gap-6 w-full px-6 lg:px-12 pb-8 lg:pb-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden z-10'>
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              className='min-w-full shrink-0 snap-center px-1 sm:px-4 lg:px-10'>
              <div className='flex flex-col gap-10 items-center py-4'>
                {slide.map((t, itemIndex) => {
                  const globalIndex = slideIndex * 2 + itemIndex;
                  return (
                    <TestimonialItem
                      key={t?._id || `${slideIndex}-${itemIndex}`}
                      testimonial={t}
                      reverse={globalIndex % 2 !== 0}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {shouldShowControls && (
          /* Navigation Controls - anchored to the first testimonial's right side */
          <div className='absolute right-28 top-20 sm:right-32 sm:top-24 lg:right-36 lg:top-20 flex items-center gap-4 z-20'>
            <button
              onClick={handlePrev}
              className='group flex items-center justify-center w-12 h-12 rounded-full bg-white backdrop-blur-md border border-white/60 text-[#f05a22] hover:bg-[#f05a22] hover:text-white hover:border-[#f05a22] transition-all duration-300 shadow-sm'
              aria-label='Previous testimonial'>
              <ArrowLeft
                size={20}
                strokeWidth={1.5}
                className='group-hover:-translate-x-0.5 transition-transform'
              />
            </button>
            <button
              onClick={handleNext}
              className='group flex items-center justify-center w-12 h-12 rounded-full bg-white backdrop-blur-md border border-white/60 text-[#f05a22] hover:bg-[#f05a22] hover:text-white hover:border-[#f05a22] transition-all duration-300 shadow-sm'
              aria-label='Next testimonial'>
              <ArrowRight
                size={20}
                strokeWidth={1.5}
                className='group-hover:translate-x-0.5 transition-transform'
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
