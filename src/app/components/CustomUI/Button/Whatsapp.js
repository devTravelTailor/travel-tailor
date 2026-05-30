"use client";

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./whatsapp.module.css";
import Image from "next/image";

const WhatsAppIcon = () => (
  <Image
    className={styles.whatsAppIcon}
    src="/images/whatsapp.png"
    width={44}
    height={44}
    alt="WhatsApp Icon"
  />
);

const WhatsAppButton = ({
  phoneNumber,
  position = "right",
  tooltip = "Chat on WhatsApp",
  message = "",
}) => {
  const [showChat, setShowChat] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChat(true);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

  if (!cleanedPhoneNumber) {
    console.error("WhatsAppButton: Invalid or missing phone number.");
    return null;
  }

  const whatsappUrl = `https://wa.me/${cleanedPhoneNumber}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

  return (
    <a
      href={whatsappUrl}
      className={`${styles.whatsAppButton} ${styles.sticky} ${
        position === "left" ? styles.left : styles.right
      }`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={tooltip}
      title={tooltip}
    >
      <div
        className={`${styles.chatButton} ${showChat ? styles.animate : ""}`}
      >
        <span>How can we help you?</span>
      </div>
      {/* <audio id="pop" src="/audio/chat.mp3" preload="auto"></audio> */}
      <WhatsAppIcon />
    </a>
  );
};

WhatsAppButton.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  position: PropTypes.oneOf(["left", "right"]),
  tooltip: PropTypes.string,
  message: PropTypes.string,
};

export default WhatsAppButton;
