'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import ImageGallery from '../../../../components/TourCurated/ImageGallery';
import TourOverview from '../../../../components/TourCurated/TourOverview';
import TourHighlights from '../../../../components/TourCurated/TourHighLight';
import TourStays from '../../../../components/TourCurated/TourStay';
import TourMoments from '../../../../components/TourCurated/TourMoment';
import TourMap from '../../../../components/TourCurated/TourMap';
import TourInclusions from '../../../../components/TourCurated/TourInclusions';
import TourItinerary from '../../../../components/TourCurated/TourItinerary';
import TourReviews from '../../../../components/TourCurated/TourReview';
import MakeReview from '../../../../components/TourCurated/MakeReview';
import TourFAQ from '../../../../components/TourCurated/TourFAQ';
import EnquireNow from '../../../../components/TourCurated/BookingCard';
import TourHero from '../../../../components/TourCurated/TourHero';
import UserCard from '../../../../components/TourCurated/UserCard';
import TourVideoTestimonials from '../../../../components/TourCurated/TestimonialVideoCarousel';
import Spinner from '../../../../components/CustomUI/Spinner/Spinner';
import Banner from '../../../../components/Banner/Banner';
import { MdHiking, MdOutlineCardTravel } from 'react-icons/md';
import { ArrowRight, Clock, IndianRupee, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../components/ui/dialog';
import Button from '../../../../components/CustomUI/Button/Button';
import parsePrice from '../../../../util/parsePrice';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/, '');
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN || '';

const FALLBACK_IMG =
  'https://images.musement.com/cover/0003/14/koh-samui-xxl-jpg_header-213595.jpeg';
const image = FALLBACK_IMG;

