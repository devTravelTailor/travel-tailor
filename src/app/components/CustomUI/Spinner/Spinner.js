
'use client'; 
import { motion } from 'framer-motion';
import styles from './styles.module.css'; // Assuming you keep CSS Modules

// Animation variants for the container to orchestrate stagger
const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.15, // Delay between each dot's animation start
    },
  },
  end: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Animation variants for each individual dot
const loadingCircleVariants = {
  start: {
    y: '0%', // Start position
  },
  end: {
    y: ['0%', '-60%', '0%'], // Bouncing effect: up then down
    transition: {
      duration: 0.6, // Duration of one bounce cycle
      ease: 'easeInOut',
      repeat: Infinity, // Loop indefinitely
      repeatType: 'loop', // Standard loop
    },
  },
};

const Spinner = () => {
  return (
    <motion.div
      className={styles.spinnerContainer}
      variants={loadingContainerVariants}
      initial="start"
      animate="end"
      aria-label="Loading content" 
      role="status" 
    >
      <motion.span
        className={styles.spinnerDot}
        variants={loadingCircleVariants}
        // transition is defined within the variant for looping
      />
      <motion.span
        className={styles.spinnerDot}
        variants={loadingCircleVariants}
      />
      <motion.span
        className={styles.spinnerDot}
        variants={loadingCircleVariants}
      />
    </motion.div>
  );
};

export default Spinner;