import Link from 'next/link';
import Image from 'next/image';
import { blogsData } from '@/data';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

export function LatestBlogs() {
  return (
    <section id='blogs' className='px-6 py-10 pb-20 bg-secondary max-view lg:mx-auto'>
      <h2 className='text-2xl font-bold mb-12'>Latest Tech Blogs</h2>
      <Carousel>
        <CarouselContent>
          {blogsData.map(item => (
            <CarouselItem key={item.id} className='basis-10/12 sm:basis-1/2 lg:basis-1/3'>
              <Card className='grid max-w-lg h-full'>
                <CardHeader>
                  <h3 className='text-lg font-semibold'>{item.title}</h3>
                  <p className='mt-2 text-sm text-gray-500'>{item.description}</p>
                </CardHeader>
                <CardContent>
                  <Image
                    src={item.image}
                    alt={item.title}
                    className='rounded-lg object-contain'
                    width={400}
                    height={200}
                  />
                </CardContent>
                <CardFooter className='mt-auto'>
                  <Button size='sm' variant='outline' className='group'>
                    <Link href={item.url} className='flex items-center gap-2'>
                      Read{' '}
                      <ExternalLink className='size-4 text-muted-foreground group-hover:text-blue-500' />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='absolute top-full translate-y-1/2 left-0' />
        <CarouselNext className='absolute top-full translate-y-1/2 right-0' />
      </Carousel>
    </section>
  );
}
