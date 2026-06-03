import { createHash } from "crypto";

import { SearchParams } from "@/app/lib/types";
import type {
  StripeCheckoutItem,
  StripeCheckoutSnapshot,
  StripeShippingInfo,
} from "../types";

const itemSeparator = "|";
const itemValueSeparator = ":";

function toSearchParamValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

/**
 * Encodes an array of StripeCheckoutItem into a string format suitable for storage in metadata or search params.
 * @param items - An array of StripeCheckoutItem to encode. 
 * @returns A string representation of the items, where each item is represented as "asin:cartQuantity" and items are separated by "|".
 
* - Example: "B001234567:2|B008765432:1" represents two items, one with ASIN "B001234567" and quantity 2, and another with ASIN "B008765432" and quantity 1.
 */
export function encodeOrderItems(items: StripeCheckoutItem[]) {
  return items
    .map((item) => `${item.asin}${itemValueSeparator}${item.cartQuantity}`)
    .join(itemSeparator);
}

/**
 * Decodes a string representation of order items back into an array of StripeCheckoutItem.
 * @param value - A string representation of the items, where each item is represented as "asin:cartQuantity" and items are separated by "|".
 * @returns  An array of StripeCheckoutItem decoded from the input string. If the input string is empty or invalid, an empty array is returned.
 */
export function decodeOrderItems(value: string) {
  if (!value) return [];

  return value
    .split(itemSeparator)
    .map((item) => {
      const [asin, quantityValue] = item.split(itemValueSeparator);
      const cartQuantity = Number(quantityValue);

      return {
        asin,
        cartQuantity,
      };
    })
    .filter(
      (item) =>
        item.asin &&
        Number.isFinite(item.cartQuantity) &&
        item.cartQuantity > 0,
    );
}

/**
 * Builds a unique checkout attempt key based on the user's Clerk ID and the details of the checkout snapshot. This key is used to identify and track a specific checkout attempt.
 * @param clerkUserId - The Clerk user ID associated with the checkout attempt.
 * @param snapshot - The StripeCheckoutSnapshot containing the details of the checkout.
 * @return A SHA-256 hash string that uniquely represents the checkout attempt based on the provided user ID and snapshot details.
 * The function constructs a seed string by concatenating various properties of the checkout snapshot along with the Clerk user ID, and then generates a SHA-256 hash of this seed to produce the final checkout attempt key.
 */
export function buildCheckoutAttemptKey({
  clerkUserId,
  snapshot,
}: {
  clerkUserId: string;
  snapshot: StripeCheckoutSnapshot;
}) {
  const seed = [
    "checkout-attempt-v1",
    clerkUserId,
    encodeOrderItems(snapshot.items),
    snapshot.shippingInfo.firstname,
    snapshot.shippingInfo.lastname,
    snapshot.shippingInfo.mainAddress,
    snapshot.shippingInfo.optionalAddress ?? "",
    snapshot.shippingInfo.city,
    String(snapshot.shippingInfo.phone),
    snapshot.shippingInfo.shipping,
    snapshot.coupon ?? "",
  ].join("|");

  return createHash("sha256").update(seed).digest("hex");
}

/**
 * Parses the checkout snapshot from the search parameters of the checkout page URL.
 * @param searchParams - The search parameters from the checkout page URL, which may contain encoded information about the checkout snapshot.
 * @returns A StripeCheckoutSnapshot object containing the details of the checkout if the search parameters are valid; otherwise, it returns null.
 */
