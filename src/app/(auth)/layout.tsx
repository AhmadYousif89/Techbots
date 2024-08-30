import { Logo } from "../components/logo";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-view mx-auto min-h-svh bg-background pb-8">
      <Logo className="h-20 w-fit px-8 text-primary" />
      {children}
    </main>
  );
}
