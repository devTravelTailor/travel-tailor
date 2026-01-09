'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import styles from './styles.module.css';
import Tour from '../CustomUI/Card/Tour';
import { TourCard } from '../TourList/TourCard';
import ImageCollageGrid from '../Shared/ImageCollageGrid';

const ITEMS_PER_PAGE = 4;

const TourGridSection = ({
  url = '/creator',
  allUrl = '/creator',
  title,
  description,
  data,
  visibleCount,
  tourType,
  className = '',
  type,
  imageGridData = { description: '', images: [] },
}) => {
  const isExpanded = visibleCount >= data?.length;
  const router = useRouter();

  return (
    <section className={styles.section + ' ' + className + ' '}>
      {title && (
        <h2 className={styles.sectionTitle}>
          <span>{title.split(' ')[0]}</span>{' '}
          {title.split(' ').slice(1).join(' ')}
        </h2>
      )}

      {description && (
        <p className={styles.sectionDescription}>{description}</p>
      )}

      {/* Image Collage Grid - 5 images (6-masonry variant) */}
      {imageGridData?.images?.length > 0 && (
        <ImageCollageGrid
          description={
            imageGridData.description ||
            'Passionate industry experts and content creators serve as your Jrny Maestros, sharing their deep knowledge and rich experiences. Gain invaluable insights from their expertise and connect with fellow travellers as you experience destinations like never before.'
          }
          variant='6-masonry'
          items={imageGridData.images}
        />
      )}

      {tourType && <h2 className='lg:m-6'>{tourType}</h2>}
      <div className={styles.gridWrapper + ` max-w-[95rem] mx-auto `}>
        {data?.slice(0, visibleCount).map((item, index) => {
          const tags =
            type == 'tours'
              ? `${item?.details?.totalDays} Days`
              : type == 'destinations'
              ? `Starting Price: ₹${item?.startingPrice}`
              : `${item?.details?.city}, ${item?.details?.country}`;
          return (
            <div key={index} className={styles.gridItem}>
              {/* <Tour
                description={item.brief}
                imgUrl={item.heroImg || item.displayImg}
                title={item.title}
                slug={item.slug}
                id={item._id}
                tag={tags}
                type={"tours"}
                className={type === "blogs" ? styles.creatorBlogs : className}
              /> */}
              <TourCard
                description={item.brief}
                heroImg={item.heroImg || item.displayImg}
                title={item.title}
                slug={item.slug}
                id={item._id}
                experiences={item.experiences}
                duration={item.details.duration + ' days'}
                location={item.place}
                tourType={item.tourType}
                className={type === 'blogs' ? styles.creatorBlogs : className}
              />
            </div>
          );
        })}
      </div>

      {data?.length > 4 && (
        <div className={styles.centerBtn}>
          <button
            className={styles.customButton}
            onClick={() => router.push(allUrl)}>
            {'Show More'}
          </button>
        </div>
      )}
    </section>
  );
};

export default TourGridSection;
