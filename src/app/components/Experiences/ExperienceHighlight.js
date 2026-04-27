import { ArrowRight } from 'lucide-react';
import parseUrl from '../../util/parseUrl';

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function capitalizeFirstWord(value) {
  const text = normalizeText(value);
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function ExperienceHighlight({ highlight }) {
  if (!highlight?.title || !highlight?.brief || !highlight?.img) {
    return null;
  }

  const overline =
    normalizeText(highlight?.eyebrow) || normalizeText(highlight?.label);
  const heading = normalizeText(highlight?.title);
  const description = normalizeText(highlight?.brief);
  const watermark = capitalizeFirstWord(highlight?.watermark || 'Wander');
  const ctaLabel = normalizeText(highlight?.ctaLabel);
  const ctaHref = normalizeText(highlight?.ctaHref) || '#contact-form';
  const imageSource = parseUrl(highlight?.img || highlight?.imgUrl || '');
  const imageAlt = normalizeText(highlight?.title);

  if (!heading || !description || !imageSource) return null;

  return (
    <section className='max-w-[1600px] mx-auto relative overflow-hidden py-20 sm:py-24 lg:py-32 px-16 sm:px-20 lg:px-28 bg-[#fbf7f2]'>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 flex items-center justify-center select-none'>
        <span
          style={{ fontFamily: 'var(--font-prime)' }}
          className='whitespace-nowrap text-[22vw] leading-none font-black not-italic tracking-[0.06em] text-[#f05a22]/8 translate-y-2 ml-[0.06em]'>
          {watermark}
        </span>
      </div>

      <div className='relative z-10 mx-auto flex w-full max-w-[1600px] flex-col items-center px-4 sm:px-6 lg:px-8'>
        <div className='grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16'>
          <div className='max-w-2xl text-center lg:text-left'>
            <span
              style={{ fontFamily: 'var(--font-heading)' }}
              className='mb-5 block text-[11px] font-black uppercase tracking-[0.45em] text-[#f05a22]'>
              {overline}
            </span>

            <h2
              style={{ fontFamily: 'var(--font-heading)' }}
              className='text-4xl font-bold leading-[0.96] tracking-[-0.05em] text-gray-950 sm:text-5xl lg:text-6xl xl:text-7xl'>
              {heading}
            </h2>

            <p className='mx-auto mt-8 max-w-xl text-lg font-light leading-8 text-gray-700 sm:text-xl lg:mx-0'>
              {description}
            </p>

            {ctaLabel && (
              <a
                href={ctaHref}
                className='group mt-10 inline-flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.28em] text-[#f05a22] transition-colors hover:text-[#c84a1d]'>
                <span>{ctaLabel}</span>
                <ArrowRight
                  className='h-4 w-4 transition-transform group-hover:translate-x-1'
                  strokeWidth={2.2}
                />
              </a>
            )}
          </div>

          <div className='relative mx-auto w-full max-w-[24rem] shrink-0 rotate-[-3deg] transition-transform duration-500 hover:rotate-0 lg:max-w-[28rem]'>
            <div className='border border-black/5 bg-white p-4 pb-16 shadow-[0_28px_70px_rgba(15,23,42,0.14)]'>
              <div className='relative aspect-square overflow-hidden bg-[#111]'>
                <img
                  src={imageSource}
                  alt={imageAlt}
                  className='h-full w-full object-cover'
                />
              </div>
            </div>
            <div className='pointer-events-none absolute -right-3 top-8 h-24 w-24 rounded-full border border-[#f05a22]/10 bg-[#f05a22]/5 blur-2xl' />
          </div>
        </div>
      </div>
    </section>
  );
}
