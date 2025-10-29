"use client";
import Preview from "../../../../components/CustomUI/Card/Preview";
import React from "react";
import styles from "./styles.module.css";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Spinner from "../../../../components/CustomUI/Spinner/Spinner";

const page = () => {
  const params = useParams();
  const profileId = params?.profileId; // ✅ matches folder name [profileId]

  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Guards for aborting/race conditions
  const requestKeyRef = useRef("");
  const sentinelRef = useRef(null);

  const fetchPage = useCallback(
    async (pageToFetch) => {
      if (!profileId) return;

      const controller = new AbortController();
      const key = `${profileId}:${pageToFetch}:${Date.now()}`;
      requestKeyRef.current = key;

      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/blog?id=${profileId}&page=${pageToFetch}&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
            signal: controller.signal,
            // cache: "force-cache",
          }
        );
        if (!res.ok) throw new Error(`Failed (${res.status})`);

        const { data } = await res.json();

        console.log("data", data);

        const items = Array.isArray(data?.items) ? data.items : [];
        const pages = data?.totalPages ?? 1;

        // stale response guard
        if (requestKeyRef.current !== key) return;

        setTotalPages(pages);

        setBlogs((prev) => {
          // de-dupe by id/_id
          const base = pageToFetch === 1 ? [] : prev;
          const seen = new Set(base.map((b) => b._id ?? b.id));
          const merged = [
            ...base,
            ...items.filter((b) => {
              const id = b._id ?? b.id;
              if (!id || seen.has(id)) return false;
              seen.add(id);
              return true;
            }),
          ];
          return merged;
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError(err.message || "Unable to fetch blogs.");
        }
      } finally {
        setIsLoading(false);
      }

      return () => controller.abort();
    },
    [profileId]
  );

  // Reset when profileId changes
  useEffect(() => {
    setBlogs([]);
    setPage(1);
    setTotalPages(1);
  }, [profileId]);

  // Fetch whenever page or profileId changes
  useEffect(() => {
    fetchPage(page);
  }, [fetchPage, page]);

  // Infinite scroll observer
  useEffect(() => {
    if (!sentinelRef.current) return;
    const el = sentinelRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        const hasMore = page < totalPages;
        if (first.isIntersecting && !isLoading && hasMore) {
          setPage((p) => p + 1);
        }
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [isLoading, page, totalPages]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        All <span>Blogs</span>
      </h2>

      <p className={`text-center text-gray-400`}>
        All the blogs created by this creator
      </p>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.grid}>
        {blogs.map((blog) => (
          <div className={styles.gridItem} key={blog._id ?? blog.id}>
            <Preview
              title={blog.title}
              description={blog.excerpt ?? blog.description}
              imgUrl={blog.displayImg ?? blog.imgUrl}
              url={`/blogs/${blog.slug ?? blog._id ?? blog.id}`}
              btn="Read more"
              className={styles.preview}
            />
          </div>
        ))}
      </div>

      {/* Sentinel for infinite scroll */}
      <div ref={sentinelRef} className={styles.sentinel} />

      {isLoading && (
        <div className={styles.loaderWrap}>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default page;
