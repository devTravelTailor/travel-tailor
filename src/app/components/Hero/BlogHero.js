import styles from "./styles.module.css";
import Image from "next/image";

import parseUrl from "../../util/parseUrl";

function BlogHero({ imgUrl, title, description, auther, date }) {
  return (
    <section className={styles.blogHero}>
      <div className={styles.blogHeroBox}>
        <header className={styles.blogHeroHeader}>
          <h1 className={styles.blogHeroTitle}>{title}</h1>
          <p className={styles.blogHeroDescription}>{description}</p>
        </header>

        {imgUrl && (
          <div className={styles.blogHeroContent}>
            <div className={styles.blogHeroBg}>
              <Image
                src={parseUrl(imgUrl)}
                alt="Blog Hero Background"
                width={1000}
                height={500}
              />
            </div>

            <div className={styles.bhText}>
              <div className={styles.bhBox}>
                <p>Written by</p>
                <p>{auther}</p>
              </div>

              <div className={styles.bhBox}>
                <p>Published on</p>
                {/* converting date to format like 17 May 2023 */}
                <p>
                  {new Date(date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default BlogHero;
