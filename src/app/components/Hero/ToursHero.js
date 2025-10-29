"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./styles.module.css";
import ArrowBtn from "../CustomUI/Button/ArrowBtn";
import Varients from "../../lib/varients";

import parseUrl from "../../util/parseUrl";

function ToursHero({ heroData, varient }) {
  const [current, setCurrent] = useState(0);
  const [hero, setHero] = useState(heroData[0]);
  const imagesPreloaded = useRef(false);

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

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (current + 1) % heroData.length;
      handleClick(nextIndex);
    }, 7000);
    return () => clearInterval(timer);
  }, [current, heroData]);

  useEffect(() => {
    if (!imagesPreloaded.current) {
      heroData.forEach((item) => {
        const img = document.createElement("link");
        img.rel = "preload";
        img.as = "image";
        img.href = parseUrl(item.imgUrl);
        document.head.appendChild(img);
      });
      imagesPreloaded.current = true;
    }
  }, [heroData]);

  const backgroundStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    zIndex: -3,
  };

  const Hero = () => {
    return (
      <section
        className={`${styles.toursHero} ${
          varient === "small" ? styles.vSmall : ""
        }`}
      >
        <div style={backgroundStyle}></div>

        <AnimatePresence mode="wait">
          <motion.div
            className={styles.toursHeroImgContainer}
            key={hero.imgUrl}
            initial={{ opacity: 0, filter: "brightness(0.4)" }}
            animate={{ opacity: 1, filter: "brightness(0.8)" }}
            exit={{ opacity: 0, filter: "brightness(0.4)" }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={parseUrl(hero.imgUrl)}
              alt={hero.title}
              width={1400}
              height={1000}
              className={styles.toursHeroImg}
              priority={true}
            />
          </motion.div>
        </AnimatePresence>

        <div className={styles.toursHeroContent}>
          <AnimatePresence mode="wait">
            <motion.div
              className={styles.toursHeroContentMain}
              key={hero.title}
              variants={Varients.heroHomeContentMain}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className={styles.toursHeroContentMainTitle}>
                <motion.h1 variants={Varients.heroHomeContentChild}>
                  {hero.title}
                </motion.h1>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className={styles.toursHeroNav}>
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

            <div className={styles.scrollIndicator}>
              <ArrowBtn
                className={styles.scrollIndicatorBtn}
                label="Scroll"
                direction="down"
                variant="blurred"
              />
            </div>
          </div>
        </div>
      </section>
    );
  };

  return <>{heroData ? <Hero /> : <></>}</>;
}

export default ToursHero;
