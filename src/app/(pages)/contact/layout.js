export const metadata = {
    title: "Contact Us | Send your inquiry | Travel Tailor",
    description: "Contact us for any inquiries or to book your next trip with us.",
    openGraph: {
      title: "Contact Us | Send your inquiry",
      description: "Contact us for any inquiries or to book your next trip with us.",
      type: "website",
      images: [
        {
          url: "https://yourwebsite.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Contact",
        },
      ],
    },
  };
  
export default function ContactLayout({ children }) {
return <>{children}</>;
}