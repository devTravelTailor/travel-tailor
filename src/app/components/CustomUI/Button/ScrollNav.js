'use client';

import React, { useState, useEffect } from "react";
import ArrowBtn from "./ArrowBtn";

const ScrollNav = ({
  scrollRef, 
  scrollDistance = 300, 
  checkScrollLimits = false, 
  className = "", 
}) => {

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);


  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1); 
    }
  };


  useEffect(() => {
    if (checkScrollLimits) {
      checkScrollPosition();
      const scrollableDiv = scrollRef.current;
      scrollableDiv?.addEventListener("scroll", checkScrollPosition);
      return () => scrollableDiv?.removeEventListener("scroll", checkScrollPosition);
    }
  }, [scrollRef, checkScrollLimits]);


  const scrollLeft = () => {
    if (scrollRef.current) {
      // Dynamic scroll distance: use the width of the first child if available
      const firstItem = scrollRef.current.children[0];
      const distance = firstItem ? firstItem.offsetWidth : scrollDistance;
      // Use scrollTo with smooth behavior
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft - distance,
        behavior: "smooth",
      });
    }
  };


  const scrollRight = () => {
    if (scrollRef.current) {
      // Dynamic scroll distance: use the width of the first child if available
      const firstItem = scrollRef.current.children[0];
      const distance = firstItem ? firstItem.offsetWidth : scrollDistance;
      // Use scrollTo with smooth behavior
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft + distance,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`scroll-nav-box ${className}`}>
      <ArrowBtn
        direction="left"
        variant="outline"
        onClick={scrollLeft}
        disabled={checkScrollLimits && !canScrollLeft} 
        aria-label="Scroll left"
      />
      <ArrowBtn
        direction="right"
        variant="filled"
        onClick={scrollRight}
        disabled={checkScrollLimits && !canScrollRight} 
        aria-label="Scroll right"
      />
    </div>
  );
};

export default ScrollNav;