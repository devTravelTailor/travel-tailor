"use client";

import { useState, useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";

import styles from "../../contact/styles.module.css";
import Spinner from "../../../components/CustomUI/Spinner/Spinner";

import CampaignForm from "../../../components/CustomUI/CampaignForm/CampaignForm";
import Banner from "../../../components/Banner/Banner";
import Steps from "../../../components/Steps/Steps";
import Plans from "../../../components/Plans/Plans";
import Moments from "../../../components/CustomUI/BentoGrid/Moments";
import SectionTitle from "../../../components/CustomUI/SectionTitle/SectionTitle";
import Testimonials from "../../../components/Testimonials/Testimonials";
import Destinations from "../../../components/Sections/Destinations";

import CampHero from "../../../components/CampHero/CampHero";

function Campaign() {
  // Get path name
  const pathname = usePathname();

  // Get params
  const params = pathname.split("/");
  const campaignId = params[params.length - 1];

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Data Fetching ---
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/campaigns/${campaignId}/`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const { data } = await response.json();
        console.log(data);

        setData(data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(err.message || "Failed to fetch data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.status}>
        <Spinner />
      </div>
    );
  }
  if (error) {
    return (
      <div className={styles.status}>Error: Page {campaignId} not found</div>
    );
  }
  if (!data) {
    return (
      <div className={styles.status}>Error: Page {campaignId} not found</div>
    );
  }

  return (
    <section className={styles.campaign}>
      <CampHero heroData={data.hero}>
        <CampaignForm />
      </CampHero>
      <Steps />
      {data.plans && <Plans plans={data.plans} />}
      {data.moments.length > 2 && (
        <div className={styles.moments}>
          <SectionTitle
            title="Curated /sSpecial Moments\s"
            description="Create memories for a lifetime with curated special moments"
            variant="center"
          />
          <Moments moments={data.moments} />
        </div>
      )}
      {data.destinations && data.destinations.length > 0 && (
        <div style={{ marginTop: "80px" }}>
          <Destinations
            destinations={data.destinations}
            heading={{
              title: `Popular Destinations for /s${data.title}\\s`,
              description: "Discover amazing places around the world",
            }}
          />
        </div>
      )}

      {data.testimonials && (
        <Testimonials
          reviews={data.testimonials}
          title="Customer /sReviews\s"
          description="Hear from our customers about their experiences"
        />
      )}

      <div style={{ marginTop: "80px" }}>
        <Banner />
      </div>
    </section>
  );
}

export default Campaign;
