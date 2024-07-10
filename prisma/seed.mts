// Seeds the products table

import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { z } from 'zod';

const prisma = new PrismaClient();

const ratingDetailSchema = z.object({
  percentage: z.number(),
  count: z.number()
});

const imageSchema = z.object({
  link: z.string(),
  variant: z.string().nullish()
});

const mainImageSchema = z.object({
  link: z.string()
});

const videoSchema = z
  .object({
    duration_seconds: z.number(),
    width: z.number(),
    height: z.number(),
    link: z.string(),
    thumbnail: z.string(),
    is_hero_video: z.boolean(),
    variant: z.string(),
    group_id: z.string(),
    group_type: z.string().nullish(),
    title: z.string()
  })
  .nullish();

const reviewSchema = z.object({
  title: z.string(),
  body: z.string(),
  asin: z.string().nullish(),
  body_html: z.string(),
  link: z.string().nullish(),
  rating: z.number(),
  date: z.object({
    raw: z.string(),
    utc: z.string()
  }),
  profile: z
    .object({
      id: z.string().nullish(),
      name: z.string().nullish(),
      link: z.string().nullish()
    })
    .nullish(),
  vine_program: z.boolean(),
  verified_purchase: z.boolean(),
  images: z.array(mainImageSchema).nullish(),
  review_country: z.string(),
  is_global_review: z.boolean()
});

const productSchema = z.object({
  asin: z.string(),
  title: z.string(),
  brand: z.string(),
  color: z.string().nullish(),
  price: z.number(),
  category: z.string(),
  description: z.string().nullish(),
  rating: z.number(),
  ratings_total: z.number(),
  rating_breakdown: z.object({
    five_star: ratingDetailSchema,
    four_star: ratingDetailSchema,
    three_star: ratingDetailSchema,
    two_star: ratingDetailSchema,
    one_star: ratingDetailSchema
  }),
  main_image: mainImageSchema,
  images: z.array(imageSchema),
  images_count: z.number(),
  videos: z.array(videoSchema).nullish(),
  videos_count: z.number().nullish(),
  top_reviews: z.array(reviewSchema),
  specifications_flat: z.string().nullish(),
  feature_bullets_flat: z.string().nullish(),
  stock_quantity: z.number()
});

export type Product = z.infer<typeof productSchema>;

const path = './data/products.json';

async function main() {
  const data = JSON.parse(readFileSync(path, 'utf8')) as Product[];

  for (const product of data.slice(8, -1)) {
    try {
      productSchema.parse(product); // Validate the product data
      const existingProduct = await prisma.product.findUnique({
        where: { asin: product.asin }
      });

      if (existingProduct) {
        console.log(`Product with asin ${product.asin} already exists. Skipping...`);
        continue;
      }

      // Seed Product
      const createdProduct = await prisma.product.create({
        data: {
          asin: product.asin,
          title: product.title,
          brand: product.brand,
          color: product.color,
          price: product.price,
          mainImage: product.main_image.link,
          category: product.category,
          description: product.description,
          rating: product.rating,
          ratingsTotal: product.ratings_total,
          imagesCount: product.images_count,
          specificationsFlat: product.specifications_flat,
          featureBulletsFlat: product.feature_bullets_flat,
          stockQuantity: product.stock_quantity,
          ratingBreakdown: product.rating_breakdown
        }
      });

      // Seed Other Product Images
      for (const image of product.images) {
        await prisma.image.create({
          data: {
            link: image.link,
            variant: image.variant,
            productId: createdProduct.id
          }
        });
      }

      // Seed Top Reviews and related Review Images and Profile
      for (const review of product.top_reviews) {
        await prisma.review.create({
          data: {
            title: review.title,
            body: review.body,
            asin: review.asin,
            bodyHtml: review.body_html,
            link: review.link,
            rating: review.rating,
            date: review.date,
            profile: review.profile ?? undefined,
            reviewCountry: review.review_country,
            productId: createdProduct.id
          }
        });
      }

      console.log(`Product with asin ${product.asin} seeded successfully.`);
    } catch (error) {
      throw new Error(`Validation failed for product ${product.asin}:\t\n` + error);
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // print the total number of products
    const totalProducts = await prisma.product.count();
    console.log(`Total products: ${totalProducts}`);
    await prisma.$disconnect();
  });