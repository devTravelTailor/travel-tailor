'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Logistics from '../Sections/Logistics/Logistics';
import styles from './styles.module.css';
import { FaQuestionCircle, FaMapPin, FaListUl, FaRoute } from 'react-icons/fa'; // Example step icons

import SectionTitle from '../CustomUI/SectionTitle/SectionTitle';

// Animation Variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const listVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

const DreamVacaySteps = () => {
  return (
    <section className={styles.dreamVacaySection}>
      <motion.div
        className={styles.sectionHeader}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <SectionTitle
          title='Four Steps To Your /sDream Vacay...\s'
          description='Crafting your perfect journey, simplified.'
          variant='center'></SectionTitle>
      </motion.div>

      <div className={styles.stepsContainer}>
        {/* Step 1: Why */}
        <motion.div
          className={styles.stepCard}
          variants={sectionVariants}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.2 }}>
          <div className={styles.stepHeader}>
            <FaQuestionCircle className={styles.stepIcon} />
            <span className={styles.stepNumber}>Step 1</span>
            <h3 className={styles.stepTitle}>Why Travel With Us?</h3>
            <p className={styles.stepPurpose}>(Purpose)</p>
          </div>
          <motion.ul className={styles.stepList} variants={listVariants}>
            <motion.li variants={listItemVariants}>
              <strong>Exploration & Adventure</strong> - To discover new
              cultures, places, and experiences.
            </motion.li>
            <motion.li variants={listItemVariants}>
              <strong>Relaxation & Wellness</strong> - To unwind, escape
              routine, and rejuvenate.
            </motion.li>
          </motion.ul>
        </motion.div>

        {/* Step 2: Where */}
        <motion.div
          className={styles.stepCard}
          variants={sectionVariants}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.2 }}>
          <div className={styles.stepHeader}>
            <FaMapPin className={styles.stepIcon} />
            <span className={styles.stepNumber}>Step 2</span>
            <h3 className={styles.stepTitle}>Where to Travel?</h3>
            <p className={styles.stepPurpose}>(Destination)</p>
          </div>
          <motion.ul className={styles.stepList} variants={listVariants}>
            <motion.li variants={listItemVariants}>
              <strong>Domestic</strong> - Local cities, hidden gems within your
              own country.
            </motion.li>
            <motion.li variants={listItemVariants}>
              <strong>International</strong> - New countries, iconic landmarks,
              exotic destinations.
            </motion.li>
            <motion.li variants={listItemVariants}>
              <strong>Popular Spots</strong> - Paris, Tokyo, New York, Bali.
            </motion.li>
            <motion.li variants={listItemVariants}>
              <strong>Offbeat Paths</strong> - Georgia (the country), Bhutan,
              Faroe Islands.
            </motion.li>
          </motion.ul>
          <p className={styles.tip}>
            <strong>Tip:</strong> Pick a place that fits your purpose, budget,
            and available time.
          </p>
        </motion.div>

        {/* Step 3: What */}
        <motion.div
          className={styles.stepCard}
          variants={sectionVariants}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.2 }}>
          <div className={styles.stepHeader}>
            <FaListUl className={styles.stepIcon} />
            <span className={styles.stepNumber}>Step 3</span>
            <h3 className={styles.stepTitle}>What do we plan?</h3>
            <p className={styles.stepPurpose}>(Activities)</p>
          </div>
          <motion.ul className={styles.stepList} variants={listVariants}>
            <motion.li variants={listItemVariants}>
              <strong>Sightseeing</strong> - Landmarks, nature parks, city
              walks.
            </motion.li>
            <motion.li variants={listItemVariants}>
              <strong>Local Experiences</strong> - Cuisine, festivals, crafts.
            </motion.li>
            <motion.li variants={listItemVariants}>
              <strong>Adventure</strong> - Hiking, diving, skiing, biking.
            </motion.li>
            <motion.li variants={listItemVariants}>
              <strong>Cultural Immersion</strong> - Museums, historical tours,
              local stays.
            </motion.li>
            <motion.li variants={listItemVariants}>
              <strong>Relaxation</strong> - Spas, beaches, nature retreats.
            </motion.li>
          </motion.ul>
        </motion.div>

        {/* Step 4: How (Uses the separate component) */}
        <motion.div
          className={styles.stepCard}
          variants={sectionVariants}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.2 }}>
          <div className={styles.stepHeader}>
            <FaRoute className={styles.stepIcon} />
            <span className={styles.stepNumber}>Step 4</span>
            <h3 className={styles.stepTitle}>How to Travel?</h3>
            <p className={styles.stepPurpose}>(Logistics)</p>
          </div>
          {/* Use the imported LogisticsSection component here */}
          <Logistics />
        </motion.div>
      </div>
    </section>
  );
};

export default DreamVacaySteps;
