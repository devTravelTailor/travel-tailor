import styles from './styles.module.css';
import Image from 'next/image';

import SectionTitle from '../CustomUI/SectionTitle/SectionTitle';
import Button from '../CustomUI/Button/Button';

function Inclusions({
  included = [
    'Hotel pick-up and drop',
    'Santas Village guided tour',
    'Cold beverages',
    'Free WiFi',
    'Free parking',
    'Transportation',
    'Childcare',
    'Health care',
    'Gym',
    'Restaurant',
    'Shopping',
    'Local guides',
  ],
  excluded = ['Personal expenses', 'Waiter tips'],
  url = '/contact',
  ...props
}) {
  return (
    <section className={styles.inclusions}>
      <SectionTitle
        title='/sInclusions\s /n at a glance'
        description='Know whats included in your trip and whats excluded'
        variant='center'></SectionTitle>

      <div className={styles.inclusionsBox}>
        <div className={styles.inclusionsContent}>
          <div className={styles.inclusionsContentBox}>
            <p className={styles.inclusionsContentTitle}>What&#39;s included</p>

            {included.map((item, index) => (
              <div key={index} className={styles.inclusionsContentItem}>
                <Image
                  src='/images/tick.png'
                  alt='Tick'
                  width={20}
                  height={20}
                  className={styles.inclusionsContentImg}
                />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.exclusionsContent}>
          <div className={styles.exclusionsContentBox}>
            <p className={styles.exclusionsContentTitle}>What&#39;s not</p>
            {excluded.map((item, index) => (
              <div key={index} className={styles.exclusionsContentItem}>
                <Image
                  src='/images/cross.png'
                  alt='Cross'
                  width={20}
                  height={20}
                  className={styles.inclusionssContentImg}
                />
                <p>{item}</p>
              </div>
            ))}
          </div>

          <Button className={styles.inclusionsBtn} varient='fill' href={url}>
            Enquire more
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Inclusions;
