'use client';

import BlogCard from '../Shared/BlogCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

const HEADING_FONT_STYLE = {
  fontFamily: 'var(--font-filson-pro)',
  fontWeight: 700,
  fontStyle: 'normal',
};

export default function BeforeYouGoSection({ blogs }) {
  if (!blogs || blogs.length === 0) return null;

  const showMobileArrows = blogs.length > 1;
  const showDesktopArrows = blogs.length > 4;

  return (
    <section className='w-full max-w-[1600px] mx-auto py-24 px-2 sm:px-4 lg:px-8 bg-white relative '>
      <div className='pt-10 mb-16 max-w-[1400px] mx-auto flex items-center px-2 sm:px-4 lg:px-8 relative'>
        <h2
          style={HEADING_FONT_STYLE}
          className='text-[28px] font-black tracking-tight text-gray-900 flex items-center bg-white pr-6'>
          BEF
          <em className='text-[#f05a22] text-4xl -ml-1 mr-1 not-italic'>O</em>
          RE YOU GO
        </h2>
      </div>

      <div className='relative max-w-[1400px] mx-auto pb-10'>
        <Carousel
          opts={{ align: 'start', loop: blogs.length > 1 }}
          className='relative px-2 sm:px-3 lg:px-8'>
          <CarouselContent className='-ml-2 md:-ml-5 lg:-ml-6'>
            {blogs.map((blog) => (
              <CarouselItem
                key={blog._id || blog.slug}
                className='pl-2 md:pl-5 lg:pl-6 basis-full md:basis-1/2 lg:basis-1/4'>
                <BlogCard blog={blog} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {showMobileArrows && (
            <>
              <CarouselPrevious className='md:hidden -left-2 top-1/2 size-11 bg-transparent shadow-none border-white/60 disabled:opacity-30' />
              <CarouselNext className='md:hidden -right-2 top-1/2 size-11 bg-transparent shadow-none border-white/60 disabled:opacity-30' />
            </>
          )}

          {showDesktopArrows && (
            <>
              <CarouselPrevious className='hidden lg:flex -left-3 top-1/2 size-11 bg-transparent shadow-none border-white/60 disabled:opacity-30' />
              <CarouselNext className='hidden lg:flex -right-3 top-1/2 size-11 bg-transparent shadow-none border-white/60 disabled:opacity-30' />
            </>
          )}
        </Carousel>
      </div>
    </section>
  );
}
