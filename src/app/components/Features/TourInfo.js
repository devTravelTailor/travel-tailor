import styles from "./styles.module.css";

import USP from "../CustomUI/Card/USP";
import SectionTitle from "../CustomUI/SectionTitle/SectionTitle";

import parsePrice from "../../util/parsePrice";
function TourInfo({
  title = "Best of Goa in 4 unforgettable days",
  place = "Goa",
  timeline = "Feb to Sept",
  price = 10000,
  nights = 4,
  ...props
}) {
  return (
    <section id={styles.tourInfo}>
      <div className={styles.tourInfoBox}>
        <div className={styles.infoTitle}>
          <p>{place}</p>

          <SectionTitle
            title={title}
            variant="center"
            className={styles.infoTitleText}
          />
        </div>

        <div className={styles.tourInfoContent}>
          <USP title="When" description={timeline} icon="/images/clock.png" />

          <USP
            title="Price"
            description={`From ${parsePrice(price)}`}
            icon="/images/price.png"
          />

          <USP
            title="How long"
            description={`${nights} nights`}
            icon="/images/long.png"
          />
        </div>
      </div>
    </section>
  );
}

export default TourInfo;
