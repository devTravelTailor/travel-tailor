import styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";

import parseUrl from "../../util/parseUrl";

function Experiences({ expereinces }) {
  console.log("expereinces", expereinces);

  const ExperienceCard = ({ title, slug, imgUrl }) => {
    return (
      <Link
        href={`/experiences/${slug}`}
        className={`${styles.expCard} ${styles.boxItem}`}
      >
        <div className={styles.experiencesBg}>
          <Image
            src={parseUrl(imgUrl)}
            alt="Experience"
            width={400}
            height={560}
          />
        </div>
        <div className={styles.experienceContent}>
          <h4 className={styles.experienceTitle}>{title}</h4>
        </div>
      </Link>
    );
  };

  return (
    <div className={styles.experiences}>
      <div className={styles.experiencesBox}>
        {expereinces.map((experience) => (
          <ExperienceCard
            key={experience.title}
            title={experience.title}
            slug={experience.slug}
            imgUrl={experience.heroImg}
          />
        ))}
      </div>
    </div>
  );
}

export default Experiences;
