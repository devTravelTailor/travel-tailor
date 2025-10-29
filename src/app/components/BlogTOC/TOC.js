// src/components/Blog/TableOfContents
import React from "react";
import { slugify } from "../../util/slugify";
import styles from "./styles.module.css";

// We don't need the Heading interface in JS, but we define prop types.

const TableOfContents = ({ headings }) => {
  if (!headings || headings.length === 0) {
    return null; // Don't render if no H2s found
  }

  // Function to clean markdown links specifically for display text
  const cleanDisplayText = (text) => {
    return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim();
  };

  return (
    <nav className={styles.tocContainer} aria-labelledby="toc-heading">
      <h3 id="toc-heading" className={styles.tocTitle}>
        Contents
      </h3>
      <ul className={styles.tocList}>
        {headings.map((heading) => {
          // Slugify the raw heading text (including potential markdown)
          const slug = slugify(heading.text);
          // Clean the text *only* for display
          const displayText = cleanDisplayText(heading.text);
          return (
            <li key={slug} className={styles.tocItem}>
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