export default function TourPage() {
  const { slug } = useParams();
  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'inclusions', label: 'Inclusions' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reviews', label: 'Reviews' },
  ];
  const [active, setActive] = useState('overview');
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const controllerRef = useRef(null);
  const scrollAnimRef = useRef(null);
  const heroRef = useRef(null);
  const [showStickyBooking, setShowStickyBooking] = useState(false);

  const endpoint = useMemo(() => {
    if (!slug) return null;
    return API_URL ? `${API_URL}/api/tour/${slug}` : `/api/tour/${slug}`;
  }, [slug]);

  const fetchTour = useCallback(async () => {
    if (!endpoint) return;
    setLoading(true);
    setErr(null);

    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const headers = {};
      if (API_TOKEN) headers.Authorization = `Bearer ${API_TOKEN}`;

      const res = await fetch(endpoint, {
        // cache: "force-cache",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
      });

      if (!res.ok) throw new Error(`Failed (${res.status} ${res.statusText})`);

      const apiData = await res.json();
      // console.log("res", apiData);

      // allow API to return {tour: {...}} or the object directly
      const mapped = toTourModel(apiData?.data || apiData);
      setTour(mapped);
    } catch (e) {
      if (e?.name !== 'AbortError') setErr(e?.message || 'Failed to load tour');
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchTour();
    return () => controllerRef.current?.abort();
  }, [fetchTour]);

  useEffect(() => {
    const handleScroll = () => {
      let current = 'overview';
      sections.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section && window.scrollY >= section.offsetTop - 200) {
          current = id;
        }
      });
      setActive(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => () => cancelAnimationFrame(scrollAnimRef.current), []);
  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBooking(!entry.isIntersecting);
      },
      { threshold: 0.05 },
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((id) => {
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;

    const globalNav = document.querySelector('nav');
    const tourNav = document.getElementById('tour-sticky-nav');
    const buffer = 16;
    const offset =
      (globalNav?.offsetHeight || 0) + (tourNav?.offsetHeight || 0) + buffer;

    const start = window.scrollY;
    const end = target.offsetTop - offset;
    const distance = end - start;
    const duration = 900;
    const startTime = performance.now();

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(t);
      window.scrollTo(0, start + distance * eased);
      if (t < 1) {
        scrollAnimRef.current = requestAnimationFrame(step);
      }
    };

    scrollAnimRef.current = requestAnimationFrame(step);
  }, []);

  const handlePlanJourney = useCallback(
    (e) => {
      e?.preventDefault();
      const targets = ['enquire-desktop', 'enquire-mobile'];
      const visibleTarget =
        targets
          .map((id) => document.getElementById(id))
          .find((el) => el && el.offsetParent !== null)?.id || targets[0];
      scrollToSection(visibleTarget);
    },
    [scrollToSection],
  );

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-b from-gray-100 to-white flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  if (err || !tour) {
    return (
      <div className='min-h-screen bg-gradient-to-b from-gray-100 to-white flex items-center justify-center'>
        <div className='p-6 rounded-xl bg-white shadow'>
          <p className='text-red-600 font-medium mb-3'>
            {err || 'Tour not found'}
          </p>
          <button
            onClick={fetchTour}
            className='px-4 py-2 rounded-lg bg-black text-white'>
            Retry
          </button>
        </div>
      </div>
    );
  }
  console.log('tour', tour);
  const badgeConfig = {
    fixed_date: { label: 'Smith-Led', icon: MdHiking, variant: 'default' },
    selectable_date: {
      label: 'Smith-Curated',
      icon: MdOutlineCardTravel,
      variant: 'secondary',
    },
  };

  const badge = badgeConfig[tour.tourType];

  const priceDisplay =
    typeof tour.price === 'number' && Number.isFinite(tour.price)
      ? parsePrice(tour.price)
      : tour.price || 'Price on request';
  const durationDisplay =
    tour?.overview?.duration ||
    (tour?.itinerary?.length
      ? `${tour.itinerary.length} day${tour.itinerary.length === 1 ? '' : 's'}`
      : '');

  return (
    <>
      <div className='min-h-screen max-w-screen bg-gradient-to-b from-gray-100 to-white'>
        {/* Hero Section */}
        {tour && (
          <div className='' ref={heroRef}>
            <TourHero
              id={tour.id}
              price={tour.price}
              title={tour.title}
              duration={tour.overview.duration}
              subtitle={tour.subtitle}
              curatedBy={tour.creator}
              tourType={tour.tourType}
              location={tour.location}
              rating={tour.rating}
              reviewCount={tour.reviewCount}
              bookingCount={tour.bookingCount}
              badges={badge}
              heroImage={tour.images.hero}
              onPlanJourney={handlePlanJourney}
            />
          </div>
        )}

        <div
          id='tour-sticky-nav'
          className='sticky top-[3.6rem] md:top-17 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 w-full overflow-y-hidden'>
          <div className=' mx-auto px-4 md:px-8 py-3 md:py-4'>
            <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4'>
              <div className='flex-1 my-auto min-w-0'>
                <div className='flex flex-nowrap md:flex-wrap items-center justify-start gap-3 overflow-x-auto scrollbar-hidden'>
                  {sections.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.id);
                      }}
                      className={`px-4 max-lg:py-1 py-2 max-lg:my-1 rounded-full border text-sm font-medium transition-colors whitespace-nowrap ${
                        active === item.id
                          ? 'border-[#ff5b06] text-[#ff5b06]'
                          : 'border-gray-200 text-gray-700 hover:text-[#ff5b06] hover:border-[#ff5b06]'
                      }`}>
                      {item.label}
                    </a>
                  ))}
                </div>
                <p className='mt-2 pl-5 text-base md:text-lg font-semibold text-gray-900 truncate hidden md:block'>
                  {tour.title}
                </p>
              </div>

              <div className='flex flex-col items-stretch md:items-end gap-2 shrink-0'>
                <button
                  onClick={handlePlanJourney}
                  className='w-full md:w-auto whitespace-nowrap inline-flex items-center justify-center gap-2 rounded-sm border border-[#ff5b06] bg-white text-[#ff5b06] px-5 py-2.5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)] hover:bg-[#ff5b06] hover:text-white hover:shadow-[0_16px_38px_-14px_rgba(255,91,6,0.5)] hover:-translate-y-0.5 transition-all duration-200'>
                  Plan your journey
                  <ArrowRight className='w-4 h-4' />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className=' mx-auto px-5 lg:px-10 py-8'>
          <div className='grid lg:grid-cols-3 gap-8'>
            {/* Main Content */}
            <div className='lg:col-span-2 space-y-12'>
              {/* Tour Overview */}
              <section id='overview' className='scroll-mt-80'>
                <TourOverview
                  duration={tour.overview.duration}
                  groupSize={tour.overview.groupSize}
                  ageRange={tour.overview.ageRange}
                  languages={tour.overview.languages}
                  price={tour.price}
                  description={tour.overview.description}
                  tagMonths={tour.tagMonths}
                />
              </section>

              {/* Tour Highlights */}
              <section id='highlights' className='scroll-mt-80'>
                {tour.highlights.length > 0 && (
                  <TourHighlights highlights={tour.highlights} />
                )}
              </section>

              {/* Itinerary */}
              <section id='itinerary' className='scroll-mt-80 '>
                <TourItinerary itinerary={tour.itinerary} />
              </section>

              {/* What's Included/Excluded */}
              <section id='inclusions' className='scroll-mt-80'>
                <h2 className='text-2xl md:text-3xl font-bold mb-6'>
                  Inclusions & Exclusions
                </h2>

                <TourInclusions
                  included={tour.included}
                  excluded={tour.excluded}
                />
              </section>

              {/* Hotel Stays */}
              {tour.stays.length > 0 && (
                <section id='stays' className='scroll-mt-80'>
                  <TourStays stays={tour.stays} />
                </section>
              )}

              {/* Memorable Moments */}
              {tour.moments.length > 0 && (
                <section id='moments' className='scroll-mt-80'>
                  <TourMoments moments={tour.moments} />
                </section>
              )}
              {tour.video?.length > 0 && (
                <section id='gallery' className='scroll-mt-80'>
                  <h2 className='text-2xl md:text-3xl font-semibold mb-4 mt-6'>
                    Video Gallery
                  </h2>

                  <TourVideoTestimonials videos={tour.video} />
                </section>
              )}

              {/* Image Gallery */}
              {tour.images.gallery.length > 0 && (
                <section id='gallery' className='scroll-mt-80'>
                  <h2 className='text-2xl md:text-3xl font-semibold mb-4 mt-6'>
                    Gallery
                  </h2>
                  <ImageGallery images={tour.images.gallery} />
                </section>
              )}
              {/* FAQ */}
              {tour.faq.length > 0 && (
                <section id='faq' className='scroll-mt-80'>
                  <TourFAQ faqs={tour.faq} />
                </section>
              )}

              {/* Reviews */}
              <section id='reviews' className='scroll-mt-80'>
                <div className='flex items-center justify-between gap-3 mb-4 mt-6'>
                  <h2 className='text-2xl md:text-3xl font-semibold'>
                    Customer Reviews
                  </h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        type='button'
                        aria-label='Add review'
                        className='h-10 w-10 rounded-full bg-[#ff5b06] text-white flex items-center justify-center shadow-md hover:bg-[#ff5b06]/90 transition-colors'>
                        <Plus className='w-5 h-5' />
                      </button>
                    </DialogTrigger>
                    <DialogContent className='max-w-3xl w-full max-h-[80vh] overflow-y-auto border-none'>
                      <MakeReview
                        tourIdOrSlug={tour.slug /* or tour.id */}
                        variant='dialog'
                      />
                    </DialogContent>
                  </Dialog>
                </div>

                {tour.reviews.length > 0 && (
                  <TourReviews
                    reviews={tour.reviews}
                    overallRating={tour.rating}
                    totalReviews={tour.reviewCount}
                  />
                )}
              </section>

              {/* Location Map */}
              {tour.mapEmbed && (
                <section id='map' className='scroll-mt-80'>
                  <TourMap mapEmbed={tour.mapEmbed} />
                </section>
              )}
            </div>

            {/* Booking Sidebar */}
            <div className='lg:col-span-1'>
              {/* Mobile: Show booking at top */}
              <div id='enquire-mobile' className='lg:hidden top-40'>
                <EnquireNow
                  basePrice={tour.booking.pricing.adult}
                  tourDuration={parseInt(tour.overview.duration.split(' ')[0])}
                  tagMonths={tour.tagMonths}
                  tourType={tour.tourType}
                  tourId={tour.id}
                  getDateRange={tour.dateRange}
                  creatorId={tour.creator.id}
                />
              </div>

              {/* Desktop: sticky sidebar */}
              <div
                id='enquire-desktop'
                className='hidden lg:block lg:sticky lg:top-48'>
                <EnquireNow
                  basePrice={tour.booking.pricing.adult}
                  tourDuration={parseInt(tour.overview.duration.split(' ')[0])}
                  tagMonths={tour.tagMonths}
                  tourType={tour.tourType}
                  tourId={tour.id}
                  getDateRange={tour.dateRange}
                  creatorId={tour.creator.id}
                />
                <div className='w-full mt-4  shadow-xs transition-shadow duration-300'>
                  <UserCard
                    avatar={tour.creator.profileImg}
                    name={tour.creator.name}
                    description={tour.creator.bio}
                    id={tour.creator.id}
                    slug={tour.creator.slug}
                  />
                </div>
              </div>
            </div>
            {showStickyBooking && (
              <div className='fixed bottom-4 left-0 right-0 px-4 md:hidden z-40'>
                <div className='max-w-4xl mx-auto bg-white shadow-lg border border-gray-200 rounded-2xl px-4 py-3 flex items-center justify-between gap-3'>
                  <div>
                    <p className='text-xs text-gray-500'>Starting from</p>
                    <p className='text-lg font-semibold text-[#ff5b06]'>
                      {tour.price || tour.price === 0
                        ? `₹${Number(tour.price || 0).toLocaleString('en-IN')}`
                        : 'Price on request'}
                    </p>
                    <p className='text-xs text-gray-500'>
                      Duration: {tour.overview.duration}
                    </p>
                  </div>
                  <button
                    type='button'
                    onClick={() => scrollToSection('enquire')}
                    className='flex-1 flex justify-center items-center px-4 py-3 rounded-xl bg-[#ff5b06] text-white font-semibold shadow-md hover:bg-[#ff5b06]/90 transition-colors'>
                    Book / Enquire
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* Conditionally render Tours Component */}
          {tour.tours && tour.tours.length > 0 && (
            <Tours
              tours={tour.tours}
              heading={{
                title: '/sTours\\s you might /n enjoy',
                description: 'Explore the world with our curated tours',
              }}
            />
          )}

          {/* Conditionally render Blogs */}
          {tour.blogs && tour.blogs.length > 0 && (
            <Blogs
              blogs={tour.blogs}
              heading={{
                title: 'Similar /sPosts\\s',
                description: 'You might like these blogs',
              }}
            />
          )}

          {tour?.destinations?.length > 0 && (
            <Destinations
              destinations={tour.destinations}
              heading={{
                title: '/sDestinations\\s you might /n enjoy',
                description: 'Explore the world with our curated destinations',
              }}
            />
          )}
          {tour.experiences && tour.experiences.length > 2 && (
            <Experiences experiences={tour.experiences} />
          )}
        </div>
      </div>
      <Banner
        title={`Plan Your Adventure!`}
        cta={'Get Inspired'}
        url={`/contact?src=${slug}`}
      />
    </>
  );
}

