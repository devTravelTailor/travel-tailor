"use client";

import React, { useEffect, useState } from "react";
import { FileDown } from "lucide-react";
import styles from "./guideDownloadButton.module.css";

export default function GuideDownloadButton({ href, label = "Download destination guide" }) {
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLabel(true);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  if (!href) return null;

  return (
    <a
      href={href}
      download
      aria-label={label}
      title={label}
      className={styles.guideButton}
    >
      <span className={`${styles.textPill} ${showLabel ? styles.animate : ""}`}>
        <span className="hidden sm:inline">{label}</span>
        <span className="sm:hidden">Guide</span>
      </span>
      <span className={styles.iconPill}>
        <FileDown className={styles.icon} />
      </span>
    </a>
  );
}
