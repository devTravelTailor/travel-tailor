import { ArrowLeft, ArrowRight } from 'lucide-react';
import DestinationCard from './DestinationCard';

const DEFAULT_TITLE = 'Where solo travellers are going right now';
const DEFAULT_SUBTITLE =
  "Each of these destinations works particularly well for the solo traveller—offering a balance of safety, cultural depth, and the kind of beauty that's best appreciated in silence.";
const DEFAULT_CTA_LABEL = 'Plan your solo journey';

export default function SoloTravellersSection({
  destinations,
  sectionTitle,
  sectionSubtitle,
  ctaLabel,
  ctaHref = '#contact-form',
}) {
  if (!destinations || destinations.length === 0) return null;
  const title = sectionTitle || DEFAULT_TITLE;
  const subtitle = sectionSubtitle || DEFAULT_SUBTITLE;
  const label = ctaLabel || DEFAULT_CTA_LABEL;

  return (
    <section className='w-full max-w-[1600px] mx-auto py-24 px-6 lg:px-12 bg-[#f2f2f2] '>
      <div className='text-center mb-16 relative'>
        <h2
          style={{ fontFamily: 'var(--font-heading)' }}
          className='text-[32px] md:text-[40px] font-extrabold text-gray-900 mb-6 tracking-tighter uppercase relative z-10 inline-block px-10'>
          <span className='absolute top-1/2 left-0 right-0 h-px  -z-10 w-[140%] -translate-x-[15%] hidden md:block' />
          <span className='px-6'>
            Where solo travellers are going right n
            <em className='text-[#f05a22] italic mr-1'>o</em>
            w
          </span>
        </h2>
        <p className='text-gray-500 max-w-2xl mx-auto leading-relaxed text-[15px]'>
          {subtitle}
        </p>
      </div>

      <div className='relative pb-20'>
        <button className='group absolute -left-4 lg:-left-6 top-[40%] -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-transparent backdrop-blur-md border border-white/60 rounded-full text-[#f05a22] hover:bg-[#f05a22] hover:text-white hover:border-[#f05a22] transition-all duration-300 z-20'>
          <ArrowLeft
            size={20}
            strokeWidth={1.5}
            className='group-hover:-translate-x-0.5 transition-transform'
          />
        </button>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 px-8'>
          {destinations.map((destination) => (
            <DestinationCard
              key={destination._id || destination.slug}
              destination={destination}
            />
          ))}
        </div>

        <button className='group absolute -right-4 lg:-right-6 top-[40%] -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-transparent backdrop-blur-md border border-white/60 rounded-full text-[#f05a22] hover:bg-[#f05a22] hover:text-white hover:border-[#f05a22] transition-all duration-300 z-20'>
          <ArrowRight
            size={20}
            strokeWidth={1.5}
            className='group-hover:translate-x-0.5 transition-transform'
          />
        </button>
      </div>

      <div className='flex justify-center mt-[-30px] relative z-30'>
        <a
          href={ctaHref}
          className='inline-block bg-[#f05a22] hover:bg-[#d64e1c] transition-colors text-white text-[11px] font-bold uppercase tracking-widest px-10 py-5 rounded-full shadow-xl shadow-orange-500/20 text-center'>
          {label}
        </a>
      </div>
    </section>
  );
}
