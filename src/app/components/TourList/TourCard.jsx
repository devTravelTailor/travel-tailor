"use client";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ArrowBigRight,
  MoveRight,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

export function TourCard({
  title,
  description,
  heroImg,
  tourType,
  date,
  slug,
  duration = "7 Days",
  groupSize,
  experiences,
  location = "Multiple Locations",
}) {
  const isFixedDate = tourType === "fixed_date";

  const badgeConfig = {
    fixed_date: { label: "Smith-Led", icon: "✦", variant: "default" },
    selectable_date: {
      label: "Smith-Curated",
      icon: "★",
      variant: "secondary",
    },
  };

  const badge = badgeConfig[tourType];

  return (
    <Card
      className="group h-[480px] p-0 flex flex-col overflow-hidden bg-card border-border/50   hover:shadow-xl transition-all duration-500 cursor-pointer"
      onClick={() => (window.location.href = `/creator/tour/${slug}`)}
    >
      <div className="relative h-56 overflow-hidden">
        {heroImg ? (
          <img
            src={heroImg}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-muted">
            <MapPin className="w-12 h-12 text-muted-foreground/40" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {badge?.icon && (
          <Badge
            variant={badge.variant}
            className="absolute top-3 left-3 backdrop-blur-sm bg-background/90 text-foreground border-0 shadow-lg"
          >
            <span className="mr-1">{badge.icon}</span>
            {badge.label}
          </Badge>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex items-center gap-4 text-white text-sm">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {duration}
            </span>
            {groupSize && (
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {groupSize}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-5">
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-2">
          <MapPin className="w-3.5 h-3.5" />
          <span className="truncate">{location}</span>
        </div>

        <h3 className="text-lg font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors duration-300">
          {title}
        </h3>

        <p
          className={`text-sm text-muted-foreground ${
            experiences?.length > 0 ? "line-clamp-2" : "line-clamp-4"
          } `}
        >
          {description ||
            "Discover an unforgettable journey with expert guidance."}
        </p>

        {isFixedDate && date && (
          <div className="flex items-center gap-2 mt-3 p-2.5 rounded-lg bg-orange-600/5 border border-orange-600/10">
            <Calendar className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-foreground">{date}</span>
          </div>
        )}

        {experiences?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
            {experiences.slice(0, 2).map((experience) => (
              <span
                key={experience._id || experience.slug}
                className="px-3 py-1 text-xs font-medium bg-orange-600/70 text-white rounded-full"
              >
                {experience.title}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="px-5 py-3 bg-muted/30 border-t border-border/50 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">View Details</span>
        <div className="w-6 h-6 rounded-full p-1 bg-orange-600/10 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-orange-600-foreground transition-all duration-300">
          <MoveRight className="text-xs group-hover:translate-x-0.5 group-hover:text-white transition-transform" />
        </div>
      </div>
    </Card>
  );
}
