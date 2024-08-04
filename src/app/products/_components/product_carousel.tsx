"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/app/lib/utils";
import { TProduct } from "../_lib/types";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function ProductCarousel(product: TProduct) {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <ResizablePanelGroup
      direction="vertical"
      className="self-start lg:sticky lg:top-20"
      style={{ height: "700px", minHeight: "600px" }}
    >
      <ResizablePanel
        defaultSize={70}
        className="mx-auto h-full w-full max-w-screen-sm"
      >
        <Dialog>
          <DialogTrigger className="relative h-full w-full">
            <Image
              src={product.images[imageIndex].link}
              alt={product.title}
              fill
              className="object-contain p-8"
            />
          </DialogTrigger>
          <DialogContent className="h-[calc(100%-200px)] max-w-screen-md">
            <Image
              src={product.images[imageIndex].link}
              alt={product.title}
              fill
              className="object-contain p-8"
            />
          </DialogContent>
        </Dialog>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={30}>
        <Carousel
          className="mx-auto max-w-screen-md"
          opts={{ dragFree: true, align: "start" }}
        >
          <CarouselContent className="py-8 pl-4">
            {product.images.map((image: { link: string }, index: number) => (
              <CarouselItem key={index} className="grid basis-32">
                <Card
                  className={cn([
                    "grid cursor-pointer items-center justify-center rounded border-0 py-6 shadow-none",
                    imageIndex === index && "border shadow-sm",
                  ])}
                  onClick={() => setImageIndex(index)}
                >
                  <Image
                    src={image.link}
                    alt={product.title}
                    width={120}
                    height={120}
                    className="h-16 object-contain"
                  />
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-5 top-48 lg:top-44" />
          <CarouselNext className="absolute right-5 top-48 lg:right-1 lg:top-44" />
        </Carousel>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
