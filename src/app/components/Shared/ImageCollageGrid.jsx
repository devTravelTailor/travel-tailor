'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * ImageCollageGrid - A collage-style image grid with multiple layout variants
 * @param {Object} props
 * @param {string} props.title - Main section title
 * @param {string} props.subtitle - Section subtitle
 * @param {string} props.description - Detailed description below the grid
 * @param {Array} props.items - Array of {image, alt, title}
 * @param {string} props.variant - Layout variant: "4-grid" (default) or "6-masonry"
 */
export default function ImageCollageGrid({
  title,
  subtitle,
  description,
  items = [],
  variant = '4-grid',
}) {
  if (!items || items.length === 0) return null;

  const isClient = typeof window !== 'undefined';
  const isMobile = isClient ? window.innerWidth < 768 : false;

  // 4-Grid Layout (Jrny Maestros style)
  if (variant === '4-grid') {
    const limit = isMobile ? 1 : 4;
    const gridItems = items.slice(0, limit);

    return (
      <section className='pb-12 md:pb-16 px-4 w-full max-w-[95rem] mx-auto'>
        {/* Header */}
        {(title || subtitle) && (
          <div className='text-center mb-8 md:mb-10'>
            {title && (
              <h2 className='text-2xl md:text-3xl lg:text-4xl font-serif font-normal mb-2 md:mb-3 tracking-tight'>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className='text-sm md:text-base text-muted-foreground max-w-2xl mx-auto'>
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* 4-Image Grid - Adjusted to match Tour Grid style */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8 auto-rows-[250px]'>
          {gridItems[0] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0, duration: 0.5 }}
              className='md:row-span-2 relative overflow-hidden rounded-xl md:rounded-2xl aspect-[4/3] md:aspect-auto h-full'>
              <Image
                src={gridItems[0].image || '/images/placeholder.jpg'}
                alt={
                  gridItems[0].alt || gridItems[0].title || 'Travel experience'
                }
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, 66vw'
              />
            </motion.div>
          )}
          {gridItems[1] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className='md:col-span-1 relative overflow-hidden rounded-xl md:rounded-2xl aspect-[4/3] md:aspect-auto h-full'>
              <Image
                src={gridItems[1].image || '/images/placeholder.jpg'}
                alt={
                  gridItems[1].alt || gridItems[1].title || 'Travel experience'
                }
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, 33vw'
              />
            </motion.div>
          )}
          {gridItems[2] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className='md:row-span-2 relative overflow-hidden rounded-xl md:rounded-2xl aspect-[4/3] md:aspect-auto h-full'>
              <Image
                src={gridItems[2].image || '/images/placeholder.jpg'}
                alt={
                  gridItems[2].alt || gridItems[2].title || 'Travel experience'
                }
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, 33vw'
              />
            </motion.div>
          )}
          {gridItems[3] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className='md:col-span-1 relative overflow-hidden rounded-xl md:rounded-2xl aspect-[4/3] md:aspect-auto h-full'>
              <Image
                src={gridItems[3].image || '/images/placeholder.jpg'}
                alt={
                  gridItems[3].alt || gridItems[3].title || 'Travel experience'
                }
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, 33vw'
              />
            </motion.div>
          )}
        </div>

        {description && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className='text-center max-w-3xl mx-auto'>
            <p className='text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300'>
              {description}
            </p>
          </motion.div>
        )}
      </section>
    );
  }

  // 6-Masonry Layout (Mood board style)
  if (variant === '6-masonry') {
    // On mobile, show only 1 image for speed/clarity
    const limit = isMobile ? 1 : 6;
    const gridItems = items.slice(0, limit);

    return (
      <section className='pb-12 md:pb-16 px-4 w-full max-w-[95rem] mx-auto'>
        {/* Header */}
        {(title || subtitle) && (
          <div className='text-center mb-8 md:mb-10'>
            {title && (
              <h2 className='text-2xl md:text-3xl lg:text-4xl font-serif font-normal mb-2 md:mb-3 tracking-tight'>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className='text-sm md:text-base text-muted-foreground max-w-2xl mx-auto'>
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* 6-Image Masonry Grid */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8 auto-rows-[250px]'>
          {/* Image 1 - Small top left */}
          {gridItems[0] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0, duration: 0.5 }}
              className='relative overflow-hidden rounded-xl md:rounded-2xl col-span-1 row-span-1'>
              <Image
                src={gridItems[0].image || '/images/placeholder.jpg'}
                alt={
                  gridItems[0].alt || gridItems[0].title || 'Tour experience'
                }
                fill
                className='object-cover'
                sizes='(max-width: 768px) 50vw, 25vw'
              />
            </motion.div>
          )}

          {/* Image 2 - Large center */}
          {gridItems[1] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className='relative overflow-hidden rounded-xl md:rounded-2xl col-span-2 row-span-2'>
              <Image
                src={gridItems[1].image || '/images/placeholder.jpg'}
                alt={
                  gridItems[1].alt || gridItems[1].title || 'Tour experience'
                }
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, 50vw'
              />
            </motion.div>
          )}

          {/* Image 3 - Small top right */}
          {gridItems[2] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className='relative overflow-hidden rounded-xl md:rounded-2xl col-span-1 row-span-1'>
              <Image
                src={gridItems[2].image || '/images/placeholder.jpg'}
                alt={
                  gridItems[2].alt || gridItems[2].title || 'Tour experience'
                }
                fill
                className='object-cover'
                sizes='(max-width: 768px) 50vw, 25vw'
              />
            </motion.div>
          )}

          {/* Image 4 - Small middle left */}
          {gridItems[3] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className='relative overflow-hidden rounded-xl md:rounded-2xl col-span-1 row-span-1'>
              <Image
                src={gridItems[3].image || '/images/placeholder.jpg'}
                alt={
                  gridItems[3].alt || gridItems[3].title || 'Tour experience'
                }
                fill
                className='object-cover'
                sizes='(max-width: 768px) 50vw, 25vw'
              />
            </motion.div>
          )}

          {/* Image 5 - Medium bottom left */}
          {gridItems[4] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className='relative overflow-hidden rounded-xl md:rounded-2xl col-span-1 row-span-1'>
              <Image
                src={gridItems[4].image || '/images/placeholder.jpg'}
                alt={
                  gridItems[4].alt || gridItems[4].title || 'Tour experience'
                }
                fill
                className='object-cover'
                sizes='(max-width: 768px) 50vw, 25vw'
              />
            </motion.div>
          )}

          {/* Image 6 - Medium bottom right (optional) */}
          {/* {gridItems[5] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="relative overflow-hidden rounded-xl md:rounded-2xl col-span-1 row-span-1"
            >
              <Image
                src={gridItems[5].image || "/images/placeholder.jpg"}
                alt={gridItems[5].alt || gridItems[5].title || "Tour experience"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </motion.div>
          )} */}
        </div>

        {description && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className='text-center max-w-3xl mx-auto'>
            <p className='text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300'>
              {description}
            </p>
          </motion.div>
        )}
      </section>
    );
  }

  return null;
}
