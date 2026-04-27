function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export default function ExperienceQuote({ category, destination, quote }) {
  const categoryTag = normalizeText(category?.tag);
  const destinationTitle =
    normalizeText(destination?.title) || normalizeText(destination?.name);
  const quoteText =
    normalizeText(quote?.text) ||
    normalizeText(quote?.brief) ||
    normalizeText(category?.quote?.text) ||
    normalizeText(category?.quote?.brief);
  const quoteAuthor =
    normalizeText(quote?.author) ||
    normalizeText(category?.quote?.author) ||
    normalizeText(category?.quote?.source) ||
    destinationTitle;

  if (!quoteText) return null;

  return (
    <section className='relative overflow-hidden py-20 sm:py-24 lg:py-28 bg-white'>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 flex items-center justify-center select-none'>
        <span
          style={{ fontFamily: 'var(--font-heading)' }}
          className='whitespace-nowrap text-[24vw] leading-none font-black tracking-[-0.08em] text-[#f05a22]/7'>
          &ldquo;
        </span>
      </div>

      <div className='relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl text-center'>
          {categoryTag && (
            <p
              style={{ fontFamily: 'var(--font-heading)' }}
              className='mb-4 text-[11px] font-black uppercase tracking-[0.45em] text-[#f05a22]'>
              {categoryTag}
            </p>
          )}

          <blockquote
            style={{ fontFamily: 'var(--font-heading)' }}
            className='text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-gray-950 sm:text-4xl lg:text-5xl'>
            {quoteText}
          </blockquote>

          {quoteAuthor && (
            <div className='mt-8 flex flex-col items-center gap-2'>
              <span className='h-px w-14 bg-[#f05a22]/30' />
              <p className='text-xs font-bold uppercase tracking-[0.3em] text-gray-500'>
                {quoteAuthor}
              </p>
            </div>
          )}

          {destinationTitle && (
            <p className='mt-6 text-sm uppercase tracking-[0.24em] text-gray-400'>
              {destinationTitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
