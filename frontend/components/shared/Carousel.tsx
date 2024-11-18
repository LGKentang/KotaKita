'use client';
import { Post } from '@/libs/types/post.type';
import { cn } from '@/libs/utils';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import React, { useEffect, useCallback, useState } from 'react';

type CarouselProps = {
  post: Post[];
};

export const Carousel = ({ post }: CarouselProps) => {
  const [mainEmblaRef, mainEmblaApi] = useEmblaCarousel({ loop: true });
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

    const interval = setInterval(autoPlay, 5000);
    return () => clearInterval(interval);
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
    <div className="mx-auto my-20 max-w-4xl">
      {/* Main Carousel */}
      <div className="embla rounded-2xl" ref={mainEmblaRef}>
        <div className="embla__container">
          {post.slice(0, 6).map((item, index) => (
            <div key={index} className="embla__slide flex justify-evenly gap-3">
              <div className="relative size-80">
                <Image
                  fill
                  src={item.img}
                  alt={item.slug}
                  className="object-cover"
                />
              </div>
              <div className="flex h-full flex-col justify-evenly">
                <h1 className="text-3xl font-bold">{item.title}</h1>
                <p>{item.desc}</p>
                <div>
                  <div className="flex items-center gap-3">
                    <Image
                      height={30}
                      width={30}
                      src="https://www.svgrepo.com/show/521200/people.svg"
                      alt="peoples"
                    />
                    <p>{item.upvotes.length}</p>
                  </div>
                  <h2 className="font-bold">Pendukung</h2>
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
