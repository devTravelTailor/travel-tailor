"use client";

import Spinner from "../CustomUI/Spinner/Spinner";
import { TourCard } from "./TourCard";

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
    { key: "selectable_date", label: "Smith-Curated" },
    { key: "fixed_date", label: "Smith-led" },
    // { key: "both", label: "Both" },
  ];

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !isLoading) handleLoadMore();
  };

  console.log(tourData);

  return (
    <section
      className="flex flex-col h-screen md:flex-row gap-6 max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12"
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
          <div className="scrollbar-hidden overflow-y-scroll h-full">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-8 border-b border-gray-200 pb-3">
              {tourType === "fixed_date"
                ? "Smith-led"
                : tourType === "selectable_date"
                ? "Smith-Curated"
                : "Both"}{" "}
              Tours
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 p-5  md:grid-cols-3 3xl:grid-cols-4 gap-5 md:gap-6">
              {tourData.map((tour, index) => {
                return (
                  <div
                    key={index}
                    onClick={() =>
                      (window.location.href = `/creator/tour/${tour.slug}`)
                    }
                  >
                    <TourCard
                      title={tour.title}
                      duration={tour.details.duration + " days"}
                      description={tour.brief}
                      heroImg={tour.heroImg}
                      tourType={tour.tourType}
                      groupSize={tour.details.groupSize}
                      experiences={tour.experiences}
                      date={tour.date}
                      slug={tour.slug}
                      location={tour.place}
                    />
                  </div>
                );
              })}
            </div>
          </div>
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
