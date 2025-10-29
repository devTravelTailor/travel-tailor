"use client";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./styles.module.css";
import Preview from "../CustomUI/Card/Preview";

const ITEMS_PER_PAGE = 4;

const BlogGridSection = ({
  url = "/creator",
  allUrl = "/creator",
  title,
  description,
  data,
  visibleCount,
  setVisibleCount,
  className = "",
  CardComponent,
  type,
}) => {
  const isExpanded = visibleCount >= data?.length;
  const router = useRouter();
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <span>{title.split(" ")[0]}</span> {title.split(" ").slice(1).join(" ")}
      </h2>

      {description && (
        <p className={styles.sectionDescription}>{description}</p>
      )}
      <div
        className={
          styles.gridWrapper + ` justify-evenly w-full  max-w-[90rem] mx-auto `
        }
      >
        {data?.slice(0, visibleCount).map((item, index) => (
          <div
            key={index}
            className={type === "blogs" ? styles.blogItem : styles.gridItem}
          >
            <Preview
              description={item.description}
              imgUrl={item.heroImg || item.displayImg}
              title={item.title}
              url={`${url}/${item.slug}`}
              id={item._id}
              type={type}
              className={type === "blogs" ? styles.creatorBlogs : className}
            />
          </div>
        ))}
      </div>

      {data?.length && (
        <div className={styles.centerBtn}>
          <button
            className={styles.customButton}
            onClick={() => router.push(allUrl)}
          >
            {"Show More"}
          </button>
        </div>
      )}
    </section>
  );
};

export default BlogGridSection;
