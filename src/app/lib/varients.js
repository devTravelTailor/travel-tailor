const variants = {
  heroHomeContentMain: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2, // Stagger the animation of children
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
        staggerDirection: -1, // Reverse stagger on exit
      },
    },
  },
  heroHomeContentChild: {
    initial: { opacity: 0, y: -30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
     exit: {
      opacity: 0,
      y: 30,
      transition: {
        duration: 0.6,
      },
    },
  },
    heroHomeContentChildFinal: {
    initial: { opacity: 0, y: -30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
     exit: {
      opacity: 0,
      y: 30,
      transition: {
        duration: 0.6,
      },
    },
  },
};



export default variants;