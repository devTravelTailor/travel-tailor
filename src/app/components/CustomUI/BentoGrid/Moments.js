import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";

import parseUrl from "../../../util/parseUrl";

// Map grid areas for each count
const gridAreaMapping = {
  3: ["a", "b", "c"],
  4: ["a", "b", "c", "d"],
  5: ["a", "b", "c", "d", "e"],
  6: ["a", "b", "c", "d", "e", "f"],
};

export default function BentoGrid({ moments = [] }) {
  const count = moments.length;
  if (count < 3 || count > 6) {
    console.warn("BentoGrid requires 3 to 6 items.");
    return null;
  }

  const areaMapping = gridAreaMapping[count];

  console.log(moments);

  return (
    <div className={`${styles.grid} ${styles[`grid${count}`]}`}>
      {moments.map(({ title, description, img }, index) => (
        <div
          key={title}
          className={styles.card}
          style={{ gridArea: areaMapping[index] }}
        >
          <div className={styles.imageWrapper}>
            <Image
              src={parseUrl(img)}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={index === 0}
              className={styles.image}
            />
            <div className={styles.overlayMoment}>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.description}>{description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
