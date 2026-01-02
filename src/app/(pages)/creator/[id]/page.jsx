'use client';

import ProfileHeader from '../../../components/Creator/ProfileHeader';
import Preview from '../../../components/CustomUI/Card/Preview';
import Tour from '../../../components/CustomUI/Card/Tour';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Spinner from '../../../components/CustomUI/Spinner/Spinner';
import TourGridSection from '../../../components/Creator/TourGridSection';
import BlogGridSection from '../../../components/Creator/BlogGridSection';

// Gallery animation styles scoped to this page
const galleryStyles = `
.gallery-viewport {
  overflow: hidden;
  width: 100%;
}
.gallery-track {
  display: flex;
  gap: 0;
  width: max-content;
  animation: creator-gallery-scroll 120s linear infinite;
}
.gallery-card {
  transform: translateZ(0);
}
.gallery-mask {
  background: linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 10%, rgba(255,255,255,0) 90%, rgba(255,255,255,0.9) 100%);
}
@keyframes creator-gallery-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@media (max-width: 768px) {
  .gallery-track {
    animation-duration: 45s;
  }
}
`;

export default function Page({ params }) {
  const { id } = useParams(params);
  const [profileData, setProfileData] = useState();
  const [loading, setLoading] = useState(true);
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/profile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
          },
        );
        const data = await response.json();
        console.log('data', data);

        setProfileData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  console.log(profileData);

  const smithLedTours = Array.isArray(profileData?.smithLedTours)
    ? profileData.smithLedTours
    : Array.isArray(profileData?.tour)
    ? profileData.tour.filter((t) => t.tourType === 'fixed_date')
    : [];
  const smithCuratedTours = Array.isArray(profileData?.smithCuratedTours)
    ? profileData.smithCuratedTours
    : Array.isArray(profileData?.tour)
    ? profileData.tour.filter((t) => t.tourType === 'selectable_date')
    : [];

  const galleryItems = [...smithLedTours, ...smithCuratedTours]
    .flatMap((tour) => {
      const images =
        Array.isArray(tour?.galleryImgs) && tour.galleryImgs.length > 0
          ? tour.galleryImgs
          : tour.heroImg
          ? [tour.heroImg]
          : [];
      return images.map((img) => ({
        img,
        title: tour.title,
        place: tour.place || tour.destination,
        slug: tour.slug,
      }));
    })
    .filter((item) => item?.img);

  const galleryLoop = [...galleryItems, ...galleryItems]; // duplicate for seamless scroll

  console.log('galleryItems', profileData);

  if (loading) {
    return (
      <div className='w-full flex justify-center items-center py-16'>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <ProfileHeader
        backgroundImg={profileData?.user?.backgroundImg}
        profileImage={
          profileData?.user?.profileImg ||
          profileData?.user?.profileImage ||
          profileData?.user?.avatar
        }
        name={profileData?.user?.name}
        bio={profileData?.user?.bio}
        location={profileData?.user?.location}
        socialLinks={profileData?.user?.social}
        badges={profileData?.badges}
        stats={profileData?.totalBlog || 0}
        createdAt={profileData?.user?.createdAt}
        tripsHosted={profileData?.totalTour || 0}
      />

      {galleryItems.length > 0 && (
        <section className='w-full py-8 md:py-10'>
          <div className='px-0 md:px-8 container mx-auto'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-xl md:text-2xl font-semibold'>Gallery</h2>
              <p className='text-xs md:text-sm text-gray-500'>
                Auto-scrolling destinations
              </p>
            </div>
            <div className='relative w-full overflow-hidden   border border-gray-100 bg-gradient-to-r from-white via-gray-50 to-white shadow-sm'>
              <div className='gallery-mask pointer-events-none absolute inset-0 hidden md:block' />
              <div className='gallery-viewport'>
                <div className='gallery-track'>
                  {galleryLoop.map((item, idx) => (
                    <Link
                      key={`${item.slug || item.title || idx}-${idx}`}
                      href={item.slug ? `/creator/tour/${item.slug}` : '#'}
                      className='gallery-card mx-3 relative w-56 md:w-64 lg:w-72 h-44 md:h-52 flex-shrink-0 overflow-hidden rounded-xl bg-black/5'>
                      <img
                        src={item.img}
                        alt={item.title || 'Tour'}
                        className='absolute inset-0 w-full h-full object-cover'
                        loading={idx < 6 ? 'eager' : 'lazy'}
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent' />
                      <div className='absolute bottom-3 left-3 right-3 text-white drop-shadow'>
                        <p className='text-[11px] uppercase tracking-wide opacity-90'>
                          {item.place || 'Destination'}
                        </p>
                        <p className='text-sm md:text-base font-semibold leading-tight line-clamp-2'>
                          {item.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tours Grid */}
      {smithLedTours.length > 0 && (
        <TourGridSection
          title='Smith-Led Tours'
          allUrl={`/creator/alltours/${id}`}
          type={`tours`}
          description='Guided experiences personally led by our Smiths for on-the-ground expertise.'
          data={smithLedTours}
          CardComponent={Tour}
          visibleCount={4}
        />
      )}
      {smithCuratedTours.length > 0 && (
        <TourGridSection
          title='Smith-Curated Tours'
          allUrl={`/creator/alltours/${id}`}
          type={`tours`}
          description='Handcrafted itineraries designed by Smiths for flexible, self-paced travel.'
          data={smithCuratedTours}
          CardComponent={Tour}
          visibleCount={4}
        />
      )}
      {profileData?.blog?.length > 0 && (
        <BlogGridSection
          title='Latest Blogs'
          url={`/creator/blogs`}
          allUrl={`/creator/allblogs/${id}`}
          data={profileData?.blog}
          description='We have a few blogs post you might like to read about travelling, travelling tips, and more.'
          CardComponent={Preview}
          type='blogs'
          visibleCount={3}
        />
      )}
      <style jsx>{galleryStyles}</style>
    </div>
  );
}
