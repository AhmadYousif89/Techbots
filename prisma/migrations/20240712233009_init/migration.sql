/*
  Warnings:

  - You are about to drop the column `productId` on the `images` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_productId_fkey";

-- AlterTable
ALTER TABLE "images" DROP COLUMN "productId",
ADD COLUMN     "productAsin" TEXT;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_productAsin_fkey" FOREIGN KEY ("productAsin") REFERENCES "products"("asin") ON DELETE SET NULL ON UPDATE CASCADE;
