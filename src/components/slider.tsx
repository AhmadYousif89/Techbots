import Link from 'next/link';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

import { Button } from './ui/button';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

const slides = [
  {
    id: 1,
    url: '/products?category=laptops',
    // title: 'Shop the latest laptops collection',
    img: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 2,
    url: '/products?category=cellPhones',
    // title: 'Shop the latest mobiles flagship',
    img: 'https://images.unsplash.com/photo-1580327332925-a10e6cb11baa?q=80&w=2014&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 3,
    url: '/products?category=gaming',
    // title: 'Shop the latest gaming consoles',
    img: 'https://images.unsplash.com/photo-1567928513899-997d98489fbd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
];

export function HomeSlider() {
  return (
    <Carousel plugins={[]} className='max-w-screen-xl lg:mx-auto'>
      <CarouselContent className='ml-0'>
        {slides.map((slide, index) => (
          <CarouselItem key={index} className='relative h-[calc(100svh-80px)]'>
            <Image
              fill
              src={slide.img}
              alt={'product image'}
              className='max-w-screen-xl object-cover'
            />
            <Link
              href={slide.url}
              className='absolute bottom-10 left-1/2 -translate-x-1/2'>
              <Button
                size={'lg'}
                variant={'outline'}
                className='bg-foreground/50 text-background'>
                Shop Now
              </Button>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
