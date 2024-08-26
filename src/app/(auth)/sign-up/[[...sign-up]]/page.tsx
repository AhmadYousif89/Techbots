import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "Sign Up",
  description: "Sign up for a new account.",
};

export default function Page() {
  return (
    <div className="flex h-full items-center justify-center">
      <SignUp />
    </div>
  );
}
