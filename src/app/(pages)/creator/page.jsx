// No need for getServerSideProps, just directly fetch data in the server component.
import TestimonialsSection from '../../components/Creator/ReviewSection';
import AdvisorCarousel from '../../components/Creator/AdvisoreCarousel';
import HeroSection from '../../components/Creator/HeroSection';
import TourGridSection from '../../components/Creator/TourGridSection';
import BlogGridSection from '../../components/Creator/BlogGridSection';
import Link from 'next/link';
import { Button } from '../../components/ui/button';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export default async function Creator() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/creatorHome`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        cache: 'no-store',
        // next: { revalidate: 60 }, // Optional: revalidation to refresh data every minute
      },
    );

    if (res.status !== 200) {
      throw new Error(`Failed to fetch (${res.status} ${res.statusText})`);
    }

    const data = await res.json();

    const {
      heroSlides = [],
      blogs = [],
      tours = [],
      creators = [],
      reviews = [],
      happyCustomer = 0,
      testimonials = [],
      advisorImageGrid = { description: '', images: [] },
      smithCuratedImageGrid = { description: '', images: [] },
      smithLedImageGrid = { description: '', images: [] },
      smithLedTours = [],
      smithCuratedTours = [],
    } = data;

    return (
      <div className='min-h-screen  '>
        <HeroSection heroSlides={heroSlides} />
        {creators.length > 0 && (
          <AdvisorCarousel data={creators} imageGridData={advisorImageGrid} />
        )}

        {/* Smith Led Trails */}
        {smithCuratedTours.length > 0 && (
          <div className='mt-20 w-full max-w-[95rem] mx-auto'>
            <TourGridSection
              title='Smith-curated Tours'
              type={`tours`}
              data={smithCuratedTours}
              url={`/tours`}
              description={
                'Join expert-curated journeys designed for immersive experiences and authentic connections.'
              }
              visibleCount={4}
              imageGridData={smithCuratedImageGrid}
            />
          </div>
        )}

        {/* Smith Curated Trails */}
        {smithLedTours.length > 0 && (
          <div className='mt-20 w-full max-w-[95rem] mx-auto'>
            <TourGridSection
              type={`tours`}
              title='Smith-led Tours'
              url={`/tours`}
              data={smithLedTours}
              visibleCount={4}
              description={
                'Handpicked travel experiences led by industry experts and content creators.'
              }
              imageGridData={smithLedImageGrid}
            />

            <Link href='/tours'>
              <Button
                type='block'
                varient='outline'
                className='mx-auto block mt-12 rounded-full hover:bg-white border border-[#ff5b06] hover:text-[#ff5b06] bg-[#ff5b06] text-white'>
                More Tours
              </Button>
            </Link>
          </div>
        )}

        {reviews.length > 0 && (
          <TestimonialsSection data={reviews} happyCustomers={happyCustomer} />
        )}

        {/* Blog Grid */}
        {blogs.length > 0 && (
          <div className='w-full max-w-[95rem] mx-auto'>
            <BlogGridSection
              title='Blog Highlights'
              allUrl={`/blogs`}
              type={`blogs`}
              url={`/blogs`}
              description='Curated group trips that connect people, cultures, and unforgettable memoriesƒ?"shared by real travelers like you.'
              data={blogs}
              visibleCount={3}
            />
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p>Something went wrong: {error.message}</p>
      </div>
    );
  }
}
