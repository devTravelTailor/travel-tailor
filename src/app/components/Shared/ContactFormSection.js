'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

/**
 * ContactFormSection
 * ─────────────────────────────────────────────────────────────────────────────
 * Shared CTA contact-form section rendered at the bottom of Experience,
 * Destination, and Tour detail pages.
 *
 * Props
 * ─────
 * @param {string} [heading]        – Override the left-panel headline (optional)
 * @param {string} [subtext]        – Override the left-panel body copy (optional)
 * @param {string} [tagline]        – Override the left-panel italic tagline (optional)
 * @param {string} [source]         – Pre-fills the "Where are you thinking of going?"
 *                                    field with the page slug / destination name.
 * @param {string} [buttonLabel]    – Override the submit button label (optional)
 *
 * Usage
 * ─────
 * import ContactFormSection from '@/app/components/Shared/ContactFormSection';
 * <ContactFormSection source={slug} />
 */

const DEFAULT_FIELDS = [
  { name: 'name', label: 'YOUR NAME', type: 'text', placeholder: 'E.g. Alex' },
  { name: 'email', label: 'EMAIL ADDRESS', type: 'email', placeholder: 'name@domain.com' },
  { name: 'phone', label: 'PHONE / WHATSAPP', type: 'tel', placeholder: '+91 00000 00000' },
  { name: 'destination', label: 'WHERE ARE YOU THINKING OF GOING?', type: 'text', placeholder: 'E.g. Japan, China ...' },
  { name: 'when', label: 'WHEN', type: 'text', placeholder: 'E.g. September, August....' },
  { name: 'message', label: 'ANYTHING ELSE?', type: 'text', placeholder: "Specific interests, requirements, or just the vibe you're after..." },
];

