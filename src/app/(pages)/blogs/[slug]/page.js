import BlogBody from "../../../components/BlogBody/BlogBody";
import BlogHero from "../../../components/Hero/BlogHero";
import Tours from "../../../components/Sections/Tours";
import Blogs from "../../../components/Featured/Blogs";
import Banner from "../../../components/Banner/Banner";

import { notFound } from "next/navigation";

// Configure the page to be statically generated
export const dynamic = "force-static";
export const revalidate = false;

// Fetch Blog Data
async function fetchBlogData(slug) {
  try {
    const response = await fetch(`${process.env.API_URL}/api/blog/${slug}`, {
      // cache: 'force-cache',
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const blog = await response.json();
    console.log("👉 Blog Data:", blog.data);

    return blog;
  } catch (error) {
    return null;
  }
}

// Helper
function generateKeywords(title, description) {
  const titleWords = title?.toLowerCase().split(/\s+/);
  const descWords = description?.toLowerCase().split(/\s+/);
  const commonWords = new Set([
    "a",
    "an",
    "the",
    "is",
    "in",
    "it",
    "of",
    "for",
    "on",
    "with",
    "to",
    "and",
    "when",
    "visiting",
  ]);
  const keywords = [...new Set([...titleWords, ...descWords])]
    .filter((word) => word.length > 3 && !commonWords.has(word))
    .slice(0, 10);
  return keywords.join(", ");
}

// Generate metadata for the blog
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const { data } = await fetchBlogData(slug);

  if (!data) {
    // Returning minimal metadata, Page component will handle the 404 display
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }

  // Prioritize SEO specific fields, fallback to main fields
  const metaTitle = data.seo?.metaTitle || data.title;
  const metaDescription = data.seo?.metaDescription || data.description;
  // Ensure absolute URLs for images
  const shareImageUrl = data.seo?.shareImage?.startsWith("/")
    ? `${process.env.BACK_URL_PREFIX}${data.seo.shareImage}`
    : data.seo?.shareImage || // Handle if it's already absolute
      (data.displayImg?.startsWith("/")
        ? `${process.env.BACK_URL_PREFIX}${data.displayImg}`
        : data.displayImg);

  const canonicalUrl = `${process.env.DOMAIN}/blogs/${slug}`;

  return {
    title: metaTitle + " | Travel Tailor",
    description: metaDescription,
    // --- Canonical URL ---
    alternates: {
      canonical: canonicalUrl,
    },
    // --- Open Graph (for social sharing - Facebook, LinkedIn, etc.) ---
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: "Travel Tailor",
      images: shareImageUrl
        ? [
            {
              url: shareImageUrl,
              // width: 1200, // Optional: Specify if known
              // height: 630, // Optional: Specify if known
              alt: `Image for ${metaTitle}`,
            },
          ]
        : [],
      locale: "en_US",
      type: "article",
      publishedTime: data.createdAt,
      modifiedTime: data.updatedAt,
      authors: data.author ? [data.author] : [],
    },
    // --- Twitter Card (for Twitter sharing) ---
    twitter: {
      card: shareImageUrl ? "summary_large_image" : "summary",
      title: metaTitle,
      description: metaDescription,
      images: shareImageUrl ? [shareImageUrl] : [],
    },
    // --- Basic Meta Tags ---
    keywords:
      data.seo?.keywords || generateKeywords(data.title, data.description),
    authors: data.author ? [{ name: data.author }] : [],
    // --- Robots ---
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// Generate static params for pre-rendering
export async function generateStaticParams() {
  try {
    const response = await fetch(`${process.env.API_URL}/apihome/slugs/blog`, {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });

    const blogs = await response.json();

    return blogs.map((blog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    return [];
  }
}

async function BlogPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const { data } = await fetchBlogData(slug);

  if (!data) {
    return notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_DOMAIN}/blogs/${slug}`,
    },
    headline: data.seo?.metaTitle || data.title,
    description: data.seo?.metaDescription || data.description,
    image: data.seo?.shareImage
      ? `${process.env.NEXT_PUBLIC_URL_PREFIX}${data.seo.shareImage}`
      : data.displayImg
      ? `${process.env.NEXT_PUBLIC_URL_PREFIX}${data.displayImg}`
      : undefined,
    author: {
      "@type": "Person",
      name: data.author || "Travel Tailor",
    },
    publisher: {
      "@type": "Organization",
      name: "Travel Tailor",
      // logo: {
      //     '@type': 'ImageObject',
      //     url: `/images/logo.png`,
      //     // width: 600, // Optional but recommended
      //     // height: 60, // Optional but recommended
      // },
    },
    datePublished: data.createdAt, // ISO 8601 format
    dateModified: data.updatedAt, // ISO 8601 format
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {data?.displayImg && (
        <BlogHero
          imgUrl={data?.displayImg}
          title={data?.title}
          description={data?.description}
          auther={data?.author}
          date={data?.createdAt}
        />
      )}
      {data?.body && <BlogBody body={data?.body} />}

      <aside>
        {data?.blogs?.length > 0 && (
          <Blogs
            blogs={data.blogs}
            heading={{
              title: "Similar /sPosts\\s",
              description: "You might like these blogs",
            }}
          />
        )}
        {data?.tours?.length > 0 && (
          <Tours
            tours={data.tours}
            heading={{
              title: "/sTours\\s you might /n enjoy",
              description: "Explore the world with our curated tours",
            }}
          />
        )}
        <Banner
          title={data.bannerTitle || "Ready to Explore?/nLet's Plan Your Trip!"}
          cta={data.bannerCta || "Get a Quote"}
          url={`/contact?src=${resolvedParams.slug}`}
        />
      </aside>
    </article>
  );
}

export default BlogPage;
