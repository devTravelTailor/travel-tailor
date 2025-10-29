import styles from "./styles.module.css";
import Image from "next/image";

import parseUrl from "../../util/parseUrl";

function MonthHero({
  month = "January",
  imgUrl = "/uploads/sylwia_bartyzel_e_U4pip_U_8_HA_unsplash_641b698718.jpg",
  description,
  ...props
}) {
  return (
    <section className={styles.monthHero}>
      <div className={styles.monthHeroBox}>
        <div className={styles.monthHeroBg}>
          <Image
            src={parseUrl(imgUrl)}
            alt={month}
            width={1400}
            height={1000}
            className={styles.monthHeroImg}
            priority={true}
          />
        </div>

        <div className={styles.monthHeroContent}>
          <h1 className={styles.monthHeroTitle}>{month}</h1>
          {description && (
            <p className={styles.monthHeroDescription}>{description}</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default MonthHero;
