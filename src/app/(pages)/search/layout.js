export const metadata = {
    title: "Search | Travel Tailor",
    description: "Search for destinations, blogs, tours, and more.",
    openGraph: {
      title: "Search | Travel Tailor",
      description: "Search for destinations, blogs, tours, and more.",
      type: "website",
      images: [
        {
          url: "https://yourwebsite.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Search",
        },
      ],
    },
  };
  
export default function SearchLayout({ children }) {
return <>{children}</>;
}