import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <main className='my-52 grid place-content-center'>
      <SignIn />;
    </main>
  );
}
