// components/DynamicList/List.js
"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react"; // Added useMemo
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./styles.module.css";

import parseUrl from "../../util/parseUrl";

const getCategoryId = (title) => title.toLowerCase().replace(/\s+/g, "-");

const List = ({ data, itemBasePath, itemKeyName }) => {
  const [activeCategory, setActiveCategory] = useState("");
  const contentRef = useRef(null);

  console.log("data", data);

  const categories = useMemo(() => {
    if (!data || !Array.isArray(data.group) || !itemKeyName) {
      return [];
    }
    return data.group.filter((category) => {
      const items = category[itemKeyName];
      return items && Array.isArray(items) && items.length > 0;
    });
  }, [data, itemKeyName]);

  const observerCallback = useCallback((entries) => {
    let bestEntry = null;
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (
          !bestEntry ||
          entry.boundingClientRect.top < bestEntry.boundingClientRect.top
        ) {
          if (entry.boundingClientRect.top < window.innerHeight * 0.4) {
            // ~Top 40% of viewport
            bestEntry = entry;
          }
        }
      }
    });

    if (bestEntry) {
      setActiveCategory(bestEntry.target.id);
    }
  }, []);

  useEffect(() => {
    if (categories.length === 0) {
      setActiveCategory("");
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    const elementsToObserve = [];

    categories.forEach((category) => {
      const categoryId = getCategoryId(category.title);
      const element = document.getElementById(categoryId);
      if (element) {
        observer.observe(element);
        elementsToObserve.push(element);
      } else {
        console.warn(
          `[DynamicList] Element with ID "${categoryId}" not found for observer.`
        );
      }
    });

    const timerId = setTimeout(() => {
      let initialActive = "";
      let minTop = Infinity;
      let firstCategoryId =
        categories.length > 0 ? getCategoryId(categories[0].title) : "";

      elementsToObserve.forEach((element) => {
        if (element) {
          const rect = element.getBoundingClientRect();

          if (
            rect.top < window.innerHeight &&
            rect.bottom > 0 &&
            rect.top < minTop
          ) {
            minTop = rect.top;
            initialActive = element.id;
          }
        }
      });

      setActiveCategory(initialActive || firstCategoryId);
    }, 100);

    return () => {
      clearTimeout(timerId);
      elementsToObserve.forEach((element) => {
        if (element) observer.unobserve(element);
      });
      observer.disconnect();
    };
  }, [categories, observerCallback]);

  if (categories.length === 0) {
    if (!data || !Array.isArray(data.group) || data.group.length === 0) {
      return <p className={styles.emptyMessage}>No data provided.</p>;
    }
    if (!itemKeyName) {
      console.error("DynamicList (List): itemKeyName prop is required.");
      return (
        <p className={styles.errorMessage}>
          Configuration error: Missing itemKeyName.
        </p>
      );
    }

    return (
      <p className={styles.emptyMessage}>
        No items to display in any category.
      </p>
    ); // Or null
  }

  const handleNavClick = (e, categoryId) => {
    e.preventDefault();
    const element = document.getElementById(categoryId);
    if (element) {
      const headerOffset = 80; // Adjust this value based on your FIXED header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <nav className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Sections</h3>
        <ul className={styles.navList}>
          {categories.map((category) => {
            const categoryId = getCategoryId(category.title);
            const isActive = activeCategory === categoryId;
            return (
              <li key={categoryId} className={styles.navItem}>
                <a
                  href={`#${categoryId}`}
                  onClick={(e) => handleNavClick(e, categoryId)}
                  className={`${styles.navLink} ${
                    isActive ? styles.activeText : ""
                  }`}
                  aria-current={isActive ? "page" : undefined} // Accessibility improvement
                >
                  {category.title}
                </a>
                {isActive && (
                  <motion.div
                    className={styles.activeHighlight}
                    layoutId="activeHighlight"
                    initial={false}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <main className={styles.contentArea} ref={contentRef}>
        {categories.map((category) => {
          const items = category[itemKeyName];
          const categoryId = getCategoryId(category.title);

          return (
            <section
              key={categoryId}
              id={categoryId}
              className={styles.categorySection}
              style={{ scrollMarginTop: "80px" }}
            >
              <h2 className={styles.categoryTitle}>{category.title}</h2>
              <div className={styles.itemGrid}>
                {items.map((item) => (
                  <Link
                    key={item.slug}
                    href={`${itemBasePath}/${item.slug}`}
                    className={styles.itemCard}
                  >
                    <div className={styles.imageWrapper}>
                      {item.heroImg ? (
                        <Image
                          src={item.heroImg}
                          alt={item.title}
                          fill
                          style={{ objectFit: "cover" }}
                          className={styles.itemImage}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className={styles.placeholderImage}>No Image</div>
                      )}
                      <div className={styles.overlay}></div>
                      <h3 className={styles.itemTitle}>{item.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
};

export default List;
