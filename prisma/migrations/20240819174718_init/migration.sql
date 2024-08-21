/*
  Warnings:

  - You are about to drop the column `total` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the `images` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[clerk_user_id]` on the table `carts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clerk_user_id]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerk_user_id` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_asin` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clerk_user_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Made the column `asin` on table `reviews` required. This step will fail if there are existing NULL values in that column.
  - Made the column `link` on table `reviews` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_userId_fkey";

-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_productAsin_fkey";

-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_productId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_userId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_cart_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_product_id_fkey";

-- DropIndex
DROP INDEX "carts_userId_key";

-- AlterTable
ALTER TABLE "carts" DROP COLUMN "total",
DROP COLUMN "userId",
ADD COLUMN     "clerk_user_id" TEXT NOT NULL,
ADD COLUMN     "is_synced" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "total_value" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "count" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "productId",
ADD COLUMN     "product_asin" TEXT NOT NULL,
ALTER COLUMN "count" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "userId",
ADD COLUMN     "clerk_user_id" TEXT NOT NULL,
ALTER COLUMN "price_paid" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "images_count" SET DEFAULT 0,
ALTER COLUMN "stock_quantity" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "product_id",
ALTER COLUMN "asin" SET NOT NULL,
ALTER COLUMN "link" SET NOT NULL;

-- DropTable
DROP TABLE "images";

-- CreateTable
CREATE TABLE "cart_items" (
    "cart_id" TEXT NOT NULL,
    "product_asin" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "id" PRIMARY KEY ("cart_id","product_asin")
);

-- CreateTable
CREATE TABLE "product_images" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "variant" TEXT NOT NULL,
    "product_asin" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cart_items_product_asin_key" ON "cart_items"("product_asin");

-- CreateIndex
CREATE INDEX "cart_items_cart_id_product_asin_idx" ON "cart_items"("cart_id", "product_asin");

-- CreateIndex
CREATE UNIQUE INDEX "carts_clerk_user_id_key" ON "carts"("clerk_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_clerk_user_id_key" ON "orders"("clerk_user_id");

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_clerk_user_id_fkey" FOREIGN KEY ("clerk_user_id") REFERENCES "users"("clerk_user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_asin_fkey" FOREIGN KEY ("product_asin") REFERENCES "products"("asin") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_clerk_user_id_fkey" FOREIGN KEY ("clerk_user_id") REFERENCES "users"("clerk_user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_asin_fkey" FOREIGN KEY ("product_asin") REFERENCES "products"("asin") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_asin_fkey" FOREIGN KEY ("product_asin") REFERENCES "products"("asin") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_asin_fkey" FOREIGN KEY ("asin") REFERENCES "products"("asin") ON DELETE RESTRICT ON UPDATE CASCADE;
