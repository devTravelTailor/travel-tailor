"use client";

import { useState, useEffect, useRef } from "react";
import TourList from "../../components/TourList/TourList";
import Spinner from "../../components/CustomUI/Spinner/Spinner";
import styles from "./styles.module.css";

export default function ToursPage() {
  const [tourData, setTourData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tourType, setTourType] = useState("fixed_date");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Guards for Strict Mode + race conditions
  const requestKeyRef = useRef("");
  const didMountRef = useRef(false);

  useEffect(() => {
    // In dev, Strict Mode re-invokes effects on mount; this guard prevents double run.
    if (process.env.NODE_ENV !== "production") {
      if (!didMountRef.current) {
        didMountRef.current = true;
      } else {
        // Allow subsequent legitimate changes (tourType/page) to fetch normally
      }
    }

    const controller = new AbortController();
    const key = `${tourType}:${page}:${Date.now()}`;
    requestKeyRef.current = key;

    (async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tour/?tourType=${tourType}&page=${page}&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
            signal: controller.signal,
            cache: "no-store", // avoids stale duplicates if any caching layer interferes
          }
        );

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const { data } = await res.json();
        const newItems = Array.isArray(data?.items) ? data.items : [];

        // If a newer request has been started, ignore this response.
        if (requestKeyRef.current !== key) return;

        setTotalPages(data?.totalPages ?? 1);

        // Replace on page 1, append otherwise — with de-duplication by _id/id
        setTourData((prev) => {
          const base = page === 1 ? [] : prev;
          const seen = new Set(base.map((x) => x._id ?? x.id));
          const merged = [
            ...base,
            ...newItems.filter((x) => {
              const id = x._id ?? x.id;
              if (!id || seen.has(id)) return false;
              seen.add(id);
              return true;
            }),
          ];
          return merged;
        });
      } catch (err) {
        if (err.name === "AbortError") return; // ignore aborted fetch
        console.error("Failed to fetch tours:", err);
        setError(err.message || "Failed to fetch tour data.");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    })();

    return () => controller.abort();
  }, [tourType, page]);

  const handleTourTypeChange = (type) => {
    // Reset list and page, then set the new type
    // (batched setState ensures one fetch with page=1 for the new type)
    setTourData([]);
    setPage(1);
    setTourType(type);
  };

  const handleLoadMore = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  return (
    <section className="h-screen py-10">
      <TourList
        tourData={tourData}
        isLoading={isLoading}
        error={error}
        handleTourTypeChange={handleTourTypeChange}
        handleLoadMore={handleLoadMore}
        tourType={tourType}
      />
    </section>
  );
}
