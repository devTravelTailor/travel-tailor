import { MetadataRoute } from "next";

const baseUrl = process.env.DOMAIN;

async function fetchSlugs(endpoint) {
  try {
    const response = await fetch(`${process.env.API_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },

      next: {
        revalidate: 86400, // Revalidate daily (in seconds: 60*60*24)
      },
    });

    console.log("response", response);

    if (response.status !== 200) {
      console.error(
        `Failed to fetch slugs from ${endpoint}`,
        response.status,
        response.statusText
      );
      return []; // Return empty array on error
    }

    const json = await response.json();

    // unwrap if the API returns { data: [...] } or { slugs: [...] }
    const data = Array.isArray(json)
      ? json
      : Array.isArray(json.data)
      ? json.data
      : Array.isArray(json.slugs)
      ? json.slugs
      : [];

    // check empty
    if (!Array.isArray(data) || !data.length) {
      console.warn(`⚠️ ${endpoint} returned no valid slugs`);
      return [];
    }

    // Assuming each item in the array has a 'slug' property
    return data.map((item) => ({
      slug: item.slug,
      lastModified: item.updatedAt ? new Date(item.updatedAt) : new Date(), // Use updatedAt if available, otherwise current date
      // changeFrequency: 'weekly', // Optional hint
      // priority: 0.8, // Optional hint for dynamic content
    }));
  } catch (error) {
    console.error(`Error fetching slugs from ${endpoint}:`, error);
    return []; // Return empty array on error
  }
}

export default async function sitemap() {
  try {
    const blogSlugs = await fetchSlugs("/apihome/slugs/blog");
    const tourSlugs = await fetchSlugs("/apihome/slugs/tour");
    const destinationSlugs = await fetchSlugs("/apihome/slugs/destination");

    console.log(`✅ Sitemap data fetched`, {
      blogs: blogSlugs.length,
      tours: tourSlugs.length,
      destinations: destinationSlugs.length,
    });

    const mapEntries = (arr, prefix) =>
      arr.map((item) => ({
        url: `${baseUrl}/${prefix}/${item.slug}`,
        lastModified: item.lastModified || new Date(),
      }));

    const staticPages = [
      { url: `${baseUrl}/`, lastModified: new Date() },
      { url: `${baseUrl}/contact`, lastModified: new Date() },
      { url: `${baseUrl}/about`, lastModified: new Date() },
    ];

    return [
      ...staticPages,
      ...mapEntries(blogSlugs, "blogs"),
      ...mapEntries(tourSlugs, "tours"),
      ...mapEntries(destinationSlugs, "destinations"),
    ];
  } catch (err) {
    console.error("❌ Sitemap generation failed:", err);
    return [
      { url: `${baseUrl}/`, lastModified: new Date() },
      { url: `${baseUrl}/contact`, lastModified: new Date() },
    ]; // Always return something so build passes
  }
}
