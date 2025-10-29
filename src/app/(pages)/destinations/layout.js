export const metadata = {
    title: "Destinations | Discover Amazing Places | Travel Tailor",
    description: "Explore top destinations around the world and plan your next trip.",
    openGraph: {
      title: "Destinations | Discover Amazing Places",
      description: "Explore top destinations around the world and plan your next trip.",
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
  
  export default function DestinationsLayout({ children }) {
    return <>{children}</>;
  }