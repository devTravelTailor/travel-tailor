'use client';

import { useMemo, useState } from 'react';
import ParallaxScrollImg from '../CustomUI/Animation/ParallaxScrollImg';
import parseUrl from '../../util/parseUrl';

export default function ThingsToDoAlt({
  id = 'things-to-do',
  title = 'Things to do',
  subtitle,
  items = [],
}) {
  const safeItems = useMemo(
    () =>
      (Array.isArray(items) ? items : []).filter(
        (i) => i?.title || i?.description || i?.img || i?.image,
      ),
    [items],
  );
  const [showAll, setShowAll] = useState(false);
  if (safeItems.length === 0) return null;

  const visible = showAll ? safeItems : safeItems.slice(0, 2);
  const renderHeading = (text) => {
    const parts = String(text || '').split(' ');
    const first = parts.shift() || '';
    const rest = parts.join(' ');
    return (
      <h2 className='text-3xl md:text-4xl font-semibold text-center text-gray-900'>
        <span className='text-[#ff5b06] text-4xl md:text-5xl font-handwriting'>
          {first}
        </span>
        {rest ? ` ${rest}` : ''}
      </h2>
    );
  };

  const renderText = (item) => (
    <div className='p-6 md:p-10 flex flex-col justify-center bg-white h-full'>
      <p className='text-[11px] uppercase tracking-[0.2em] text-[#ff5b06] font-semibold mb-2'>
        Experience
      </p>
      <h3 className='text-2xl md:text-3xl font-semibold text-gray-900 leading-tight break-words'>
        {item.title || 'Experience'}
      </h3>
      {item.description && (
        <p className='mt-3 text-base md:text-lg text-gray-600 leading-relaxed break-words'>
          {item.description}
        </p>
      )}
    </div>
  );

  const renderImage = (item, idx) => {
    const imgSrc = item.img || item.image || item.imgUrl || item.displayImg;
    return (
      <div className='relative min-h-[280px] md:min-h-[360px] bg-gray-100 overflow-hidden'>
        {imgSrc ? (
          <ParallaxScrollImg speed={2.5} direction='up'>
            <img
              src={parseUrl(imgSrc)}
              alt={item.title || `Thing ${idx + 1}`}
              className='h-full w-full object-cover brightness-90 scale-[1.25] transition-transform duration-700'
              loading={idx < 2 ? 'eager' : 'lazy'}
            />
          </ParallaxScrollImg>
        ) : (
          <div className='h-full w-full grid place-items-center text-gray-400'>
            No image
          </div>
        )}
      </div>
    );
  };

  return (
    <section id={id} className='py-10 md:py-12 w-full'>
      <div className='w-full px-4 md:px-8'>
        <div className='mb-6 text-center'>
          {renderHeading(title)}
          {subtitle && (
            <p className='text-base text-muted-foreground max-w-3xl mt-2 mx-auto'>
              {subtitle}
            </p>
          )}
        </div>

        {/* Mobile layout */}
        <div className='md:hidden flex flex-col gap-4 px-1 sm:px-2'>
          {visible.map((item, idx) => {
            const imgSrc =
              item.img || item.image || item.imgUrl || item.displayImg;
            return (
              <div
                key={`m-${idx}`}
                className='rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden min-h-[420px] flex flex-col'>
                <div className='relative h-64 bg-gray-100 overflow-hidden'>
                  {imgSrc ? (
                    <ParallaxScrollImg speed={2.5} direction='up'>
                      <img
                        src={parseUrl(imgSrc)}
                        alt={item.title || `Thing ${idx + 1}`}
                        className='h-full w-full object-cover brightness-90 scale-[1.25] transition-transform duration-700'
                        loading={idx < 2 ? 'eager' : 'lazy'}
                      />
                    </ParallaxScrollImg>
                  ) : (
                    <div className='h-full w-full grid place-items-center text-gray-400'>
                      No image
                    </div>
                  )}
                </div>
                <div className='p-5 flex flex-col gap-2'>
                  <p className='text-[11px] uppercase tracking-[0.18em] text-[#ff5b06] font-semibold'>
                    Experience
                  </p>
                  <h3 className='text-xl font-semibold text-gray-900 leading-tight break-words'>
                    {item.title || 'Experience'}
                  </h3>
                  {item.description && (
                    <p className='text-sm text-gray-600 leading-relaxed break-words'>
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop layout */}
        <div className='hidden md:flex flex-col bg-white rounded-3xl overflow-hidden'>
          {visible.map((item, idx) => {
            const textFirst = idx % 2 === 0;
            const text = renderText(item);
            const image = renderImage(item, idx);
            return (
              <div
                key={idx}
                className='grid md:grid-cols-2 w-full md:gap-0 border-b border-gray-100 last:border-0 md:min-h-[420px]'>
                {textFirst ? (
                  <>
                    {text}
                    {image}
                  </>
                ) : (
                  <>
                    {image}
                    {text}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {safeItems.length > 2 && (
          <div className='mt-4 flex justify-center'>
            <button
              type='button'
              onClick={() => setShowAll((v) => !v)}
              className='px-4 py-2 rounded-full border border-[#ff5b06] text-[#ff5b06] hover:bg-[#ff5b06] hover:text-white transition'>
              {showAll ? 'View less' : 'View more'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
