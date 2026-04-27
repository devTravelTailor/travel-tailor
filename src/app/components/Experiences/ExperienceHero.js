import { Sparkles, User, Banknote } from 'lucide-react';
import parseUrl from '../../util/parseUrl';

const DEFAULT_LABEL = 'The Editorialist\u2019s Vision';
const DEFAULT_TITLE =
  'Solo travel is a choice.\nWe make sure it\u2019s also a good one.';
const DEFAULT_DESCRIPTION =
  'Your pace. Your detours. Your mornings with no agenda. We build around all of it.';

export default function ExperienceHero({
  heroImg,
  title,
  heroLabel,
  heroDescription,
  bestTime,
  idealFor,
  pricing,
}) {
  const label = heroLabel || DEFAULT_LABEL;
  const heading = title || DEFAULT_TITLE;
  const description = heroDescription || DEFAULT_DESCRIPTION;

  return (
    <section className='pt-4 sm:pt-2 px-16 sm:px-20 lg:px-0 py-5 min-h-fit max-h-[calc(100vh-80px)] w-full max-w-[1600px] mx-auto'>
      <div className='bg-[#fcfaf7] rounded-2xl overflow-hidden flex flex-col md:flex-row md:min-h-fit md:max-h-[calc(100vh-80px)] shadow-[0px_4px_24px_rgba(0,0,0,0.03)] w-full'>
        {/* Left — content */}
        <div className='p-6 sm:p-9 md:p-10 lg:p-14 xl:p-16 flex-1 flex flex-col justify-center min-w-0'>
          <h4
            style={{ fontFamily: 'var(--font-heading)' }}
            className='text-[#f05a22] font-extrabold tracking-[0.2em] text-[9px] sm:text-[10px] mb-4 sm:mb-5 uppercase'>
            {label}
          </h4>

          <h1
            style={{ fontFamily: 'var(--font-heading)' }}
            suppressHydrationWarning
            className='text-3xl sm:text-4xl md:text-[38px] lg:text-[52px] xl:text-[60px] font-bold text-gray-900 leading-[1.05] mb-4 sm:mb-5 tracking-tighter whitespace-pre-line'>
            {heading}
          </h1>

          <p
            suppressHydrationWarning
            className='text-[#f05a22] text-base sm:text-lg lg:text-xl font-medium mb-6 sm:mb-8 max-w-sm sm:max-w-md leading-snug'>
            {description}
          </p>

          <div className='flex flex-wrap items-center gap-3 mb-4'>
            {idealFor && (
              <div className='inline-flex items-center gap-2 px-4 py-2.5 rounded-3xl border border-white/70 bg-white/30 backdrop-blur-md text-gray-700 text-[11px] font-semibold tracking-wider uppercase shadow-sm'>
                <User className='w-3.5 h-3.5 text-gray-500' strokeWidth={2} />
                IDEAL FOR: {idealFor}
              </div>
            )}
            {pricing && (
              <div className='inline-flex items-center gap-2 px-4 py-2.5 rounded-3xl border border-white/70 bg-white/30 backdrop-blur-md text-gray-700 text-[11px] font-semibold tracking-wider uppercase shadow-sm'>
                <Banknote
                  className='w-3.5 h-3.5 text-gray-500'
                  strokeWidth={2}
                />
                PRICING: {pricing}
              </div>
            )}
          </div>

          {/* Tag info card — styled like "Signature Experiences" */}
          {bestTime && bestTime.length > 0 && (
            <div
              suppressHydrationWarning
              className='rounded-2xl bg-white p-4 sm:p-5 border border-gray-100 shadow-sm flex flex-col gap-4 mb-6 sm:mb-8 w-full'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <span className='inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#f05a22]/10 text-[#f05a22] border border-[#f05a22]/15 shadow-sm'>
                    <Sparkles className='w-4 h-4' />
                  </span>
                  <div>
                    <p className='text-[10px] uppercase tracking-[0.15em] text-[#f05a22] font-semibold'>
                      Best Time
                    </p>
                    <p className='text-xs font-semibold text-gray-900'>
                      Best Months to Travel
                    </p>
                  </div>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {bestTime &&
                    (Array.isArray(bestTime)
                      ? bestTime
                      : bestTime.split(', ')
                    ).map((time, index) => {
                      const formattedTime =
                        time.charAt(0).toUpperCase() +
                        time.slice(1).toLowerCase();
                      return (
                        <span
                          key={index}
                          className='group inline-flex items-center gap-2 rounded-full bg-[#f05a22]/10 text-[#f05a22] border border-[#f05a22]/25 px-3 py-1.5 text-xs font-semibold shadow-sm'>
                          <span className='h-1.5 w-1.5 rounded-full bg-[#f05a22]' />
                          {formattedTime}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          <div className='flex-1'></div>

          {/* CTA card */}
          <div className='bg-white rounded-2xl p-4 sm:p-5 lg:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0px_8px_24px_rgba(0,0,0,0.04)] w-full'>
            <div className='min-w-0'>
              <p className='text-[9px] sm:text-[10px] text-gray-400 font-bold mb-1 uppercase tracking-widest'>
                Ready to tailor it?
              </p>
              <p className='text-xs sm:text-sm font-semibold text-gray-800 leading-snug'>
                Curated especially for the independent mind.
              </p>
            </div>
            <a
              href='#contact-form'
              className='shrink-0 inline-block bg-[#f05a22] hover:bg-[#d64e1c] transition-colors text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-7 sm:px-9 py-3 sm:py-3.5 rounded-full shadow-lg shadow-orange-500/20 text-center'>
              Start Planning
            </a>
          </div>
        </div>

        {/* Right — image */}
        <div className='w-full md:flex-1 relative h-56 sm:h-72 md:h-auto md:max-h-[calc(100vh-80px)]'>
          <div className='absolute inset-0 md:rounded-r-2xl overflow-hidden'>
            <img
              src={heroImg ? parseUrl(heroImg) : '/uploads/solo-hero.jpg'}
              alt={title ? `${title} hero` : 'Experience hero'}
              className='w-full h-full object-cover'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
