"use client";

import styles from "./styles.module.css";
import { useRef } from "react";

import SectionTitle from "../CustomUI/SectionTitle/SectionTitle";
import Preview from "../CustomUI/Card/Preview";
import ScrollNav from "../CustomUI/Button/ScrollNav";

function Blogs({
  blogs = [],
  className = "",
  heading = {
    title: "More to /s read \\s",
    description:
      "We have a few blogs post you might like to read about travelling, travelling tips, and more.",
  },
  ...props
}) {
  const blogsRef = useRef(null);

  if (!blogs || blogs.length === 0 || !blogsRef) {
    return null;
  }

  console.log("blogs", blogs);

  return (
    <section className={styles.featuredBlogs}>
      <div className={styles.blogsBox}>
        <SectionTitle
          title={heading.title}
          description={heading.description}
          className={styles.blogsTitle}
          variant="center"
        />

        <div className={styles.blogsContent}>
          <div className={styles.blogs} ref={blogsRef}>
            {blogs.map((blog, index) => (
              <Preview
                key={index}
                url={`/blogs/${blog.slug}`}
                title={blog.title}
                description={blog.description}
                imgUrl={blog.displayImg}
                className={styles.blogItem}
                btn="Read more"
              />
            ))}
          </div>

          <ScrollNav scrollRef={blogsRef} className={styles.scrollNav} />
        </div>
      </div>
    </section>
  );
}

export default Blogs;
