"use client";
import Script from "next/script";
import "./globals.css";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import WhatsAppButton from "./components/CustomUI/Button/Whatsapp";
import AnalyticsLoader from "./lib/AnLoader";
import PopupForm from "./components/Popup/PopupForm";
import GoogleProviderClient from "./components/Auth/GoogleProviderClient";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }) {
  const [setting, setSetting] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/settings/`;
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          },
          // cache: "force-cache",
        });
        if (!res.ok)
          throw new Error(
            `Settings fetch failed: ${res.status} ${await res.text()}`
          );
        const raw = await res.json();

        // If API returns { data: { ...actualSettings } }, normalize it:
        const cfg = raw?.data ?? raw;
        // console.log("settings cfg", cfg);
        setSetting(cfg);
      } catch (err) {
        console.error(err);
        setSetting(null);
      }
    })();
  }, []);

  return (
    <html lang="en">
      <head>
        {setting?.tracking?.gtmId && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${setting?.tracking?.gtmId}');
              `,
            }}
          />
        )}

        {setting?.tracking?.extraScripts && (
          <Script
            id="extra-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: setting?.tracking.extraScripts, // Use the value of extraScripts directly
            }}
          />
        )}

        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap');
        `}</style>
      </head>
      <body suppressHydrationWarning>
        {setting?.tracking?.gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${setting?.tracking?.gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <GoogleProviderClient>
          <Navbar />
          {children}
          <Footer setting={setting} />
          {/* ... */}
          {setting?.whatsapp?.number ? (
            <WhatsAppButton
              phoneNumber={setting.whatsapp.number}
              // message={setting.whatsapp.message}
              position="right"
              tooltip="Chat on WhatsApp"
            />
          ) : null}

          <PopupForm />
        </GoogleProviderClient>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />

        <AnalyticsLoader />
      </body>
    </html>
  );
}
