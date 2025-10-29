import MonthHero from "../../components/Hero/MonthHero";
import Highlights from "../../components/Sections/Highlights";
import DreamVacaySteps from "../../components/Steps/DreamVacaySteps";
import FoundersSection from "../../components/Sections/Founders/FoundersSection";
import Banner from "../../components/Banner/Banner";

export const metadata = {
  title: "About | Travel Tailor",
  description: "About us",
  openGraph: {
    title: "About | Travel Tailor",
    description: "About us",
  },
};

export default function about() {
  return (
    <main>
      <MonthHero
        month="About Travel Tailor"
        description="Know more about our journey, stories, and team"
        imgUrl="/images/aboutHero.jpg"
      />
      <Highlights
        title="Who are we? /n To begin with, /swe are NOMADS\s "
        brief="Travel Tailor was born from a deep love for travel, experiences, discoveries and a unshakable belief that travel must be anything but ordinary. Founded by avid travellers Kanishka and Himanshu, in 2024, the travel platform aims to convert ordinary travel tales into extraordinary experiences./n /n
As a couple, Kanishka and Himanshu visited about 16 countries and 25 cities. Through this platform, they share their adventures with people all over the world, inspiring others to explore just like they did. A big plus, the couple come with a solid experience in planning trips and a deep-rooted passion in building a community that will bring together travel enthusiasts./n /n
At Travel Tailor, we call ourselves digital nomads, and the world is our playground. So, are you ready to explore the nooks and corners with us? You are just four steps away! Look below:"
        imgUrl="/images/aboutSide.jpg"
        noBtn={true}
      />

      <DreamVacaySteps />
      <FoundersSection />
      <Banner
        title="Ready for an Adventure? /n Let's Talk!"
        cta="Enquire now"
      />
    </main>
  );
}
