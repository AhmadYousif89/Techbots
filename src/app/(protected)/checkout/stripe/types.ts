export type StripeCheckoutItem = {
  asin: string;
  cartQuantity: number;
};

export type StripeShippingInfo = {
  firstname: string;
  lastname: string;
  mainAddress: string;
  optionalAddress?: string;
  city: string;
  phone: number;
  shipping: "free" | "next";
};

export type StripeCheckoutSnapshot = {
  items: StripeCheckoutItem[];
  shippingInfo: StripeShippingInfo;
  coupon: string;
};

export type StripePaymentIntentLike = {
  id: string;
  amount: number;
  amount_received?: number | null;
  status?: string;
  metadata: Record<string, string | undefined>;
  receipt_email?: string | null;
};

export type SendEmailResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      error: unknown;
    };

export type StripeWebhookProcessingResult =
  | {
      status?: "created";
      created: true;
      emailSent: boolean;
      orderId: string;
    }
  | {
      status: "duplicate";
      created: false;
      emailSent: false;
      orderId: string;
    }
  | {
      status: "skipped";
      created: false;
      emailSent: false;
      orderId: null;
      reason: string;
    };

export type OrderWriteResult =
  | {
      kind: "created";
      orderId: string;
    }
  | {
      kind: "duplicate";
      orderId: string;
    };