/* ---------- Mapper: API -> UI tour model ---------- */

function clamp(n, min, max) {
  n = Number(n);
  return Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : min;
}

function normalizeTime12(s = '') {
  // Accepts: "9:00 AM", "09:00am", "0900AM" → returns "9:00 AM"
  const t = String(s).trim().replace(/\s+/g, '');
  const m = t.match(/^(\d{1,2}):?(\d{2})?([AaPp][Mm])$/);
  if (!m) return s;
  let h = Number(m[1]);
  if (h < 1 || h > 12) return s;
  const min = (m[2] || '00').padStart(2, '0');
  return `${h}:${min} ${m[3].toUpperCase()}`;
}

function mapBlocks(blocks) {
  // Your schema sometimes has blocks as an *array*, sometimes a single object.
  if (Array.isArray(blocks)) {
    return blocks.map((b) => ({
      time: b?.time ? normalizeTime12(b.time) : '',
      title: b?.title || '',
      activity: b?.activity || '',
      notes: b?.notes || '',
      image: b?.image || '',
    }));
  }
  if (blocks && typeof blocks === 'object') {
    return [
      {
        time: blocks?.time ? normalizeTime12(blocks.time) : '',
        title: blocks?.title || '',
        activity: blocks?.activity || '',
        notes: blocks?.notes || '',
        image: blocks?.image || '',
      },
    ];
  }
  return [];
}

