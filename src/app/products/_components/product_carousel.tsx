'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable';
import { TProduct } from '../_lib/types';

export function ProductCarousel(product: any) {
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
            {product.images.map((image: { link: string }, index: number) => (
              <CarouselItem key={index} className='grid basis-32'>
                <Card
                  className={cn([
                    'py-6 grid border-0 cursor-pointer items-center justify-center shadow-none rounded',
                    imageIndex === index && 'border shadow-sm'
                  ])}
                  onClick={() => setImageIndex(index)}>
                  <Image
                    src={image.link}
                    alt={product.title}
                    width={120}
                    height={120}
                    className='h-16 object-contain'
                  />
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='absolute top-48 lg:top-44 left-5' />
          <CarouselNext className='absolute top-48 lg:top-44 right-5 lg:right-1' />
        </Carousel>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
