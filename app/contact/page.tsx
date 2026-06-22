import type { Metadata } from 'next';
import Navbar from '../../components/Navbar';

export const metadata: Metadata = {
  title: "Contact RentIt Support – We're Here to Help",
  description: "Reach out to RentIt's support team for help with listings, accounts or rental disputes. Contact us via email, chat or phone — we're here to assist you.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://rentit.in/contact" },
};

export default function Contact() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>Contact Support</h1>
        <p>Coming soon.</p>
      </div>
    </div>
  );
}
