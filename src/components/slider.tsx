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
    url: '/products?category=laptops',
    title:
      'Get high performance, responsiveness, and long battery life with the latest laptop collection',
    img: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    url: '/products?category=mobiles',
    title: "Don't miss out on the latest mobile phones, tablets, and accessories",
    img: 'https://m.media-amazon.com/images/I/711F6T6aySL.jpg'
  },
  {
    url: '/products?category=headphones',
    title:
      'Experience the best sound quality with our latest collection of headsets and earphones',
    img: 'https://images.unsplash.com/photo-1567928513899-997d98489fbd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    url: '/products?category=watches',
    title: 'Stay connected and track your fitness with our latest smartwatches',
    img: 'https://m.media-amazon.com/images/I/719qgNv-ubL.jpg'
  },
  {
    url: '/products?category=gaming',
    title: 'Get the best gaming experience with our latest gaming accessories',
    img: 'https://m.media-amazon.com/images/I/71qhLg1DPVL._AC_SL1500_.jpg'
  }
];

export function HomeSlider() {
  return (
    <section>
      <Carousel
        opts={{ loop: true }}
        plugins={[Autoplay({ stopOnInteraction: false })]}
        className='relative group'>
        <CarouselContent className='ml-0'>
          {slides.map((slide, index) => (
            <CarouselItem
              key={index}
              className='relative h-[calc(100svh-80px)] grid lg:grid-cols-2'>
              <Image
                fill
                src={slide.img}
                alt={'product image'}
                className='max-w-screen-xl sm:object-cover xl:object-fill lg:col-[2]'
              />
              <div className='absolute z-10 bottom-0 h-1/2 w-full sm:h-full sm:w-1/2 left-0 lg:left-2 grid place-content-center gap-4 sm:gap-8 lg:gap-12 text-center bg-gradient-to-b from-primary/50 to-primary/90 xl py-8 px-4 lg:px-16 backdrop-blur-sm'>
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
        <CarouselPrevious className='hidden group-hover:inline-flex left-5 z-10 lg:rounded border-input/20 size-12 lg:h-1/2 bg-transparent *:text-secondary lg:*:size-5 *:hover:text-primary' />
        <CarouselNext className='hidden group-hover:inline-flex right-5 z-10 lg:rounded border-input/20 size-12 lg:h-1/2 bg-transparent *:text-secondary lg:*:size-5 *:hover:text-primary' />
      </Carousel>
    </section>
  );
}
