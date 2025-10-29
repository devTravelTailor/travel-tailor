'use client';

import styles from './styles.module.css';
import { useRef } from 'react';

import SectionTitle from '../CustomUI/SectionTitle/SectionTitle';
import Preview from '../CustomUI/Card/Preview';
import ScrollNav from '../CustomUI/Button/ScrollNav';

function Spotlights({
  spotlights,
  className = '',
  heading = {
    title: '/sWhat to see\\s/n and what to do',
    description:
      "Don't miss out to experience and explore the best of what India has to offer.",
  },
  ...props
}) {
  const spotlightsRef = useRef(null);

  if (spotlights?.length == 0) {
    return null;
  }

  return (
    <section className={styles.featuredSpotlights}>
      <div className={styles.spotlightsBox}>
        <SectionTitle
          title={heading.title}
          description={heading.description}
          className={styles.spotlightsTitle}
          variant='center'
        />

        <div className={styles.spotlightsContent}>
          <div className={styles.spotlights} ref={spotlightsRef}>
            {spotlights.map((spotlight, index) => (
              <Preview
                key={index}
                url={spotlight.link || '#'}
                title={spotlight.title}
                description={spotlight.description}
                imgUrl={spotlight.imgUrl}
                className={styles.spotlightItem}
                btn='Explore more'
              />
            ))}
          </div>

          <ScrollNav scrollRef={spotlightsRef} className={styles.scrollNav} />
        </div>
      </div>
    </section>
  );
}

export default Spotlights;
