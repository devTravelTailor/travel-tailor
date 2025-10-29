// components/StickyContact/StickyContact
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

const PhoneIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);
const ClockIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const StickyContact = () => {
  const [contact, setContact] = useState(null);
  useEffect(() => {
    async function fetchContact() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/settings`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
          }
        );
        const { data } = await response.json();
        console.log(data.footerContact);
        setContact(data.footerContact);
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    }

    fetchContact();
  }, []);
  return (
    <div className={styles.stickyContainer}>
      <div className={styles.contactSection}>
        <span className={styles.iconWrapper}>
          <PhoneIcon />
        </span>
        <h3 className={styles.title}>CALL US TODAY</h3>
        <a href={`tel: ${contact?.contact1}`} className={styles.phoneNumber}>
          {contact?.contact1}
        </a>
        <p className={styles.subText}>Call us today until 10pm</p>
      </div>

      <hr className={styles.divider} />

      <div className={styles.contactSection}>
        <span className={styles.iconWrapper}>
          <ClockIcon />
        </span>
        <h3 className={styles.title}>OFFICE HOURS</h3>
        <ul className={styles.hoursList}>
          <li>Monday: 9am - 10pm</li>
          <li>Tuesday: 9am - 10pm</li>
          <li>Wednesday: 9am - 10pm</li>
          <li>Thursday: 9am - 10pm</li>
          <li>Friday: 9am - 10pm</li>
          <li>Saturday: Closed</li>
          <li>Sunday: Closed</li>
        </ul>
        <p className={styles.subText}>(excluding national holidays)</p>
      </div>
    </div>
  );
};

export default StickyContact;
