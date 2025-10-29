"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import styles from "./styles.module.css";

const TextList = ({ data, itemBasePath, itemKeyName }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedRegionIndex, setSelectedRegionIndex] = useState(null);

  useEffect(() => {
    if (data?.group && data.group.length > 0) {
      setSelectedRegionIndex(0);
    } else {
      setSelectedRegionIndex(null);
    }
  }, [data?.group]);

  if (
    !data?.group ||
    !Array.isArray(data.group) ||
    data.group.length === 0 ||
    selectedRegionIndex === null
  ) {
    // You might want a more specific loading/empty state here
    return null;
  }

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const selectedRegion = data.group[selectedRegionIndex];
  console.log(data, selectedRegion, selectedRegionIndex, itemKeyName);

  return (
    <div className={styles.textListContainer}>
      <motion.div className={styles.regionNavigation}>
        {data.group.map((region, index) => (
          <motion.div
            key={region.title || index}
            className={`${styles.regionNavItem} ${
              selectedRegionIndex === index ? styles.activeRegion : ""
            }`}
            onClick={() => setSelectedRegionIndex(index)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08, duration: 0.2 }}
          >
            {region.title}
          </motion.div>
        ))}
      </motion.div>

      <div className={styles.destinationsDisplay}>
        <AnimatePresence mode="wait">
          {selectedRegion && (
            <motion.div
              key={selectedRegionIndex}
              className={styles.currentRegionContent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* <div className={styles.regionHeader}>
                <motion.h2 
                  className={styles.regionTitle}
                  
                >
                  {selectedRegion.title}
                </motion.h2>
                <div className={styles.regionLine}></div>
              </div> */}

              <div className={styles.destinationsGrid}>
                {selectedRegion[itemKeyName]
                  ?.sort((itemA, itemB) =>
                    itemA.title.localeCompare(itemB.title)
                  )
                  .map((item, itemIndex) => (
                    <motion.div
                      key={item.slug || itemIndex}
                      className={styles.destinationItem}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: itemIndex * 0.05, duration: 0.4 }}
                      onMouseEnter={() => setHoveredItem(item)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onMouseMove={handleMouseMove}
                    >
                      <Link
                        href={`${itemBasePath}/${item.slug}`}
                        className={styles.destinationLink}
                      >
                        <motion.span className={styles.destinationText}>
                          {item.title}
                        </motion.span>
                        <motion.div
                          className={styles.linkIndicator}
                          initial={{ width: 0 }}
                          whileHover={{ width: "20px" }}
                          transition={{ duration: 0.2 }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                          </svg>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {hoveredItem && hoveredItem.heroImg && (
          <motion.div
            className={styles.imagePreview}
            style={{
              left: mousePosition.x + 20,
              top: mousePosition.y - 100,
            }}
            initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.85, rotate: 3 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
          >
            <div className={styles.imageContainer}>
              <Image
                src={hoveredItem.heroImg}
                alt={hoveredItem.title || "Preview"}
                width={280}
                height={200}
                className={styles.previewImage}
              />
              <div className={styles.imageOverlay}>
                <h4 className={styles.imageTitle}>{hoveredItem.title}</h4>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TextList;
