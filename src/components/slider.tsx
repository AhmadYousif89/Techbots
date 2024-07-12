'use client';

import Link from 'next/link';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

import { Button } from './ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from './ui/carousel';

const slides = [
  {
    url: '/products?category=headphones',
    title:
      'Experience the best sound quality with our latest collection of headsets and earphones',
    img: 'https://m.media-amazon.com/images/I/61gC6PBsRPL.jpg'
  },
  {
    url: '/products?category=watches',
    title: 'Stay connected and track your fitness with our latest smartwatches',
    img: 'https://m.media-amazon.com/images/I/719qgNv-ubL.jpg'
  },
  {
    url: '/products?category=laptops',
    title:
      'Get high performance, responsiveness, and long battery life with the latest laptop collection',
    img: 'https://m.media-amazon.com/images/I/81kxce-AlLL.jpg'
  },
  {
    url: '/products?category=mobiles',
    title: "Don't miss out on the latest mobile phones, tablets, and accessories",
    img: 'https://m.media-amazon.com/images/I/613cvL2ZYHL.jpg'
  },
  {
    url: '/products?category=accessories',
    title: 'Get the best gaming experience with our latest gaming accessories',
    img: 'https://m.media-amazon.com/images/I/618zZ7u3sUL.jpg'
  }
];

export function HomeSlider() {
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 6000, stopOnInteraction: false })]}
      className='relative group'>
      <CarouselContent className='h-[calc(100svh-80px)] bg-secondarys'>
        {slides.map((slide, index) => (
          <CarouselItem key={index} className='grid grid-rows-2 pl-1 md:grid-cols-2'>
            <Image
              width={600}
              height={600}
              loading='eager'
              src={slide.img}
              alt={'product image'}
              className='w-full h-full bg-background max-w-screen-xl object-cover md:object-contain md:row-span-full md:col-[2]'
            />
            <div className='grid place-content-center md:row-span-full gap-4 sm:gap-8 lg:gap-12 text-center bg-gradient-to-b from-primary/50 to-primary/90 xl py-8 px-4 lg:px-16 backdrop-blur-sm'>
              <p className='text-secondary p-4 rounded text-lg lg:text-xl xl:text-2xl'>
                {slide.title}
              </p>
              <Button
                size={'lg'}
                variant={'outline'}
                className='place-self-center bg-foreground/50 text-background'>
                <Link href={slide.url}>Shop Now</Link>
              </Button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='hidden bg-muted group-hover:inline-flex left-5 z-10 lg:rounded border-input/20 size-12 lg:h-1/2 *:text-primary lg:*:size-5' />
      <CarouselNext className='hidden bg-muted group-hover:inline-flex right-5 z-10 lg:rounded border-input/20 size-12 lg:h-1/2 *:text-primary lg:*:size-5' />
    </Carousel>
  );
}
