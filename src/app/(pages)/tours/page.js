"use client";

import { useState, useEffect, useRef } from "react";
import TourList from "../../components/TourList/TourList";

export default function ToursPage() {
  const [tourData, setTourData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [destinations, setDestinations] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Guards for Strict Mode + race conditions
  const requestKeyRef = useRef("");
  const didMountRef = useRef(false);

  // Load filter options once
  useEffect(() => {
    const controller = new AbortController();
    const fetchFilters = async () => {
      try {
        const [destRes, monthRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/destinations?limit=200`, {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
            signal: controller.signal,
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/months?limit=200`, {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
            signal: controller.signal,
          }),
        ]);

        if (destRes.ok) {
          const destJson = await destRes.json();
          setDestinations(destJson.data?.items || []);
        }
        if (monthRes.ok) {
          const monthJson = await monthRes.json();
          setMonths(monthJson.data?.items || []);
        }
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Failed to fetch filter options", err);
      }
    };

    fetchFilters();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    // In dev, Strict Mode re-invokes effects on mount; this guard prevents double run.
    if (process.env.NODE_ENV !== "production") {
      if (!didMountRef.current) {
        didMountRef.current = true;
      }
    }

    const controller = new AbortController();
    const key = `${selectedDestination}:${selectedMonth}:${page}:${Date.now()}`;
    requestKeyRef.current = key;

    const params = new URLSearchParams({
      page: String(page),
      limit: "10",
    });

    if (selectedDestination) {
      params.append("destination", selectedDestination); // relation graph
      params.append("destinations", selectedDestination); // legacy array field
    }
    if (selectedMonth) {
      params.append("month", selectedMonth); // relation graph (monthTag/_id)
      params.append("tagMonths", selectedMonth); // legacy array field
    }
    if (searchQuery) {
      params.append("q", searchQuery);
    }

    (async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tour/?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
            signal: controller.signal,
            cache: "no-store",
          }
        );

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const { data } = await res.json();
        const newItems = Array.isArray(data?.items) ? data.items : [];

        // If a newer request has been started, ignore this response.
        if (requestKeyRef.current !== key) return;

        setTotalPages(data?.totalPages ?? 1);

        // Replace on page 1, append otherwise – with de-duplication by _id/id
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
  }, [selectedDestination, selectedMonth, searchQuery, page]);

  const handleFilterChange = (filterKey, value) => {
    setTourData([]);
    setPage(1);
    if (filterKey === "destination") setSelectedDestination(value);
    if (filterKey === "month") setSelectedMonth(value);
  };

  const handleSearchChange = (value) => {
    setTourData([]);
    setPage(1);
    setSearchQuery(value);
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
        destinations={destinations}
        months={months}
        selectedDestination={selectedDestination}
        selectedMonth={selectedMonth}
        searchQuery={searchQuery}
        handleFilterChange={handleFilterChange}
        handleSearchChange={handleSearchChange}
        handleLoadMore={handleLoadMore}
      />
    </section>
  );
}
