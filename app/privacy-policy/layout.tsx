import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy – RentIt",
  description: "Read RentIt's Privacy Policy to understand how we collect, use and protect your personal data in compliance with applicable data protection laws.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://rentit.in/privacy-policy" },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
