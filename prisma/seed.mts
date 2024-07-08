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
  variant: z.string().nullable()
});

const mainImageSchema = z.object({
  link: z.string()
});

const videoSchema = z.object({
  duration_seconds: z.number(),
  width: z.number(),
  height: z.number(),
  link: z.string(),
  thumbnail: z.string(),
  is_hero_video: z.boolean(),
  variant: z.string(),
  group_id: z.string(),
  group_type: z.string(),
  title: z.string()
});

const reviewSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  asin: z.string(),
  body_html: z.string(),
  link: z.string(),
  rating: z.number(),
  date: z.object({
    raw: z.string(),
    utc: z.string()
  }),
  profile: z.object({
    id: z.string(),
    name: z.string().nullish(),
    link: z.string()
  }),
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
  color: z.string().nullable(),
  price: z.string(),
  category: z.string(),
  description: z.string().nullable(),
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
  videos: z.array(videoSchema).nullable(),
  videos_count: z.number().nullable(),
  top_reviews: z.array(reviewSchema),
  specifications_flat: z.string(),
  feature_bullets_flat: z.string(),
  stock_quantity: z.number()
});

export type Product = z.infer<typeof productSchema>;

const path = './data/products.json';

async function main() {
  const data = JSON.parse(readFileSync(path, 'utf8')) as Product[];

  for (const product of data.slice(0, 2)) {
    try {
      productSchema.parse(product); // Validate the product data
      const existingProduct = await prisma.product.findUnique({
        where: { asin: product.asin }
      });

      if (existingProduct) {
        console.log(`Product with asin ${product.asin} already exists. Skipping...`);
        continue;
      }

      // Seed RatingDetails
      const fiveStarDetail = await prisma.ratingDetail.create({
        data: {
          percentage: product.ratingBreakdown.five_star.percentage,
          count: product.ratingBreakdown.five_star.count
        }
      });

      const fourStarDetail = await prisma.ratingDetail.create({
        data: {
          percentage: product.ratingBreakdown.four_star.percentage,
          count: product.ratingBreakdown.four_star.count
        }
      });

      const threeStarDetail = await prisma.ratingDetail.create({
        data: {
          percentage: product.ratingBreakdown.three_star.percentage,
          count: product.ratingBreakdown.three_star.count
        }
      });

      const twoStarDetail = await prisma.ratingDetail.create({
        data: {
          percentage: product.ratingBreakdown.two_star.percentage,
          count: product.ratingBreakdown.two_star.count
        }
      });

      const oneStarDetail = await prisma.ratingDetail.create({
        data: {
          percentage: product.ratingBreakdown.one_star.percentage,
          count: product.ratingBreakdown.one_star.count
        }
      });

      // Seed RatingBreakdown
      const ratingBreakdown = await prisma.ratingBreakdown.create({
        data: {
          five_star: { connect: { id: fiveStarDetail.id } },
          four_star: { connect: { id: fourStarDetail.id } },
          three_star: { connect: { id: threeStarDetail.id } },
          two_star: { connect: { id: twoStarDetail.id } },
          one_star: { connect: { id: oneStarDetail.id } }
        }
      });

      // Seed Main Image
      const mainImage = await prisma.mainImage.create({
        data: {
          link: product.mainImage.link
        }
      });

      // Seed Product
      const createdProduct = await prisma.product.create({
        data: {
          asin: product.asin,
          title: product.title,
          brand: product.brand,
          color: product.color,
          price: product.price,
          category: product.category,
          description: product.description,
          rating: product.rating,
          ratings_total: product.ratingsTotal,
          ratingBreakdownId: ratingBreakdown.id,
          mainImageId: mainImage.id,
          images_count: product.images_count,
          videos_count: product.videos_count,
          specifications_flat: product.specificationsFlat,
          feature_bullets_flat: product.featureBulletsFlat,
          stock_quantity: product.stockQuantity
        }
      });

      // Update Main Image to include productId
      await prisma.mainImage.update({
        where: { id: mainImage.id },
        data: { productId: createdProduct.id }
      });

      // Update RatingBreakdown to include productId
      if (ratingBreakdown) {
        await prisma.ratingBreakdown.update({
          where: { id: ratingBreakdown.id },
          data: { productId: createdProduct.id }
        });
      }

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

      // Seed Videos
      if (product.videos) {
        for (const video of product.videos) {
          await prisma.video.create({
            data: {
              duration_seconds: video.duration_seconds,
              width: video.width,
              height: video.height,
              link: video.link,
              thumbnail: video.thumbnail,
              is_hero_video: video.is_hero_video,
              variant: video.variant,
              group_id: video.group_id,
              group_type: video.group_type,
              title: video.title,
              productId: createdProduct.id
            }
          });
        }
      }

      // Seed Top Reviews and related Review Images and Profile
      for (const review of product.top_reviews) {
        const createdReview = await prisma.review.create({
          data: {
            id: review.id,
            title: review.title,
            body: review.body,
            asin: review.asin,
            body_html: review.body_html,
            link: review.link,
            rating: review.rating,
            date: review.date,
            profile: review.profile,
            vine_program: review.vine_program,
            verified_purchase: review.verified_purchase,
            review_country: review.review_country,
            is_global_review: review.is_global_review,
            productId: createdProduct.id
          }
        });
        if (review.images) {
          for (const image of review.images) {
            await prisma.mainImage.create({
              data: {
                link: image.link,
                reviewId: createdReview.id
              }
            });
          }
        }
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
    await prisma.$disconnect();
  });
