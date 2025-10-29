import styles from "./styles.module.css";

import Image from "next/image";
import ArrowBtn from "../CustomUI/Button/ArrowBtn";

import parseUrl from "../../util/parseUrl";

function DestinationsHero({
  title = "The Ultimate India",
  description = "Discover the best destinations in India. From the bustling cities to the serene countryside, India has something for everyone.",
  imgUrl = "/uploads/sylwia_bartyzel_e_U4pip_U_8_HA_unsplash_641b698718.jpg",
}) {
  return (
    <section className={styles.destinationsHero}>
      <div className={styles.destinationsHeroBox}>
        <div className={styles.destinationsHeroBg}>
          <Image
            src={parseUrl(imgUrl)}
            alt={title}
            width={1400}
            height={1000}
            className={styles.destinationsHeroImg}
            priority={true}
          />
        </div>

        <div className={styles.destinationsHeroContent}>
          <h1 className={styles.destinationsHeroTitle}>{title}</h1>
          <p className={styles.destinationsHeroDescription}>{description}</p>
        </div>

        <div className={styles.destinationsHeroBtn}>
          <ArrowBtn direction="down" variant="blurred" label="Scroll" />
        </div>
      </div>
    </section>
  );
}

export default DestinationsHero;
