'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './styles.module.css';

import SectionTitle from '../../CustomUI/SectionTitle/SectionTitle';

// Animation Variants
const sectionVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.3, // Stagger children animations
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.86, 0, 0.07, 1] },
  },
};

const imageWrapperVariants = {
  hidden: { scale: 1.1, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.86, 0, 0.07, 1] },
  },
};

const kanishkaPhotoUrl = '/images/kanishka.jpg';
const himanshuPhotoUrl = '/images/himanshu.jpeg';

const FoundersSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'], // Track scroll from start crossing bottom to end crossing top
  });

  // Parallax effect for background shapes (subtle movement)
  const bgShapeY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  // Fade effect for shapes based on scroll position within section
  const bgShapeOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 0.04, 0.04, 0],
  ); // Fade in near start, fade out near end

  return (
    <motion.section
      ref={sectionRef}
      className={styles.foundersSection}
      variants={sectionVariants}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true, amount: 0.15 }} // Trigger when 15% is visible
    >
      {/* Subtle Background Shapes */}
      <motion.div
        className={`${styles.bgShape} ${styles.bgShape1}`}
        style={{
          y: bgShapeY,
          opacity: bgShapeOpacity,
          top: '10%',
          left: '-10%',
        }}
      />
      <motion.div
        className={`${styles.bgShape} ${styles.bgShape2}`}
        style={{
          y: bgShapeY,
          opacity: bgShapeOpacity,
          bottom: '5%',
          right: '-15%',
        }}
      />

      {/* Header */}
      <motion.div className={styles.header} variants={itemVariants}>
        <SectionTitle
          title='Founders'
          description='It Started With a Spark... Meet Himanshu & Kanishka'
          variant='center'
        />
      </motion.div>

      {/* Profiles Container */}
      <div className={styles.profilesContainer}>
        <motion.div
          className={`${styles.profileItem} ${styles.amanProfile}`}
          variants={itemVariants}>
          <motion.div
            className={styles.imageContainer}
            variants={imageWrapperVariants}>
            <Image
              src={himanshuPhotoUrl}
              alt='Himanshu - Co-founder of Travel Tailor'
              layout='fill'
              objectFit='cover'
              className={styles.profileImage}
              priority
            />
          </motion.div>
          <div className={styles.textContainer}>
            <h3 className={styles.name}>Himanshu</h3>
            <p className={styles.quote}>I thrive on bringing ideas to life.</p>
            <p className={styles.bio}>
              His path, from the buzz of startups to steering his family&apos;s
              renowned Sky Automobiles in Raipur, has always been about vision
              and execution. For Travel Travel, he&apos;s the strategic heart,
              meticulously ensuring every aspect of your journey is not just
              planned, but <em>potentialized</em>. He connects the dots,
              ensuring the bigger picture of your dream trip unfolds seamlessly.
            </p>
          </div>
        </motion.div>

        <motion.div
          className={`${styles.profileItem} ${styles.armaniProfile}`}
          variants={itemVariants}>
          <div className={styles.textContainer}>
            <h3 className={styles.name}>Kanishka</h3>
            <p className={styles.quote}>
              For me, the magic lies in crafting the flow.
            </p>
            <p className={styles.bio}>
              Honed at places like Urban Company in Delhi, her expertise in
              operations and product is all about anticipating needs and
              perfecting the details. She&apos;s the curator of your experience,
              ensuring that from the moment you book until you&apos;re back
              home, every touchpoint feels intuitive, effortless, and tailored{' '}
              <em>just for you</em>. She turns logistics into moments of
              delight.
            </p>
          </div>
          <motion.div
            className={styles.imageContainer}
            variants={imageWrapperVariants}>
            <Image
              src={kanishkaPhotoUrl}
              alt='Kanishka - Co-founder of Travel Tailor'
              layout='fill'
              objectFit='cover'
              className={styles.profileImage}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Concluding Text */}
      <motion.div className={styles.conclusion} variants={itemVariants}>
        <h4 className={styles.conclusionTitle}>The Difference</h4>
        <p className={styles.conclusionText}>
          We&apos;re adventurers, yes - the kind who&apos;ve felt the rush of
          paragliding and the awe of skydiving. But more than that, we&apos;re
          travellers just like you. We combine Himanshu&apos;s knack for
          strategy with Kanishka&apos;s passion for flawless execution. The
          result? Journeys that ditch the cookie-cutter mold and feel
          intuitively <em>yours</em>.
        </p>
        <p className={styles.promiseText}>
          <strong>Our Promise:</strong> Think of us as your personal travel
          designers. We listen intently, craft thoughtfully, and build
          unforgettable realities around your dreams.
        </p>
      </motion.div>
    </motion.section>
  );
};

export default FoundersSection;
