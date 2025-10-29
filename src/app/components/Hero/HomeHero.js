"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Image from "next/image";
import styles from "./styles.module.css";

import Button from "../CustomUI/Button/Button";
import ArrowBtn from "../CustomUI/Button/ArrowBtn";

import Varients from "../../lib/varients";
import parseUrl from "../../util/parseUrl";

function HomeHero({ heroData }) {
  const [current, setCurrent] = useState(0);
  const [hero, setHero] = useState(heroData[0]);
  const imagesPreloaded = useRef(false);

  console.log(hero);

  const handleClick = (index) => {
    setCurrent(index);
    setHero(heroData[index]);
  };

  // Auto-advance slides every 7 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const nextIndex = (current + 1) % heroData.length;
      handleClick(nextIndex);
    }, 7000);
    return () => clearTimeout(timer);
  }, [current, heroData]);

  // Preload images only once when component mounts
  useEffect(() => {
    if (!imagesPreloaded.current) {
      heroData.forEach((item) => {
        const img = document.createElement("link");
        img.rel = "preload";
        img.as = "image";
        img.href = parseUrl(item.heroImg);
        document.head.appendChild(img);
      });
      imagesPreloaded.current = true;
    }
  }, []);

  // Background style for persistent black background
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
      <div className={styles.heroHome}>
        {/* Persistent black background */}
        <div style={backgroundStyle}></div>

        {/* BgImage with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            className={styles.heroHomeImgContainer}
            key={hero.heroImg}
            initial={{ opacity: 0, filter: "brightness(0.2)" }}
            animate={{ opacity: 1, filter: "brightness(0.8)" }}
            exit={{ opacity: 0, filter: "brightness(0.2)" }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={parseUrl(hero.heroImg)}
              alt={hero.title}
              width={1400}
              height={1000}
              className={styles.heroHomeImg}
              priority={true}
            />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content */}
        <div className={styles.heroHomeContent}>
          <AnimatePresence mode="wait">
            <motion.div
              className={styles.heroHomeContentMain}
              key={hero.title}
              variants={Varients.heroHomeContentMain}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className={styles.heroHomeContentMainTitle}>
                <motion.h1 variants={Varients.heroHomeContentChild}>
                  {hero.title}
                </motion.h1>
                <motion.p variants={Varients.heroHomeContentChild}>
                  {hero.description}
                </motion.p>
              </div>

              <motion.div variants={Varients.heroHomeContentChildFinal}>
                <Button
                  href={`${process.env.NEXT_PUBLIC_URL_PREFIX}${hero.url}`}
                  className="md"
                >
                  {hero.CTA || hero.cta || "Explore"}
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <div className={styles.heroHomeNav}>
            <div className={styles.progressBars}>
              {heroData.map((item, index) => (
                <div
                  key={index}
                  className={styles.progressBar}
                  onClick={() => handleClick(index)}
                >
                  <div
                    key={item.title}
                    className={`${styles.progress} ${
                      current === index ? styles.active : ""
                    } ${current > index ? styles.filled : ""}`}
                  ></div>
                </div>
              ))}
            </div>

            <div className={styles.scrollIndicator}>
              <ArrowBtn label="Scroll" direction="down" variant="blurred" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <>{heroData ? <Hero /> : <></>}</>;
}

export default HomeHero;
