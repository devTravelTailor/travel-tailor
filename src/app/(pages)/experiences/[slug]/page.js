import { notFound } from 'next/navigation';
import { Outfit } from 'next/font/google';

import parseUrl from '../../../util/parseUrl';
import SmoothScroll from '../../../components/Shared/SmoothScroll';
import ExperienceHero from '../../../components/Experiences/ExperienceHero';
import ExperienceHighlight from '../../../components/Experiences/ExperienceHighlight';
import ExperienceQuote from '../../../components/Experiences/ExperienceQuote';
import SoloTravellersSection from '../../../components/Experiences/SoloTravellersSection';
import DesignedForOne from '../../../components/Experiences/DesignedForOne';
import ExperienceTestimonial from '../../../components/Experiences/ExperienceTestimonial';
import BeforeYouGoSection from '../../../components/Experiences/BeforeYouGoSection';
import ExperienceContactForm from '../../../components/Experiences/ExperienceContactForm';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

export const revalidate = 3600;

// ── Data ─────────────────────────────────────────────────────────────────────
async function fetchExperienceData(slug) {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/experiences/${slug}`,
      {
        headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
        next: { revalidate: 3600 },
      },
    );
    if (!response.ok) return null;
    const expData = await response.json();
    return expData.data;
  } catch {
    return null;
  }
}

// ── SEO ──────────────────────────────────────────────────────────────────────
const DEFAULT_SEO = {
  title: 'Travel Experiences | Travel Tailor',
  description:
    'Discover curated travel experiences crafted for the independent traveller. Bespoke itineraries, cultural depth, and total freedom.',
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await fetchExperienceData(slug);

  if (!data) {
    return {
      title: 'Experience Not Found | Travel Tailor',
      description: DEFAULT_SEO.description,
    };
  }

  const title = data.title
    ? `${data.title} | Travel Tailor`
    : DEFAULT_SEO.title;
  const description =
    data.highlight?.brief || data.metaDescription || DEFAULT_SEO.description;
  const imageUrl = data.heroImg ? parseUrl(data.heroImg) : null;
  const canonicalUrl = `${process.env.DOMAIN}/experiences/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: data.title || 'Travel Experiences',
      description,
      url: canonicalUrl,
      siteName: 'Travel Tailor',
      type: 'website',
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title || 'Travel Experiences',
      description,
      images: imageUrl ? [imageUrl] : [],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export async function generateStaticParams() {
  try {
    const response = await fetch(
      `${process.env.API_URL}/apihome/slugs/experience`,
    );
    if (!response.ok) return [];
    const slugsData = await response.json();
    if (!Array.isArray(slugsData) || slugsData.length === 0) return [];
    if (typeof slugsData[0] === 'string')
      return slugsData.map((s) => ({ slug: s }));
    if (slugsData[0]?.slug) return slugsData.map((s) => ({ slug: s.slug }));
    return [];
  } catch {
    return [];
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function ExperiencePage({ params }) {
  const { slug } = await params;
  const data = await fetchExperienceData(slug);

  if (!data) notFound();

  const destinations = Array.isArray(data.destinations)
    ? data.destinations
    : [];
  const blogs = Array.isArray(data.blogs) ? data.blogs : [];
  const testimonials = Array.isArray(data.testimonials)
    ? data.testimonials
    : [];
  const tagMonths = Array.isArray(data.tagMonths) ? data.tagMonths : [];
  const primaryDestination =
    destinations.find((destination) => destination?.category) ||
    destinations[0] ||
    null;
  const bestTime = tagMonths.length
    ? tagMonths
        .map(
          (m) =>
            m?.name ||
            m?.title ||
            m?.monthTag ||
            m?.tag ||
            m?.label ||
            m?.month ||
            '',
        )
        .filter(Boolean)
    : null;

  return (
    <main className={`${outfit.variable} font-sans antialiased bg-white pb-0`}>
      <SmoothScroll />
      <ExperienceHero
        heroImg={data.heroImg}
        title={data.title}
        heroLabel={data.heroLabel}
        heroDescription={data.heroDescription}
        idealFor={data.idealFor}
        pricing={data.pricing}
        bestTime={bestTime}
      />
      <ExperienceQuote
        category={primaryDestination?.category}
        destination={primaryDestination}
        quote={primaryDestination?.category?.quote}
      />
      <ExperienceHighlight
        highlight={data.highlight}
        title={data.title}
        heroImg={data.heroImg}
      />

      <SoloTravellersSection destinations={destinations} />
      <DesignedForOne />
      <ExperienceTestimonial testimonials={testimonials} />
      <BeforeYouGoSection blogs={blogs} />
      <ExperienceContactForm />
    </main>
  );
}
