"use client";

import { useEffect, useRef, useState } from "react";
import Preview from "../CustomUI/Card/Preview";
import ScrollBtn from "../CustomUI/Button/ScrollBtn";
import styles from "./styles.module.css";

function BlogsList({ data, currentPage, totalPages, onPageChange, fetchData }) {
  const scrollRefs = useRef({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]); // Categories state

  // Fetch categories directly from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/categories/`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const { data } = await response.json();

        setCategories(data.items); // Store the fetched categories
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleTagClick = (tag) => {
    setSelectedCategory(tag); // Set the selected category
    const element = document.getElementById(tag);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleScroll = (tag, direction) => {
    const scrollAmount = 350; // Adjust as needed
    if (scrollRefs.current[tag]) {
      if (direction === "left") {
        scrollRefs.current[tag].scrollLeft -= scrollAmount;
      } else {
        scrollRefs.current[tag].scrollLeft += scrollAmount;
      }

      // Check if we need to load more blogs based on the scroll position
      if (
        scrollRefs.current[tag].scrollLeft +
          scrollRefs.current[tag].clientWidth >=
        scrollRefs.current[tag].scrollWidth - 100
      ) {
        // When near the end, fetch more data
        if (currentPage < totalPages) {
          onPageChange(currentPage + 1);
          fetchData(); // Trigger data fetch
        }
      }
    }
  };

  return (
    <div className={styles.blogsPage}>
      {/* Left: Category Navigation */}
      <nav className={styles.categoryNav}>
        <h3 className={styles.navTitle}>Categories</h3>
        <ul className={styles.categoryList}>
          {categories.map((category) => (
            <li key={category._id}>
              <a
                className={styles.categoryLink}
                onClick={() => handleTagClick(category._id)} // Use category _id for selection
              >
                {category.tag}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Right: Blogs Display */}
      <main className={styles.blogsContainer}>
        {categories.map((category) => {
          // Only display sections for the selected category
          if (selectedCategory && selectedCategory !== category._id) {
            return null; // Skip non-selected categories
          }

          const blogsInCategory = data.items.filter(
            (blog) => blog?.categories?.some((cat) => cat === category._id) // Match blogs by category _id
          );

          // Skip rendering categories with no blogs
          if (blogsInCategory.length === 0) {
            return null;
          }

          return (
            <section
              key={category._id}
              id={category._id}
              className={styles.categorySection}
            >
              <div className={styles.categoryHeader}>
                <h2 className={styles.categoryTitle}>{category.tag}</h2>
                <ScrollBtn
                  onScrollLeft={() => handleScroll(category._id, "left")}
                  onScrollRight={() => handleScroll(category._id, "right")}
                />
              </div>
              <div
                className={styles.blogsCarousel}
                ref={(el) => (scrollRefs.current[category._id] = el)}
              >
                {blogsInCategory.map((blog) => (
                  <Preview
                    key={blog.slug}
                    title={blog.title}
                    description={blog.description}
                    imgUrl={blog.displayImg}
                    url={`/blogs/${blog.slug}`}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}

export default BlogsList;
