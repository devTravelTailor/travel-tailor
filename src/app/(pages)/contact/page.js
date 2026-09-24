"use client";
import React, { Suspense } from "react";
import Contact from "../../components/Form/Contact";
import StickyContact from "../../components/Form/StickyContact";
import styles from "./styles.module.css";

import Spinner from "../../components/CustomUI/Spinner/Spinner"; // still available if needed

const EnquiryPage = () => {
  return (
    <Suspense fallback={<div>Loading contact page...</div>}>
      <div className={styles.pageWrapper}>
        <h1 className="sr-only">Contact Us</h1>
        {/* Use a wrapper class */}
        <div className={styles.pageContainer}>
          {/* Use a container for max-width and padding */}
          <div className={styles.formColumn}>
            <Contact /> {/* Already has Suspense inside */}
          </div>
          <aside className={styles.stickyColumn}>
            <StickyContact />
          </aside>
        </div>
      </div>
    </Suspense>
  );
};

export default EnquiryPage;
