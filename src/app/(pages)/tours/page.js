'use client';

import { useState, useEffect, useRef, useDeferredValue } from 'react';
import TourList from '../../components/TourList/TourList';
import ImageCollageGrid from '../../components/Shared/ImageCollageGrid';

const toTitleCase = (value) => {
  const text = String(value || '').trim();
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export default function ToursPage() {
  const [tourData, setTourData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [destinations, setDestinations] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearchQuery = useDeferredValue(searchQuery);

  // Guards for Strict Mode + race conditions
  const requestKeyRef = useRef('');

  // Load filter options once
  useEffect(() => {
    const controller = new AbortController();
    const authHeader = process.env.NEXT_PUBLIC_API_TOKEN
      ? {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        }
      : undefined;

    const fetchAllItems = async (endpoint) => {
      const allItems = [];
      let currentPage = 1;
      let totalPages = 1;

      while (currentPage <= totalPages) {
        const sep = endpoint.includes('?') ? '&' : '?';
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}${endpoint}${sep}page=${currentPage}&limit=100`,
          {
            headers: authHeader,
            signal: controller.signal,
            cache: 'force-cache',
          },
        );
        if (!res.ok) break;
        const json = await res.json();
        const data = json.data || {};
        const items = Array.isArray(data.items)
          ? data.items
          : Array.isArray(json.items)
            ? json.items
            : [];
        allItems.push(...items);
        totalPages = Number(data.totalPages || 1);
        currentPage += 1;
      }

      return allItems;
    };

    const fetchFilters = async () => {
      try {
        const [destItems, monthItems, tourItems] = await Promise.all([
          fetchAllItems('/api/destinations'),
          fetchAllItems('/api/months'),
          fetchAllItems('/api/tour'),
        ]);

        const destinationMap = new Map();
        const monthMap = new Map();

        for (const dest of destItems) {
          const key = dest?._id || dest?.id || dest?.slug;
          if (!key) continue;
          destinationMap.set(String(key), dest);
        }

        for (const month of monthItems) {
          const key = month?._id || month?.id || month?.slug || month?.monthTag || month?.month;
          if (!key) continue;
          monthMap.set(String(key), month);
        }

        for (const tour of tourItems) {
          const relatedDestinations = Array.isArray(tour?.destinations)
            ? tour.destinations
            : [];
          const relatedMonths = Array.isArray(tour?.tagMonths)
            ? tour.tagMonths
            : [];

          for (const dest of relatedDestinations) {
            const key = dest?._id || dest?.id || dest?.slug;
            if (!key) continue;
            if (!destinationMap.has(String(key))) {
              destinationMap.set(String(key), dest);
            }
          }

          for (const month of relatedMonths) {
            const key = month?._id || month?.id || month?.slug || month?.monthTag || month?.month;
            if (!key) continue;
            if (!monthMap.has(String(key))) {
              monthMap.set(String(key), month);
            }
          }
        }

        const sortedDestinations = [...destinationMap.values()].sort((a, b) =>
          String(a?.title || '').localeCompare(String(b?.title || ''), 'en', {
            sensitivity: 'base',
          }),
        );

        const sortedMonths = [...monthMap.values()].sort((a, b) =>
          toTitleCase(a?.monthTag || a?.month).localeCompare(
            toTitleCase(b?.monthTag || b?.month),
            'en',
            { sensitivity: 'base' },
          ),
        );

        setDestinations(sortedDestinations);
        setMonths(sortedMonths);
      } catch (err) {
        if (err.name === 'AbortError') return;
        console.error('Failed to fetch filter options', err);
      }
    };

    fetchFilters();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const key = `${selectedDestination}:${selectedMonth}:${deferredSearchQuery}:${page}`;
    requestKeyRef.current = key;

    const params = new URLSearchParams({
      page: String(page),
      limit: '10',
    });

    if (selectedDestination) {
      params.append('destination', selectedDestination); // relation graph
      params.append('destinations', selectedDestination); // legacy array field
    }
    if (selectedMonth) {
      params.append('month', selectedMonth); // relation graph (monthTag/_id)
      params.append('tagMonths', selectedMonth); // legacy array field
    }
    if (deferredSearchQuery) {
      params.append('q', deferredSearchQuery);
    }

    (async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tour/?${params.toString()}`,
            {
              headers: process.env.NEXT_PUBLIC_API_TOKEN
                ? {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                  }
                : undefined,
              signal: controller.signal,
              cache: 'force-cache',
            },
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
        if (err.name === 'AbortError') return; // ignore aborted fetch
        console.error('Failed to fetch tours:', err);
        setError(err.message || 'Failed to fetch tour data.');
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    })();

    return () => controller.abort();
  }, [selectedDestination, selectedMonth, deferredSearchQuery, page]);

  const handleFilterChange = (filterKey, value) => {
    setTourData([]);
    setPage(1);
    if (filterKey === 'destination') setSelectedDestination(value);
    if (filterKey === 'month') setSelectedMonth(value);
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
    <>
      <section className='h-screen py-10'>
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
    </>
  );
}
