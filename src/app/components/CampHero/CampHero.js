"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./styles.module.css"; // We will create this file next
import ArrowBtn from "../CustomUI/Button/ArrowBtn";
import Varients from "../../lib/varients";
import parseUrl from "../../util/parseUrl";

// The new CampHero component accepts `heroData` for the slider and `children` for the form
function CampHero({ heroData, children }) {
  const [current, setCurrent] = useState(0);
  const [hero, setHero] = useState(heroData[0]);
  const imagesPreloaded = useRef(false);

  console.log(hero);

  // Autoplay timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (current + 1) % heroData.length;
      handleClick(nextIndex);
    }, 7000);
    return () => clearInterval(timer);
  }, [current, heroData.length]);

  // Image preloading effect
  useEffect(() => {
    if (!imagesPreloaded.current) {
      heroData.forEach((item) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = parseUrl(item.img);
        document.head.appendChild(link);
      });
      imagesPreloaded.current = true;
    }
  }, [heroData]);

  // Guard clause for missing data
  if (!heroData || heroData.length === 0) {
    return null;
  }

  // --- Slider Logic (reused from ToursHero) ---
  const handleClick = (index) => {
    setCurrent(index);
    setHero(heroData[index]);
  };

  const handlePrev = () => {
    const prevIndex = (current - 1 + heroData.length) % heroData.length;
    handleClick(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = (current + 1) % heroData.length;
    handleClick(nextIndex);
  };

  // --- End Slider Logic ---

  return (
    <section className={styles.campHero}>
      {/* Left Column: Image Slider */}
      <div className={styles.campHeroSlider}>
        <div className={styles.backgroundStyle}></div>

        {hero?.img && (
          <AnimatePresence mode="wait">
            <motion.div
              className={styles.campHeroImgContainer}
              key={hero.img}
              initial={{ opacity: 0, filter: "brightness(0.4)" }}
              animate={{ opacity: 1, filter: "brightness(0.8)" }}
              exit={{ opacity: 0, filter: "brightness(0.4)" }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={parseUrl(hero?.img)}
                alt={hero?.title}
                width={1400}
                height={1000}
                className={styles.campHeroImg}
                priority={true}
              />
            </motion.div>
          </AnimatePresence>
        )}

        <div className={styles.campHeroContent}>
          <AnimatePresence mode="wait">
            <motion.div
              className={styles.campHeroContentMain}
              key={hero?.title}
              variants={Varients.heroHomeContentMain}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className={styles.campHeroContentMainTitle}>
                <motion.h1 variants={Varients.heroHomeContentChild}>
                  {hero.title}
                </motion.h1>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className={styles.campHeroNav}>
            <div className={styles.navArrows}>
              <ArrowBtn
                direction="left"
                variant="blurred"
                onClick={handlePrev}
              />
              <div className={styles.navSlideProgress}>
                <div className={styles.navProgressBar}>
                  <motion.div
                    className={styles.navProgress}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 7, ease: "linear" }}
                    key={current}
                  />
                </div>
              </div>
              <ArrowBtn
                direction="right"
                variant="blurred"
                onClick={handleNext}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Form Container */}
      <div className={styles.campHeroForm}>{children}</div>
    </section>
  );
}

export default CampHero;
