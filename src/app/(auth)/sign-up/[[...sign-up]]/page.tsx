import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "Sign Up",
  description: "Sign up for a new account.",
};

export default function Page() {
  return (
    <main className="my-8 grid place-content-center">
      <SignUp />;
    </main>
  );
}
