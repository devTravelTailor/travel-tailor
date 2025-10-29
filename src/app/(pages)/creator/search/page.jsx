"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import Spinner from "../../../components/CustomUI/Spinner/Spinner";
import SearchResult from "../../../components/SearchResult/SearchResult";
import styles from "./styles.module.css"; // 👈 using your CSS
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

// Categories
const BASE_PATHS = {
  creators: "/creator",
  blogs: "/blogs",
  tours: "/creator/tour",
};

const CATEGORY_TITLES = {
  creators: "Creators",
  blogs: "Blog Posts",
  tours: "Tours",
};

// Debounce hook
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") || "";
  const initialFilter = searchParams.get("filter") || "all";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [submittedQuery, setSubmittedQuery] = useState(initialQuery);
  const [filter, setFilter] = useState(initialFilter);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (initialQuery && !results) performSearch(initialQuery, filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery, initialFilter]);

  useEffect(() => {
    if (
      debouncedQuery &&
      debouncedQuery !== submittedQuery &&
      debouncedQuery.length >= 3
    ) {
      performSearch(debouncedQuery, filter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, filter]);

  const performSearch = async (query, filterValue) => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults(null);
      setError(null);
      setLoading(false);
      setSubmittedQuery("");
      router.push("/creator/search");
      return;
    }

    setLoading(true);
    setError(null);
    setSubmittedQuery(trimmed);

    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/api/creator-search/${encodeURIComponent(
          trimmed
        )}?filter=${filterValue}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        }
      );

      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();

      console.log("data", data.data);

      setResults(data.data);
      router.push(
        `/creator/search?q=${encodeURIComponent(trimmed)}&filter=${filterValue}`
      );
    } catch (err) {
      console.error(err);
      setError("Search failed. Please try again later.");
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed.length >= 3) {
      performSearch(trimmed, filter);
    }
  };

  const hasResults =
    results && Object.values(results).some((arr) => arr.length > 0);

  return (
    <div className={styles.searchContainer}>
      {/* Search bar */}
      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <div className={styles.searchIcon}>
          <Image src="/images/search.png" alt="" width={20} height={20} />
        </div>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search creators, blogs, tours..."
          className={styles.searchInput}
        />
        <Select value={filter} onValueChange={(val) => setFilter(val)}>
          <SelectTrigger
            className="ml-2 mr-3 w-[140px] rounded-full  border-gray-300 bg-white 
               px-4 py-2 text-sm text-gray-700 focus:outline-none  outline-0
               transition"
          >
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent className="rounded-xl shadow-md border-0">
            <SelectItem
              value="all"
              className="cursor-pointer focus:bg-orange-500 focus:text-white"
            >
              All
            </SelectItem>
            <SelectItem
              value="creator"
              className="cursor-pointer focus:bg-orange-500 focus:text-white"
            >
              Creators
            </SelectItem>
            <SelectItem
              value="blogs"
              className="cursor-pointer focus:bg-orange-500 focus:text-white"
            >
              Blogs
            </SelectItem>
            <SelectItem
              value="tours"
              className="cursor-pointer focus:bg-orange-500 focus:text-white"
            >
              Tours
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Search button */}
        <button
          type="submit"
          disabled={loading}
          onClick={handleSubmit}
          className={`px-6 py-2 rounded-full text-white text-sm font-medium transition 
                ${
                  loading
                    ? "bg-orange-400 cursor-not-allowed"
                    : "bg-orange-600 hover:bg-orange-700"
                }`}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Results */}
      <div className={styles.resultsArea}>
        {loading && <p className={styles.loadingMessage}>Loading results...</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}
        {!loading && !error && submittedQuery && results && !hasResults && (
          <p className={styles.noResultsMessage}>
            No results found for <b> {submittedQuery}</b>
          </p>
        )}

        {!loading &&
          !error &&
          results &&
          hasResults &&
          Object.keys(BASE_PATHS).map((key, idx) => {
            const items = results[key];
            console.log("items", items);

            if (items && items.length > 0) {
              return (
                <section key={idx} className={styles.categorySection}>
                  <h2 className={styles.categoryTitle}>
                    {CATEGORY_TITLES[key]} <span>({items.length})</span>
                  </h2>
                  <div
                    className={`${styles.resultsGrid} max-h-[600px] overflow-y-auto`}
                  >
                    {items.map((item, index) => {
                      const url =
                        CATEGORY_TITLES[key] === "Creators"
                          ? item._id
                          : item.slug;
                      return (
                        <SearchResult
                          key={`${index}-${item.slug}`}
                          item={item}
                          href={`${BASE_PATHS[key]}/${url}`}
                        />
                      );
                    })}
                  </div>
                </section>
              );
            }
            return null;
          })}

        {!submittedQuery && !loading && !error && (
          <p className={styles.promptMessage}>
            Type 3 or more characters to begin search.
          </p>
        )}
      </div>
    </div>
  );
}

export default function CreatorSearchPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <SearchPageContent />
    </Suspense>
  );
}
