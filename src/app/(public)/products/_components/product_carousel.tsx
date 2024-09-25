"use client";

import Image from "next/image";
import { use, useMemo, useState, useCallback } from "react";
import { TProduct } from "@/app/lib/types";
import { cn } from "@/lib/utils";

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
import { Lightbox } from "./carousel/lightbox";

type ProductCarouselProps = {
  blobImages?: Promise<Record<string, { asin: string; data: any }[]>>;
  showLightbox?: boolean;
  product: TProduct;
};

const convertToBlob = (uri: string) => {
  const mimeType = uri.split(",")[0].split(":")[1].split(";")[0];
  const base64Data = uri.split(",")[1];
  const buffer = Buffer.from(base64Data, "base64");

  return new Blob([buffer], { type: mimeType });
};

export function ProductCarousel({
  product,
  blobImages,
  showLightbox = true,
}: ProductCarouselProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const thumbImages = blobImages ? use(blobImages) : null;

  const imageUrl = useMemo(() => {
    if (!thumbImages || Object.keys(thumbImages).length < 1) return "";

    const images = thumbImages[product.category];
    if (!images) return "";

    const image = images.find((img) => img.asin === product.asin);
    return image ? URL.createObjectURL(convertToBlob(image.data)) : "";
  }, [thumbImages, product.category, product.asin]);

  const handleImageLoad = useCallback(() => setIsLoaded(true), []);

  const handleImageIndexChange = useCallback(
    (index: number) => setImageIndex(index),
    [],
  );

  return (
    <ResizablePanelGroup
      direction="vertical"
      className="min-h-[600px] lg:min-h-[700px] lg:p-8"
    >
      <ResizablePanel
        defaultSize={70}
        minSize={70}
        className="flex size-full items-center justify-center"
      >
        <Dialog>
          <DialogTrigger
            className={`relative flex size-full max-w-[30rem] p-4 lg:mx-auto lg:max-w-lg ${showLightbox ? "" : "pointer-events-none"}`}
          >
            <Image
              fill
              src={imageUrl}
              alt={`thumbnail image for ${product.title}`}
              className={cn(
                "animate-pulse object-contain",
                isLoaded && "hidden",
              )}
            />
            <Image
              width={500}
              height={500}
              loading="lazy"
              alt={product.title}
              src={product.images[imageIndex].link}
              className={cn(
                "size-full object-contain transition-opacity duration-300",
                isLoaded ? "opacity-100" : "opacity-0",
              )}
              onLoad={handleImageLoad}
            />
          </DialogTrigger>
          <DialogContent className="min-h-svh max-w-screen-xl px-0 min-[400px]:min-h-[calc(100%-10rem)] lg:px-6">
            <Lightbox product={product} />
          </DialogContent>
        </Dialog>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        defaultSize={30}
        className="mx-auto w-full max-w-screen-md"
      >
        <Carousel opts={{ dragFree: true, align: "start" }}>
          <CarouselContent className="py-4 pl-4">
            {product.images.map((image, index) => (
              <CarouselItem key={index} className="basis-[100px]">
                <Button
                  variant="ghost"
                  className={cn(
                    "h-24 w-full p-0",
                    imageIndex === index && "border shadow-sm",
                  )}
                  onClick={() => handleImageIndexChange(index)}
                >
                  <Image
                    src={image.link}
                    alt={product.title}
                    width={100}
                    height={100}
                    className="size-16 object-contain"
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
