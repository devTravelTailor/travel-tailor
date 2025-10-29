'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.css';
import { usePopupTrigger } from '../../hooks/setPopupTrigger';

const PopupForm = () => {
  const { isVisible, handleClose, handleSuccess } = usePopupTrigger();

  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phoneNumber: '',
    requirement: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [submitMessage, setSubmitMessage] = useState('');

  // Country codes data (remains the same)
  const countryCodes = [
    { code: '+91', country: 'India' },
    { code: '+1', country: 'USA' },
    { code: '+44', country: 'UK' },
    { code: '+61', country: 'Australia' },
    { code: '+86', country: 'China' },
    { code: '+81', country: 'Japan' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
    { code: '+39', country: 'Italy' },
    { code: '+34', country: 'Spain' },
    { code: '+7', country: 'Russia' },
    { code: '+55', country: 'Brazil' },
    { code: '+27', country: 'South Africa' },
    { code: '+971', country: 'UAE' },
    { code: '+65', country: 'Singapore' },
  ];

  // Handle hydration for createPortal
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        handleSuccess();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [submitStatus, handleSuccess]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Contact number is required';
    } else if (!/^\d{7,15}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    if (formData.requirement.length > 900)
      newErrors.requirement = 'Requirement cannot exceed 900 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (submitStatus) {
      setSubmitStatus(null);
      setSubmitMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    try {
      const submitData = {
        name: formData.name,
        email: formData.email,
        contact: `${formData.countryCode} ${formData.phoneNumber}`,
        requirement: formData.requirement || '',
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
          body: JSON.stringify(submitData),
        },
      );

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(
          "Thank you! Your request has been submitted successfully. We'll get back to you shortly.",
        );
        setFormData({
          name: '',
          email: '',
          countryCode: '+91',
          phoneNumber: '',
          requirement: '',
        });
        // The useEffect for `submitStatus` will call handleSuccess() after 3 seconds.
      } else {
        let errorMessage = 'Something went wrong. Please try again.';
        if (response.status === 400)
          errorMessage = 'Invalid form data. Please check your inputs.';
        else if (response.status === 429)
          errorMessage = 'Too many requests. Please wait and try again.';
        else if (response.status >= 500)
          errorMessage = 'Server error. Please try again later.';
        setSubmitStatus('error');
        setSubmitMessage(errorMessage);
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isMounted || !isVisible) return null;

  const popupContent = (
    <div
      className={`${styles.overlay} ${isVisible ? styles.overlayVisible : ''}`}
      onClick={handleOverlayClick}>
      <div
        className={`${styles.popup} ${isVisible ? styles.popupVisible : ''}`}>
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label='Close popup'>
          &times;
        </button>

        <div className={styles.header}>
          <h2 className={styles.title}>Plan Your Trip</h2>
          <p className={styles.subtitle}>
            Fill in the details below and we&apos;ll get back to you shortly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {submitStatus && (
            <div className={`${styles.formMessage} ${styles[submitStatus]}`}>
              {submitMessage}
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Full Name <span className={styles.required}>*</span>
            </label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              className={`${styles.input} ${
                errors.name ? styles.inputError : ''
              }`}
              placeholder='Enter your full name'
              disabled={isSubmitting}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Email Address <span className={styles.required}>*</span>
            </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              className={`${styles.input} ${
                errors.email ? styles.inputError : ''
              }`}
              placeholder='Enter your email address'
              disabled={isSubmitting}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Contact Number <span className={styles.required}>*</span>
            </label>
            <div className={styles.phoneContainer}>
              <select
                name='countryCode'
                value={formData.countryCode}
                onChange={handleInputChange}
                className={styles.countrySelect}
                disabled={isSubmitting}>
                {countryCodes.map(({ code, country }) => (
                  <option key={code} value={code}>
                    {country} ({code})
                  </option>
                ))}
              </select>
              <input
                type='tel'
                name='phoneNumber'
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={`${styles.phoneInput} ${
                  errors.phoneNumber ? styles.inputError : ''
                }`}
                placeholder='Your phone number'
                disabled={isSubmitting}
              />
            </div>
            {errors.phoneNumber && (
              <span className={styles.error}>{errors.phoneNumber}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Requirement</label>
            <textarea
              name='requirement'
              value={formData.requirement}
              onChange={handleInputChange}
              className={`${styles.textarea} ${
                errors.requirement ? styles.inputError : ''
              }`}
              placeholder='Tell us about your travel requirements...'
              rows={4}
              maxLength={900}
              disabled={isSubmitting}
            />
            <div className={styles.characterCount}>
              {formData.requirement.length}/900 characters
            </div>
            {errors.requirement && (
              <span className={styles.error}>{errors.requirement}</span>
            )}
          </div>

          <button
            type='submit'
            disabled={isSubmitting || submitStatus === 'success'}
            className={`${styles.submitButton} ${
              isSubmitting ? styles.submitting : ''
            } ${submitStatus === 'success' ? styles.success : ''}`}>
            {isSubmitting ? (
              <>
                {' '}
                <span className={styles.spinner}></span> Submitting...{' '}
              </>
            ) : submitStatus === 'success' ? (
              <>
                {' '}
                <span className={styles.checkmark}>✓</span> Submitted{' '}
              </>
            ) : (
              'Submit Request'
            )}
          </button>
        </form>
      </div>
    </div>
  );

  return createPortal(popupContent, document.body);
};

export default PopupForm;
