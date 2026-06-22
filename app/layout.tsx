import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WishlistProvider } from '../context/WishlistContext';
import { AuthProvider } from '@/context/AuthContext';
import RentitAIFloatingButton from '../components/RentitAIFloatingButton';
import AuthModalWrapper from '../components/AuthModalWrapper';
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "RentIt - Premium Real Estate",
  description: "Find your perfect apartment with RentIt",
};

import Footer from '../components/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body className={inter.variable} suppressHydrationWarning>
        <Script src="https://cdn.tailwindcss.com" strategy="afterInteractive" />
        <Script id="tailwind-config" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
            const twInterval = setInterval(() => {
              if (window.tailwind) {
                window.tailwind.config = { corePlugins: { preflight: false } };
                clearInterval(twInterval);
              }
            }, 50);
          `
        }} />
        <AuthProvider>
          <WishlistProvider>
            {children}
            <Footer />
            <RentitAIFloatingButton />
            <AuthModalWrapper />
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
