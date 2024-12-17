'use client';
import { IPetition } from '@/libs/types/petition.type';
import { cn } from '@/libs/utils/util';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import React, { useEffect, useCallback, useState } from 'react';
import parseImageUrl from '@/libs/utils/parse';
import { MdEmojiPeople } from 'react-icons/md';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import Link from 'next/link';

type CarouselProps = {
  post: IPetition[];
};

export const Carousel = ({ post }: CarouselProps) => {
  const [mainEmblaRef, mainEmblaApi] = useEmblaCarousel({ loop: false });
  const [thumbEmblaRef, thumbEmblaApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!mainEmblaApi || !thumbEmblaApi) return;
    setSelectedIndex(mainEmblaApi.selectedScrollSnap());
    thumbEmblaApi.scrollTo(mainEmblaApi.selectedScrollSnap());
  }, [mainEmblaApi, thumbEmblaApi]);

  useEffect(() => {
    if (!mainEmblaApi) return;
    mainEmblaApi.on('select', onSelect);
  }, [mainEmblaApi, onSelect]);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainEmblaApi) return;
      mainEmblaApi.scrollTo(index);
    },
    [mainEmblaApi],
  );

  return (
    <div className="my-16">
      {/* Main Carousel */}
      <div className="embla shadow-xl" ref={mainEmblaRef}>
        <div className="embla__container">
          {post.slice(0, 6).map((item, index) => (
            <div
              key={index}
              className="embla__slide flex items-center gap-8 p-6 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-96 w-96 shrink-0 rounded-lg overflow-hidden shadow-md">
                <Image
                  fill
                  src={parseImageUrl(item.thumbnail_url)}
                  alt={item.title}
                  className="object-cover"
                />
              </div>

              {/* Text Container */}
              <div className="flex flex-col justify-between space-y-6 w-full">
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold leading-snug">{item.title}</h1>
                  <p className="text-lg leading-relaxed text-gray-600">{item.description}</p>
                </div>

                {/* Petition Link and Votes */}
                <div className="flex items-center justify-between mt-4">
                  {/* View Petition Link */}
                  <Link
                    href={`/petitions/${item.id}`}
                    className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
                  >
                    <MdEmojiPeople className="text-2xl" />
                    <span className="text-lg font-semibold underline">View Petition</span>
                  </Link>

                  {/* Upvotes and Downvotes */}
                  <div className="flex items-center gap-6 text-gray-700">
                    <div className="flex items-center gap-2">
                      <FaThumbsUp className="text-green-500 text-xl" />
                      <span className="text-lg font-medium">{item.upvotes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaThumbsDown className="text-red-500 text-xl" />
                      <span className="text-lg font-medium">{item.downvotes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Thumbnail Carousel */}
      <div className="embla--thumb mt-10" ref={thumbEmblaRef}>
        <div className="embla__container flex items-center justify-center gap-4">
          {post.slice(0, 6).map((item, index) => (
            <div
              key={index}
              className={cn(
                'embla__slide embla__slide--thumb cursor-pointer rounded-md overflow-hidden shadow-md transition-transform duration-300',
                selectedIndex === index ? 'scale-110 border-2 border-blue-500' : 'scale-95',
              )}
              onClick={() => onThumbClick(index)}
            >
              <div className="relative w-24 h-24 hover:scale-105 transition-transform">
                <Image
                  fill
                  src={parseImageUrl(item.thumbnail_url)}
                  alt={`Thumbnail for ${item.title}`}
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
