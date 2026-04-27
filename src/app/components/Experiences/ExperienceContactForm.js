/**
 * ExperienceContactForm
 * ─────────────────────────────────────────────────────────────────────────────
 * Re-exports the shared ContactFormSection component so existing imports in the
 * experience detail page continue to work without modification.
 *
 * All future detail pages should import directly from:
 *   @/app/components/Shared/ContactFormSection
 */
export { default } from '../Shared/ContactFormSection';
