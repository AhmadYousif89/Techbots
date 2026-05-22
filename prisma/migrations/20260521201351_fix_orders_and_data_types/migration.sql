/*
  Warnings:

  - You are about to alter the column `total_value` on the `carts` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `price_paid` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to drop the column `cart_id` on the `products` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `products` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.

*/
-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_product_asin_fkey";

-- DropIndex
DROP INDEX "orders_clerk_user_id_key";

-- AlterTable
ALTER TABLE "carts" ALTER COLUMN "total_value" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "price_paid" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "products" DROP COLUMN "cart_id",
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);

-- CreateIndex
CREATE INDEX "order_items_orderId_idx" ON "order_items"("orderId");

-- CreateIndex
CREATE INDEX "order_items_product_asin_idx" ON "order_items"("product_asin");

-- CreateIndex
CREATE INDEX "orders_clerk_user_id_idx" ON "orders"("clerk_user_id");

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_asin_fkey" FOREIGN KEY ("product_asin") REFERENCES "products"("asin") ON DELETE RESTRICT ON UPDATE CASCADE;