function formatSourceText(value = '') {
  const raw = String(value || '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!raw) return '';

  return raw
    .split(' ')
    .filter(Boolean)
    .map((word) =>
      word
        .split("'")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join("'"),
    )
    .join(' ');
}

export default function ContactFormSection({
  heading,
  headingStyle,
  subtext,
  tagline,
  source = '',
  sourceType = 'contact',
  destinationId = '',
  destinationSlug = '',
  destinationName = '',
  tourId = '',
  tourSlug = '',
  tourName = '',
  buttonLabel = 'START THE CONVERSATION',
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: formatSourceText(source),
    when: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  const [submittedSummary, setSubmittedSummary] = useState({
    destination: '',
    when: '',
    phone: '',
  });

  const originalUrlRef = useRef('');
  const thankYouUrlAppliedRef = useRef(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      destination: formatSourceText(source),
    }));
  }, [source]);

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      destination: formatSourceText(source),
      when: '',
      message: '',
    });
  };

  const restoreThankYouUrl = () => {
    if (
      typeof window === 'undefined' ||
      !thankYouUrlAppliedRef.current ||
      !originalUrlRef.current
    ) {
      return;
    }

    window.history.replaceState(window.history.state, '', originalUrlRef.current);
    thankYouUrlAppliedRef.current = false;
    originalUrlRef.current = '';
  };

  const applyThankYouUrl = () => {
    if (typeof window === 'undefined' || thankYouUrlAppliedRef.current) {
      return;
    }

    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const normalizedPath = window.location.pathname.endsWith('/')
      ? window.location.pathname.slice(0, -1)
      : window.location.pathname;

    originalUrlRef.current = currentUrl;
    window.history.pushState(
      window.history.state,
      '',
      `${normalizedPath}/thankyou${window.location.search}${window.location.hash}`,
    );
    thankYouUrlAppliedRef.current = true;
  };

  const getThankYouPageRoute = () => {
    if (typeof window === 'undefined') return '';

    const normalizedPath = window.location.pathname.endsWith('/')
      ? window.location.pathname.slice(0, -1)
      : window.location.pathname;

    return `${normalizedPath}/thankyou${window.location.search}${window.location.hash}`;
  };

  useEffect(() => {
    if (showThankYou) {
      applyThankYouUrl();
      return;
    }

    restoreThankYouUrl();
  }, [showThankYou]);

  useEffect(() => () => restoreThankYouUrl(), []);

  function validate() {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Your name is required.';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) errs.phone = 'Phone / WhatsApp is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  function closeThankYou() {
    setShowThankYou(false);
    restoreThankYouUrl();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);
    setStatusMessage('');

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
        sourceType,
        sourcePage: source || '',
        pageRoute: getThankYouPageRoute(),
        destinationId: sourceType === 'destination' ? destinationId : '',
        destinationSlug:
          sourceType === 'destination' ? destinationSlug || source || '' : '',
        destinationName:
          sourceType === 'destination'
            ? destinationName || formData.destination || ''
            : '',
        tourId: sourceType === 'tour' ? tourId : '',
        tourSlug: sourceType === 'tour' ? tourSlug || source || '' : '',
        tourName:
          sourceType === 'tour' ? tourName || formData.destination || '' : '',
        requirement:
          [
            formData.destination && `Destination: ${formData.destination}`,
            formData.when && `When: ${formData.when}`,
            formData.message && formData.message,
          ]
            .filter(Boolean)
            .join('\n') || '',
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
          body: JSON.stringify(payload),
        },
      );

      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage("Thank you! We'll be in touch within 24 hours.");
        setSubmittedSummary({
          destination: formData.destination || formatSourceText(source),
          when: formData.when,
          phone: formData.phone,
        });
        resetForm();
        setShowThankYou(true);
      } else {
        const code = response.status;
        setSubmitStatus('error');
        setStatusMessage(
          code === 400 ? 'Invalid details - please double-check your entries.' :
            code === 429 ? 'Too many requests. Please try again in a moment.' :
              code >= 500 ? 'Server error. Please try again shortly.' :
                'Something went wrong. Please try again.',
        );
      }
    } catch {
      setSubmitStatus('error');
      setStatusMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section
        id='contact-form'
        className='w-full px-4 md:px-6 lg:px-8 py-8 md:py-12'
      >
        <div className='max-w-[1780px] mx-auto overflow-hidden rounded-[34px] md:rounded-[40px] border border-[#e7b29d]/55 bg-[#df5226] text-white shadow-[0_28px_80px_rgba(127,49,18,0.18)] grid grid-cols-1 lg:grid-cols-2 w-full min-h-[700px]'>
          <div className='p-8 sm:p-12 lg:p-24 xl:px-32 xl:py-24 flex flex-col justify-start border-b lg:border-b-0 lg:border-r border-white/20'>
            <h2
              style={headingStyle || { fontFamily: 'var(--font-heading)' }}
              className='text-[28px] sm:text-[34px] md:text-[44px] lg:text-[58px] font-extrabold tracking-tighter leading-[1.02] mb-8 md:mb-12 max-w-[600px]'
            >
              {heading || (
                <>
                  This starts with a c<em className='text-white mr-0'>O</em>
                  nversation,
                  <br />
                  not a form.
                </>
              )}
            </h2>

            <p className='text-white/90 text-base md:text-xl mb-12 md:mb-16 max-w-[420px] font-medium leading-relaxed'>
              {subtext || "Tell us where your head is at. We'll build the rest of the map with you."}
            </p>

            <p className='text-white text-base md:text-xl font-medium italic'>
              {tagline || "Let's create something bespoke."}
            </p>
          </div>

          <div className='p-8 sm:p-12 lg:p-24 xl:px-32 xl:py-24 flex flex-col justify-start w-full max-w-full'>
            {submitStatus === 'error' && (
              <div className='mb-6 px-5 py-4 rounded-xl text-sm font-medium bg-red-800/40 text-red-100 border border-red-300/30'>
                {statusMessage}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
              className='flex flex-col gap-6 md:gap-8 w-full max-w-[600px]'
            >
              {DEFAULT_FIELDS.map(({ name, label, type, placeholder }) => (
                <div key={name} className='w-full'>
                  <label
                    htmlFor={`ctaform-${name}`}
                    style={{ fontFamily: 'var(--font-heading)' }}
                    className='text-xs md:text-sm font-semibold tracking-[0.15em] uppercase text-white mb-3 block'
                  >
                    {label}
                    {['name', 'email', 'phone'].includes(name) && (
                      <span className='text-white ml-1'>*</span>
                    )}
                  </label>

                  <input
                    id={`ctaform-${name}`}
                    name={name}
                    type={type}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    disabled={isSubmitting}
                    className={`w-full bg-transparent border-b pb-3 md:pb-4 text-white placeholder-white/65 outline-none transition-colors text-base md:text-lg font-medium ${errors[name]
                      ? 'border-red-300'
                      : 'border-white/35 focus:border-white'
                      }`}
                  />

                  {errors[name] && (
                    <p className='mt-1 text-xs text-red-200'>{errors[name]}</p>
                  )}
                </div>
              ))}

              <div className='pt-4'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  style={{ fontFamily: 'var(--font-heading)' }}
                  className='bg-white text-[#df5226] font-bold text-xs md:text-sm uppercase tracking-[0.1em] px-10 py-4 md:py-5 rounded-full hover:bg-gray-100 transition-colors w-max block disabled:opacity-60 disabled:cursor-not-allowed'
                >
                  {isSubmitting ? 'SENDING...' : buttonLabel}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Dialog open={showThankYou} onOpenChange={(open) => !open && closeThankYou()}>
        <DialogContent className='sm:max-w-lg border-0 bg-gradient-to-br from-orange-50 via-white to-amber-50 p-0 shadow-2xl overflow-hidden'>
          <div className='relative px-6 py-8 sm:px-8 sm:py-10 text-center'>
            <div className='absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#df5226] via-orange-400 to-amber-400' />
            <div className='mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#df5226]/10 animate-in zoom-in-50 duration-500'>
              <CheckCircle2 className='h-11 w-11 text-[#df5226]' />
            </div>
            <DialogHeader className='items-center text-center'>
              <DialogTitle className='text-2xl sm:text-3xl font-bold text-gray-900 animate-in slide-in-from-bottom-2 duration-500'>
                Thank You!
              </DialogTitle>
              <DialogDescription className='max-w-md text-sm sm:text-base leading-relaxed text-gray-600 animate-in slide-in-from-bottom-3 duration-700'>
                {statusMessage || "Thank you! We'll be in touch within 24 hours."}
              </DialogDescription>
            </DialogHeader>
            <div className='mt-6 rounded-2xl border border-orange-100 bg-white/80 p-4 text-left shadow-sm animate-in slide-in-from-bottom-4 duration-700'>
              <div className='flex items-center justify-between text-sm gap-4'>
                <span className='text-gray-500'>Destination</span>
                <span className='font-medium text-gray-900 text-right'>
                  {submittedSummary.destination || formatSourceText(source) || 'To be discussed'}
                </span>
              </div>
              <div className='mt-3 flex items-center justify-between text-sm gap-4'>
                <span className='text-gray-500'>When</span>
                <span className='font-medium text-gray-900 text-right'>
                  {submittedSummary.when || 'To be discussed'}
                </span>
              </div>
              <div className='mt-3 flex items-center justify-between text-sm gap-4'>
                <span className='text-gray-500'>Contact</span>
                <span className='font-medium text-[#df5226] text-right'>
                  {submittedSummary.phone || 'Submitted successfully'}
                </span>
              </div>
            </div>
            <div className='mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center animate-in slide-in-from-bottom-5 duration-700'>
              <button
                type='button'
                onClick={closeThankYou}
                style={{ fontFamily: 'var(--font-heading)' }}
                className='bg-[#df5226] text-white font-bold text-xs md:text-sm uppercase tracking-[0.1em] px-10 py-4 rounded-full hover:bg-[#c84a22] transition-colors'
              >
                Done
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}


