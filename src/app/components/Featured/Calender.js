import styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";

import parseUrl from "../../util/parseUrl";

function Calender({ months }) {
  const MonthCard = ({ month, imgUrl }) => {
    return (
      <Link className={styles.monthCard} href={`/calendar/${month}`}>
        <div className={styles.monthCardBg}>
          <Image src={parseUrl(imgUrl)} alt={month} width={400} height={300} />
        </div>
        <div className={styles.monthCardContent}>
          <div className={styles.monthCardTitle}>{month}</div>
        </div>
      </Link>
    );
  };

  return (
    <div className={styles.calender}>
      {months.map((month, index) => (
        <MonthCard key={index} month={month.month} imgUrl={month.heroImg} />
      ))}
    </div>
  );
}

export default Calender;
