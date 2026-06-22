import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms of Service – RentIt",
  description: "Read RentIt's Terms of Service governing your use of our rental marketplace platform, including listing rules, user responsibilities and dispute resolution.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://rentit.in/terms-of-service" },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
