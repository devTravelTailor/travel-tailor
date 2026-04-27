import Script from "next/script";
import { Caveat, Open_Sans } from "next/font/google";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(process.env.DOMAIN || "https://traveltailor.in"),
  title: {
    default: "Travel Tailor | Custom Travel Experiences",
    template: "%s | Travel Tailor",
  },
  description:
    "Travel Tailor crafts personalised holidays, tours, and destination experiences across India and beyond.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    siteName: "Travel Tailor",
    locale: "en_US",
    type: "website",
  },
};
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import WhatsAppButton from "./components/CustomUI/Button/Whatsapp";
import AnalyticsLoader from "./lib/AnLoader";
import PopupForm from "./components/Popup/PopupForm";
import GoogleProviderClient from "./components/Auth/GoogleProviderClient";
import ToastProvider from "./components/Toast/ToastProvider";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

async function getSettings() {
  try {
    const authToken =
      process.env.NEXT_PUBLIC_API_TOKEN ||
      process.env.NEXT_PUBLIC_TOKEN ||
      process.env.API_TOKEN;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/settings/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      throw new Error(`Settings fetch failed: ${res.status}`);
    }

    const raw = await res.json();
    return raw?.data ?? raw;
  } catch (err) {
    console.error("Failed to load settings for layout:", err);
    return null;
  }
}

export default async function RootLayout({ children }) {
  const setting = await getSettings();
  const fallbackGtmId =
    process.env.NEXT_PUBLIC_GTM_ID?.trim() ||
    process.env.NEXT_PUBLIC_GA_ID?.trim();
  const gtmId = setting?.tracking?.gtmId?.trim() || fallbackGtmId;
  const extraScripts = setting?.tracking?.extraScripts;

  return (
    <html
      lang="en"
      className={`${caveat.variable} ${openSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        {gtmId ? (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
              `,
            }}
          />
        ) : null}

        {extraScripts ? (
          <Script
            id="extra-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: extraScripts,
            }}
          />
        ) : null}

        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>

      </head>
      <body suppressHydrationWarning>
        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        <GoogleProviderClient>
          <Navbar />
          {children}
          <Footer setting={setting} />
          {setting?.whatsapp?.number ? (
            <WhatsAppButton
              phoneNumber={setting.whatsapp.number}
              position="right"
              tooltip="Chat on WhatsApp"
            />
          ) : null}

          <PopupForm />
        </GoogleProviderClient>
        <ToastProvider />

        <AnalyticsLoader />
      </body>
    </html>
  );
}
