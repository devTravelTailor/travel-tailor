import { HeadphonesIcon, Settings2, Map, PhoneCall } from 'lucide-react';

const STEPS = [
  {
    icon: PhoneCall,
    step: '1. Discovery call',
    desc: 'We learn your pace, your taste, and the silence you seek. No generic forms.',
  },
  {
    icon: Map,
    step: '2. Your itinerary',
    desc: 'A bespoke editorial guide designed for the independent eye.',
  },
  {
    icon: Settings2,
    step: '3. Logistics handled',
    desc: 'Planes, trains, and suites. Zero friction, total autonomy.',
  },
  {
    icon: HeadphonesIcon,
    step: '4. On-trip support',
    desc: 'The invisible concierge in your pocket, whenever you need it.',
  },
];

export default function DesignedForOne({ visible = true }) {
  if (!visible) return null;

  return (
    <div className='w-full pt-32 max-w-[1600px] mx-auto bg-white'>
      <div className='max-w-[1400px] mx-auto px-6 text-center'>
        <h2
          style={{ fontFamily: 'var(--font-heading)' }}
          className='text-[32px] md:text-[40px] font-extrabold text-gray-900 mb-6 tracking-tighter'>
          Designed specifically f
          <span className='text-[#f05a22] italic mr-1'>o</span>
          r one
        </h2>
        <p className='text-gray-500 max-w-[600px] mx-auto leading-relaxed mb-20 text-[13px] font-medium'>
          Most travel planning assumes you&apos;re travelling with someone. We assume
          you&apos;re not. That shift changes everything about how we build your experience.
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center pb-24 px-8'>
          {STEPS.map(({ icon: Icon, step, desc }) => (
            <div key={step} className='flex flex-col items-center'>
              <div className='w-[72px] h-[72px] rounded-full bg-[#fcfaf7] flex items-center justify-center text-[#f05a22] mb-6 shadow-sm shadow-orange-900/5'>
                <Icon size={26} strokeWidth={1.5} />
              </div>
              <h3
                style={{ fontFamily: 'var(--font-heading)' }}
                className='font-bold text-gray-900 mb-3 text-[15px]'>
                {step}
              </h3>
              <p className='text-gray-500 text-[12px] leading-relaxed max-w-[220px]'>{desc}</p>
            </div>
          ))}
        </div>

        <div className='flex justify-center -mb-[26px]'>
          <a
            href='#contact-form'
            className='inline-block bg-[#f05a22] hover:bg-[#d64e1c] transition-colors text-white text-[11px] font-bold uppercase tracking-widest px-10 py-5 rounded-full shadow-xl shadow-orange-500/20 relative z-10 text-center'>
            Start the conversation
          </a>
        </div>
      </div>
    </div>
  );
}
