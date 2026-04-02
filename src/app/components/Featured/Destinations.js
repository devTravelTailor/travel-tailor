import styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";

import Button from "../CustomUI/Button/Button";
import parseUrl from "../../util/parseUrl";

function Destinations({ destinations }) {
  const DestinationCard = ({ title, slug, imgUrl }) => {
    return (
      <Link
        href={`/destinations/${slug}`}
        className={`${styles.expCard} ${styles.boxItem}`}
      >
        <div className={styles.experiencesBg}>
          <Image
            src={parseUrl(imgUrl)}
            alt={title}
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
    <div className={styles.destinations}>
      <div className={styles.destinationsBox}>
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.title}
            slug={destination.slug}
            title={destination.title}
            imgUrl={destination.heroImg}
          />
        ))}
      </div>

      <Button className="sm" varient="outline" href="/destinations">
        View all
      </Button>
    </div>
  );
}

export default Destinations;
