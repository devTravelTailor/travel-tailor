# Frontend Progress

## Task Summary
Refactor the contact form CTA into a reusable shared component (`ContactFormSection`) and integrate it across all detail pages that have CTA buttons.

---

## Completed ✅

- [x] **Created** `src/app/components/Shared/ContactFormSection.js`
  - Full form with client-side validation and API submission (`/api/contact`)
  - Accepts props: `source`, `heading`, `subtext`, `tagline`, `buttonLabel`
  - Same brand styling as the original experience form (orange `#df5226`)
  - Handles success/error states with user feedback

- [x] **Updated** `src/app/components/Experiences/ExperienceContactForm.js`
  - Converted to a thin re-export wrapper (backward compatible, no import changes needed)

- [x] **Updated** `src/app/(pages)/destinations/[slug]/page.js`
  - Removed `Banner` import
  - Added `ContactFormSection` import
  - Both mobile & desktop hero "Enquire now" CTAs now scroll to `#contact-form`
  - Bottom `<Banner>` replaced with `<ContactFormSection source={destinationTitle} />`

- [x] **Updated** `src/app/(pages)/tours/[slug]/page.js`
  - Removed `Banner` import
  - Added `ContactFormSection` import
  - Sticky nav "Plan your journey" `<Button>` now scrolls to `#contact-form`
  - Bottom `<Banner>` replaced with `<ContactFormSection source={tourTitle} />` (custom copy)

---

## Recently Completed

- [x] **Removed `heroTitle` across the stack:**
  - `Backend/models/Experience.js`: Removed `heroTitle` field.
  - `Dashboard/src/data/uischema.js`: Removed `heroTitle` input field from the experience schema.
  - `Frontend/src/app/components/Experiences/ExperienceHero.js`: Replaced `heroTitle` prop with `title` prop.
  - `Frontend/src/app/(pages)/experiences/[slug]/page.js`: Stopped passing `heroTitle` data to `<ExperienceHero>`.

- [x] **Updated** `src/app/components/Experiences/ExperienceTestimonial.js`
  - Re-designed the layout to feature a large circular profile image on the left and the review text on the right for large screens.
  - Added support for `testimonial.profileImg` or `testimonial.img[0]`, falling back to a default high-quality placeholder.
  - Implemented a custom-generated, ultra-minimalist background (`/images/testimonial-doodle-bg.png`) with exactly 10 individual, tiny travel icons scattered across the section for a clean, bespoke look.

- [x] **Updated** `src/app/components/Experiences/ExperienceHero.js`
  - Made "Best Time" and "Ready to tailor" cards full width by removing max-width constraints.
  - Added support for multiple months in "Best Time" card, rendering each as a separate pill.
  - Applied `suppressHydrationWarning` to heading, description, and "Best Time" card to resolve Next.js hydration mismatches.
  - Added capitalization logic for month names and implemented hiding of the "Best Time" card when no data is available.

- [x] **Updated** `src/app/(pages)/experiences/[slug]/page.js`
  - Now passes `bestTime` as an array of months to support multi-pill display, or `null` to hide the card.

---

## Pending / Backlog

- [x] **Updated** `src/app/(pages)/experiences/[slug]/page.js`
  - Now extracts `heroLabel`, `heroDescription`, `idealFor`, `pricing` from API data
  - Forwards all new props to `<ExperienceHero>` alongside the existing `heroImg`, `title`, `bestTime`

---

## Pending / Backlog

- [ ] Confirm form API submission works end-to-end on all three page types
- [ ] Consider adding a `Highlights` CTA link → `#contact-form` on destination pages
- [ ] Optionally add `ContactFormSection` to Blog detail pages if needed

---

## Known Blockers
- None
