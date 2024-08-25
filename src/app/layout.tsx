import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Toaster } from "../components/ui/sonner";

export const metadata: Metadata = {
  title: {
    default: "Techbots - Home",
    template: "Techbots - %s",
  },
  description: "Explore computer and electronic parts at Techbots.",
};

const inter = Inter({
  subsets: ["latin"],
  style: "normal",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className} bg-[url('/images/bg.png')] bg-cover bg-no-repeat`}
        >
          <Header />
          {children}
          {/* <Footer /> */}
          <Toaster
            toastOptions={{
              unstyled: true,
              classNames: {
                toast:
                  "flex items-center gap-4 p-4 bg-primary/90 backdrop-blur-sm text-secondary rounded-xl w-full",
                title: "font-semibold",
                description: "text-xs",
                actionButton:
                  "px-4 py-1 font-medium bg-background text-primary text-sm rounded",
              },
            }}
            duration={2500}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
