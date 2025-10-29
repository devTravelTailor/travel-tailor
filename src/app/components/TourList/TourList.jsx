"use client";

import Spinner from "../CustomUI/Spinner/Spinner";
import { motion } from "framer-motion";

export default function TourList({
  tourData,
  isLoading,
  error,
  handleTourTypeChange,
  handleLoadMore,
  tourType,
}) {
  const tourTypes = [
    { key: "fixed_date", label: "Fixed Date" },
    { key: "selectable_date", label: "Selectable Date" },
    { key: "both", label: "Both" },
  ];

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !isLoading) handleLoadMore();
  };

  return (
    <section
      className="flex flex-col md:flex-row gap-6 max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12"
      onScroll={handleScroll}
    >
      {/* === Sidebar / Tour Types === */}
      <nav
        className={`md:w-60 flex-shrink-0 border-b md:border-b-0 md:border-r border-gray-200 sticky md:top-[var(--header-height)]
          md:h-[calc(100vh-var(--header-height)-2rem)] md:overflow-y-auto py-4 md:py-6 md:pr-4`}
      >
        <h3 className="text-lg font-medium text-gray-900 mb-3 md:mb-4 pl-2 md:pl-0">
          Types
        </h3>

        {/* Horizontal on mobile, vertical on desktop */}
        <ul className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible no-scrollbar pb-2 md:pb-0">
          {tourTypes.map((type) => (
            <li key={type.key} className="flex-shrink-0">
              <button
                onClick={() => handleTourTypeChange(type.key)}
                className={`px-4 py-2 text-sm rounded-md whitespace-nowrap transition-all duration-200 font-medium
                  ${
                    tourType === type.key
                      ? " text-orange-600 "
                      : "text-gray-700 hover:text-orange-600"
                  }`}
              >
                {type.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* === Main Content Area === */}
      <main className="flex-1 pt-4 md:pt-6 pb-10">
        {isLoading && tourData?.length > 0 ? (
          <Spinner />
        ) : error ? (
          <div className="text-center text-red-600 py-10">Error: {error}</div>
        ) : !tourData || tourData.length === 0 ? (
          <div className="text-center text-gray-400 py-10">No tours found.</div>
        ) : (
          <>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-8 border-b border-gray-200 pb-3">
              {tourType === "fixed_date"
                ? "Fixed Date"
                : tourType === "selectable_date"
                ? "Selectable Date"
                : "Both"}{" "}
              Tours
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
              {tourData.map((tour, index) => (
                <div
                  key={index}
                  className="relative rounded-xl overflow-hidden shadow-md bg-white cursor-pointer group transition-transform duration-300 hover:-translate-y-1"
                  onClick={() =>
                    (window.location.href = `/creator/tour/${tour.slug}`)
                  }
                >
                  <div className="relative aspect-[4/3] bg-gray-100">
                    {tour.heroImg ? (
                      <img
                        src={tour.heroImg}
                        alt={tour.title}
                        className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
                        No Image
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-black/80 to-transparent z-10" />
                    <h3 className="absolute bottom-3 left-4 right-4 z-20 text-white font-medium text-lg truncate">
                      {tour.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
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
