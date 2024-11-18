'use client';
import { Post } from '@/libs/types/post.type';
import { cn } from '@/libs/utils';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect } from 'react';

type CarouselProps = {
  post: Post[];
};

export const Carousel = ({ post }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes());
    }

    // const interval = setInterval(() => {
    //   emblaApi?.scrollNext();
    // }, 4500);

    // return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className="embla mx-auto mt-20 max-w-3xl border" ref={emblaRef}>
      <div className="embla__container">
        {post.map((item, index) => (
          <div
            key={index}
            className="embla__slide flex items-center justify-center gap-6 overflow-hidden"
          >
            <Image
              width={600}
              height={500}
              src={item.img}
              alt={item.slug}
              className="h-full w-full object-fill"
            />
            <div>
              <h1 className="text-xl font-bold">{item.title}</h1>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
