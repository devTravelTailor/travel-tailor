"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DEFAULT_TEXT = {
  title: "Personalized travel for those who",
  highlight: "seek more.",
  description: "Crafted by travellers. Designed for depth. Made only for you.",
};

const FALLBACK_IMG =
  "https://images.musement.com/cover/0003/14/koh-samui-xxl-jpg_header-213595.jpeg";

const HeroSection = ({ heroSlides = [] }) => {
  const slides = useMemo(() => {
    if (Array.isArray(heroSlides) && heroSlides.length > 0) {
      return heroSlides.map((slide) => ({
        image: slide?.image || FALLBACK_IMG,
        title: slide?.title || DEFAULT_TEXT.title,
        highlight: slide?.highlight || DEFAULT_TEXT.highlight,
        description: slide?.description || DEFAULT_TEXT.description,
      }));
    }

    return [
      {
        image: FALLBACK_IMG,
        ...DEFAULT_TEXT,
      },
    ];
  }, [heroSlides]);

  const [current, setCurrent] = useState(0);

  const goTo = useCallback(
    (next) => {
      setCurrent((prev) => {
        const nextIndex = typeof next === "number" ? next : prev + next;
        const total = slides.length || 1;
        return ((nextIndex % total) + total) % total;
      });
    },
    [slides.length]
  );

  useEffect(() => {
    setCurrent(0);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return undefined;
    const timer = setInterval(() => goTo(current + 1), 7000);
    return () => clearInterval(timer);
  }, [current, goTo, slides.length]);

  const handleWheel = useCallback(
    (event) => {
      if (slides.length <= 1) return;
      if (Math.abs(event.deltaY) < 10) return;
      goTo(event.deltaY > 0 ? current + 1 : current - 1);
    },
    [current, goTo, slides.length]
  );

  const activeSlide = slides[current] || DEFAULT_TEXT;

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white"
      onWheel={handleWheel}
    >
      {/* Background slides */}
      <div className="absolute inset-0">
        {slides.map((slide, idx) => (
          <div
            key={`${slide.image}-${idx}`}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl xl:text-7xl font-bold mb-6 leading-tight">
            <span className="block">{activeSlide.title}</span>
            <span className="text-[#ff5b06] font-handwriting text-6xl xl:text-7xl block mt-2">
              {activeSlide.highlight}
            </span>
          </h1>
          <p className="text-lg xl:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            {activeSlide.description}
          </p>
        </div>
      </div>

      {/* Slide indicators at bottom of image */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center z-10">
        <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === current ? "w-10 bg-[#ff5b06]" : "w-3 bg-white/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation controls */}
      {slides.length > 1 && (
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-6 z-10 pointer-events-none">
          <button
            onClick={() => goTo(current - 1)}
            className="pointer-events-auto p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition text-white"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => goTo(current + 1)}
            className="pointer-events-auto p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition text-white"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
