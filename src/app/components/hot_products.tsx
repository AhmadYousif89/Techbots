import Link from "next/link";
import Image from "next/image";
import { featuredProducts } from "@/lib/data";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function HotProducts() {
  return (
    <section className="bg-secondary px-6 py-20">
      <h2 className="mb-12 text-xl font-bold lg:text-2xl">Featured Porducts</h2>
      <Carousel opts={{ align: "center" }} className="mx-auto max-w-screen-xl">
        <CarouselContent>
          {featuredProducts.map((item) => (
            <CarouselItem
              key={item.id}
              className="grid basis-10/12 sm:basis-1/2 lg:basis-1/3"
            >
              <Card className="grid">
                <CardHeader>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {item.description}
                  </p>
                </CardHeader>
                <CardContent className="mt-auto grid items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="rounded-lg"
                    width={400}
                    height={200}
                  />
                </CardContent>
                <CardFooter className="grid justify-between gap-2">
                  <span className="col-span-2 row-span-1 text-sm font-medium text-muted-foreground">
                    Starts from:
                  </span>
                  <Badge
                    variant={"outline"}
                    className="min-w-16 justify-center py-2 font-medium shadow"
                  >
                    {item.price}
                  </Badge>
                  <Link href={item.url}>
                    <Button
                      variant={"link"}
                      className="rounded-md bg-primary/95 text-xs text-white"
                    >
                      {item.buttonTitle}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-full translate-y-1/2" />
        <CarouselNext className="absolute right-0 top-full translate-y-1/2" />
      </Carousel>
    </section>
  );
}
