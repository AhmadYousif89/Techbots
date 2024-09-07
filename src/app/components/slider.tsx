"use client";

import Link from "next/link";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import { Button } from "@/components/ui/button";
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
    img: "https://m.media-amazon.com/images/I/618zZ7u3sUL.jpg",
  },
];

export function HomeSlider() {
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 6000, stopOnInteraction: false })]}
      className="group relative"
    >
      <CarouselContent className="h-[calc(100svh-80px)]">
        {slides.map((slide, index) => (
          <CarouselItem
            key={index}
            className="grid grid-rows-2 pl-1 md:grid-cols-2"
          >
            <Image
              width={600}
              height={600}
              loading="eager"
              src={slide.img}
              alt={"product image"}
              className="max-view size-full bg-background object-cover md:col-[2] md:row-span-full md:object-contain"
            />
            <div className="grid place-content-center gap-4 overflow-hidden bg-primary px-4 py-8 text-center backdrop-blur-sm sm:gap-8 md:row-span-full lg:gap-12 lg:px-16">
              <p className="rounded p-4 text-lg text-secondary lg:text-xl xl:text-2xl">
                {slide.title}
              </p>
              <Button
                size={"lg"}
                variant={"outline"}
                className="place-self-center bg-foreground/50 text-background"
              >
                <Link href={slide.url}>Shop Now</Link>
              </Button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-5 z-10 hidden size-12 border-input/20 bg-muted *:text-primary group-hover:inline-flex lg:h-1/2 lg:rounded lg:*:size-5" />
      <CarouselNext className="right-5 z-10 hidden size-12 border-input/20 bg-muted *:text-primary group-hover:inline-flex lg:h-1/2 lg:rounded lg:*:size-5" />
    </Carousel>
  );
}
