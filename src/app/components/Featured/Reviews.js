'use client';

import styles from './styles.module.css';
import { useRef } from 'react';

import SectionTitle from '../CustomUI/SectionTitle/SectionTitle';
import Review from '../CustomUI/Card/Review';

import ScrollNav from '../CustomUI/Button/ScrollNav';

function Reviews({ reviews }) {
  const scrollRef = useRef(null);

  return (
    <section id={styles.reviews}>
      <div className={styles.reviewsBox}>
        <SectionTitle
          title='Hear from /sfellow adventurers\s'
          variant='center'
          description="More than just tours and experiences, our reviews are a reflection of our customers' experiences. We want to share our knowledge and help you make the most of your adventure."
        />

        <div className={styles.reviewsContent}>
          <div className={styles.reviewCards} ref={scrollRef}>
            {reviews.map((review, index) => (
              <Review
                key={index}
                name={review.name}
                source={review.source}
                review={review.review}
                className={styles.reviewItem}
              />
            ))}
          </div>

          <ScrollNav scrollRef={scrollRef} className={styles.scrollNav} />
        </div>
      </div>
    </section>
  );
}

export default Reviews;
