'use client';
import { Post } from '@/libs/types/post.type';
import { cn } from '@/libs/utils';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import React, { useEffect, useCallback, useState } from 'react';
import { Project } from '@/libs/types/project.type';

type CarouselProps = {
  post: (Post | Project)[];
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

    const autoPlay = () => {
      mainEmblaApi.scrollNext();
    };
  }, [mainEmblaApi]);

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
    <div className="my-14">
      {/* Main Carousel */}
      <div className="embla shadow-xl" ref={mainEmblaRef}>
        <div className="embla__container">
          {post.slice(0, 6).map((item, index) => (
            <div key={index} className="embla__slide flex items-center gap-6">
              {/* Image Container */}
              <div className="relative h-80 w-80 shrink-0">
                <Image
                  fill
                  src={item.img}
                  alt={item.slug}
                  className="object-cover"
                />
              </div>

              {/* Text Container */}
              <div className="flex h-[80%] flex-col justify-between space-y-4">
                <div>
                  <h1 className="text-2xl font-bold leading-tight">
                    {item.title}
                  </h1>
                  <p className="text-base leading-relaxed text-gray-600">
                    {item.desc}
                  </p>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Image
                      height={24}
                      width={24}
                      src="https://www.svgrepo.com/show/521200/people.svg"
                      alt="peoples"
                    />
                    <p className="text-lg font-semibold">
                      {item.upvotes.length}
                    </p>
                    <div>
                      <h2 className="font-medium text-gray-700">Pendukung</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Thumbnail Carousel */}
      <div className="embla--thumb mt-6" ref={thumbEmblaRef}>
        <div className="embla__container flex items-center justify-center gap-3">
          {post.slice(0, 6).map((item, index) => (
            <div
              key={index}
              className={cn(
                'embla__slide embla__slide--thumb cursor-pointer',
                selectedIndex === index ? 'box scale-110' : 'scale-90',
              )}
              onClick={() => onThumbClick(index)}
            >
              <div className="relative size-20">
                <Image
                  fill
                  src={item.img}
                  alt={`Thumbnail for ${item.slug}`}
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
