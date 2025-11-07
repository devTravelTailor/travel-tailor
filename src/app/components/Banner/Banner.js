"use client";
import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";

import Button from "../CustomUI/Button/Button";

import parseTitle from "../../util/parseTitle";
import PopupForm from "../Popup/PopupForm";
import { usePopupTrigger } from "../../hooks/setPopupTrigger";

function Banner({
  title = "Dreaming of an Adventure? /nLet's Talk!",
  url = "/contact",
  imgUrl = "/images/banner.jpg",
  cta = "Enquire now",
  ...props
}) {
  const { handleOpenInstant, isVisible, handleClose, handleSuccess } =
    usePopupTrigger();
  return (
    <section className={styles.banner}>
      <Link className={styles.bannerBox} href={url}>
        <div className={styles.bannerBg}>
          <Image
            src={imgUrl}
            alt={title}
            width={1100}
            height={560}
            className={styles.bannerImg}
          />
        </div>
      </Link>

      <div className={styles.bannerContent}>
        <h4 className={styles.bannerTitle}>{parseTitle(title)}</h4>

        <button
          onClick={handleOpenInstant}
          className={`md ${styles.bannerBtn}`}
        >
          {cta}
        </button>
      </div>

      <PopupForm
        isVisible={isVisible}
        handleClose={handleClose}
        handleSuccess={handleSuccess}
      />
    </section>
  );
}

export default Banner;
