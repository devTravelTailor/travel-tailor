function getBaseUrl() {
  const rawUrl = process.env.DOMAIN || "https://traveltailor.in";
  const withProtocol = /^https?:\/\//i.test(rawUrl)
    ? rawUrl
    : `https://${rawUrl}`;
  return withProtocol.replace(/\/+$/, "");
}

const baseUrl = getBaseUrl();

async function fetchSlugs(endpoint) {
  try {
    const response = await fetch(`${process.env.API_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      console.error(
        `Sitemap: failed to fetch slugs from ${endpoint}`,
        response.status,
        response.statusText
      );
      return [];
    }

    const json = await response.json();

    const data = Array.isArray(json)
      ? json
      : Array.isArray(json.data)
      ? json.data
      : Array.isArray(json.slugs)
      ? json.slugs
      : [];

    if (!data.length) {
      console.warn(`Sitemap: ${endpoint} returned no slugs`);
      return [];
    }

    return data.map((item) => ({
      slug: item.slug,
      lastModified: item.updatedAt ? new Date(item.updatedAt) : new Date(),
    }));
  } catch (error) {
    console.error(`Sitemap: error fetching ${endpoint}:`, error);
    return [];
  }
}

export default async function sitemap() {
  try {
    const [blogSlugs, tourSlugs, destinationSlugs, experienceSlugs] =
      await Promise.all([
        fetchSlugs("/apihome/slugs/blog"),
        fetchSlugs("/apihome/slugs/tour"),
        fetchSlugs("/apihome/slugs/destination"),
        fetchSlugs("/apihome/slugs/experience"),
      ]);

    console.log("Sitemap generated", {
      blogs: blogSlugs.length,
      tours: tourSlugs.length,
      destinations: destinationSlugs.length,
      experiences: experienceSlugs.length,
    });

    const mapEntries = (arr, prefix, priority = 0.7, changeFrequency = "weekly") =>
      arr.map((item) => ({
        url: `${baseUrl}/${prefix}/${item.slug}`,
        lastModified: item.lastModified || new Date(),
        changeFrequency,
        priority,
      }));

    const staticPages = [
      {
        url: `${baseUrl}/`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      },
      {
        url: `${baseUrl}/blogs`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/tours`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/destinations`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/experiences`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      },
    ];

    return [
      ...staticPages,
      ...mapEntries(blogSlugs, "blogs", 0.8, "weekly"),
      ...mapEntries(tourSlugs, "tours", 0.9, "weekly"),
      ...mapEntries(destinationSlugs, "destinations", 0.9, "weekly"),
      ...mapEntries(experienceSlugs, "experiences", 0.7, "monthly"),
    ];
  } catch (err) {
    console.error("Sitemap generation failed:", err);
    return [
      { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
      { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ];
  }
}
