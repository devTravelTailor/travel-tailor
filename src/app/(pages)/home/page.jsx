// app/page.js
import { notFound } from "next/navigation";
import HomeHero from "../../components/Hero/HomeHero";

import Trips from "../../components/Featured/Trips";

import GroupHome from "../../components/Featured/GroupHome";
import Testimonials from "../../components/Testimonials/Testimonials";
import Blogs from "../../components/Featured/Blogs";
import Banner from "../../components/Banner/Banner";
import Steps from "../../components/Steps/Steps";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getHomepageData() {
  console.log(`API_URL: ${process.env.API_URL}`);

  try {
    const response = await fetch(`${process.env.API_URL}/api/home`, {
      // cache: "force-cache",
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
      cache: "no-cache",
    });

    if (!response.ok) {
      // Throw an error for non-2xx responses
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    const home = response.json();
    return home;
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    notFound();
  }
}

export default async function Home() {
  const { data } = await getHomepageData();

  const { hero, months, destinations, reviews, features } = data || {};

  const bannerTitle = "Dreaming of an Adventure? /n Let's Talk!";
  const bannerCta = "Enquire now";

  console.log(hero, months, destinations, reviews, features);

  return (
    <main>
      {hero && hero.length > 0 && <HomeHero heroData={hero} />}
      {/* <Features /> */}
      <Steps />
      {destinations?.length > 0 &&
        months?.length > 0 &&
        features[0]?.traveller?.length > 0 && (
          <GroupHome
            destinations={destinations}
            months={months}
            traveller={features[0]?.traveller}
            expereinces={features[0]?.experiences}
          />
        )}

      {reviews && reviews.length > 0 && <Testimonials reviews={reviews} />}

      {/* {data.moments && data.moments.length > 0 && <MomentsHome monents={data.moments} />} */}
      {/* {reviews && reviews.length > 0 && <Reviews reviews={reviews} />} */}
      {data?.tours && data?.tours.length > 0 && <Trips trips={data.tours} />}

      {features[0]?.blogs && features[0]?.blogs.length > 0 && (
        <Blogs blogs={features[0]?.blogs.reverse()} />
      )}
      <Banner title={bannerTitle} cta={bannerCta} />
    </main>
  );
}
