import Link from "next/link";
import { Card, CardContent } from "./components/ui/card";
import { Compass, Map, MapPin, Route, Star, Users } from "lucide-react";
import Tour from "./components/CustomUI/Card/Tour";
import styles from "./page.module.css";
import { Button } from "./components/ui/button";
import Banner from "./components/Banner/Banner";
import Image from "next/image";
import { TourCard } from "./components/TourList/TourCard";
import Experiences from "./components/Sections/Experiences";
import BentoGrid from "./components/CustomUI/BentoGrid/BentoGrid";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export default async function Main() {
  // ✅ Fetch on the server (SSR)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/main`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    // cache: "no-store",

    // Force cache (no revalidation)
    cache: "force-cache",
    // Or, if you want timed revalidation:
    next: { revalidate: 3 }, // revalidate every hour
  });

  if (!res.ok) {
    console.error("Failed to fetch hero data:", res.statusText);
    throw new Error("Failed to load homepage data");
  }

  const { data } = await res.json();

  console.log(data);

  const popularDestination = data?.popularDestination || [];
  const popularExperience = data?.popularExperience || [];
  const creators = data?.creators || [];
  const upcomingTrips = data?.upcomingTours || [];
  const fallback = "/images/avatar.webp";
  const stats = data?.global.stats || {};

  // console.log(popularDestination, popularExperience, creators, upcomingTrips);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Section */}
      <div className="flex flex-col relative h-[50vh] md:h-[91vh] items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/bg.jpg"
          >
            <source src="/bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
        </div>

        {/* Center Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h2 className="text-6xl mb-4 font-light text-orange-600 tracking-tight leading-tight font-handwriting">
            Every Step,
            <br />
            <span className="text-white font-sans text-6xl xl:text-8xl">
              Every Journey
            </span>
          </h2>

          <p className="text-md md:text-2xl xl:text-3xl text-white/90 mb-6 xl:mb-12 font-light">
            Fly above the ordinary, travel today.
          </p>
          <div>
            <Link href="/contact">
              <Button varient="outline" className=" bg-orange-600 text-white">
                Let&#39;s craft your next adventure today!
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Strip - Directly below hero */}

      {stats && (
        <div className="bg-gradient-to-r from-orange-600/80 via-orange-600/90 to-orange-600/80">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-6">
            <div className="flex flex-wrap items-center justify-between gap-6 md:gap-4">
              {stats?.happyTravelers !== null && (
                <>
                  <div className="flex min-w-[8rem]  items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {stats?.happyTravelers}+
                      </h3>
                      <p className="text-xs text-white/80">Happy Travelers</p>
                    </div>
                  </div>
                  <div className="hidden md:block w-px h-12 bg-white/40" />
                </>
              )}
              {stats?.destinationsCreated !== null && (
                <>
                  <div className="flex min-w-[8rem] items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <Compass className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {stats?.destinationsCreated}+
                      </h3>
                      <p className="text-xs text-white/80">Destinations</p>
                    </div>
                  </div>

                  <div className="hidden md:block w-px h-12 bg-white/40" />
                </>
              )}

              {stats?.toursCurated !== null && (
                <>
                  <div className="flex min-w-[8rem]  items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <Route className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {stats?.toursCurated}+
                      </h3>
                      <p className="text-xs text-white/80">Tours Created</p>
                    </div>
                  </div>

                  <div className="hidden md:block w-px h-12 bg-white/40" />
                </>
              )}

              {stats?.rating !== null && (
                <div className="flex min-w-[8rem]  items-center gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Star className="w-5 h-5 text-white fill-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {stats?.rating}
                    </h3>
                    <p className="text-xs text-white/80">Avg. Rating</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {popularDestination.length > 0 && (
        <section className="py-16 pt-8 ">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in">
              <div className="text-3xl flex w-full h-fit flex-col justify-center gap-4 items-center md:text-5xl font-bold mb-2">
                <Image
                  src="/images/Traveltailorliner.png"
                  width={280}
                  height={150}
                  alt="logo"
                />
                <span className="text-orange-600/80 text-3xl md:text-4xl font-handwriting">
                  Our Customised Experiences
                </span>
              </div>
              <p className="text-md text-muted-foreground max-w-2xl mx-auto">
                Handpicked journeys that bring you closer to culture, nature,
                and adventure — all crafted by our expert travel curators.
              </p>
            </div>
            <div className="container mx-auto">
              {popularDestination.length > 0 && (
                <div className="p-5  w-full">
                  {/* Grid Section */}
                  <h3 className="text-2xl font-bold mb-6 px-3">
                    Popular Destinations
                  </h3>
                  <div className="overflow-x-auto scrollbar-hidden ">
                    <div className="flex  gap-4 justify-center min-w-max">
                      {popularDestination?.slice(0, 4).map((item, index) => {
                        const tags = `Starting Price: ₹${item?.startingPrice}`;
                        return (
                          <div key={index} className={styles.gridItem}>
                            <Tour
                              key={index}
                              description={item.description}
                              imgUrl={item.heroImg || item.displayImg}
                              title={item.title}
                              slug={item.slug}
                              id={item._id}
                              tag={tags}
                              type={"destinations"}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
              {popularExperience.length > 0 && (
                <div className="p-5  w-full">
                  {/* Grid Section */}
                  <h3 className="text-2xl font-bold mb-6 px-3">
                    Popular Experiences
                  </h3>
                  <div className="">
                    <div className=" px-4">
                      {popularExperience.length > 0 && (
                        <BentoGrid experiences={popularExperience} />
                      )}
                    </div>
                  </div>
                </div>
              )}

              <Link href="/home">
                <Button
                  type="block"
                  varient="outline"
                  className="mx-auto block mt-12 rounded-full hover:bg-white border border-orange-600/80 hover:text-orange-600/80 bg-orange-600/80 text-white"
                >
                  Check Travel Tailor
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
      {(upcomingTrips.length > 0 || creators.length > 0) && (
        <section className="py-16 pb-8">
          <div className="container mx-auto px-7">
            {/* Header */}
            <div className="text-center mb-12 w-full animate-fade-in">
              <div className="text-3xl flex w-full h-fit flex-col justify-center gap-4 items-center md:text-5xl font-bold mb-2">
                <Image
                  src="/images/Trailsmith.png"
                  width={250}
                  height={100}
                  alt="logo"
                />
                <span className="text-orange-600/80 text-3xl md:text-4xl font-handwriting">
                  Journeys with a story — crafted by those who’ve lived them.
                </span>
              </div>

              {/* 📝 Description */}
              <p className="text-md text-muted-foreground max-w-2xl mx-auto">
                Trailsmith is where travel meets mastery. Each journey is shaped
                by creators, experts, and explorers who turn their craft into an
                experience — from filmmaker-led expeditions and wellness
                retreats, to photography trails and adventures curated by those
                who know the path best. Whether they lead the journey in person
                or curate it from their own travels, every Trailsmith experience
                is designed to inspire, challenge, and connect you more deeply
                with the world and yourself.
              </p>
            </div>

            {/* Grid Section */}
            {creators.length > 0 && (
              <div className="md:p-5 w-full max-md:text-center">
                <h3 className="text-2xl font-bold mb-6 px-3">Our Smiths</h3>

                {/* Flex Container with Scroll and Hidden Scrollbar */}
                <div className="overflow-x-auto scrollbar-hidden ">
                  <div className="flex gap-4 min-w-max">
                    {creators?.slice(0, 6).map((advisor, index) => (
                      <Card
                        key={index}
                        className="group p-0 w-[200px] overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in border-0 "
                      >
                        <CardContent className="p-0 relative h-64 md:h-72 lg:h-80">
                          <a href={`/creator/${advisor.slug || advisor._id}`}>
                            {/* Image */}
                            <div className="absolute inset-0 overflow-hidden">
                              <img
                                src={advisor.profileImg || fallback}
                                alt={advisor.name}
                                className="w-full h-full object-cover transition-transform scale-110 duration-700 ease-in-out group-hover:scale-100"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            </div>

                            {/* Overlay Content */}
                            <div className="relative z-10 h-full flex flex-col justify-end p-4 text-white">
                              <h3 className="text-lg font-semibold mb-1 truncate">
                                {advisor.name}
                              </h3>

                              {advisor?.location && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3.5 w-3.5 text-white/70" />
                                  <span className="text-xs text-white/70 truncate">
                                    {advisor.location}
                                  </span>
                                </div>
                              )}
                            </div>
                          </a>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Grid Section */}
            {upcomingTrips.length > 0 && (
              <div className=" pt-8 md:p-5 max-md:text-center w-full">
                <h3 className="text-2xl font-bold mb-6 px-3">Upcoming Trips</h3>
                <div className="overflow-x-auto scrollbar-hidden ">
                  <div className="grid grid-cols-1 md:grid-cols-4  gap-4 justify-start py-2">
                    {upcomingTrips?.slice(0, 4).map((item, index) => {
                      const tags = `${item?.details?.totalDays} Days`;
                      return (
                        <div key={index}>
                          <TourCard
                            title={item.title}
                            description={item.brief}
                            tourType={item.tourType}
                            slug={item.slug}
                            location={item.place}
                            heroImg={item.heroImg}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link href="/creator">
            <Button
              type="block"
              varient="outline"
              className="mx-auto block mt-12 rounded-full hover:bg-white border border-orange-600/80 hover:text-orange-600/80 bg-orange-600/80 text-white"
            >
              Explore Trails
            </Button>
          </Link>
        </section>
      )}

      <Banner
        title={"Dreaming of an Adventure? /nLet's Talk!"}
        cta={"Enquire now"}
      />
    </section>
  );
}
