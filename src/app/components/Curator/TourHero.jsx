"use client";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { MapPin, Share2, Star, Clock, IndianRupee } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function TourHero({
  title,
  subtitle,
  location,
  rating,
  reviewCount,
  heroImage,
  curatedBy = "Rishu Agrawal",
  duration = "12 Days",
  price = "53,350 onwards",
  badges = ["SELFDRIVE", "OFF-BEAT", "ADVENTURE"],
}) {
  const image =
    "https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg";

  console.log(curatedBy);

  return (
    <div className="relative">
      {/* Hero background */}
      <div className="relative h-[70vh] min-h-[600px] overflow-hidden ">
        <img
          src={heroImage}
          alt={title}
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/60" />

        {/* Glass overlay card */}
        <div className="absolute inset-0 flex items-center justify-center px-5 md:p-6">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg max-w-6xl w-full min-h-[520px] grid md:grid-cols-2 overflow-hidden">
            {/* Left: Details */}
            <div className="md:p-10 p-7 flex flex-col justify-center space-y-6">
              {/* Location */}
              <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                <MapPin className="h-4 w-4" />
                {location}
              </div>

              {/* Title & Subtitle */}
              <div className="mb-4">
                <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-2">
                  {title}
                </h1>
                <p className="text-lg md:text-xl text-white/80 font-light">
                  {subtitle}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 backdrop-blur-sm text-white/90 w-fit">
                <Star className="h-5 w-5 fill-orange-500 text-orange-500" />
                <span className="font-semibold">{rating}</span>
                <span className="text-sm">({reviewCount} reviews)</span>
              </div>

              <div className="text-white/90 mt-6">
                <div className="flex flex-wrap items-center gap-12">
                  {/* Duration */}
                  <div>
                    <span className="block text-xs uppercase tracking-wide opacity-70 mb-1">
                      Duration
                    </span>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-orange-500" />
                      <span className="text-lg">{duration}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <span className="block text-xs uppercase tracking-wide opacity-70 mb-1">
                      Price Per Person
                    </span>
                    <div className="flex items-center gap-2">
                      <IndianRupee className="h-5 w-5 text-orange-500" />
                      <span className="text-lg">{price}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t mt-6 mb-4 border-white/20" />

              {/* Curated by & Details */}
              <div className="flex flex-col gap-4 text-white/90">
                <div className=" ">
                  <div className="flex items-center ">
                    {/* Curator image */}
                    <Avatar className="w-12 h-12 mr-3 rounded-md object-cover border-2 border-white/30">
                      <AvatarImage
                        src={curatedBy?.profileImg}
                        alt={curatedBy?.name}
                      />
                      <AvatarFallback
                        className={
                          "text-white rounded-sm bg-gray-800 w-full h-full"
                        }
                      >
                        {curatedBy?.name?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    {/* Curator name */}
                    <div>
                      <span className="flex flex-col text-xs uppercase tracking-wide opacity-70">
                        Curated By
                      </span>
                      <a
                        href={`/creator/${curatedBy.id}`} // replace with your route or dynamic link
                        className="font-medium text-lg text-inherit no-underline hover:no-underline"
                      >
                        {curatedBy.name}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Small Hero Image */}
            <div className="relative hidden md:block">
              <img
                src={heroImage}
                alt={title}
                className="h-full w-full object-cover"
              />
              {/* Floating badges */}
              <div className="absolute top-4 left-4 flex gap-3">
                {badges.map((badge, i) => (
                  <Badge
                    key={i}
                    className="bg-white/95 text-gray-900 border-0 font-medium px-4 py-2 rounded-full backdrop-blur-sm"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
              {/* Share button */}
              {/* <div className="absolute top-8 right-8 flex gap-3">
                <Button
                  size="icon"
                  className="bg-white/95 hover:bg-white text-gray-900 rounded-full h-11 w-11 backdrop-blur-sm"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div> */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
