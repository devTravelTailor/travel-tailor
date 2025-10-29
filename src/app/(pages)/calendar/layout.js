export const metadata = {
    title: "Calendar | Discover Amazing Places | Travel Tailor",
    description: "Explore top tours around the world and plan your next trip.",
    openGraph: {
      title: "Calendar | Discover Amazing Places",
      description: "Explore top tours around the world and plan your next trip.",
      type: "website",
      images: [
        {
          url: "https://yourwebsite.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Calendar",
        },
      ],
    },
  };
  
export default function CalendarLayout({ children }) {
return <>{children}</>;
}