import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import parseUrl from '../../util/parseUrl';

export default function BlogCard({ blog }) {
  const image = blog?.displayImg || blog?.heroImg || blog?.coverImg;
  const category = blog?.category || blog?.type || 'Story';
  const href = blog?.slug ? `/blogs/${blog.slug}` : '#';

  return (
    <Link
      href={href}
      className='group h-full flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'>
      <div className='relative h-52 bg-gray-100 overflow-hidden'>
        {image && (
          <img
            src={parseUrl(image)}
            alt={blog?.title || 'Blog'}
            className='h-full w-full object-cover scale-105 transition-transform duration-500 group-hover:scale-100'
          />
        )}
        <span className='absolute top-3 right-3 bg-white/90 text-[#ff5b06] border-0 shadow-sm px-2.5 py-0.5 text-xs font-semibold rounded-full'>
          Blog
        </span>
      </div>
      <div className='flex-1 p-6 flex flex-col gap-3'>
        <div className='flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#ff5b06] font-semibold'>
          <span>{category}</span>
        </div>
        <h3
          style={{ fontFamily: 'var(--font-heading)' }}
          className='text-xl font-semibold leading-tight text-gray-900 line-clamp-2 break-words'>
          {blog?.title}
        </h3>
        {blog?.description && (
          <p className='text-sm text-gray-500 leading-relaxed line-clamp-3 break-words'>
            {blog.description}
          </p>
        )}
      </div>
      <div className='px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-sm text-[#ff5b06]'>
        <span className='font-semibold'>View details</span>
        <ArrowRight className='w-4 h-4' />
      </div>
    </Link>
  );
}
