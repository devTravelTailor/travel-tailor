"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import styles from "./styles.module.css";

const SHAPES = [
  "shape-1", // Tall portrait
  "shape-2", // Medium portrait
  "shape-3", // Landscape
  "shape-4", // Narrow portrait
];

const InfiniteShapeCarousel = ({
  images = [],
  speed = 300,
  gap = 20,
  minImages = 10,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [isDuplicating, setIsDuplicating] = useState(false);

  // For dynamic cycle calculation – number of duplicates sets used.
  const [setsNeeded, setSetsNeeded] = useState(3);

  // Generate a single cycle of carousel items.
  const baseCarouselItems = useMemo(() => {
    if (!images || images.length === 0) return [];

    return images.map((img, index) => ({
      ...img,
      id: `${img.id || img.src}-base-${index}`,
      shape: SHAPES[index % SHAPES.length],
    }));
  }, [images]);

  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    if (!baseCarouselItems.length || !containerRef.current) return;

    const calculateSizes = () => {
      if (!containerRef.current) return;
      const newContainerWidth = containerRef.current.offsetWidth;
      setContainerWidth(newContainerWidth);
      setIsDuplicating(true);

      // Wait for the base cycle to render so we can measure
      setTimeout(() => {
        if (!trackRef.current) return;

        const baseTrackWidth = trackRef.current.scrollWidth;
        setTrackWidth(baseTrackWidth);

        // Calculate the number of cycles required so that the overall track
        // is at least twice the container width (or more) for a seamless scroll.
        // This calculation now dynamically determines the number of duplicated sets.
        const needed = Math.max(
          3,
          Math.ceil((newContainerWidth * 2) / baseTrackWidth)
        );
        setSetsNeeded(needed);

        const duplicatedItems = [];
        for (let i = 0; i < needed; i++) {
          duplicatedItems.push(
            ...baseCarouselItems.map((item, index) => ({
              ...item,
              id: `${item.id.split("-base-")[0]}-${i}-${index}`,
            }))
          );
        }

        setCarouselItems(duplicatedItems);

        // Let the DOM update before resuming the animation.
        setTimeout(() => {
          setIsDuplicating(false);
        }, 50);
      }, 50);
    };

    calculateSizes();
    window.addEventListener("resize", calculateSizes);
    return () => window.removeEventListener("resize", calculateSizes);
  }, [baseCarouselItems]);

  return (
    <div className={styles.carouselContainer} ref={containerRef}>
      <div
        className={`
          ${styles.carouselTrack} 
          ${isHovering ? styles.paused : ""} 
          ${isDuplicating ? styles.noanimate : ""}
        `}
        style={{
          "--animation-duration": `${speed}s`,
          "--gap": `${gap}px`,
          // Here we calculate the movement distance so that the
          // animation scrolls exactly one cycle (i.e. one set of items).
          "--cycle-length": `calc(100% / ${setsNeeded})`,
        }}
        ref={trackRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {(carouselItems.length ? carouselItems : baseCarouselItems).map(
          (image) => (
            <div
              key={image.id}
              className={`${styles.imageWrapper} ${styles[image.shape]}`}
            >
              <Image
                src={image.src}
                alt={image.alt || `Carousel image`}
                width={image.width || 400}
                height={image.height || 500}
                className={styles.carouselImage}
                priority={image.id.includes("-0-")}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default InfiniteShapeCarousel;
