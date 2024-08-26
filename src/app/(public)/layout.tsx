import { Header } from "../components/header";
import { Footer } from "../components/footer";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>
        {children}
        <Footer />
      </main>
    </>
  );
}
