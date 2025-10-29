import styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";

import Button from "../Button/Button";
import parseUrl from "../../../util/parseUrl";

function Tour({
  title,
  description,
  slug,
  className = "",
  type = "tours",
  btn = "Explore more",
  imgUrl,
  tag,
  ...props
}) {
  if (!imgUrl) {
    return null;
  }

  const url = type === "tours" ? `/creator/tour/${slug}` : `/${type}/${slug}`;

  return (
    <Link href={url} className={`${styles.tour} ${className}`}>
      <div className={styles.tourBg}>
        <Image src={parseUrl(imgUrl)} alt="Tour" width={600} height={760} />
      </div>

      <div className={styles.tourContent}>
        <div className={styles.tagBox}>
          <p>{tag}</p>
        </div>

        <div className={styles.tourContentMain}>
          <h4 className={styles.tourTitle}>{title}</h4>
          <p className={styles.tourDescription}>{description}</p>
          <Button type="block" className="fw">
            {btn}
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default Tour;
