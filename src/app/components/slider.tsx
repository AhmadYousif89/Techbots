"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { SLIDERS } from "./config/constants";
import { Button } from "@/components/ui/button";

export function HomeSlider() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplay = useRef(
    Autoplay({ delay: 5000, stopOnMouseEnter: false }),
  ).current;

  useEffect(() => {
    if (!carouselApi) return;

    const updateActiveIndex = () => {
      setActiveIndex(carouselApi.selectedScrollSnap());
    };

    updateActiveIndex();
    carouselApi.on("select", updateActiveIndex);
    carouselApi.on("reInit", updateActiveIndex);

    return () => {
      carouselApi.off("select", updateActiveIndex);
      carouselApi.off("reInit", updateActiveIndex);
    };
  }, [carouselApi]);

  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[autoplay]}
      setApi={setCarouselApi}
      onMouseEnter={() => autoplay.stop()}
      onMouseLeave={() => autoplay.play()}
    >
      <CarouselContent className="md:h-[calc(100vh-var(--header-height)-2rem)]">
        {SLIDERS.map((slide, index) => (
          <CarouselItem
            key={index}
            aria-hidden={activeIndex !== index}
            className="select-none bg-background"
          >
            <div
              className={cn(
                "flex h-full flex-col transition-opacity duration-700 ease-out md:flex-row",
                activeIndex === index ? "opacity-100" : "opacity-0",
              )}
            >
              <div className="flex basis-1/2 items-center justify-center">
                <Image
                  width={900}
                  height={900}
                  loading="eager"
                  src={slide.img}
                  alt={slide.title}
                  className="size-full object-contain object-center px-4"
                />
              </div>
              <div className="grid size-full flex-1 place-content-center gap-4 overflow-hidden bg-primary px-4 py-8 text-center lg:px-16">
                <p className="max-w-sm text-pretty rounded bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text p-4 px-2 text-xl text-transparent sm:text-2xl lg:max-w-xl lg:text-3xl">
                  {slide.title}
                </p>
                <Button
                  asChild
                  size="sm"
                  className="w-36 select-none place-self-center rounded-full p-1 text-xs active:outline-dashed active:outline-2 active:outline-offset-4 active:outline-muted/50 lg:text-sm lg:active:outline-1"
                >
                  <Link
                    href={slide.url}
                    className="bg-gradient-to-b from-black to-secondary/10"
                  >
                    Shop Now
                  </Link>
                </Button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex items-center justify-center gap-2 bg-transparent px-3 py-2">
        {SLIDERS.map((slide, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={slide.url}
              type="button"
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={isActive}
              className={cn(
                "h-2 rounded-full transition-all duration-500 ease-out motion-reduce:transition-none",
                isActive
                  ? "w-8 bg-primary opacity-100"
                  : "w-2.5 bg-primary/40 opacity-70 hover:bg-primary/70 hover:opacity-100",
              )}
            />
          );
        })}
      </div>
    </Carousel>
  );
}
