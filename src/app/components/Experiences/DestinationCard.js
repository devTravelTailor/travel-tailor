import Link from 'next/link';
import parseUrl from '../../util/parseUrl';

const HEADING_FONT_STYLE = {
  fontFamily: 'var(--font-filson-pro)',
  fontWeight: 700,
  fontStyle: 'normal',
};

export default function DestinationCard({ destination }) {
  const image = destination.heroImg || destination.displayImg;
  const rawBadge =
    destination.location ??
    destination.coordinates ??
    destination.longitude ??
    destination.latitude ??
    null;
  const badge =
    typeof rawBadge === 'string' || typeof rawBadge === 'number'
      ? rawBadge
      : rawBadge && typeof rawBadge === 'object'
        ? rawBadge.label ||
          rawBadge.name ||
          rawBadge.title ||
          rawBadge.city ||
          rawBadge.value ||
          null
        : null;
  const subtag = destination.tagline;
  const price = destination.startingPrice
    ? `From Rs. ${Number(destination.startingPrice).toLocaleString('en-IN')}`
    : null;

  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className='relative group rounded-3xl overflow-hidden h-[450px] shadow-sm block'>
      {image && (
        <img
          src={parseUrl(image)}
          alt={destination.title}
          className='absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-700 ease-out group-hover:scale-100'
        />
      )}
      <div className='absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80' />
      {badge && (
        <div className='absolute top-6 left-6 bg-[#f05a22] text-white text-[9px] uppercase font-bold tracking-widest px-4 py-2 rounded-full shadow-sm'>
          {badge}
        </div>
      )}
      <div className='absolute bottom-8 left-8 right-8'>
        <h3
          style={HEADING_FONT_STYLE}
          className='text-white text-3xl font-black mb-2'>
          {destination.title}
        </h3>
        {subtag && (
          <p className='text-[#f05a22] text-sm font-bold mb-2 tracking-wide line-clamp-2'>
            {subtag}
          </p>
        )}
        {price && (
          <p className='text-gray-300 text-[10px]  font-bold tracking-widest'>
            {price}
          </p>
        )}
      </div>
    </Link>
  );
}
