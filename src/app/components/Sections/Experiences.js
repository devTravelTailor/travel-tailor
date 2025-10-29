import styles from './styles.module.css';

import SectionTitle from '../CustomUI/SectionTitle/SectionTitle';
import BentoGrid from '../CustomUI/BentoGrid/BentoGrid';
function Experiences({
  experiences = [],
  className = '',
  heading = {
    title: '/sExperiences\\s',
    description: 'You might be interested in these other experiences',
  },
  ...props
}) {
  if (!experiences || experiences.length <= 2 || experiences.length >= 6) {
    return null;
  }

  return (
    <section className={styles.experiences}>
      <div className={styles.experiencesBox}>
        <SectionTitle
          title={heading.title}
          description={heading.description}
          className={styles.experiencesTitle}
          variant='center'
        />
        <div className={styles.experiencesContent}>
          <BentoGrid experiences={experiences} />
        </div>
      </div>
    </section>
  );
}

export default Experiences;
