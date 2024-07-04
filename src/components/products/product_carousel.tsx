'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/types';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../ui/carousel';
import { Card } from '../ui/card';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable';

export function ProductCarousel({ product }: { product: Product }) {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <ResizablePanelGroup
      direction='vertical'
      style={{ height: '700px', minHeight: '600px' }}
      className='self-start lg:py-6'>
      <ResizablePanel defaultSize={70} className='mx-auto w-full h-full max-w-screen-sm'>
        <Dialog>
          <DialogTrigger className='relative w-full h-full'>
            <Image
              src={product.images[imageIndex].link}
              alt={product.title}
              fill
              className='object-contain p-8'
            />
          </DialogTrigger>
          <DialogContent className='h-[calc(100%-200px)] max-w-screen-md'>
            <Image
              src={product.images[imageIndex].link}
              alt={product.title}
              fill
              className='object-contain p-8'
            />
          </DialogContent>
        </Dialog>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={30}>
        <Carousel
          className='max-w-screen-md mx-auto'
          opts={{ dragFree: true, align: 'start' }}>
          <CarouselContent className='py-8 pl-4'>
            {product.images.map((image, index) => (
              <CarouselItem key={index} className='grid basis-32'>
                <Card
                  className={cn([
                    'p-2 grid border-0 cursor-pointer items-center justify-center',
                    imageIndex === index && 'border shadow-sm'
                  ])}
                  onClick={() => setImageIndex(index)}>
                  <Image src={image.link} alt={product.title} width={120} height={120} />
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='absolute top-44 left-5' />
          <CarouselNext className='absolute top-44 right-5 lg:right-0' />
        </Carousel>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
