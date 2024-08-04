import { CartViews } from "@/app/cart/_components/cart_view";

export const metadata = {
  title: "Cart",
  description: "Your shopping cart.",
};

export default async function CartPage() {
  return (
    <main className="min-h-svh">
      <CartViews />
    </main>
  );
}
