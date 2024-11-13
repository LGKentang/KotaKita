import Image from "next/image";
import { PageParams } from "@/libs/types/common.type";

const images = [
  {
    src: "/assets/city.jpg",
  },
];

export default function Home({ searchParams }: PageParams) {
  return (
    <div>
      {/* {images.map((img, idx) => (
        <Image
          key={img.src}
          src={img.src}
          alt={`image-${idx}`}
          width={400}
          height={400}
        />
      ))} */}
    </div>
  );
}
