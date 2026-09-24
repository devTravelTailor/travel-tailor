import { buildPageMetadata } from "../../../util/metaData";
import { buildBreadcrumbSchema } from "../../../util/schema";
import { getCanonicalUrl } from "../../../util/seo";

async function getCreatorProfile(id) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl || !id) {
    return null;
  }

  const authToken =
    process.env.NEXT_PUBLIC_API_TOKEN ||
    process.env.NEXT_PUBLIC_TOKEN ||
    process.env.API_TOKEN;

  try {
    const response = await fetch(`${baseUrl}/api/users/profile/${id}`, {
      headers: {
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Failed to load creator metadata:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const profileData = await getCreatorProfile(id);
  const creatorName = profileData?.user?.name || `Creator ${id}`;
  const description =
    profileData?.user?.bio ||
    `${creatorName} on Travel Tailor with curated tours, blogs, and travel inspiration.`;
  const profileImage =
    profileData?.user?.profileImg ||
    profileData?.user?.profileImage ||
    profileData?.user?.avatar ||
    "/images/logoAlt.png";

  return buildPageMetadata({
    title: `${creatorName} | Travel Tailor`,
    description,
    path: `/creator/${id}`,
    image: profileImage,
    imageAlt: creatorName,
    type: "profile",
    keywords: [
      creatorName,
      "travel creator",
      "travel itineraries",
      "travel tailor creator",
    ],
  });
}

export default async function CreatorProfileLayout({ children, params }) {
  const { id } = await params;
  const schema = buildBreadcrumbSchema([
    {
      name: "Home",
      url: getCanonicalUrl("/"),
    },
    {
      name: "Creators",
      url: getCanonicalUrl("/creator"),
    },
    {
      name: id,
      url: getCanonicalUrl(`/creator/${id}`),
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
