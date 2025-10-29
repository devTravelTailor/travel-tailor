"use client";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { MapPin } from "lucide-react";

const fallback = "/images/avatar.webp";

const AdvisorCarousel = ({ data }) => {
  const carouselRef = useRef(null); // Reference to the carousel container
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    // Repeat the data until we have 30 items
    const repeatedData = [];
    while (repeatedData.length < 30) {
      repeatedData.push(...data); // Keep appending data
    }
    setDisplayData(repeatedData.slice(0, 30)); // Ensure only 30 items are shown

    const scrollSpeed = 1; // Control the scrolling speed (1px per animation frame)

    const scroll = () => {
      if (carouselRef.current) {
        const scrollWidth = carouselRef.current.scrollWidth;
        const clientWidth = carouselRef.current.clientWidth;
        const currentScroll = carouselRef.current.scrollLeft;

        // If we've reached the end, reset the scroll position to the beginning
        if (currentScroll + clientWidth >= scrollWidth) {
          carouselRef.current.scrollLeft = 0; // Reset to the beginning
        } else {
          carouselRef.current.scrollLeft += scrollSpeed; // Scroll by 1px
        }
      }
    };

    const interval = setInterval(scroll, 15); // Slow scrolling (every 15ms)

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [data]);

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Your perfect next trip. Via
            <br />
            <span className="text-orange-600 text-3xl md:text-4xl font-handwriting">
              Travel Influencers & expert Travel advisors
            </span>
          </h2>
          <p className="text-md text-muted-foreground max-w-2xl mx-auto">
            Book hot deals from our Influencers' Travel Stores or reach out to
            our travel advisors to have them craft trips tailored to your
            preferences.
          </p>
        </div>

        {/* Advisor Cards */}
        <div className="overflow-x-auto scrollbar-hidden" ref={carouselRef}>
          <div className="flex gap-4 min-w-max">
            {displayData.map((advisor, index) => (
              <div
                key={index} // Use index if there's no unique _id for duplicated items
                className="pl-6 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
              >
                <Card className="group p-0 w-[230px] overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in border-0">
                  <CardContent className="p-0 relative h-80">
                    <a href={`/creator/${advisor._id}`}>
                      <div className="absolute inset-0 overflow-hidden">
                        <img
                          src={advisor.profileImg || fallback}
                          alt={advisor.name}
                          className="w-full h-full object-cover transition-transform scale-110 duration-700 ease-in-out group-hover:scale-100 group-hover:origin-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      </div>

                      <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                        <h3 className="text-xl font-semibold mb-2">
                          {advisor.name}
                        </h3>

                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-white/70" />
                          <span className="text-sm text-white/70">
                            {advisor.location}
                          </span>
                        </div>
                      </div>
                    </a>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvisorCarousel;
