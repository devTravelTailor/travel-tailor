'use client';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { MapPin, Star, Clock, IndianRupee } from 'lucide-react';
import { MdHiking, MdOutlineCardTravel } from 'react-icons/md';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default function TourHero({
  title,
  subtitle,
  location,
  rating,
  reviewCount,
  heroImage,
  curatedBy = 'Rishu Agrawal',
  duration = '12 Days',
  price = '53,350 onwards',
  badges,
  tourType = '',
  onPlanJourney,
  isEnquiryDisabled = false,
  tripStatus,
}) {
  function encodeForCssBackground(url) {
    if (!url) return '';

    return url
      .replace(/%/g, '%25')
      .replace(/ /g, '%20')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/'/g, '%27')
      .replace(/"/g, '%22')
      .replace(/#/g, '%23')
      .replace(/\?/g, '%3F')
      .replace(/\[/g, '%5B')
      .replace(/\]/g, '%5D');
  }

  const hero = encodeForCssBackground(heroImage);
  const badgeIconMap = {
    MdHiking,
    MdOutlineCardTravel,
  };
  const Icon =
    typeof badges?.icon === 'function'
      ? badges.icon
      : badgeIconMap[badges?.icon] || null;
  const curatorLabel =
    tourType === 'fixed_date'
      ? 'Led By'
      : tourType === 'selectable_date'
      ? 'Curated By'
      : 'Curated By';
  const isUpcomingTrip = tripStatus === 'upcoming';
  const ctaLabel = isEnquiryDisabled
    ? 'Past Trip'
    : isUpcomingTrip
    ? 'Upcoming'
    : 'Enquire Now';
  const mobileCtaClass = isEnquiryDisabled
    ? 'bg-amber-100 text-amber-900 border border-amber-200 hover:bg-amber-100'
    : isUpcomingTrip
    ? 'bg-emerald-100 text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
    : 'bg-[#ff5b06] text-white/90 hover:bg-[#ff5b06]/90';

  return (
    <div className='relative'>
      <div className='relative max-md:h-[75vh] h-[70vh] min-h-[600px] overflow-hidden'>
        <img
          src={hero}
          alt={title}
          className='w-full h-full object-cover scale-105'
        />
        <div className='absolute inset-0 bg-black/60' />

        <div className='absolute inset-0 flex max-md:p-5 items-center justify-center px-5 md:p-6'>
          <div className='bg-white/10 min-h-[520px] max-md:h-fit h-[60vh] backdrop-blur-md border border-white/20 rounded-2xl shadow-lg max-w-6xl w-full grid md:grid-cols-2 overflow-hidden'>
            <div className='max-md:p-5 md:p-10 p-7 flex flex-col h-full justify-center space-y-6'>
              <img
                src={hero}
                alt={title}
                className='w-full aspect-video min-md:hidden rounded-lg object-cover mb-4'
              />
              <div className='flex mb-2 items-center gap-2 text-white/80 text-sm font-medium'>
                <MapPin className='h-3 w-3 md:h-4 md:w-4' />
                {location}
              </div>

              <div className='mb-4'>
                <h1 className='text-xl md:text-3xl xl:5xl font-bold text-white leading-tight mb-2'>
                  {title}
                </h1>
                <p className='text-lg max-md:hidden xl:text-xl text-white/80 font-light'>
                  {subtitle}
                </p>
              </div>

              <div className='flex items-center gap-2 bg-white/10 rounded-full max-md:p-1 max-md:px-3 px-5 py-2 backdrop-blur-sm text-white/90 w-fit'>
                <Star className='max-md:h-3 max-md:w-3 h-5 w-5 fill-orange-500 text-orange-500' />
                <span className='font-semibold max-md:text-[0.9rem]'>{rating}</span>
                <span className='max-md:text-[0.6rem]'>({reviewCount} reviews)</span>
              </div>

              <div className='text-white/90 mt-6'>
                <div className='flex flex-wrap items-center max-md:gap-0 max-md:justify-between gap-12'>
                  <div>
                    <span className='block max-md:text-[0.6rem] text-xs uppercase tracking-wide opacity-70 mb-1'>
                      Duration
                    </span>
                    <div className='flex items-center gap-2'>
                      <Clock className='max-md:h-3 max-md:w-3 h-5 w-5 text-orange-500' />
                      <span className='max-md:text-[0.8rem] text-lg'>{duration}</span>
                    </div>
                  </div>

                  <div>
                    <span className='block max-md:text-[0.6rem] text-xs uppercase tracking-wide opacity-70 mb-1'>
                      Price Per Person
                    </span>
                    <div className='flex items-center gap-2'>
                      <IndianRupee className='max-md:h-3 max-md:w-3 h-5 w-5 text-orange-500' />
                      <span className='max-md:text-[0.8rem] text-lg'>{price}</span>
                    </div>
                  </div>

                  <div className='min-md:hidden'>
                    <Button
                      type='button'
                      onClick={onPlanJourney}
                      className={`w-full min-xl:hidden max-w-lg ${mobileCtaClass}`}
                    >
                      {ctaLabel}
                    </Button>
                  </div>
                </div>
              </div>

              <div className='border-t mt-6 mb-4 border-white/20' />

              <div className='flex flex-col gap-4 text-white/90'>
                <div>
                  <div className='flex items-center'>
                    <Avatar className='w-12 h-12 mr-3 rounded-md object-cover border-2 border-white/30'>
                      <AvatarImage
                        src={curatedBy?.profileImg}
                        alt={curatedBy?.name}
                      />
                      <AvatarFallback className='text-white rounded-sm bg-gray-800 w-full h-full'>
                        {curatedBy?.name?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <span className='flex flex-col max-md:text-[0.6rem] text-xs uppercase tracking-wide opacity-70'>
                        {curatorLabel}
                      </span>
                      <a
                        className='font-medium max-md:text-[0.8rem] text-lg text-inherit no-underline hover:no-underline'
                        href={`/creator/${curatedBy.slug || curatedBy.id}`}>
                        {curatedBy.name}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className='relative hidden md:block h-full min-h-[520px] bg-cover bg-center bg-no-repeat'
              style={{
                backgroundImage: `url(${hero})`,
              }}>
              {(badges || isEnquiryDisabled || isUpcomingTrip) && (
                <div className='absolute top-4 left-4 flex flex-wrap gap-3'>
                  {badges && (
                    <Badge className='bg-white/95 text-gray-900 border-0 font-medium px-4 py-2 rounded-full backdrop-blur-sm inline-flex items-center gap-2'>
                      {Icon && <Icon className='w-4 h-4' />}
                      {badges?.label}
                    </Badge>
                  )}
                  {isUpcomingTrip && !isEnquiryDisabled && (
                    <Badge className='bg-emerald-100 text-emerald-900 border border-emerald-200 font-medium px-4 py-2 rounded-full backdrop-blur-sm'>
                      Upcoming
                    </Badge>
                  )}
                  {isEnquiryDisabled && (
                    <Badge className='bg-amber-100 text-amber-900 border border-amber-200 font-medium px-4 py-2 rounded-full backdrop-blur-sm'>
                      Past Trip
                    </Badge>
                  )}
                </div>
              )}
              <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