function mapItinerary(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.map((d) => ({
    day: d?.day,
    blocks: mapBlocks(d?.blocks),
  }));
}

function simplifyBlog(b) {
  return {
    id: b?._id || b?.id,
    slug: b?.slug,
    title: b?.title,
    description: b?.description,
    image: b?.displayImg || b?.coverImage || b?.image || FALLBACK_IMG,
  };
}

function simplifyDestination(d) {
  return {
    id: d?._id || d?.id,
    slug: d?.slug,
    title: d?.title,
    description: d?.description,
    image:
      d?.displayImg ||
      d?.heroImg ||
      d?.highlight?.img ||
      d?.image ||
      FALLBACK_IMG,
  };
}

function simplifyExperience(x) {
  return {
    id: x?._id || x?.id,
    slug: x?.slug,
    title: x?.title,
    image: x?.heroImg || x?.displayImg || x?.image || FALLBACK_IMG,
    highlight: x?.highlight || null,
    status: x?.status,
  };
}

function simplifySpotlight(s) {
  return {
    id: s?._id || s?.id,
    title: s?.title,
    description: s?.description,
    image: s?.displayImg || s?.image || FALLBACK_IMG,
    tour: s?.tour || null,
  };
}

function simplifyTour(t) {
  return {
    id: t?._id || t?.id,
    slug: t?.slug,
    title: t?.title,
    place: t?.place,
    image: t?.heroImg || t?.image || FALLBACK_IMG,
    status: t?.status,
  };
}

