import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";

import parseUrl from "../../../util/parseUrl";

// Map grid areas for each count
const gridAreaMapping = {
  3: ["a", "b", "c"],
  4: ["a", "b", "c", "d"],
  5: ["a", "b", "c", "d", "e"],
  6: ["a", "b", "c", "d", "e", "f"],
};

export default function BentoGrid({ experiences = [] }) {
  const count = experiences.length;
  if (count < 3 || count > 6) {
    console.warn("BentoGrid requires 3 to 6 items.");
    return null;
  }

  const areaMapping = gridAreaMapping[count];

  return (
    <div className={`${styles.grid} ${styles[`grid${count}`]}`}>
      {experiences.map(({ title, slug, imgUrl }, index) => (
        <Link
          href={`/experiences/${slug}`}
          key={slug}
          className={styles.card}
          style={{ gridArea: areaMapping[index] }}
        >
          <div className={styles.imageWrapper}>
            <Image
              src={parseUrl(imgUrl)}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={index === 0}
              className={styles.image}
            />
            <div className={styles.overlay}>
              <h3 className={styles.title}>{title}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
