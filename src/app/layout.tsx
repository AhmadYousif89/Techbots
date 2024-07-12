import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/sonner';
import { Header } from '@/components/header';
import { Footer } from '@/app/footer';

const inter = Inter({
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'TechBots',
  description: 'Explore computer and electronic parts at TechBots.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body
          className={`${inter.className} bg-[url('/images/bg.png')] bg-no-repeat bg-cover`}>
          <Header />
          {children}
          <Footer />
          <Toaster
            toastOptions={{
              unstyled: true,
              classNames: {
                toast:
                  'flex items-center gap-4 p-4 bg-primary/90 backdrop-blur-sm text-secondary rounded-xl w-full',
                title: 'font-semibold',
                description: 'text-xs',
                actionButton:
                  'px-4 py-1 font-medium bg-background text-primary text-sm rounded'
              }
            }}
            duration={2000}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
