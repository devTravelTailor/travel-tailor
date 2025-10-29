"use client";
import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ChevronDown, ChevronUp, Clock, Info } from "lucide-react";

export default function TourItinerary({ itinerary }) {
  const [expandedDays, setExpandedDays] = useState(new Set([1]));

  const toggleDay = (day) => {
    setExpandedDays((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(day)) {
        newSet.delete(day);
      } else {
        newSet.add(day);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-6 mb-6">
      <h2 className="text-2xl font-bold mb-6">Detailed Itinerary</h2>

      <div className="space-y-4 flex flex-col gap-3">
        {itinerary.map((day, idx) => (
          <Card
            key={idx}
            className="p-0 border border-gray-100 rounded-lg shadow-sm"
          >
            <div
              className="p-4 cursor-pointer hover-elevate flex justify-between items-center"
              onClick={() => toggleDay(day.day)}
              data-testid={`day-header-${day.day}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-500 text-white rounded-lg flex items-center justify-center font-medium">
                  {day.day}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground">
                    Day {day.day}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">
                    {day.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">
                    {day.blocks?.length || 0} activities • Full day
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                data-testid={`button-toggle-day-${day.day}`}
              >
                {expandedDays.has(day.day) ? (
                  <ChevronUp className="h-4 w-4 text-orange-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-orange-500" />
                )}
              </Button>
            </div>

            {expandedDays.has(day.day) && (
              <CardContent
                className="pt-0 pb-4"
                data-testid={`day-content-${day.day}`}
              >
                <div className="space-y-4 flex flex-col gap-3">
                  {day.blocks.map((block, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-4 bg-muted/30 rounded-lg border border-gray-100"
                    >
                      {/* Time */}
                      <div className="flex-shrink-0 text-center justify-center items-center min-w-[70px]">
                        <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-2">
                          <Clock className="h-5 w-5 text-orange-500" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">
                          {block.time}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground mb-1">
                          {block.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-2 font-medium">
                          {block.activity}
                        </p>
                      </div>

                      {/* Image */}
                      {block.image && (
                        <div className="flex-shrink-0">
                          <img
                            src={block.image}
                            alt={block.title}
                            className="w-20 h-16 object-cover rounded-lg hover-elevate cursor-pointer"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
