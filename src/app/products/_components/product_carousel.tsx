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
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function ProductCarousel(product: TProduct) {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <ResizablePanelGroup direction="vertical" style={{ minHeight: "700px" }}>
      <ResizablePanel defaultSize={70} className="mx-auto size-full max-w-lg">
        <Dialog>
          <DialogTrigger className="relative size-full">
            <Image
              src={product.images[imageIndex].link}
              alt={product.title}
              fill
              className="object-contain p-8"
            />
          </DialogTrigger>
          <DialogContent className="h-[calc(100%-15vh)] max-w-[calc(100%-15vw)]">
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
      <ResizablePanel defaultSize={30} className="mx-auto max-w-screen-md">
        <Carousel opts={{ dragFree: true, align: "start" }}>
          <CarouselContent className="py-4 pl-4">
            {product.images
              .slice(0, 12) // temp fix for overflow on layout
              .map((image: { link: string }, index: number) => (
                <CarouselItem key={index} className="basis-24">
                  <Button
                    variant={"ghost"}
                    className={cn(
                      "size-full p-2",
                      imageIndex === index && "border shadow-sm",
                    )}
                    onClick={() => setImageIndex(index)}
                  >
                    <Image
                      src={image.link}
                      alt={product.title}
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </Button>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-5 top-36 lg:top-40" />
          <CarouselNext className="absolute right-5 top-36 lg:right-1 lg:top-40" />
        </Carousel>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
