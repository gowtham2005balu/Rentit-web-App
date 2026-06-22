import type { Metadata } from 'next';
import Navbar from '../../components/Navbar';

export const metadata: Metadata = {
  title: "Partner With RentIt – List Your Properties in Chennai",
  description: "Partner with RentIt to reach thousands of verified tenants in Chennai. List your properties, grow your rental business and connect with serious renters for free.",
  alternates: { canonical: "https://rentit.in/partner" },
};

export default function Partner() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>Partner With Us</h1>
        <p>Coming soon.</p>
      </div>
    </div>
  );
}
