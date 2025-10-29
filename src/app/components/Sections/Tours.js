"use client";

import styles from "./styles.module.css";
import { useRef } from "react";

import SectionTitle from "../CustomUI/SectionTitle/SectionTitle";
import Tour from "../CustomUI/Card/Tour";
import ScrollNav from "../CustomUI/Button/ScrollNav";

function Tours({
  tours,
  className = "",
  heading = {
    title: "Explore /n similer /strips\\s",
    description: "You might be interested in these other tours",
  },
  ...props
}) {
  const toursRef = useRef(null);

  console.log("tours", tours);

  return (
    <>
      {tours && tours.length > 0 && (
        <section className={styles.tours}>
          <div className={styles.toursBox}>
            <SectionTitle
              title={heading.title}
              description={heading.description}
              className={styles.toursTitle}
              variant="center"
            />

            <div className={styles.toursContent}>
              <div className={styles.toursList} ref={toursRef}>
                {tours.map((tour, index) => (
                  <Tour
                    key={index}
                    slug={tour?.slug}
                    type="tours"
                    title={tour?.title}
                    description={tour?.description}
                    imgUrl={tour?.heroImg}
                    tag={`${tour?.details?.totalDays} Days`}
                    className={styles.tourItem}
                  />
                ))}
              </div>

              <ScrollNav scrollRef={toursRef} className={styles.scrollNav} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Tours;
