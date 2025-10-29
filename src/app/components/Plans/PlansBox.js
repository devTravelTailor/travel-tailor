import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Plan from '../CustomUI/Plan/Plan';
import styles from './styles.module.css';

const PlanBox = ({ plans }) => {
  const itemWidth = 300;
  const gap = 40;
  const n = plans.length;
  const setStep = n * (itemWidth + gap);
  const [k, setK] = useState(2);

  useEffect(() => {
    const calculateK = () => {
      const viewportWidth = window.innerWidth;
      const setWidth = n * itemWidth + (n - 1) * gap;
      const minK = Math.ceil((viewportWidth + setWidth) / setWidth);
      setK(Math.max(3, minK));
    };

    calculateK();
    window.addEventListener('resize', calculateK);
    return () => window.removeEventListener('resize', calculateK);
  }, [plans]);

  const duplicatedPlans = Array.from({ length: k }, () => plans).flat();

  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.planBoxContainer}
        style={{ width: 'auto' }}
        animate={{ x: [0, -setStep] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 15,
            ease: 'linear',
          },
        }}>
        {duplicatedPlans.map((plan, index) => (
          <Plan
            key={index}
            img={plan.img}
            title={plan.title}
            className={styles.planX}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default PlanBox;
