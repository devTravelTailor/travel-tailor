'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxScrollImg = ({ children, speed = 0.3, direction = 'up' }) => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Create a larger movement range for more noticeable effect
  // Negative values move up as we scroll down, positive values move down
  const effectiveSpeed = direction === 'up' ? -speed : speed;
  
  // Calculate a percentage of movement (e.g., 20% of the image height)
  const yPercentage = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, 30 * effectiveSpeed]
  );

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <motion.div
        style={{ 
          width: '100%', 
          height: '110%', // Make slightly larger to hide the motion edges
          y: yPercentage, 
          position: 'absolute',
          top: '-5%' // Offset to ensure full coverage during movement
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxScrollImg;