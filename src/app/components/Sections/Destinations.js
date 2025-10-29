"use client";

import styles from "./styles.module.css";
import { useRef } from "react";

import SectionTitle from "../CustomUI/SectionTitle/SectionTitle";
import Tour from "../CustomUI/Card/Tour";
import ScrollNav from "../CustomUI/Button/ScrollNav";
import parsePrice from "../../util/parsePrice";

function Destinations({
  destinations = [
    {
      slug: "maldives",
      title: "Maldives",
      description: "Turquoise waters, luxury resorts, vibrant coral reefs",
      imgUrl:
        "/uploads/francesco_ungaro_0_F_Bp_Qa47_S0_unsplash_d6416a21ce.jpg",
      tag: "20000",
    },
    {
      slug: "serengeti-national-park",
      title: "Serengeti National Park",
      description: "Endless plains, Great Migration, diverse wildlife",
      imgUrl: "/uploads/srivatsan_balaji_dz42hvd61_BE_unsplash_dd7cf8970a.jpg",
      tag: "22222",
    },
  ],
  className = "",
  heading = {
    title: "Popular Destinations",
    description: "Discover amazing places around the world",
  },
  ...props
}) {
  const destinationsRef = useRef(null);

  console.log(destinations, "destinations");

  return (
    <section className={styles.destinations}>
      <div className={styles.destinationsBox}>
        <SectionTitle
          title={heading.title}
          description={heading.description}
          className={styles.destinationsTitle}
          variant="center"
        />

        <div className={styles.destinationsContent}>
          <div className={styles.destinationsList} ref={destinationsRef}>
            {destinations.map((destination, index) => (
              <Tour
                key={index}
                slug={destination.slug}
                type="destinations"
                title={destination.title}
                description={destination.description}
                imgUrl={destination.imgUrl}
                tag={`Starting from ${parsePrice(destination.tag)}`}
                className={styles.destinationItem}
              />
            ))}
          </div>

          <ScrollNav scrollRef={destinationsRef} className={styles.scrollNav} />
        </div>
      </div>
    </section>
  );
}

export default Destinations;
