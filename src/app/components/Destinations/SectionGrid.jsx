'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { CalendarClock, MapPin, MapPinned, NotebookPen } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import parseUrl from '../../util/parseUrl';

const getImage = (item) =>
  item?.imgUrl ||
  item?.img ||
  item?.image ||
  item?.displayImg ||
  item?.heroImg ||
  item?.coverImg ||
  item?.galleryImg;

const getTitle = (item) => item?.title || item?.name || item?.heading || 'Coming soon';

const getDescription = (item) =>
  item?.brief ||
  item?.description ||
  item?.content ||
  item?.excerpt ||
  item?.summary ||
  '';

const getLocation = (item) => item?.place || item?.destination || item?.location || item?.country;

const resolveLink = (type, item) => {
  if (type === 'tours' && item?.slug) return `/tours/${item.slug}`;
  if (type === 'blogs' && (item?.slug || item?._id))
    return `/blogs/${item.slug || item._id}`;
  return item?.link || undefined;
};

export default function SectionGrid({
  id,
  title,
  subtitle,
  items = [],
  type = 'things',
  viewMoreLabel = 'View more',
  limit = 4,
  viewMoreHref,
  fullWidth = false,
  forceSingleRow = false,
}) {
  const [showAll, setShowAll] = useState(false);
  const safeItems = useMemo(() => (Array.isArray(items) ? items : []), [items]);

  if (safeItems.length === 0) {
    return null;
  }

  const renderHeading = (text) => {
    const parts = String(text || '').split(' ');
    const first = parts.shift() || '';
    const rest = parts.join(' ');
    return (
      <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900">
        <span className="text-[#ff5b06] font-handwriting">{first}</span>
        {rest ? ` ${rest}` : ''}
      </h2>
    );
  };

  const hasLinkOut = Boolean(viewMoreHref);
  const visible = hasLinkOut
    ? safeItems.slice(0, limit ?? safeItems.length)
    : showAll
    ? safeItems
    : safeItems.slice(0, limit ?? 4);

  return (
    <section id={id} className="py-12 md:py-16 scroll-mt-28">
      <div className={[fullWidth ? 'w-full' : 'max-w-6xl', 'mx-auto px-4 md:px-8'].join(' ')}>
        <div className="flex flex-col gap-3 mb-8">
          <div className="space-y-2 text-center">
            {renderHeading(title)}
            {subtitle && (
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div
          className={
            forceSingleRow
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5'
              : 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'
          }
        >
          {visible.map((item, idx) => {
            const image = getImage(item);
            const titleText = getTitle(item);
            const description = getDescription(item);
            const location = getLocation(item);
            const link = resolveLink(type, item);
            const days =
              item?.details?.totalDays ||
              item?.details?.duration ||
              item?.duration ||
              item?.days ||
              item?.nights;

            const card = (
              <div className="h-full flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-52 bg-gray-100 overflow-hidden">
                  {image ? (
                    <img
                      src={parseUrl(image)}
                      alt={titleText}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      loading={idx < 2 ? 'eager' : 'lazy'}
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 text-gray-400">
                      <MapPinned className="w-8 h-8" />
                    </div>
                  )}
                  {type === 'tours' && days && (
                    <Badge className="absolute top-3 right-3 bg-white/90 text-[#ff5b06] border-0 shadow-sm">
                      {days} days
                    </Badge>
                  )}
                  {type === 'blogs' && (
                    <Badge className="absolute top-3 right-3 bg-white/90 text-[#ff5b06] border-0 shadow-sm">
                      Blog
                    </Badge>
                  )}
                </div>

                <div className="flex-1 p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#ff5b06] font-semibold">
                    <span>
                      {type === 'tours'
                        ? 'Tour'
                        : type === 'blogs'
                        ? 'Story'
                        : type === 'places'
                        ? 'Place'
                        : 'Experience'}
                    </span>
                    {location && (
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground/80 normal-case tracking-normal">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="line-clamp-1 break-words">{location}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold leading-tight text-foreground line-clamp-2 break-words">
                    {titleText}
                  </h3>
                  {description && (
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 break-words">
                      {description}
                    </p>
                  )}

                  {type === 'tours' && (item?.tourType || item?.price) && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                      <CalendarClock className="w-4 h-4 text-[#ff5b06]" />
                      <span className="line-clamp-1">
                        {item?.tourType === 'fixed_date'
                          ? 'Fixed date departure'
                          : item?.tourType === 'selectable_date'
                          ? 'Flexible dates'
                          : item?.tourType || 'Guided experience'}
                      </span>
                    </div>
                  )}
                </div>

                {link ? (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-sm text-[#ff5b06]">
                    <span className="font-semibold">View details</span>
                    <NotebookPen className="w-4 h-4" />
                  </div>
                ) : null}
              </div>
            );

            return link ? (
              <Link key={idx} href={link} className="block h-full">
                {card}
              </Link>
            ) : (
              <div key={idx} className="h-full">
                {card}
              </div>
            );
          })}
        </div>
        {hasLinkOut && safeItems.length > (limit ?? 0) && (
          <div className="mt-6 flex justify-center">
            <Button
              asChild
              variant="outline"
              className="border-[#ff5b06] text-[#ff5b06] hover:bg-[#ff5b06] hover:text-white rounded-full"
            >
              <Link href={viewMoreHref}>{viewMoreLabel}</Link>
            </Button>
          </div>
        )}
        {!hasLinkOut && safeItems.length > (limit ?? 4) && (
          <div className="mt-6 flex justify-center">
            <Button
              variant="outline"
              className="border-[#ff5b06] text-[#ff5b06] hover:bg-[#ff5b06] hover:text-white rounded-full"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? 'View less' : viewMoreLabel}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