export function parseCheckoutSnapshot(searchParams: SearchParams) {
  const items = decodeOrderItems(toSearchParamValue(searchParams.items) ?? "");
  const firstname = toSearchParamValue(searchParams.firstname);
  const lastname = toSearchParamValue(searchParams.lastname);
  const mainAddress = toSearchParamValue(searchParams.mainAddress);
  const city = toSearchParamValue(searchParams.city);
  const phoneValue = toSearchParamValue(searchParams.phone);
  const shipping = toSearchParamValue(searchParams.shipping);
  const coupon = toSearchParamValue(searchParams.coupon) ?? "";

  if (
    !items.length ||
    !firstname ||
    !lastname ||
    !mainAddress ||
    !city ||
    !phoneValue ||
    (shipping !== "free" && shipping !== "next")
  ) {
    return null;
  }

  const phone = Number(phoneValue);
  if (!Number.isFinite(phone)) return null;

  return {
    items,
    shippingInfo: {
      firstname,
      lastname,
      mainAddress,
      optionalAddress: toSearchParamValue(searchParams.optionalAddress) ?? "",
      city,
      phone,
      shipping,
    },
    coupon,
  } satisfies StripeCheckoutSnapshot;
}

/**
 * Builds a metadata object for a Stripe Payment Intent based on the provided user ID, checkout snapshot, and an optional checkout key.
 * This metadata is used to store relevant information about the checkout attempt within the Stripe Payment Intent, allowing for easier retrieval and processing during webhook events or when viewing the payment intent in the Stripe dashboard.
 * @param clerkUserId - The Clerk user ID associated with the checkout attempt.
 * @param snapshot - The StripeCheckoutSnapshot containing the details of the checkout.
 * @param checkoutKey - An optional unique key representing the checkout attempt, which can be generated using the buildCheckoutAttemptKey function.
 * @return An object containing key-value pairs that represent the metadata to be attached to the Stripe Payment Intent.
 */
export function buildPaymentIntentMetadata({
  clerkUserId,
  snapshot,
  checkoutKey,
}: {
  clerkUserId: string;
  snapshot: StripeCheckoutSnapshot;
  checkoutKey?: string;
}): Record<string, string> {
  return {
    clerkUserId,
    items: encodeOrderItems(snapshot.items),
    checkoutKey: checkoutKey ?? "",
    firstname: snapshot.shippingInfo.firstname,
    lastname: snapshot.shippingInfo.lastname,
    mainAddress: snapshot.shippingInfo.mainAddress,
    optionalAddress: snapshot.shippingInfo.optionalAddress ?? "",
    city: snapshot.shippingInfo.city,
    phone: String(snapshot.shippingInfo.phone),
    shipping: snapshot.shippingInfo.shipping,
    coupon: snapshot.coupon ?? "",
  };
}

/**
 * Parses the metadata from a Stripe Payment Intent to reconstruct the original checkout snapshot and associated user information.
 * @param metadata - The metadata object retrieved from the Stripe Payment Intent, which contains key-value pairs representing the checkout information stored during the payment intent creation.
 * @returns An object containing the Clerk user ID, an array of StripeCheckoutItem representing the items in the order, and a StripeShippingInfo object with the shipping details. If the metadata is missing required fields or contains invalid data, the function returns null.
 */
export function parsePaymentIntentMetadata(
  metadata: Record<string, string | undefined> | null | undefined,
) {
  const clerkUserId = metadata?.clerkUserId;
  const items = metadata?.items;
  const firstname = metadata?.firstname;
  const lastname = metadata?.lastname;
  const mainAddress = metadata?.mainAddress;
  const city = metadata?.city;
  const phoneValue = metadata?.phone;
  const shipping = metadata?.shipping;
  const coupon = metadata?.coupon ?? "";

  if (
    !clerkUserId ||
    !items ||
    !firstname ||
    !lastname ||
    !mainAddress ||
    !city ||
    !phoneValue ||
    (shipping !== "free" && shipping !== "next")
  ) {
    return null;
  }

  const phone = Number(phoneValue);
  if (!Number.isFinite(phone)) {
    return null;
  }

  const decodedItems = decodeOrderItems(items);
  if (!decodedItems.length) {
    return null;
  }

  return {
    clerkUserId,
    items: decodedItems,
    coupon,
    shippingInfo: {
      firstname,
      lastname,
      mainAddress,
      optionalAddress: metadata?.optionalAddress ?? "",
      city,
      phone,
      shipping,
    } satisfies StripeShippingInfo,
  };
}
