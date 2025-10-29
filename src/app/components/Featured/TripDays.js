"use client";

import { useState } from "react";
import styles from "./styles.module.css";

import Day from "../CustomUI/Card/Day";
import Button from "../CustomUI/Button/Button";

import parseUrl from "../../util/parseUrl";

function TripDays({
  days = [
    {
      id: 1,
      brief:
        "The travel plan offers a unique blend of Thailand's popular destinations...",
      imgUrl: "/uploads/vlad_hilitanu_l_Im5_Rt_G_Pr_Qs_unsplash_592e71741a.jpg",
    },
    {
      id: 2,
      brief:
        "The travel plan offers a unique blend of Thailand's popular destinations...",
      imgUrl: "/uploads/vlad_hilitanu_l_Im5_Rt_G_Pr_Qs_unsplash_592e71741a.jpg",
    },
    {
      id: 3,
      brief:
        "The travel plan offers a unique blend of Thailand's popular destinations...",
      imgUrl: "/uploads/vlad_hilitanu_l_Im5_Rt_G_Pr_Qs_unsplash_592e71741a.jpg",
    },
    {
      id: 4,
      brief:
        "The travel plan offers a unique blend of Thailand's popular destinations...",
      imgUrl: "/uploads/vlad_hilitanu_l_Im5_Rt_G_Pr_Qs_unsplash_592e71741a.jpg",
    },
  ],
  ...props
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleDays = isExpanded ? days : days.slice(0, 2);

  return (
    <section id={styles.tripDays}>
      <div className={styles.tripDaysBox}>
        {visibleDays.map((item, index) => (
          <div key={index} className={styles.dayContainer}>
            <Day
              brief={item.brief}
              imgUrl={parseUrl(item.imgUrl)}
              day={index + 1}
            />
            {index < visibleDays.length - 1 && (
              <div className={styles.dashedConnector}></div>
            )}
          </div>
        ))}
      </div>

      {days.length > 2 && (
        <Button
          className={styles.tripDaysBtn}
          varient="outline"
          type="block"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? "Collapse" : "Expand"}
        </Button>
      )}
    </section>
  );
}

export default TripDays;
