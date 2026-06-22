import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Help Center – RentIt Support & FAQs",
  description: "Get answers to common questions about using RentIt. Browse FAQs on listings, payments, tenant verification and more in our Help Center.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://rentit.in/help" },
};

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
