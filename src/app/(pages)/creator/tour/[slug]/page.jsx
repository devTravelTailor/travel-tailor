"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useParams } from "next/navigation";

import ImageGallery from "../../../../components/Curator/ImageGallery";
import TourOverview from "../../../../components/Curator/TourOverview";
import TourHighlights from "../../../../components/Curator/TourHighLight";
import TourStays from "../../../../components/Curator/TourStay";
import TourMoments from "../../../../components/Curator/TourMoment";
import TourMap from "../../../../components/Curator/TourMap";
import TourInclusions from "../../../../components/Curator/TourInclusions";
import TourItinerary from "../../../../components/Curator/TourItinerary";
import TourReviews from "../../../../components/Curator/TourReview";
import MakeReview from "../../../../components/Curator/MakeReview";
import TourFAQ from "../../../../components/Curator/TourFAQ";
import EnquireNow from "../../../../components/Curator/BookingCard";
import OverviewCard from "../../../../components/Curator/OverviewCard";
import tourData from "../../../../util/data";
import TourHero from "../../../../components/Curator/TourHero";
import UserCard from "../../../../components/Curator/UserCard";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN || "";

const FALLBACK_IMG =
  "https://images.musement.com/cover/0003/14/koh-samui-xxl-jpg_header-213595.jpeg";
const image = FALLBACK_IMG;

