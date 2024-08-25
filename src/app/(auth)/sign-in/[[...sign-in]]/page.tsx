import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Sign In",
  description: "Sign in to your account.",
};

export default function Page() {
  return (
    <main className="my-20 grid place-content-center">
      <SignIn />;
    </main>
  );
}
