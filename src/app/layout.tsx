import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "../components/ui/sonner";
import { LoaderIcon } from "lucide-react";

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
    <html lang="en">
      <ClerkProvider>
        <body
          className={`${inter.className} flex min-h-dvh flex-col bg-gradient-to-br from-gray-200/80 to-indigo-200/40`}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 -z-10 [background-image:linear-gradient(rgba(0,0,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,255,0.05)_1px,transparent_1px)] [background-size:27px_27px] [mask-image:linear-gradient(to_bottom,white,transparent_92%)]"
          />
          <ClerkLoading>
            <div className="fixed inset-0 z-[999] flex items-center justify-center">
              <div className="flex items-center gap-4 text-primary">
                <LoaderIcon className="size-10 animate-[spin_2s_linear_infinite] text-current" />
                <p className="text-lg font-semibold">Loading...</p>
              </div>
            </div>
          </ClerkLoading>
          <ClerkLoaded>{children}</ClerkLoaded>
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
      </ClerkProvider>
    </html>
  );
}
