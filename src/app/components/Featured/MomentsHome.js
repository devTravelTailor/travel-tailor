import styles from './styles.module.css';

import SectionTitle from '../CustomUI/SectionTitle/SectionTitle';
import InfiniteShapeCarousel from '../CustomUI/Rolling/ImgCarousal';

function MomentsHome({
  monents = [
    {
      id: 1,
      src: '/images/moment1.jpg',
      alt: 'Moment 1',
      width: 600,
      height: 700,
    },
    {
      id: 2,
      src: '/images/moment2.jpg',
      alt: 'Moment 2',
      width: 600,
      height: 700,
    },
    {
      id: 3,
      src: '/images/moment3.jpg',
      alt: 'Moment 3',
      width: 600,
      height: 700,
    },
    {
      id: 4,
      src: '/images/moment1.jpg',
      alt: 'Moment 4',
      width: 600,
      height: 700,
    },
    {
      id: 5,
      src: '/images/moment1.jpg',
      alt: 'Moment 5',
      width: 600,
      height: 700,
    },
  ],
  ...props
}) {
  return (
    <section id={styles.momentsHome}>
      <div className={styles.momentsHomeBox}>
        <SectionTitle
          title="/sTraveller's\s Picks"
          description='More than just tours, we create memories.  Browse through genuine moments of joy, wonder, and connection shared by our past travelers.'
          variant='center'></SectionTitle>

        <div className={styles.moments}>
          <InfiniteShapeCarousel images={monents} speed={44} gap={24} />
        </div>
      </div>
    </section>
  );
}

export default MomentsHome;
