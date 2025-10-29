import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";

import parseUrl from "../../util/parseUrl";

const SearchResult = ({ item, href }) => {
  if (!item || !href) {
    return null; // Don't render if item or href is missing
  }

  const imgUrl =
    item.heroImg || item.displayImg || item.profileImg || item.backgroundImg;

  return (
    <Link href={href} className={styles.itemCard}>
      <div className={styles.imageWrapper}>
        <Image
          src={parseUrl(imgUrl)}
          alt={item.title || "Search result image"}
          fill
          style={{ objectFit: imgUrl ? "cover" : "contain" }}
          className={styles.itemImage}
          sizes="(max-width: 768px) 50vw, 33vw" // Adjust sizes as needed
          onError={(e) => {
            e.currentTarget.src = "/images/placeholder-image.png";
          }} // Fallback on error
        />
        <div className={styles.overlay}></div>
        <h3 className={styles.itemTitle}>{item.title}</h3>
      </div>
    </Link>
  );
};

export default SearchResult;