export default function TourPage() {
  const { slug } = useParams();
  // sticky menu config
  const sections = [
    { id: "overview", label: "Overview" },
    { id: "highlights", label: "Highlights" },
    { id: "stays", label: "Stays" },
    { id: "reviews", label: "Reviews" },
    { id: "faq", label: "FAQ" },
    { id: "gallery", label: "Gallery" },
  ];
  const [active, setActive] = useState("overview");
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const controllerRef = useRef(null);

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
      console.log("res", apiData);

      // allow API to return {tour: {...}} or the object directly
      const mapped = toTourModel(apiData?.data || apiData);
      setTour(mapped);
    } catch (e) {
      if (e?.name !== "AbortError") setErr(e?.message || "Failed to load tour");
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
      let current = "overview";
      sections.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section && window.scrollY >= section.offsetTop - 200) {
          current = id;
        }
      });
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading tour…</p>
      </div>
    );
  }

  if (err || !tour) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="p-6 rounded-xl bg-white shadow">
          <p className="text-red-600 font-medium mb-3">
            {err || "Tour not found"}
          </p>
          <button
            onClick={fetchTour}
            className="px-4 py-2 rounded-lg bg-black text-white"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-screen bg-gray-100">
      {/* Sticky Menu */}

      {/* Hero Section */}
      <div className="">
        <TourHero
          id={tour.id}
          price={tour.price}
          title={tour.title}
          duration={tour.overview.duration}
          subtitle={tour.subtitle}
          curatedBy={tour.creator}
          location={tour.location}
          rating={tour.rating}
          reviewCount={tour.reviewCount}
          bookingCount={tour.bookingCount}
          badges={tour.badges}
          heroImage={tour.images.hero}
        />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div
              className={` font-sans sticky top-[3.7rem] md:top-17 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 mb-6`}
            >
              {/* Desktop */}
              <div className="hidden md:flex gap-6 px-4 py-3">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={`text-sm font-medium ${
                      active === s.id
                        ? "text-orange-600 border-b-2 border-orange-600"
                        : "text-gray-600 hover:text-orange-500"
                    }`}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
              {/* Mobile */}
              <div className="flex md:hidden overflow-x-auto gap-4 px-4 py-2 scrollbar-hide">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={`whitespace-nowrap text-xs font-medium ${
                      active === s.id
                        ? "text-orange-600 border-b-2 border-orange-600"
                        : "text-gray-600 hover:text-orange-500"
                    }`}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
            {/* Tour Overview */}
            <section id="overview" className="scroll-mt-28">
              <TourOverview
                duration={tour.overview.duration}
                groupSize={tour.overview.groupSize}
                ageRange={tour.overview.ageRange}
                languages={tour.overview.languages}
                description={tour.overview.description}
                tagMonths={tour.tagMonths}
              />
            </section>

            {/* Tour Highlights */}
            <section id="highlights" className="scroll-mt-28">
              <TourHighlights highlights={tour.highlights} />
            </section>

            {/* Itinerary */}
            <section id="itinerary" className="scroll-mt-28">
              <TourItinerary itinerary={tour.itinerary} />
            </section>

            {/* What's Included/Excluded */}
            <section id="inclusions" className="scroll-mt-28">
              <h2 className="text-2xl font-bold mb-6">
                Inclusions & Exclusions
              </h2>

              <TourInclusions
                included={tour.included}
                excluded={tour.excluded}
              />
            </section>

            {/* Hotel Stays */}
            <section id="stays" className="scroll-mt-28">
              <TourStays stays={tour.stays} />
            </section>

            {/* Memorable Moments */}
            <section id="moments" className="scroll-mt-28">
              <TourMoments moments={tour.moments} />
            </section>

            {/* Reviews */}
            <section id="reviews" className="scroll-mt-28">
              <TourReviews
                reviews={tour.reviews}
                overallRating={tour.rating}
                totalReviews={tour.reviewCount}
              />
            </section>

            {/* Make Review */}
            <section id="make-review" className="scroll-mt-28">
              <MakeReview tourIdOrSlug={tour.slug /* or tour.id */} />
            </section>

            {/* FAQ */}
            <section id="faq" className="scroll-mt-28">
              <TourFAQ faqs={tour.faq} />
            </section>

            {/* Location Map */}
            <section id="map" className="scroll-mt-28">
              <TourMap mapEmbed={tour.mapEmbed} />
            </section>

            {/* Image Gallery */}
            <section id="gallery" className="scroll-mt-28">
              <h2 className="text-2xl font-semibold mb-4 mt-6">Gallery</h2>
              <ImageGallery images={tour.images.gallery} />
            </section>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            {/* Mobile: Show booking at top */}
            <div className="lg:hidden mb-8">
              <EnquireNow
                basePrice={tour.booking.pricing.adult}
                tourDuration={parseInt(tour.overview.duration.split(" ")[0])}
                tagMonths={tour.tagMonths}
                tourType={tour.tourType}
                tourId={tour.id}
                getDateRange={tour.dateRange}
                creatorId={tour.creator.id}
              />
            </div>

            {/* Desktop: sticky sidebar */}
            <div className="hidden lg:block lg:sticky lg:top-20">
              <OverviewCard
                duration={tour.overview.duration}
                suggestedAges={tour.overview.ageRange}
                maxGroupSize={tour.overview.groupSize}
                price={tour.price}
              />

              <EnquireNow
                basePrice={tour.booking.pricing.adult}
                tourDuration={parseInt(tour.overview.duration.split(" ")[0])}
                tagMonths={tour.tagMonths}
                tourType={tour.tourType}
                tourId={tour.id}
                getDateRange={tour.dateRange}
                creatorId={tour.creator.id}
              />
              <div className="w-full mt-4  shadow-md hover:shadow-lg transition-shadow duration-300">
                <UserCard
                  avatar={tour.creator.profileImg}
                  name={tour.creator.name}
                  description={tour.creator.bio}
                  id={tour.creator.id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Mapper: API -> UI tour model ---------- */

function clamp(n, min, max) {
  n = Number(n);
  return Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : min;
}

function normalizeTime12(s = "") {
  // Accepts: "9:00 AM", "09:00am", "0900AM" → returns "9:00 AM"
  const t = String(s).trim().replace(/\s+/g, "");
  const m = t.match(/^(\d{1,2}):?(\d{2})?([AaPp][Mm])$/);
  if (!m) return s;
  let h = Number(m[1]);
  if (h < 1 || h > 12) return s;
  const min = (m[2] || "00").padStart(2, "0");
  return `${h}:${min} ${m[3].toUpperCase()}`;
}

function mapBlocks(blocks) {
  // Your schema sometimes has blocks as an *array*, sometimes a single object.
  if (Array.isArray(blocks)) {
    return blocks.map((b) => ({
      time: b?.time ? normalizeTime12(b.time) : "",
      title: b?.title || "",
      activity: b?.activity || "",
      notes: b?.notes || "",
      image: b?.image || "",
    }));
  }
  if (blocks && typeof blocks === "object") {
    return [
      {
        time: blocks?.time ? normalizeTime12(blocks.time) : "",
        title: blocks?.title || "",
        activity: blocks?.activity || "",
        notes: blocks?.notes || "",
        image: blocks?.image || "",
      },
    ];
  }
  return [];
}

function mapItinerary(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.map((d) => ({
    day: Number(d?.day) || 1,
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
  if (!u || typeof u !== "object") return null;
  return {
    id: u?._id || u?.id,
    name: u?.name || "",
    email: u?.email || "",
    profileImg: u?.profileImg || "",
    bio: u?.bio || "",
  };
}

/* ---------- Mapper: API -> UI tour model ---------- */
function toTourModel(api) {
  if (!api) return null;

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
  const durationStr = `${durationDays} day${durationDays === 1 ? "" : "s"}`;

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
  const currency = api?.price?.currency || api?.currency || "INR";
  const priceAdult =
    api?.details?.pricePerPerson ??
    api?.price?.adult ??
    api?.booking?.pricing?.adult ??
    0;

  // Badges
  const badges = [];
  if (api?.tourType === "fixed_date") badges.push("Fixed Date");
  if (api?.status === "published") badges.push("Published");

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
          heroImg: m?.heroImg || "",
          displayImg: m?.displayImg || "",
        }))
      : [],
  };

  // Creator (createdBy — already selectively populated on server)
  const creator = mapCreator(api?.createdBy);

  return {
    // Hero / top
    title: api?.title || "Untitled Tour",
    subtitle: api?.brief || "",
    location: api?.place || "—",
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
      groupSize: api?.details?.groupSize || "—",
      ageRange: api?.details?.ageRestriction || api?.overview?.ageRange || "—",
      languages: api?.details?.languages || [],
      description: api?.description || "",
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
    mapEmbed: api?.mapEmbed || api?.extras?.mapEmbed || "",

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
    tourType: api?.tourType || "",
    dateRange: { startDate, endDate },
    getDateRange: () => ({ startDate, endDate }),
    slug: api?.slug,
    id: api?._id || api?.id,
    status: api?.status,
    createdAt: api?.createdAt,
    updatedAt: api?.updatedAt,

    // Not used by the static design but handy to have:
    creator, // { id, name, email, profileImg, bio }
    related, // { blogs, destinations, experiences, spotlights, tours, tagMonths }
    seo: api?.seo || {},
    extras: api?.extras || {},
  };
}
