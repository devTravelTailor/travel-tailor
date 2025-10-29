import styles from './styles.module.css';

import Preview from '../CustomUI/Card/Preview';

function Spotlights({ spotlights }) {
  return (
    <div className={styles.spotlights}>
      {spotlights.map((spotlight, index) => (
        <Preview
          key={index}
          title={spotlight.title}
          description={spotlight.description}
          imgUrl={spotlight.imgUrl}
          url={spotlight.link}
          btn='Explore more'
          className={styles.boxItem}
        />
      ))}
    </div>
  );
}

export default Spotlights;
