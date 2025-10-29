import styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";
import parseUrl from "../../../util/parseUrl";

import Button from "../Button/Button";

function Preview({
  title,
  description,
  imgUrl,
  className = "",
  url,
  btn = "Read more",
  ...props
}) {
  if (!imgUrl) {
    return null;
  }

  // console.log("url", url);

  return (
    <Link className={`${className} ${styles.preview}`} href={url}>
      <div className={styles.previewImgBox}>
        <Image src={parseUrl(imgUrl)} alt={title} width={500} height={660} />
      </div>

      <div className={styles.previewInfo}>
        <div className={styles.previewContent}>
          <h4 className={styles.previewTitle}>{title}</h4>
          <p className={styles.previewDescription}>{description}</p>
        </div>

        <Button varient="outline" className="fw" type="block">
          {btn}
        </Button>
      </div>
    </Link>
  );
}

export default Preview;
