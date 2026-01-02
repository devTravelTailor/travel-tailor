'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Spinner from '../CustomUI/Spinner/Spinner';
import styles from './styles.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

function BlogsList() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  const [destinations, setDestinations] = useState([]);
  const [months, setMonths] = useState([]);
  const [experiences, setExperiences] = useState([]);

  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // load filter options
  useEffect(() => {
    const controller = new AbortController();
    const fetchFilters = async () => {
      try {
        const authHeader = process.env.NEXT_PUBLIC_API_TOKEN
          ? {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            }
          : undefined;

        const [destRes, monthRes, expRes] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/destinations?limit=200`,
            {
              headers: authHeader,
              signal: controller.signal,
            },
          ),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/months?limit=200`, {
            headers: authHeader,
            signal: controller.signal,
          }),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/experiences?limit=200`,
            {
              headers: authHeader,
              signal: controller.signal,
            },
          ),
        ]);

        if (destRes.ok) {
          const json = await destRes.json();
          setDestinations(json.data?.items || json.items || []);
        }
        if (monthRes.ok) {
          const json = await monthRes.json();
          setMonths(json.data?.items || json.items || []);
        }
        if (expRes.ok) {
          const json = await expRes.json();
          setExperiences(json.data?.items || json.items || []);
        }
      } catch (err) {
        if (err.name !== 'AbortError') console.error('Filter load failed', err);
      }
    };
    fetchFilters();
    return () => controller.abort();
  }, []);

  const matchesFilters = useCallback(
    (item) => {
      if (selectedDestination) {
        const destIds = (item.destinations || []).map((d) => d._id || d.id);
        if (!destIds.includes(selectedDestination)) return false;
      }
      if (selectedExperience) {
        const expIds = (item.experiences || []).map((e) => e._id || e.id);
        if (!expIds.includes(selectedExperience)) return false;
      }
      return true;
    },
    [selectedDestination, selectedExperience],
  );

  // fetch logic
  const fetchPage = useCallback(
    async (pageToFetch) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(pageToFetch),
          limit: '12',
        });
        if (searchQuery) params.append('q', searchQuery);
        if (selectedMonth) params.append('tagMonths', selectedMonth);

        const url = `${
          process.env.NEXT_PUBLIC_API_URL
        }/api/blog?${params.toString()}`;

        const res = await fetch(url, {
          headers: process.env.NEXT_PUBLIC_API_TOKEN
            ? { Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}` }
            : undefined,
        });
        const { data } = await res.json();
        const newItems = Array.isArray(data?.items) ? data.items : [];

        const filtered = newItems.filter(matchesFilters);

        setBlogs((prev) => {
          const merged = [...prev];
          const existing = new Set(merged.map((b) => b._id || b.id));
          for (const b of filtered) {
            const id = b._id || b.id;
            if (!id || existing.has(id)) continue;
            existing.add(id);
            merged.push(b);
          }
          return merged;
        });
        setTotalPages(data?.totalPages || 1);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [searchQuery, selectedMonth, matchesFilters],
  );

  // reset on filter change
  useEffect(() => {
    setBlogs([]);
    setPage(1);
    setTotalPages(1);
    fetchPage(1);
  }, [fetchPage, selectedDestination, selectedExperience]);

  // initial load
  useEffect(() => {
    fetchPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // infinite scroll observer
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

  const renderFilters = () => (
    <div className='space-y-4 flex flex-col gap-2 px-1'>
      <div className='flex flex-col gap-2'>
        <label className='text-sm text-gray-700'>Destination</label>
        <Select
          value={selectedDestination || 'all'}
          onValueChange={(val) =>
            setSelectedDestination(val === 'all' ? '' : val)
          }>
          <SelectTrigger className='w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5b06]'>
            <SelectValue placeholder='All destinations' />
          </SelectTrigger>
          <SelectContent className='rounded-xl shadow-md border border-gray-100'>
            <SelectItem value='all'>All destinations</SelectItem>
            {destinations.map((dest) => (
              <SelectItem key={dest._id} value={dest._id}>
                {dest.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='flex flex-col gap-2'>
        <label className='text-sm text-gray-700'>Month</label>
        <Select
          value={selectedMonth || 'all'}
          onValueChange={(val) => setSelectedMonth(val === 'all' ? '' : val)}>
          <SelectTrigger className='w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5b06]'>
            <SelectValue placeholder='All months' />
          </SelectTrigger>
          <SelectContent className='rounded-xl shadow-md border border-gray-100'>
            <SelectItem value='all'>All months</SelectItem>
            {months.map((m) => (
              <SelectItem key={m._id} value={m._id}>
                {m.monthTag || m.month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='flex flex-col gap-2'>
        <label className='text-sm text-gray-700'>Experience</label>
        <Select
          value={selectedExperience || 'all'}
          onValueChange={(val) =>
            setSelectedExperience(val === 'all' ? '' : val)
          }>
          <SelectTrigger className='w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5b06]'>
            <SelectValue placeholder='All experiences' />
          </SelectTrigger>
          <SelectContent className='rounded-xl shadow-md border border-gray-100'>
            <SelectItem value='all'>All experiences</SelectItem>
            {experiences.map((exp) => (
              <SelectItem key={exp._id} value={exp._id}>
                {exp.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <div className={styles.blogsPage}>
      <section className='flex flex-col md:flex-row gap-6 w-full mx-auto px-0 md:px-8 lg:px-12'>
        {/* Filters */}
        <nav
          className={`hidden md:block md:w-64 flex-shrink-0 border-b md:border-b-0 md:border-r border-gray-200 md:sticky md:self-start md:top-[var(--header-height,0px)]
          md:h-[calc(100vh-var(--header-height,0px)-2rem)] lg:h-full md:overflow-y-auto py-4 md:py-6 md:pr-4`}>
          <h3 className='text-lg font-medium text-gray-900 mb-3 md:mb-4 pl-2 md:pl-0'>
            Filters
          </h3>
          {renderFilters()}
        </nav>

        {/* Content */}
        <main className='flex-1 pt-4 md:pt-6 pb-10 flex flex-col'>
          <div className='mb-6 flex items-center gap-3'>
            <div className='relative flex-1'>
              <Search className='w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
              <input
                type='text'
                value={searchQuery}
                onChange={(e) => {
                  setBlogs([]);
                  setPage(1);
                  setTotalPages(1);
                  setSearchQuery(e.target.value);
                  fetchPage(1);
                }}
                placeholder='Search blogs by title, keyword, or creator'
                className='w-full rounded-lg border border-gray-200 pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5b06]'
              />
            </div>
            <div className='md:hidden'>
              <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <PopoverTrigger asChild>
                  <button
                    type='button'
                    className='inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:border-[#ff5b06] hover:text-[#ff5b06] transition-colors'>
                    <Filter className='w-4 h-4' />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align='end'
                  className='w-[90vw] max-w-sm bg-white shadow-lg border border-gray-100 rounded-xl'>
                  <div className='flex items-center justify-between mb-3'>
                    <p className='text-sm font-semibold text-gray-900'>
                      Filters
                    </p>
                    <button
                      type='button'
                      className='text-xs text-[#ff5b06] font-medium'
                      onClick={() => {
                        setSelectedDestination('');
                        setSelectedMonth('');
                        setSelectedExperience('');
                      }}>
                      Reset
                    </button>
                  </div>
                  {renderFilters()}
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {blogs.length === 0 && loading ? (
            <div className='flex justify-center py-10'>
              <Spinner />
            </div>
          ) : (
            <>
              <main className='grid grid-cols-1 w-full sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:p-4 gap-6'>
                {blogs.map((item, index) => (
                  <motion.div
                    key={item._id || index}
                    className={styles.blogCard + ' w-full'}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4 }}>
                    <Link
                      href={`/blogs/${item.slug}`}
                      className={styles.blogCardLink}>
                      <div className={styles.imageWrapper}>
                        <Image
                          src={
                            item.displayImg ||
                            item.heroImg ||
                            '/images/placeholder.jpg'
                          }
                          alt={item.title}
                          fill
                          sizes='(max-width: 768px) 100vw, 33vw'
                          priority={index < 4} // preload first row
                          className={styles.blogImage + ' w-full'}
                          onLoadingComplete={(img) =>
                            img.setAttribute('data-loaded', 'true')
                          }
                        />
                        <div className={styles.gradientOverlay}></div>
                        <h3 className={styles.blogTitle}>{item.title}</h3>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </main>
              {page < totalPages && (
                <div
                  ref={loaderRef}
                  className={`w-full flex justify-center items-center`}>
                  {loading && <Spinner />}
                </div>
              )}
              {!loading && blogs.length === 0 && (
                <div className={styles.noBlogs}>
                  <p>No published blogs found.</p>
                </div>
              )}
            </>
          )}
        </main>
      </section>
    </div>
  );
}

export default BlogsList;
