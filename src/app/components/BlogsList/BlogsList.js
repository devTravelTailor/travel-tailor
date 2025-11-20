"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import TextList from "../../components/TextList/TextList";
import Spinner from "../CustomUI/Spinner/Spinner";
import styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

function BlogsList() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  // --- fetch logic, does NOT depend on page/totalPages ---
  const fetchPage = useCallback(async (pageToFetch) => {
    setLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/blog?page=${pageToFetch}&limit=10`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
      });
      const { data } = await res.json();
      if (!data?.items?.length) return;

      setBlogs((prev) => {
        const newItems = data.items.filter(
          (b) => !prev.some((p) => p._id === b._id)
        );
        return [...prev, ...newItems];
      });
      setTotalPages(data.totalPages || 1);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  // --- initial load once ---
  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]); // ✅ no dependency → runs only once

  // --- infinite scroll observer ---
  useEffect(() => {
    const target = loaderRef.current;
    if (!target) return;

    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting && !loading && page < totalPages) {
        const next = page + 1;
        setPage(next);
        fetchPage(next);
      }
    });

    observer.observe(target);
    return () => observer.disconnect();
  }, [page, totalPages, loading, fetchPage]);

  return (
    <div className={styles.blogsPage}>
      {/* 🔹 Spinner while first data is loading */}

      <>
        {/* 🔹 Blog grid */}
        <main className="grid grid-cols-1 w-full sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 gap-6">
          {blogs.map((item, index) => (
            <motion.div
              key={item._id || index}
              className={styles.blogCard + " w-full"}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                href={`/blogs/${item.slug}`}
                className={styles.blogCardLink}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={
                      item.displayImg ||
                      item.heroImg ||
                      "/images/placeholder.jpg"
                    }
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={index < 4} // preload first row
                    className={styles.blogImage + " w-full"}
                    onLoadingComplete={(img) =>
                      img.setAttribute("data-loaded", "true")
                    }
                  />
                  <div className={styles.gradientOverlay}></div>
                  <h3 className={styles.blogTitle}>{item.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </main>
        {/* 🔹 Infinite scroll trigger */}
        {page < totalPages && (
          <div
            ref={loaderRef}
            className={`w-full flex justify-center items-center`}
          >
            {loading && <Spinner />}
          </div>
        )}
        {/* 🔹 No blogs fallback */}
        {!loading && blogs.length === 0 && (
          <div className={styles.noBlogs}>
            <p>No published blogs found.</p>
          </div>
        )}
      </>
    </div>
  );
}

export default BlogsList;
