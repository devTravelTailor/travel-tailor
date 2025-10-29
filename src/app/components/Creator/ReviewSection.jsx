"use client";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Star, Quote } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import parseUrl from "../../util/parseUrl";

const reviewsSection = ({ data, happyCustomers = "2,340" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log(data);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };
  return (
    <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-orange-500 font-handwriting">
              {" "}
              Traveller's{" "}
            </span>
            Picks
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from real travelers who discovered their perfect
            journey with us.
          </p>
        </div>

        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 8000,
            }),
          ]}
        >
          <CarouselContent className="flex gap-8">
            {data.map((testimonial, index) => {
              // Group 3 reviews per slide
              if (index % 3 === 0) {
                return (
                  <CarouselItem key={index} className="flex p-6 w-full">
                    {/* 3 reviews in a single slide */}
                    <div className="w-full flex sm:flex-nowrap gap-4    ">
                      {data.slice(index, index + 3).map((testimonial, idx) => {
                        const profileImage =
                          testimonial.profileImg || testimonial.img;
                        return (
                          <div
                            key={idx}
                            className="flex flex-shrink-0 w-full lg:w-1/3"
                          >
                            <Card className="group m-3 w-full min-w-[12rem] h-full p-0 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in border-0">
                              <CardContent className="p-6 relative">
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-3">
                                    <img
                                      src={profileImage}
                                      className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-primary-foreground font-semibold"
                                    />
                                    <div>
                                      <h4 className="font-semibold">
                                        {testimonial.name}
                                      </h4>
                                      <p className="text-sm text-muted-foreground">
                                        {testimonial.place}
                                      </p>
                                    </div>
                                  </div>
                                  <Quote className="h-8 w-8 text-orange-500/20" />
                                </div>

                                <div className="flex items-center gap-1 mb-4">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={
                                        "h-4 w-4 " +
                                        (i < (Number(testimonial.stars) || 0)
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-gray-300")
                                      }
                                    />
                                  ))}
                                </div>

                                <p className="text-muted-foreground mb-4 leading-relaxed">
                                  "{testimonial.review}"
                                </p>
                              </CardContent>
                            </Card>
                          </div>
                        );
                      })}
                    </div>
                  </CarouselItem>
                );
              }
            })}
          </CarouselContent>
        </Carousel>

        <div className="text-center mt-4">
          <div className="inline-flex items-center gap-4">
            <div className="text-2xl font-bold text-orange-500">
              {happyCustomers}+
            </div>
            <div className="text-muted-foreground">Happy Travelers</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default reviewsSection;
