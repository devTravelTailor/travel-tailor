'use client';

import { useState } from 'react';
import Spinner from '../CustomUI/Spinner/Spinner';
import { TourCard } from './TourCard';
import { Filter, Search } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export default function TourList({
  tourData,
  isLoading,
  error,
  destinations = [],
  months = [],
  selectedDestination = '',
  selectedMonth = '',
  searchQuery = '',
  handleFilterChange = () => {},
  handleSearchChange = () => {},
  handleLoadMore,
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !isLoading) handleLoadMore();
  };

  const renderFilters = () => (
    <div className='space-y-4 px-1'>
      <div className='flex flex-col gap-2'>
        <label className='text-sm text-gray-700'>Destination</label>
        <Select
          value={selectedDestination || 'all'}
          onValueChange={(val) =>
            handleFilterChange('destination', val === 'all' ? '' : val)
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

      <div className='flex flex-col mt-4 mt-2in h gap-2'>
        <label className='text-sm text-gray-700'>Month</label>
        <Select
          value={selectedMonth || 'all'}
          onValueChange={(val) =>
            handleFilterChange('month', val === 'all' ? '' : val)
          }>
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
    </div>
  );

  return (
    <section
      className='flex flex-col md:flex-row gap-6 max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 h-screen overflow-hidden'
      onScroll={handleScroll}>
      {/* Filters */}
      <nav
        className={`hidden md:block md:w-64 flex-shrink-0 border-b md:border-b-0 md:border-r border-gray-200 md:sticky md:self-start md:top-[var(--header-height,0px)]
          md:h-[calc(100vh-var(--header-height,0px)-2rem)] md:overflow-y-auto py-4 md:py-6 md:pr-4 xl:h-full`}>
        <h3 className='text-lg font-medium text-gray-900 mb-3 md:mb-4 pl-2 md:pl-0'>
          Filters
        </h3>

        {renderFilters()}
      </nav>

      {/* === Main Content Area === */}
      <main className='flex-1 pt-4 md:pt-6 pb-10 flex flex-col overflow-hidden'>
        <div className='mb-6 flex items-center gap-3'>
          <div className='relative flex-1 px-1'>
            <Search className='w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder='Search tours by name, location, or keyword'
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
                  <p className='text-sm font-semibold text-gray-900'>Filters</p>
                  <button
                    type='button'
                    className='text-xs text-[#ff5b06] font-medium'
                    onClick={() => {
                      handleFilterChange('destination', '');
                      handleFilterChange('month', '');
                    }}>
                    Reset
                  </button>
                </div>
                {renderFilters()}
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className='flex-1 overflow-y-auto scrollbar-hidden'>
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <div className='text-center text-red-600 py-10'>Error: {error}</div>
          ) : !tourData || tourData.length === 0 ? (
            <div className='text-center text-gray-400 py-10'>
              No tours found.
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 p-2 md:p-0 md:grid-cols-3 3xl:grid-cols-4 gap-5 md:gap-6'>
              {tourData.map((tour, index) => {
                return (
                  <TourCard
                    key={tour._id || index}
                    title={tour.title}
                    duration={tour.details.duration + ' days'}
                    description={tour.brief}
                    heroImg={tour.heroImg}
                    tourType={tour.tourType}
                    groupSize={tour.details.groupSize}
                    experiences={tour.experiences}
                    date={tour.date}
                    slug={tour.slug}
                    location={tour.place}
                  />
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Hide scrollbar utility */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
