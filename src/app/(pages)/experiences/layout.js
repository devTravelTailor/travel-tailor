export const metadata = {
    title: "Experinces | Discover Amazing Places | Travel Tailor",
    description: "Experince the best places around the world and plan your next trip.",
    openGraph: {
      title: "Experinces | Discover Amazing Places",
      description: "Experince the best places around the world and plan your next trip.",
      type: "website",
      images: [
        {
          url: "https://yourwebsite.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Destinations",
        },
      ],
    },
  };
  
export default function ExperiencesLayout({ children }) {
return <>{children}</>;
}