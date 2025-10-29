import Link from "next/link";
import { Card, CardContent } from "./components/ui/card";
import { MapPin } from "lucide-react";
import Tour from "./components/CustomUI/Card/Tour";
import styles from "./page.module.css";
import { Button } from "./components/ui/button";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export default async function Main() {
  // ✅ Fetch on the server (SSR)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/main`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    cache: "no-store",

    // Force cache (no revalidation)
    // cache: "force-cache",
    // Or, if you want timed revalidation:
    // next: { revalidate: 3 }, // revalidate every hour
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

  console.log(popularDestination, popularExperience, creators, upcomingTrips);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Section */}
      <div className="flex flex-col relative h-[50vh] md:h-[80vh] items-center justify-center">
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
      {popularDestination.length > 0 && (
        <section className="py-16 ">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Travel Tailor
                <br />
                <span className="text-orange-600 text-3xl md:text-4xl font-handwriting">
                  Customised Experiences
                </span>
              </h2>
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
                  <Link href="/home">
                    <Button
                      type="block"
                      varient="outline"
                      className="mx-auto block mt-12 rounded-full hover:bg-white border border-orange-600 hover:text-orange-600 bg-orange-600 text-white"
                    >
                      Check Travel Tailor
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {(upcomingTrips.length > 0 || creators.length > 0) && (
        <section className="py-16 ">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-5xl font-bold mb-2">
                Trailsmith
                <br />
                <span className="text-orange-600 text-3xl md:text-4xl font-handwriting">
                  The Voice of Modern Travel Creators
                </span>
              </h2>

              {/* 📝 Description */}
              <p className="text-md text-muted-foreground max-w-2xl mx-auto">
                Trailsmith is our creator-led tour blog — a space where seasoned
                travelers and influencers share their hand-crafted journeys,
                unique experiences, and insider stories from around the globe.
              </p>
            </div>

            {/* Grid Section */}
            {upcomingTrips.length > 0 && (
              <div className="p-5 w-full">
                <h3 className="text-2xl font-bold mb-6 px-3">Upcoming Trips</h3>
                <div className="overflow-x-auto scrollbar-hidden ">
                  <div className="flex gap-4 justify-start min-w-max">
                    {upcomingTrips?.slice(0, 4).map((item, index) => {
                      const tags = `${item?.details?.totalDays} Days`;
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
                            type={"tours"}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Grid Section */}
            {creators.length > 0 && (
              <div className="md:p-5 w-full">
                <h3 className="text-2xl font-bold mb-6 px-3">
                  Travel Influencers
                </h3>

                {/* Flex Container with Scroll and Hidden Scrollbar */}
                <div className="overflow-x-auto scrollbar-hidden ">
                  <div className="flex gap-4 min-w-max">
                    {creators?.slice(0, 6).map((advisor, index) => (
                      <Card
                        key={index}
                        className="group p-0 w-[200px] overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in border-0 "
                      >
                        <CardContent className="p-0 relative h-64 md:h-72 lg:h-80">
                          <a href={`/creator/${advisor._id}`}>
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

                              <div className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5 text-white/70" />
                                <span className="text-xs text-white/70 truncate">
                                  {advisor.location}
                                </span>
                              </div>
                            </div>
                          </a>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link href="/creator">
            <Button
              type="block"
              varient="outline"
              className="mx-auto block mt-12 rounded-full hover:bg-white border border-orange-600 hover:text-orange-600 bg-orange-600 text-white"
            >
              Check Creators Tours
            </Button>
          </Link>
        </section>
      )}
    </section>
  );
}
