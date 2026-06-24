import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WishlistProvider } from '../context/WishlistContext';
import { AuthProvider } from '@/context/AuthContext';
import RentitAIFloatingButton from '../components/RentitAIFloatingButton';
import AuthModalWrapper from '../components/AuthModalWrapper';
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });



export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: '%s | RentIt',
    default: 'RentIt - Premium Real Estate',
  },
  description: "Find your perfect apartment, PG, or commercial space with RentIt",
  metadataBase: new URL('https://rentit.in'),
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    siteName: 'RentIt',
  },
  twitter: {
    card: 'summary_large_image',
  },
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
