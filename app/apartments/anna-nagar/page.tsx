import type { Metadata } from 'next';
import Navbar from '../../../components/Navbar';

export const metadata: Metadata = {
  title: "Apartments & PGs for Rent in Anna Nagar Chennai – RentIt",
  description: "Explore rental apartments, PGs and villas in Anna Nagar, Chennai. A premium residential locality with excellent connectivity and amenities. Find your home on RentIt.",
  alternates: { canonical: "https://rentit.in/apartments/anna-nagar" },
};

export default function AnnaNagarLocal() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>Apartments in Anna Nagar</h1>
        <p>Coming soon.</p>
      </div>
    </div>
  );
}
