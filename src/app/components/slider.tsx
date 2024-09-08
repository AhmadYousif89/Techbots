"use client";

import Link from "next/link";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
  {
    url: "/products?cat=headphones",
    title:
      "Experience the best sound quality with our latest collection of headsets and earphones",
    img: "https://m.media-amazon.com/images/I/61gC6PBsRPL.jpg",
  },
  {
    url: "/products?cat=watches",
    title: "Stay connected and track your fitness with our latest smartwatches",
    img: "https://m.media-amazon.com/images/I/719qgNv-ubL.jpg",
  },
  {
    url: "/products?cat=laptops",
    title:
      "Get high performance, responsiveness, and long battery life with the latest laptop collection",
    img: "https://m.media-amazon.com/images/I/81kxce-AlLL.jpg",
  },
  {
    url: "/products?cat=mobiles",
    title:
      "Don't miss out on the latest mobile phones, tablets, and accessories",
    img: "https://m.media-amazon.com/images/I/613cvL2ZYHL.jpg",
  },
  {
    url: "/products?cat=accessories",
    title: "Get the best gaming experience with our latest gaming accessories",
    img: "https://m.media-amazon.com/images/I/61mB8mL33pL.jpg",
  },
];

export function HomeSlider() {
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 6000 })]}
      className="group"
    >
      <CarouselContent className="h-[calc(100svh-80px)]">
        {slides.map((slide, index) => (
          <CarouselItem
            key={index}
            className="grid grid-rows-2 pl-1 md:grid-cols-2"
          >
            <Image
              width={900}
              height={900}
              loading="eager"
              src={slide.img}
              alt={slide.title}
              className="size-full bg-background object-contain px-8 md:col-[2] md:row-span-full"
            />
            <div className="grid place-content-center gap-4 overflow-hidden bg-primary px-4 py-8 text-center backdrop-blur-sm md:row-span-full lg:px-16">
              <p className="max-w-sm text-pretty rounded bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text p-4 px-2 text-lg text-transparent lg:max-w-xl lg:text-2xl xl:text-4xl">
                {slide.title}
              </p>
              <button className="group relative h-12 w-36 select-none place-self-center overflow-hidden rounded-full p-[2px] shadow-lg shadow-muted/5 active:outline-dashed active:outline-2 active:outline-offset-4 active:outline-muted/50 lg:active:outline-1">
                <Link
                  href={slide.url}
                  className="inline-flex size-full items-center justify-center rounded-full bg-primary bg-gradient-to-b from-black to-secondary/10 text-sm font-medium text-secondary"
                >
                  Shop Now
                </Link>
                <div className="absolute inset-0 -top-5 -z-10 aspect-square h-20 w-full origin-center bg-gradient-to-r from-blue-500 to-pink-500" />
              </button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2 hidden size-12 border-2 border-primary/25 bg-muted shadow *:text-primary group-hover:inline-flex lg:h-1/2 lg:rounded lg:*:size-5" />
      <CarouselNext className="right-2 hidden size-12 border-2 border-primary/25 bg-muted shadow *:text-primary group-hover:inline-flex lg:h-1/2 lg:rounded lg:*:size-5" />
    </Carousel>
  );
}
