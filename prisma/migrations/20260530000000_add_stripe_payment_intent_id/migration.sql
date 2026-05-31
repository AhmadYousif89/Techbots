ALTER TABLE "orders"
ADD COLUMN "stripe_payment_intent_id" TEXT;
CREATE UNIQUE INDEX "orders_stripe_payment_intent_id_key" ON "orders"("stripe_payment_intent_id");