function mapCreator(u) {
  if (!u || typeof u !== 'object') return null;
  return {
    id: u?._id || u?.id,
    name: u?.name || '',
    email: u?.email || '',
    profileImg: u?.profileImg || '',
    bio: u?.bio || '',
    slug: u?.slug || '',
  };
}

/* ---------- Mapper: API -> UI tour model ---------- */
function toTourModel(api) {
  if (!api) return null;

  // Slug
  const slug = api?.slug || '';

  console.log('👉 API Data:', api);

  // Dates & duration
  let startDate = api?.dateRange?.startDate
    ? new Date(api.dateRange.startDate)
    : null;
  let endDate = api?.dateRange?.endDate
    ? new Date(api.dateRange.endDate)
    : null;
  if (startDate && endDate && endDate < startDate)
    [startDate, endDate] = [endDate, startDate];

  const msPerDay = 24 * 60 * 60 * 1000;
  let durationDays =
    startDate && endDate
      ? Math.max(1, Math.ceil((endDate - startDate) / msPerDay) + 1) // inclusive
      : (Array.isArray(api?.days) ? api.days.length : 0) || 0;

  // Prefer details.totalDays if present
  if (api?.details?.totalDays) {
    durationDays = Number(api.details.totalDays) || durationDays;
  }
  const durationStr = `${durationDays} day${durationDays === 1 ? '' : 's'}`;

  // Images
  const gallery = Array.isArray(api?.galleryImgs) ? api.galleryImgs : [];
  const heroImage = api?.heroImg || gallery[0] || FALLBACK_IMG;

  // Rating from testimonials
  const testimonials = Array.isArray(api?.testimonials) ? api.testimonials : [];
  const stars = testimonials.map((t) => Number(t?.stars) || 0);
  const avg = stars.length
    ? stars.reduce((a, b) => a + b, 0) / stars.length
    : 0;
  const rating = clamp(avg, 0, 5);

  // Inclusions
  const included = Array.isArray(api?.inclusions?.included)
    ? api.inclusions.included
    : [];
  const excluded = Array.isArray(api?.inclusions?.excluded)
    ? api.inclusions.excluded
    : [];

  // Itinerary (array of days, each with blocks array)
  const itinerary = mapItinerary(api?.itinerary);

  // Price / currency (prefer details)
  const currency = api?.price?.currency || api?.currency || 'INR';
  const priceAdult =
    api?.details?.pricePerPerson ??
    api?.price?.adult ??
    api?.booking?.pricing?.adult ??
    0;

  // Badges
  const badges = [];
  if (api?.tourType === 'fixed_date') badges.push('Fixed Date');
  if (api?.status === 'published') badges.push('Published');

  // Related (simplified)
  const related = {
    blogs: Array.isArray(api?.blogs) ? api.blogs.map(simplifyBlog) : [],
    destinations: Array.isArray(api?.destinations)
      ? api.destinations.map(simplifyDestination)
      : [],
    experiences: Array.isArray(api?.experiences)
      ? api.experiences.map(simplifyExperience)
      : [],
    spotlights: Array.isArray(api?.spotlights)
      ? api.spotlights.map(simplifySpotlight)
      : [],
    tours: Array.isArray(api?.tours) ? api.tours.map(simplifyTour) : [],
    tagMonths: Array.isArray(api?.tagMonths)
      ? api.tagMonths.map((m) => ({
          id: m?._id || m?.id,
          month: m?.month,
          monthTag: m?.monthTag,
          heroImg: m?.heroImg || '',
          displayImg: m?.displayImg || '',
        }))
      : [],
  };

  // Creator (createdBy — already selectively populated on server)
  const creator = mapCreator(api?.createdBy);

  console.log('creator', creator);

  return {
    // Hero / top
    title: api?.title || 'Untitled Tour',
    subtitle: api?.brief || '',
    location: api?.place || '—',
    rating,
    reviewCount: testimonials.length,
    bookingCount: api?.bookingCount || 0,
    badges,
    price: api?.details?.pricePerPerson,

    images: {
      hero: heroImage,
      gallery,
    },

    // Overview
    overview: {
      duration: durationStr,
      groupSize: api?.details?.groupSize || '—',
      ageRange: api?.details?.ageRestriction || api?.overview?.ageRange || '—',
      languages: api?.details?.languages || [],
      description: api?.description || '',
    },

    tagMonths: Array.isArray(api?.tagMonths) ? api.tagMonths : [],

    // Sections used by UI
    highlights: Array.isArray(api?.highlights) ? api.highlights : [],
    itinerary,
    included,
    excluded,
    stays: Array.isArray(api?.stays) ? api.stays : [],
    moments: Array.isArray(api?.moments) ? api.moments : [],
    faq: Array.isArray(api?.faqs) ? api.faqs : [],
    mapEmbed: api?.mapEmbed || api?.extras?.mapEmbed || '',

    // Reviews
    reviews: testimonials,

    // Pricing
    price: priceAdult,
    booking: {
      pricing: {
        adult: Number(priceAdult) || 0,
      },
    },

    // Misc / passthrough
    tourType: api?.tourType || '',
    dateRange: { startDate, endDate },
    getDateRange: () => ({ startDate, endDate }),
    slug: api?.slug,
    id: api?._id || api?.id,
    status: api?.status,
    createdAt: api?.createdAt,
    updatedAt: api?.updatedAt,

    // Not used by the static design but handy to have:
    creator, // { id, name, email, profileImg, bio, slug }
    related, // { blogs, destinations, experiences, spotlights, tours, tagMonths }
    seo: api?.seo || {},
    extras: api?.extras || {},
    video: Array.isArray(api?.video) ? api.video : [],
  };
}
