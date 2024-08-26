import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Sign In",
  description: "Sign in to your account.",
};

export default function Page() {
  return (
    <div className="flex h-full items-center justify-center">
      <SignIn />
    </div>
  );
}
