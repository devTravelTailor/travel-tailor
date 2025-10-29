"use client";
import React, { useState, useEffect, useRef } from "react";
import { slugify } from "../../util/slugify";
import styles from "./toc.module.css";

const PolicyTOC = ({ sections }) => {
  const [activeSection, setActiveSection] = useState("");
  const tocRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    // Enhanced scroll detection with Intersection Observer
    const observerOptions = {
      root: null,
      rootMargin: `-${150}px 0px -60% 0px`, // Adjust based on header height
      threshold: [0, 0.1, 0.5, 1.0],
    };

    observerRef.current = new IntersectionObserver((entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => {
          // Sort by how much of the section is visible and position
          const aRatio = a.intersectionRatio;
          const bRatio = b.intersectionRatio;
          if (aRatio !== bRatio) {
            return bRatio - aRatio; // Higher ratio first
          }
          // If ratios are equal, prefer the one higher on the page
          return a.boundingClientRect.top - b.boundingClientRect.top;
        });

      if (visibleSections.length > 0) {
        const mostVisible = visibleSections[0];
        setActiveSection(mostVisible.target.id);
      }
    }, observerOptions);

    // Observe all section elements
    sections.forEach((section) => {
      const element = document.getElementById(slugify(section.title));
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    // Fallback scroll listener for better responsiveness
    const handleScroll = () => {
      const sectionElements = sections
        .map((section) => ({
          element: document.getElementById(slugify(section.title)),
          slug: slugify(section.title),
        }))
        .filter((item) => item.element);

      let currentActiveSection = "";
      let minDistance = Infinity;

      for (const { element, slug } of sectionElements) {
        const rect = element.getBoundingClientRect();
        const distanceFromTop = Math.abs(rect.top - 150); // 150px offset for header

        if (rect.top <= 150 && rect.bottom >= 100) {
          if (distanceFromTop < minDistance) {
            minDistance = distanceFromTop;
            currentActiveSection = slug;
          }
        }
      }

      if (currentActiveSection && currentActiveSection !== activeSection) {
        setActiveSection(currentActiveSection);
      }
    };

    // Throttled scroll listener
    let scrollTimeout;
    const throttledScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        handleScroll();
        scrollTimeout = null;
      }, 100);
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      window.removeEventListener("scroll", throttledScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [sections, activeSection]);

  const handleSectionClick = (sectionTitle) => {
    const slug = slugify(sectionTitle);
    const element = document.getElementById(slug);

    if (element) {
      const headerOffset = 140; // Adjust based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      // Temporarily set active state for immediate feedback
      setActiveSection(slug);

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <nav
      ref={tocRef}
      className={styles.tocContainer}
      aria-labelledby="toc-heading"
    >
      <h3 id="toc-heading" className={styles.tocTitle}>
        Contents
      </h3>
      <ul className={styles.tocList}>
        {sections.map((section, index) => {
          const slug = slugify(section.title);
          const isActive = activeSection === slug;

          return (
            <li key={slug} className={styles.tocItem}>
              <button
                onClick={() => handleSectionClick(section.title)}
                className={`${styles.tocLink} ${
                  isActive ? styles.tocLinkActive : ""
                }`}
                aria-label={`Navigate to ${section.title}`}
                aria-current={isActive ? "true" : "false"}
              >
                {/* <span className={styles.tocNumber}>{index + 1}.</span> */}
                <span className={styles.tocText}>{section.title}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default PolicyTOC;
