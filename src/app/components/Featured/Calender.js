import styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";

import parseUrl from "../../util/parseUrl";

const FALLBACK_MONTH_IMAGE = "/images/placeholder-image.png";

function capitalizeFirstLetter(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function Calender({ months }) {
  const MonthCard = ({ month, imgUrl }) => {
    const monthSlug = String(month || "").trim().toLowerCase();
    const monthLabel = capitalizeFirstLetter(monthSlug);
    const imageUrl = parseUrl(imgUrl) || FALLBACK_MONTH_IMAGE;

    return (
      <Link className={styles.monthCard} href={`/calendar/${monthSlug}`}>
        <div className={styles.monthCardBg}>
          <Image
            src={imageUrl}
            alt={monthLabel || month}
            width={400}
            height={300}
          />
        </div>
        <div className={styles.monthCardContent}>
          <div className={`${styles.monthCardTitle} capitalize`}>
            {monthLabel || month}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className={styles.calender}>
      {(Array.isArray(months) ? months : [])
        .filter((month) => month?.month)
        .map((month) => (
          <MonthCard
            key={month._id || month.id || month.month}
            month={month.month}
            imgUrl={month.heroImg}
          />
        ))}
    </div>
  );
}

export default Calender;
