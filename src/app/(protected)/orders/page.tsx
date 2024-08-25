import { OrdersView } from './_components/orders_view';

export const metadata = {
  title: 'My Orders',
  description: 'View your orders and track their status.',
};

export default function OrdersPage() {
  return (
    <main className='min-h-screen max-view mx-auto'>
      <OrdersView />
    </main>
  );
}
