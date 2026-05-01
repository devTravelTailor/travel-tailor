import ContactFormSection from '../Shared/ContactFormSection';

const HEADING_FONT_STYLE = {
  fontFamily: 'var(--font-filson-pro)',
  fontWeight: 700,
  fontStyle: 'normal',
};

export default function ExperienceContactForm() {
  return (
    <ContactFormSection
      headingStyle={HEADING_FONT_STYLE}
      heading={
        <>
          This starts with a c
          <em className='text-white italic -ml-1 mr-1'>O</em>
          nversation,
          <br />
          not a form.
        </>
      }
    />
  );
}
