'use client';

import { useMemo, useRef, useState } from 'react';
import ParallaxScrollImg from '../CustomUI/Animation/ParallaxScrollImg';
import parseUrl from '../../util/parseUrl';

export default function PlacesCarousel({
  id = 'places-to-visit',
  title = 'Places to visit',
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
  const trackRef = useRef(null);
  const [drag, setDrag] = useState({ active: false, startX: 0, scrollLeft: 0 });

  if (safeItems.length === 0) return null;

  const onPointerDown = (e) => {
    const track = trackRef.current;
    if (!track) return;
    setDrag({
      active: true,
      startX: e.pageX - track.offsetLeft,
      scrollLeft: track.scrollLeft,
    });
  };

  const onPointerLeave = () => setDrag((s) => ({ ...s, active: false }));
  const onPointerUp = () => setDrag((s) => ({ ...s, active: false }));

  const onPointerMove = (e) => {
    if (!drag.active) return;
    e.preventDefault();
    const track = trackRef.current;
    if (!track) return;
    const x = e.pageX - track.offsetLeft;
    const walk = (x - drag.startX) * 1.2; // scroll speed
    track.scrollLeft = drag.scrollLeft - walk;
  };

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

        <div
          ref={trackRef}
          className='flex gap-4 md:gap-5 overflow-x-auto pb-2 cursor-grab select-none items-stretch [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
          onMouseDown={onPointerDown}
          onMouseLeave={onPointerLeave}
          onMouseUp={onPointerUp}
          onMouseMove={onPointerMove}>
          {safeItems.map((item, idx) => {
            const imgSrc =
              item.img || item.image || item.imgUrl || item.displayImg;
            return (
              <div
                key={idx}
                className='flex-shrink-0 w-[260px] sm:w-[300px] md:w-[320px] h-full'>
                <div className='h-full min-h-[420px] flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden'>
                  <div className='h-64 bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden'>
                    {imgSrc ? (
                      <ParallaxScrollImg speed={2.5} direction='up'>
                        <img
                          src={parseUrl(imgSrc)}
                          alt={item.title || `Place ${idx + 1}`}
                          className='h-full w-full object-cover scale-[1.25]'
                          loading={idx < 3 ? 'eager' : 'lazy'}
                        />
                      </ParallaxScrollImg>
                    ) : (
                      <span className='text-gray-400 text-sm'>No image</span>
                    )}
                  </div>
                  <div className='flex-1 flex flex-col p-4 md:p-5 gap-2'>
                    <h3 className='text-lg md:text-xl font-semibold text-gray-900 break-words'>
                      {item.title || 'Place'}
                    </h3>
                    {item.description && (
                      <p className='text-sm md:text-base text-gray-600 leading-relaxed max-h-[8rem] overflow-y-scroll scrollbar-hidden'>
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
