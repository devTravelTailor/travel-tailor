import styles from "./styles.module.css";
import React from "react";

import parseTitle from "../../../util/parseTitle";

function SectionTitle({
  title,
  className = "",
  variant = "left",
  description,
  ...props
}) {
  const variantClass = variant === "center" ? styles.center : styles.left;

  return (
    <div
      className={`${styles.sectionTitle} ${variantClass} ${className}`}
      {...props}
    >
      {/* Parse the title string to inject <br /> and <span> elements */}
      <h2 className={styles.title}>{parseTitle(title)}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
}

export default SectionTitle;
