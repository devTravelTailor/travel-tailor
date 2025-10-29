"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Tour from "../../../../components/CustomUI/Card/Tour";
import Spinner from "../../../../components/CustomUI/Spinner/Spinner";
import styles from "./styles.module.css";
import parseUrl from "../../../../util/parseUrl";

const Page = () => {
  const params = useParams();
  const profileId = params?.profileId; // ✅ matches folder name

  const [tours, setTours] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Guards for race conditions
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
          // ⬇️ If your API uses another param (e.g. creatorId), adjust here
          `${process.env.NEXT_PUBLIC_API_URL}/api/tour?id=${profileId}&page=${pageToFetch}&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
            signal: controller.signal,
            cache: "no-store",
          }
        );
        if (!res.ok) throw new Error(`Failed (${res.status})`);

        const { data } = await res.json();
        console.log("data", data);

        const items = Array.isArray(data?.items) ? data.items : [];
        const pages = data?.totalPages ?? 1;

        if (requestKeyRef.current !== key) return; // stale response

        setTotalPages(pages);

        setTours((prev) => {
          const base = pageToFetch === 1 ? [] : prev;
          const seen = new Set(base.map((t) => t._id ?? t.id));
          return [
            ...base,
            ...items.filter((t) => {
              const id = t._id ?? t.id;
              if (!id || seen.has(id)) return false;
              seen.add(id);
              return true;
            }),
          ];
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError(err.message || "Unable to fetch tours.");
        }
      } finally {
        setIsLoading(false);
      }

      return () => controller.abort();
    },
    [profileId]
  );

  // Reset on profile change
  useEffect(() => {
    setTours([]);
    setPageNum(1);
    setTotalPages(1);
  }, [profileId]);

  // Fetch on page/profile change
  useEffect(() => {
    fetchPage(pageNum);
  }, [fetchPage, pageNum]);

  // Infinite scroll
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        const hasMore = pageNum < totalPages;
        if (first.isIntersecting && !isLoading && hasMore) {
          setPageNum((p) => p + 1);
        }
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isLoading, pageNum, totalPages]);

  const isEmpty = !isLoading && tours.length === 0 && !error;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        All <span>Tours</span>
      </h2>

      <p className={` text-center text-gray-400 `}>
        View all tours created by this creator
      </p>

      {error && <p className={styles.error}>{error}</p>}
      {isEmpty && <p className={styles.empty}>No tours found.</p>}

      {tours.length > 0 && (
        <div className={styles.grid}>
          {tours.map((tour) => (
            <div className={styles.gridItem} key={tour._id ?? tour.id}>
              <Tour
                type="tours"
                description={tour?.description}
                title={tour?.title}
                slug={tour?.slug}
                url={`/tours/${tour?.slug}`}
                imgUrl={
                  tour?.heroImg
                    ? parseUrl(tour?.heroImg)
                    : tour.image
                    ? parseUrl(tour?.image)
                    : null
                }
                tag={`${tour?.details?.totalDays} days`}
              />
            </div>
          ))}
        </div>
      )}

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

export default Page;
