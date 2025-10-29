"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import SectionTitle from "../CustomUI/SectionTitle/SectionTitle";
import Testimonial from "../CustomUI/Card/Testimonial";

export default function InfiniteTestimonials({
  reviews = [],
  title = "/sTraveller's\\s Picks",
  description = "More than just tours, we create memories. Browse through genuine moments of joy, wonder, and connection shared by our past travelers.",
}) {
  // Duplicate the reviews to create an infinite loop illusion
  const loopedReviews = useMemo(() => [...reviews, ...reviews], [reviews]);

  return (
    <section className="relative  overflow-hidden bg-white dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <SectionTitle
          title={title}
          description={description}
          variant="center"
        />
      </div>

      <div className="relative mt-10 overflow-hidden">
        {/* Infinite scrolling wrapper */}
        <motion.div
          className="flex gap-6 px-6"
          animate={{
            x: ["0%", "-50%"], // move half the width (since duplicated)
          }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30, // adjust speed (higher = slower)
          }}
        >
          {loopedReviews.map((review, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[300px] md:w-[360px] bg-transparent  rounded-2xl  "
            >
              <Testimonial
                name={review.name}
                source={review.source}
                review={review.review}
                imgUrl={review.img}
                place={review.place}
                date={review.date}
                travelType={review.travelType}
              />
            </div>
          ))}
        </motion.div>

        {/* Gradient fade edges for polish */}
        <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-white dark:from-neutral-900 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-white dark:from-neutral-900 to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
}
