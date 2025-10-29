"use client";

import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import Spinner from "../CustomUI/Spinner/Spinner";

const Contact = () => {
  // Wrap serchParams in Suspense to prevent SSR errors
  const searchParams = useSearchParams();
  const src = searchParams.get("src");

  // ... (useState, handlers, validation logic - ALL SAME AS BEFORE) ...
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    countryCode: "+91", // Default country code
    destination: "",
    month: "",
    year: "",
    duration: "",
    people: "",
    budget: 3000, // Default starting budget
    comment: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formMessage, setFormMessage] = useState({ type: "", text: "" });
  const [budgetDisplay, setBudgetDisplay] = useState("₹10,000"); // For displaying the slider value

  // Budget slider settings
  const minBudget = 10000;
  const maxBudget = 100000;

  // Helper for country codes (expand as needed)
  const countryCodes = [
    { code: "+91", name: "India (+91)" },
    { code: "+44", name: "UK (+44)" },
    { code: "+1", name: "USA (+1)" },
    { code: "+61", name: "AUS (+61)" },
    { code: "+244", name: "Canada (+244)" },
  ];

  // Helper for months
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Helper for years (dynamic range)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 4 }, (_, i) => currentYear + i);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleBudgetChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setFormData({ ...formData, budget: value });
    if (value === maxBudget) {
      setBudgetDisplay(`₹${value.toLocaleString()}+`);
    } else {
      setBudgetDisplay(`₹${value.toLocaleString()}`);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!formData.contact.trim())
      newErrors.contact = "Contact number is required.";
    else if (!/^\d+$/.test(formData.contact))
      newErrors.contact = "Please enter a valid phone number (digits only).";
    if (!formData.duration.trim())
      newErrors.duration = "Trip duration is required.";
    if (!formData.people || parseInt(formData.people, 10) < 1)
      newErrors.people = "Please specify at least one traveller.";

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    if (!isValid) {
      // Focus first error field
      // Use requestAnimationFrame to ensure DOM update before focusing
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

    // check ?src=website based on router
    const source = src ? src : "Website";
    const apiData = {
      ...formData,
      comment: `${formData.comment}`,
      source: source,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lead`,
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
          contact: "",
          countryCode: "+91",
          destination: "",
          month: "",
          year: "",
          duration: "",
          people: "",
          budget: 3000,
          comment: "",
        });
        setBudgetDisplay(`₹${minBudget.toLocaleString()}`);
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

  // --- The return JSX remains the same, but ensure the button uses the correct global class ---
  return (
    <Suspense fallback={<Spinner />}>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <h2 className={styles.formTitle}>Plan Your Trip</h2>
        <p className={styles.formSubtitle}>
          Fill in the details below and we&#39;ll get back to you shortly.
        </p>
        {/* {formMessage.text && (
         <div className={`${styles.formMessage} ${styles[formMessage.type]}`}>
           {formMessage.text}
         </div>
       )} */}
        <div className={styles.formGrid}>
          {/* Full Name */}
          <div className={`${styles.formGroup} ${styles.span2}`}>
            <label htmlFor="name" className={styles.label}>
              Full Name <span className={styles.required}>*</span>
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

          {/* Email Address */}
          <div className={`${styles.formGroup} ${styles.span2}`}>
            <label htmlFor="email" className={styles.label}>
              Email Address
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
              aria-describedby="email-error"
            />
            {errors.email && (
              <p id="email-error" className={styles.errorMessage}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Contact Number */}
          <div className={`${styles.formGroup} ${styles.span2}`}>
            <label htmlFor="contact" className={styles.label}>
              Contact Number <span className={styles.required}>*</span>
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
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className={`${styles.input} ${styles.contactInput} ${
                  errors.contact ? styles.inputError : ""
                }`}
                required
                placeholder="Your phone number"
                aria-describedby="contact-error"
              />
            </div>
            {errors.contact && (
              <p id="contact-error" className={styles.errorMessage}>
                {errors.contact}
              </p>
            )}
          </div>

          {/* Destination */}
          <div className={`${styles.formGroup} ${styles.span2}`}>
            <label htmlFor="destination" className={styles.label}>
              Where would you like to go?{" "}
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              placeholder="e.g., Maldives, Italy, Safari"
              className={`${styles.input} ${
                errors.destination ? styles.inputError : ""
              }`}
              aria-describedby="destination-error"
            />
            {errors.destination && (
              <p id="destination-error" className={styles.errorMessage}>
                {errors.destination}
              </p>
            )}
          </div>

          {/* Travel Dates */}
          <div className={styles.formGroup}>
            <label htmlFor="month" className={styles.label}>
              Preferred Month
            </label>
            <select
              id="month"
              name="month"
              value={formData.month}
              onChange={handleInputChange}
              className={styles.select}
            >
              <option value="">Select month</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="year" className={styles.label}>
              Preferred Year
            </label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className={styles.select}
            >
              <option value="">Select year</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div className={styles.formGroup}>
            <label htmlFor="duration" className={styles.label}>
              How long for? <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              placeholder="e.g., 7 nights"
              className={`${styles.input} ${
                errors.duration ? styles.inputError : ""
              }`}
              required
              aria-describedby="duration-error"
            />
            {errors.duration && (
              <p id="duration-error" className={styles.errorMessage}>
                {errors.duration}
              </p>
            )}
          </div>

          {/* Number of People */}
          <div className={styles.formGroup}>
            <label htmlFor="people" className={styles.label}>
              How many people? <span className={styles.required}>*</span>
            </label>
            <input
              type="number"
              id="people"
              name="people"
              value={formData.people}
              onChange={handleInputChange}
              min="1"
              placeholder="e.g., 2"
              className={`${styles.input} ${
                errors.people ? styles.inputError : ""
              }`}
              required
              aria-describedby="people-error"
            />
            {errors.people && (
              <p id="people-error" className={styles.errorMessage}>
                {errors.people}
              </p>
            )}
          </div>

          {/* Budget Per Person */}
          <div className={`${styles.formGroup} ${styles.span2}`}>
            <label htmlFor="budget" className={styles.label}>
              Indicative budget per person ({budgetDisplay})
            </label>
            <input
              type="range"
              id="budget"
              name="budget"
              min={minBudget}
              max={maxBudget}
              step="500"
              value={formData.budget}
              onChange={handleBudgetChange}
              className={styles.slider}
            />
            <div className={styles.rangeLabels}>
              <span>₹{minBudget?.toLocaleString()}</span>
              <span>₹{maxBudget?.toLocaleString()}+</span>
            </div>
          </div>

          {/* Comments */}
          <div className={`${styles.formGroup} ${styles.span2}`}>
            <label htmlFor="comment" className={styles.label}>
              Any other comments or requests?
            </label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              rows="4"
              placeholder="Tell us more..."
              className={styles.textarea}
            ></textarea>
          </div>
        </div>{" "}
        {/* End formGrid */}
        <div className={styles.submitContainer}>
          {/* Make sure to use the correct global btn class */}
          <button
            type="submit"
            className={`btn color ${styles.submitButton}`} // Using global .btn and .color classes
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner /> {/* Use CSS spinner */}
                <span style={{ marginLeft: "8px" }}>Sending...</span>
              </>
            ) : (
              "Send Enquiry"
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

export default Contact;
