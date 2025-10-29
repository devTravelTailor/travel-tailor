'use client';
import React from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';
import { FaPlaneDeparture, FaMapMarkedAlt, FaSuitcaseRolling, FaMoneyBillWave, FaUserShield } from 'react-icons/fa';

// Animation variant for list items
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 12 } }
};

// Animation variant for the container (staggers children)
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Stagger the animation of children
      delayChildren: 0.2 // Small delay before children start animating
    }
  }
};

const logisticsData = [
  { icon: <FaMapMarkedAlt />, title: 'Planning', description: 'Research destination, create itinerary, check visa rules.' },
  { icon: <FaPlaneDeparture />, title: 'Booking', description: 'Flights/trains, accommodation, transport.' },
  { icon: <FaSuitcaseRolling />, title: 'Packing', description: 'Essentials, weather-appropriate clothes, travel docs.' },
  { icon: <FaMoneyBillWave />, title: 'Budgeting', description: 'Set a daily spend limit, currency exchange.' },
  { icon: <FaUserShield />, title: 'Safety', description: 'Travel insurance, emergency contacts, basic health prep.' },
];

const Logistics = () => {
  return (
    <motion.div
      className={styles.logisticsList}
      variants={containerVariants}
      initial="hidden"
      whileInView="show" // Trigger animation when component scrolls into view
      viewport={{ once: true, amount: 0.3 }} // Adjust viewport settings as needed
    >
      {logisticsData.map((item, index) => (
        <motion.div key={index} className={styles.logisticsItem} variants={itemVariants}>
          <div className={styles.iconWrapper}>
            {item.icon}
          </div>
          <div className={styles.itemContent}>
            <h5 className={styles.itemTitle}>{item.title}</h5>
            <p className={styles.itemDescription}>{item.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Logistics;