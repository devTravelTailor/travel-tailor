"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchResult from "../../components/SearchResult/SearchResult";
import styles from "./styles.module.css";
import Spinner from "../../components/CustomUI/Spinner/Spinner";
import Image from "next/image";
import { Suspense } from "react";

// Base paths and titles
const BASE_PATHS = {
  blogs: "/blogs",
  destinations: "/destinations",
  experiences: "/experiences",
  tours: "/creator/tour",
  creators: "/creator",
  creatorBlogs: "/blogs",
  creatorTours: "/creator/tour",
};

const CATEGORY_TITLES = {
  blogs: "Blog Posts",
  destinations: "Destinations",
  experiences: "Experiences",
  tours: "Tours",
  creators: "Creators",
  creatorBlogs: "Creator Posts",
  creatorTours: "Creator Tours",
};

// Custom hook for debouncing
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Separate the inner component that uses useSearchParams
function SearchPageContent() {
  const router = useRouter();

  const { useSearchParams } = require("next/navigation");
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [submittedQuery, setSubmittedQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce the search query
  const debouncedSearchQuery = useDebounce(searchQuery, 500); // 500ms delay

  useEffect(() => {
    if (initialQuery && !searchResults) {
      performSearch(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  useEffect(() => {
    if (
      debouncedSearchQuery &&
      debouncedSearchQuery !== submittedQuery &&
      debouncedSearchQuery.length >= 3
    ) {
      performSearch(debouncedSearchQuery);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery, submittedQuery]);

  // Function to fetch search results
  const performSearch = async (query) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setSearchResults(null);
      setError(null);
      setIsLoading(false);
      setSubmittedQuery("");

      router.push("/search");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSubmittedQuery(trimmedQuery);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/search/${encodeURIComponent(
          trimmedQuery
        )}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Search results:", data);
      setSearchResults(data.data);

      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    } catch (err) {
      console.error("Failed to fetch search results:", err);
      setError(
        "Sorry, we couldn't perform the search. Please try again later."
      );
      setSearchResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // No need to call performSearch here as the debouncer will handle it.
    // If you want instant search on button click, you can keep it.
    if (searchQuery.trim() !== submittedQuery) {
      performSearch(searchQuery.trim());
    }
  };

  // Handle input change
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Calculate if there are any results
  const hasResults =
    searchResults && Object.values(searchResults).some((arr) => arr.length > 0);

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <div className={styles.searchIcon}>
          <Image
            src="/images/search.png"
            alt=""
            width={20}
            height={20}
            aria-hidden="true"
          />
        </div>
        <input
          type="search"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search destinations, blogs, tours..."
          className={styles.searchInput}
          aria-label="Search query"
        />
        <button
          type="submit"
          className={styles.searchButton}
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className={styles.resultsArea}>
        {isLoading && (
          <p className={styles.loadingMessage}>Loading results...</p>
        )}

        {error && <p className={styles.errorMessage}>{error}</p>}

        {!isLoading &&
          !error &&
          submittedQuery &&
          searchResults &&
          !hasResults && (
            <p className={styles.noResultsMessage}>
              {`No results found for ${submittedQuery}`}
            </p>
          )}

        {!isLoading &&
          !error &&
          searchResults &&
          hasResults &&
          Object.keys(BASE_PATHS).map((key) => {
            const items = searchResults[key];
            const title = CATEGORY_TITLES[key];
            const basePath = BASE_PATHS[key];

            console.log("items", items, "title", title, "basePath", basePath);

            if (items && items.length > 0) {
              return (
                <section key={key} className={styles.categorySection}>
                  <h2 className={styles.categoryTitle}>
                    {title} <span>({items.length})</span>
                  </h2>
                  <div className={styles.resultsGrid}>
                    {items.map((item) => {
                      const url = item.slug
                        ? `${basePath}/${item.slug}`
                        : `${basePath}/${item._id}`;

                      return (
                        <SearchResult
                          key={`${key}-${item.slug}`}
                          item={item}
                          href={url}
                        />
                      );
                    })}
                  </div>
                </section>
              );
            }
            return null;
          })}

        {/* Initial state message (only show if no query submitted and not loading) */}
        {!submittedQuery && !isLoading && !error && (
          <p className={styles.promptMessage}>
            Type 3 or more characters to begin search.
          </p>
        )}
      </div>
    </div>
  );
}

// Main component that applies Suspense boundary correctly
export default function SearchPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <SearchPageContent />
    </Suspense>
  );
}
