-- CreateTable
CREATE TABLE "checkout_attempts" (
    "id" TEXT NOT NULL,
    "checkout_key" TEXT NOT NULL,
    "clerk_user_id" TEXT NOT NULL,
    "snapshot" JSONB NOT NULL,
    "stripe_payment_intent_id" TEXT,
    "payment_intent_status" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "checkout_attempts_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "payment_events" (
    "id" TEXT NOT NULL,
    "stripe_event_id" TEXT NOT NULL,
    "stripe_event_type" TEXT NOT NULL,
    "stripe_payment_intent_id" TEXT NOT NULL,
    "checkout_key" TEXT,
    "payload" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "payment_events_pkey" PRIMARY KEY ("id")
);
-- CreateIndex
CREATE UNIQUE INDEX "checkout_attempts_checkout_key_key" ON "checkout_attempts"("checkout_key");
-- CreateIndex
CREATE UNIQUE INDEX "checkout_attempts_stripe_payment_intent_id_key" ON "checkout_attempts"("stripe_payment_intent_id");
-- CreateIndex
CREATE INDEX "checkout_attempts_clerk_user_id_idx" ON "checkout_attempts"("clerk_user_id");
-- CreateIndex
CREATE UNIQUE INDEX "payment_events_stripe_event_id_key" ON "payment_events"("stripe_event_id");
-- CreateIndex
CREATE INDEX "payment_events_stripe_payment_intent_id_idx" ON "payment_events"("stripe_payment_intent_id");
-- CreateIndex
CREATE INDEX "payment_events_checkout_key_idx" ON "payment_events"("checkout_key");
-- AddForeignKey
ALTER TABLE "checkout_attempts"
ADD CONSTRAINT "checkout_attempts_clerk_user_id_fkey" FOREIGN KEY ("clerk_user_id") REFERENCES "users"("clerk_user_id") ON DELETE CASCADE ON UPDATE CASCADE;
