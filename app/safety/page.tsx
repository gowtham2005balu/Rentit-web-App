import type { Metadata } from 'next';
import Navbar from '../../components/Navbar';

export const metadata: Metadata = {
  title: "Safety Center – Rent Safely with RentIt",
  description: "Learn how RentIt keeps you safe. Read our renting safety tips, fraud prevention guidelines and how we verify tenants and landlords on our platform.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://rentit.in/safety" },
};

export default function Safety() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>Safety Center</h1>
        <p>Coming soon.</p>
      </div>
    </div>
  );
}
