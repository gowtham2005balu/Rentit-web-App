import type { Metadata } from 'next';
import Navbar from '../../components/Navbar';

export const metadata: Metadata = {
  title: "Commercial Properties for Rent in Chennai – RentIt",
  description: "Browse verified commercial properties for rent in Chennai. Office spaces, retail shops, showrooms and warehouses across OMR, Anna Nagar, T. Nagar and Guindy.",
  alternates: { canonical: "https://rentit.in/commercial-properties" },
};

export default function CommercialProperties() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>Commercial Properties for Rent in Chennai</h1>
        <p>Commercial properties. Coming soon.</p>
      </div>
    </div>
  );
}
