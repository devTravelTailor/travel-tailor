'use client';

import { useEffect, useState } from 'react';

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
  { name: 'name',        label: 'YOUR NAME',                     type: 'text',  placeholder: 'E.g. Alex' },
  { name: 'email',       label: 'EMAIL ADDRESS',                 type: 'email', placeholder: 'name@domain.com' },
  { name: 'phone',       label: 'PHONE / WHATSAPP',              type: 'tel',   placeholder: '+91 00000 00000' },
  { name: 'destination', label: 'WHERE ARE YOU THINKING OF GOING?', type: 'text', placeholder: 'E.g. Japan, China ...' },
  { name: 'when',        label: 'WHEN',                          type: 'text',  placeholder: 'E.g. September, August....' },
  { name: 'message',     label: 'ANYTHING ELSE?',                type: 'text',  placeholder: "Specific interests, requirements, or just the vibe you're after..." },
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
  subtext,
  tagline,
  source = '',
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

  const [errors, setErrors]           = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      destination: formatSourceText(source),
    }));
  }, [source]);

  // ── Validation ──────────────────────────────────────────────────────────────
  function validate() {
    const errs = {};
    if (!formData.name.trim())  errs.name  = 'Your name is required.';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) errs.phone = 'Phone / WhatsApp is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  // ── Handlers ────────────────────────────────────────────────────────────────
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);
    setStatusMessage('');

    try {
      const payload = {
        name:        formData.name,
        email:       formData.email,
        contact:     formData.phone,
        requirement: [
          formData.destination && `Destination: ${formData.destination}`,
          formData.when        && `When: ${formData.when}`,
          formData.message     && formData.message,
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
        setFormData({
          name: '',
          email: '',
          phone: '',
          destination: formatSourceText(source),
          when: '',
          message: '',
        });
      } else {
        const code = response.status;
        setSubmitStatus('error');
        setStatusMessage(
          code === 400 ? 'Invalid details — please double-check your entries.' :
          code === 429 ? 'Too many requests. Please try again in a moment.'    :
          code >= 500  ? 'Server error. Please try again shortly.'             :
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

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <section
      id='contact-form'
      className='bg-[#df5226] w-full text-white mx-auto mt-0'
    >
      <div className='max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 w-full min-h-[700px]'>

        {/* ── Left panel: editorial copy ── */}
        <div className='p-8 sm:p-12 lg:p-24 xl:px-32 xl:py-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/20'>
          <h2
            style={{ fontFamily: 'var(--font-heading)' }}
            className='text-[28px] sm:text-[34px] md:text-[44px] lg:text-[58px] font-extrabold tracking-tighter leading-[1.02] mb-8 md:mb-12 max-w-[600px]'
          >
            {heading || (
              <>
                This starts with a c<em className='text-white mr-2'>O</em>
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

        {/* ── Right panel: form ── */}
        <div className='p-8 sm:p-12 lg:p-24 xl:px-32 xl:py-24 flex flex-col justify-center w-full max-w-full'>

          {/* Status message */}
          {submitStatus && (
            <div
              className={`mb-6 px-5 py-4 rounded-xl text-sm font-medium ${
                submitStatus === 'success'
                  ? 'bg-white/15 text-white border border-white/30'
                  : 'bg-red-800/40 text-red-100 border border-red-300/30'
              }`}
            >
              {submitStatus === 'success' && (
                <span className='mr-2'>✓</span>
              )}
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
                  className='text-xs md:text-sm font-bold tracking-[0.15em] uppercase text-white/80 mb-3 block'
                >
                  {label}
                  {['name', 'email', 'phone'].includes(name) && (
                    <span className='text-white/50 ml-1'>*</span>
                  )}
                </label>

                <input
                  id={`ctaform-${name}`}
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  disabled={isSubmitting || submitStatus === 'success'}
                  className={`w-full bg-transparent border-b pb-3 md:pb-4 text-white placeholder-white/50 outline-none transition-colors text-base md:text-lg font-medium ${
                    errors[name]
                      ? 'border-red-300'
                      : 'border-white/30 focus:border-white'
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
                disabled={isSubmitting || submitStatus === 'success'}
                style={{ fontFamily: 'var(--font-heading)' }}
                className='bg-white text-[#df5226] font-bold text-xs md:text-sm uppercase tracking-[0.1em] px-10 py-4 md:py-5 rounded-full hover:bg-gray-100 transition-colors w-max block disabled:opacity-60 disabled:cursor-not-allowed'
              >
                {isSubmitting
                  ? 'SENDING…'
                  : submitStatus === 'success'
                  ? '✓ SENT'
                  : buttonLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
