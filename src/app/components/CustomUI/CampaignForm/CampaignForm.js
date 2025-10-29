"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Spinner from "../Spinner/Spinner";

const CampaignForm = () => {
  const searchParams = useSearchParams();
  const src = searchParams.get("src");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    travelDate: "",
    destinations: "",
    needHelp: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formMessage, setFormMessage] = useState({ type: "", text: "" });

  const countryCodes = [
    { code: "+91", name: "India (+91)" },
    { code: "+44", name: "UK (+44)" },
    { code: "+1", name: "USA (+1)" },
    { code: "+61", name: "AUS (+61)" },
    { code: "+1", name: "Canada (+1)" },
  ];

  const travelTimeOptions = [
    { value: "", label: "Select your travel timeline" },
    { value: "not-decided", label: "Not Decided Yet" },
    { value: "asap", label: "ASAP" },
    { value: "within-month", label: "Within a Month" },
    { value: "within-2-3-months", label: "Within 2-3 Months" },
    { value: "after-3-months", label: "After 3 Months" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email address.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!/^\d+$/.test(formData.phone))
      newErrors.phone = "Please enter a valid phone number (digits only).";

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;

    if (!isValid) {
      requestAnimationFrame(() => {
        const firstErrorKey = Object.keys(newErrors)[0];
        const firstErrorField = document.querySelector(
          `[name="${firstErrorKey}"]`
        );
        firstErrorField?.focus();
      });
    }
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage({ type: "", text: "" });

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    const source = src ? src : "Campaign";
    const apiData = {
      name: formData.name,
      email: formData.email,
      contact: formData.countryCode + formData.phone,
      travelDate: formData.travelDate,
      needsHelp: formData.needHelp,
      destinations: formData.destinations,
      source: source,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/campaignforms`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
          body: JSON.stringify(apiData),
        }
      );

      if (response.ok) {
        setFormMessage({
          type: "success",
          text: "Thank you! We will be in touch soon.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          countryCode: "+91",
          travelDate: "",
          destinations: "",
          needHelp: "",
        });
        setErrors({});
      } else {
        let errorText = "An error occurred. Please try again.";
        try {
          const errorData = await response.json();
          errorText = errorData.message || errorText;
        } catch (_) {}
        setFormMessage({ type: "error", text: errorText });
      }
    } catch (error) {
      setFormMessage({
        type: "error",
        text: "Network error. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Suspense fallback={<Spinner />}>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <h2 className={styles.formTitle}>Get Started</h2>
        <p className={styles.formSubtitle}>
          Fill in your details and we&#39;ll help you plan your perfect trip.
        </p>

        <div className={styles.formGrid}>
          <div className={`${styles.formGroup} ${styles.span2}`}>
            <label htmlFor="name" className={styles.label}>
              Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`${styles.input} ${
                errors.name ? styles.inputError : ""
              }`}
              required
              aria-describedby="name-error"
            />
            {errors.name && (
              <p id="name-error" className={styles.errorMessage}>
                {errors.name}
              </p>
            )}
          </div>

          <div className={`${styles.formGroup} ${styles.span2}`}>
            <label htmlFor="email" className={styles.label}>
              Email ID <span className={styles.required}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`${styles.input} ${
                errors.email ? styles.inputError : ""
              }`}
              required
              aria-describedby="email-error"
            />
            {errors.email && (
              <p id="email-error" className={styles.errorMessage}>
                {errors.email}
              </p>
            )}
          </div>

          <div className={`${styles.formGroup} ${styles.span2}`}>
            <label htmlFor="phone" className={styles.label}>
              Phone Number <span className={styles.required}>*</span>
            </label>
            <div className={styles.inputGroup}>
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleInputChange}
                className={`${styles.select} ${styles.countryCodeSelect}`}
                aria-label="Country Code"
              >
                {countryCodes.map((c) => (
                  <option key={c.name} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`${styles.input} ${styles.contactInput} ${
                  errors.phone ? styles.inputError : ""
                }`}
                required
                placeholder="Your phone number"
                aria-describedby="phone-error"
              />
            </div>
            {errors.phone && (
              <p id="phone-error" className={styles.errorMessage}>
                {errors.phone}
              </p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="travelDate" className={styles.label}>
              Tentative Travel Date
            </label>
            <select
              id="travelDate"
              name="travelDate"
              value={formData.travelDate}
              onChange={handleInputChange}
              className={`${styles.input} ${styles.travelDateSelect}`}
            >
              {travelTimeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="destinations" className={styles.label}>
              Destinations you are looking at
              {/* <span className={styles.subLabel}>You can add multiple destination options that you are exploring</span> */}
            </label>
            <input
              type="text"
              id="destinations"
              name="destinations"
              value={formData.destinations}
              onChange={handleInputChange}
              placeholder="e.g., Maldives, Italy, Safari"
              className={styles.input}
            />
          </div>

          <div className={`${styles.formGroup} ${styles.span2}`}>
            <label className={styles.label}>
              Do you need help deciding on a destination?
            </label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="needHelp"
                  value="yes"
                  checked={formData.needHelp === "yes"}
                  onChange={handleInputChange}
                  className={styles.radio}
                />
                Yes, I need help
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="needHelp"
                  value="no"
                  checked={formData.needHelp === "no"}
                  onChange={handleInputChange}
                  className={styles.radio}
                />
                No, I have decided
              </label>
            </div>
          </div>
        </div>

        <div className={styles.submitContainer}>
          <button
            type="submit"
            className={`btn color ${styles.submitButton}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner />
                <span style={{ marginLeft: "8px" }}>Sending...</span>
              </>
            ) : (
              "Get a call back from our experts"
            )}
          </button>
        </div>

        {formMessage.text && (
          <div className={`${styles.formMessage} ${styles[formMessage.type]}`}>
            {formMessage.text}
          </div>
        )}
      </form>
    </Suspense>
  );
};

export default CampaignForm;
