import { Clock, Users, Calendar, Globe, IndianRupee } from 'lucide-react';

function TourOverview({
  duration,
  groupSize,
  ageRange,
  languages,
  description,
  price,
  tagMonths = [],
}) {
  const languageValue = Array.isArray(languages)
    ? languages.filter(Boolean).join(', ')
    : languages;
  const priceValue =
    price !== undefined && price !== null && !Number.isNaN(Number(price))
      ? `₹${Number(price || 0).toLocaleString('en-IN')}`
      : null;

  const stats = [
    {
      icon: Clock,
      label: 'Duration',
      value: duration,
    },
    {
      icon: Users,
      label: 'Group Size',
      value: groupSize,
    },
    {
      icon: Calendar,
      label: 'Ages',
      value: ageRange,
    },
    {
      icon: IndianRupee,
      label: 'Price',
      value: priceValue,
    },
    {
      icon: Globe,
      label: 'Languages',
      value: languageValue,
    },
  ];

  const displayStats = stats.filter((s) => s.value);

  return (
    <div className='space-y-6 flex flex-col gap-6 mb-6'>
      {/* Clean overview section */}
      <div>
        <h2 className='text-2xl md:text-3xl font-bold mb-4'>Tour Overview</h2>
        {displayStats.length > 0 && (
          <div className='flex flex-wrap items-center gap-3 mb-4'>
            {displayStats.map((stat, index) => (
              <div
                key={index}
                className='flex items-center gap-2 rounded-full bg-[#ff5b06]/10 text-[#ff5b06] border border-[#ff5b06]/20 px-3 py-2 text-sm'>
                <stat.icon className='h-4 w-4' />
                <span className='font-semibold'>{stat.label}:</span>
                <span className='text-[#ff5b06]'>{stat.value}</span>
              </div>
            ))}
          </div>
        )}
        <p
          className='text-base text-muted-foreground leading-relaxed '
          data-testid='text-description'>
          {description}
        </p>
      </div>
    </div>
  );
}

export default TourOverview;
