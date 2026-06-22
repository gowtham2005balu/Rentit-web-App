import type { Metadata } from 'next';
import Navbar from '../../../components/Navbar';

export const metadata: Metadata = {
  title: "Apartments & PGs for Rent in Adyar Chennai – RentIt",
  description: "Discover rental apartments, PGs and independent houses in Adyar, Chennai. A sought-after residential neighbourhood near the beach and top schools. Listed on RentIt.",
  alternates: { canonical: "https://rentit.in/apartments/adyar" },
};

export default function AdyarLocal() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>Apartments in Adyar</h1>
        <p>Coming soon.</p>
      </div>
    </div>
  );
}
