import { ArrowLeft, ArrowRight } from 'lucide-react';
import BlogCard from '../Shared/BlogCard';

export default function BeforeYouGoSection({ blogs }) {
  if (!blogs || blogs.length === 0) return null;

  return (
    <section className='w-full max-w-[1600px] mx-auto py-24 px-4 sm:px-5 lg:px-8 bg-white relative '>
      <div className='pt-10 mb-16 max-w-[1400px] mx-auto flex items-center px-4 sm:px-5 lg:px-8 relative'>
        <h2
          style={{ fontFamily: 'var(--font-heading)' }}
          className='text-[28px] font-extrabold tracking-tight text-gray-900 flex items-center bg-white pr-6'>
          BEF
          <em className='text-[#f05a22] text-4xl mr-1'>O</em>
          RE YOU GO
        </h2>
      </div>

      <div className='relative max-w-[1400px] mx-auto pb-10'>
        <button className='group absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-transparent backdrop-blur-md border border-white/60 rounded-full text-[#f05a22] hover:bg-[#f05a22] hover:text-white hover:border-[#f05a22] transition-all duration-300 z-20'>
          <ArrowLeft size={20} strokeWidth={1.5} className='group-hover:-translate-x-0.5 transition-transform' />
        </button>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 px-4 sm:px-5 lg:px-8'>
          {blogs.map((blog) => (
            <BlogCard key={blog._id || blog.slug} blog={blog} />
          ))}
        </div>

        <button className='group absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-transparent backdrop-blur-md border border-white/60 rounded-full text-[#f05a22] hover:bg-[#f05a22] hover:text-white hover:border-[#f05a22] transition-all duration-300 z-20'>
          <ArrowRight size={20} strokeWidth={1.5} className='group-hover:translate-x-0.5 transition-transform' />
        </button>
      </div>
    </section>
  );
}
