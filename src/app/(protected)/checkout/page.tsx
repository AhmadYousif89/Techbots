// Force the StripeOrder module to be processed at build time
import "@/app/(protected)/checkout/stripe/lib/order";

export default function Page() {
  return <h1 className="sr-only">Checkout Session</h1>;
}
