'use client';
import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { ChevronDown, ChevronUp, Clock } from 'lucide-react';

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
    <div className='space-y-6 mb-6 max-lg:max-w-[90vw]'>
      <h2 className='text-2xl md:text-3xl font-bold mb-6'>
        Detailed Itinerary
      </h2>

      <div className='space-y-4 flex flex-col gap-3'>
        {itinerary.map((day, idx) => (
          <Card
            key={idx}
            className='p-0 border border-gray-100 rounded-lg shadow-sm'>
            <div
              className='p-3 md:p-4 cursor-pointer hover-elevate flex justify-between items-center gap-2'
              onClick={() => toggleDay(day.day)}
              data-testid={`day-header-${day.day}`}>
              <div className='flex items-center gap-3 md:gap-4'>
                <div className='w-9 h-9 md:w-10 md:h-10 bg-[#ff5b06] text-white rounded-lg flex items-center justify-center font-medium text-sm md:text-base'>
                  {idx + 1}
                </div>
                <div className='min-w-0'>
                  <h3 className='text-base md:text-lg font-medium text-foreground line-clamp-1'>
                    {day.day}
                  </h3>
                  <p className='text-xs md:text-sm text-muted-foreground font-medium line-clamp-1'>
                    {day.title}
                  </p>
                  <p className='text-[11px] md:text-xs text-muted-foreground mt-1 font-medium'>
                    {day.blocks?.length || 0} activities
                  </p>
                </div>
              </div>
              <Button
                variant='ghost'
                size='icon'
                data-testid={`button-toggle-day-${day.day}`}
                className='h-8 w-8 md:h-9 md:w-9'>
                {expandedDays.has(day.day) ? (
                  <ChevronUp className='h-4 w-4 text-[#ff5b06]' />
                ) : (
                  <ChevronDown className='h-4 w-4 text-[#ff5b06]' />
                )}
              </Button>
            </div>

            {expandedDays.has(day.day) && (
              <CardContent
                className='pt-0 pb-4'
                data-testid={`day-content-${day.day}`}>
                <div className='space-y-3 md:space-y-4 flex flex-col gap-3'>
                  {day.blocks.map((block, index) => (
                    <div
                      key={index}
                      className='flex flex-col sm:flex-row gap-3 md:gap-4 p-3 md:p-4 bg-muted/30 rounded-lg border border-gray-100'>
                      {/* Time */}
                      <div className='flex-shrink-0 text-left sm:text-center justify-center items-center sm:min-w-[70px]'>
                        <div className='flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-[#ff5b06]/10 rounded-lg mb-2'>
                          <Clock className='h-4 w-4 md:h-5 md:w-5 text-[#ff5b06]' />
                        </div>
                        {block.time && (
                          <span className='text-xs md:text-sm font-medium text-muted-foreground'>
                            {block.time}
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className='flex-1'>
                        <h4 className='font-medium text-foreground mb-1 text-sm md:text-base'>
                          {block.title}
                        </h4>
                        <p className='text-sm text-muted-foreground leading-relaxed font-medium'>
                          {block.activity}
                        </p>
                        <p className='text-xs font-500 text-[#ff5b06]'>
                          {block.notes}
                        </p>
                      </div>

                      {/* Image */}
                      {block.image && (
                        <div className='flex-shrink-0'>
                          <img
                            src={block.image}
                            alt={block.title}
                            className='w-full sm:w-24 sm:h-20 h-32 object-cover rounded-lg hover-elevate cursor-pointer'
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
