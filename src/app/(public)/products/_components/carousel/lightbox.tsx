import Image from "next/image";
import { useState } from "react";
import { TProduct } from "@/app/lib/types";
import { ProductImageZoom } from "./image_magnifyer";

type LightboxProps = {
  product: TProduct;
};

export function Lightbox({ product }: LightboxProps) {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <section>
      <h2 className="sr-only">Browse Product Images</h2>
      <div className="flex size-full flex-col items-center justify-between lg:flex-row lg:gap-x-8">
        <div className="mb-4 grid flex-1 justify-center border-b p-4 xl:pb-8">
          <ProductImageZoom
            width={650}
            height={650}
            alt={product.title}
            src={product.images[imageIndex].link}
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 p-2 sm:px-4 lg:grid lg:grid-cols-2 lg:place-content-start lg:p-4">
          {product.images.map((image, index) => (
            <button
              key={index}
              aria-pressed={imageIndex === index}
              onClick={() => setImageIndex(index)}
              className="rounded border border-transparent p-1 hover:border-input hover:bg-primary/10 focus:border focus:bg-primary/10 aria-pressed:border aria-pressed:bg-primary/10"
            >
              <Image
                width={100}
                height={100}
                src={image.link}
                alt={product.title}
                className="size-12 object-contain"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
