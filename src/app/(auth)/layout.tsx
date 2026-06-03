import { Main } from "@/components/main";
import { Logo } from "../components/logo";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Main className="pb-8">
      <Logo className="h-20 w-fit px-8 text-primary" />
      {children}
    </Main>
  );
}
