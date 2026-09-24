// src/components/Blog/TableOfContents
import React from "react";
import { slugify } from "../../util/slugify";
import styles from "./styles.module.css";

const TableOfContents = ({ headings }) => {
  if (!headings || headings.length === 0) {
    return null;
  }

  const cleanDisplayText = (text) => {
    return text
      .replace(/\\\./g, ".")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .trim();
  };

  return (
    <nav className={styles.tocContainer} aria-labelledby="toc-heading">
      <h3 id="toc-heading" className={styles.tocTitle}>
        Contents
      </h3>
      <ul className={styles.tocList}>
        {headings.map((heading, index) => {
          const slug = slugify(heading.text);
          const displayText = cleanDisplayText(heading.text);
          const levelClass = styles[`level${heading.level}`] || "";

          return (
            <li
              key={`${slug}-${index}`}
              className={`${styles.tocItem} ${levelClass}`.trim()}
            >
              <a href={`#${slug}`} className={styles.tocLink}>
                {displayText}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TableOfContents;
