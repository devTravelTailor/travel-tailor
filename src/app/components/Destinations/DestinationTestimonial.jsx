'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import parseUrl from '../../util/parseUrl';

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=900&auto=format&fit=crop';

const DEFAULT_REVIEW =
  'Travel Tailor captured exactly the kind of escape I wanted: thoughtful, private, and beautifully considered from start to finish.';

function getImageUrl(testimonial) {
  if (testimonial?.profileImg) return parseUrl(testimonial.profileImg);
  if (testimonial?.img?.[0]) return parseUrl(testimonial.img[0]);
  return DEFAULT_IMAGE;
}

function getAuthor(testimonial) {
  if (!testimonial) return 'Traveler';

  const parts = [testimonial.name, testimonial.place].filter(Boolean);
  return parts.join(', ') || 'Traveler';
}

function DestinationTestimonialCard({ testimonial }) {
  const review = testimonial?.review?.trim() || DEFAULT_REVIEW;
  const imageUrl = getImageUrl(testimonial);
  const author = getAuthor(testimonial);
  const heading = testimonial?.heading || 'What travelers say';

  return (
    <article className='grid gap-8 lg:grid-cols-[380px_minmax(0,1fr)] lg:items-center'>
      <div className='relative mx-auto w-full max-w-[320px] lg:max-w-none'>
        <div className='absolute inset-0 -z-10 scale-110 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,206,153,0.85),rgba(255,157,87,0.25)_55%,rgba(255,255,255,0)_72%)] blur-2xl' />
        <div className='relative mx-auto aspect-square w-[290px] max-w-full overflow-hidden rounded-full border-[8px] border-white shadow-[0_24px_60px_rgba(0,0,0,0.12)]'>
          <img
            src={imageUrl}
            alt={testimonial?.name || 'Traveler'}
            className='h-full w-full object-cover'
          />
        </div>
      </div>

      <div className='max-w-3xl'>
        <p className='mb-4 text-[11px] uppercase tracking-[0.38em] text-[#d56a2b]'>
          The destination voice
        </p>
        <h3
          className='text-3xl font-semibold italic text-gray-900 sm:text-4xl'
          style={{ fontFamily: "'Filson Pro', sans-serif" }}>
          {heading}
        </h3>
        <p className='mt-6 text-[22px] leading-[1.42] text-gray-800 sm:text-[26px]'>
          {review}
        </p>
        <div className='mt-8 flex flex-wrap items-center gap-3 text-sm'>
          <span className='h-px w-10 bg-[#d56a2b]' />
          <span className='font-semibold uppercase tracking-[0.18em] text-gray-900'>
            {author}
          </span>
          {testimonial?.travelType && (
            <span className='text-gray-400'>{testimonial.travelType}</span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function DestinationTestimonial({ testimonials = [] }) {
  const list = Array.isArray(testimonials) ? testimonials : [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= list.length) {
      setIndex(0);
    }
  }, [index, list.length]);

  if (!list.length) return null;

  const current = list[index] || list[0];

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + list.length) % list.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % list.length);
  };

  return (
    <section id='testimonials' className='w-full px-0 py-14 sm:py-16 lg:py-20'>
      <div className='relative mx-auto w-full max-w-[95rem] px-4 sm:px-6 lg:px-8'>
        <div className='rounded-[2rem] border border-[#f3e5db] bg-[#fffaf5] px-5 py-8 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:px-8 lg:px-12 lg:py-14'>
          <div className='mb-10 flex flex-col gap-2 lg:mb-12'>
            <p className='text-[11px] uppercase tracking-[0.38em] text-[#d56a2b]'>
              Testimonials
            </p>
            <h2
              className='text-3xl font-semibold text-gray-900 sm:text-4xl'
              style={{ fontFamily: "'Filson Pro', sans-serif" }}>
              What travelers say
            </h2>
          </div>

          <div className='transition-all duration-300'>
            <DestinationTestimonialCard testimonial={current} />
          </div>

          {list.length > 1 && (
            <div className='mt-10 flex items-center justify-end gap-3'>
              <button
                type='button'
                onClick={handlePrev}
                className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e8d7ca] bg-white text-[#d56a2b] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#d56a2b] hover:text-white'
                aria-label='Previous testimonial'>
                <ArrowLeft className='h-4 w-4' />
              </button>
              <button
                type='button'
                onClick={handleNext}
                className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e8d7ca] bg-white text-[#d56a2b] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#d56a2b] hover:text-white'
                aria-label='Next testimonial'>
                <ArrowRight className='h-4 w-4' />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
