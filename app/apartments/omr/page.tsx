import type { Metadata } from 'next';
import Navbar from '../../../components/Navbar';

export const metadata: Metadata = {
  title: "Apartments & PGs for Rent in OMR Chennai – RentIt",
  description: "Find apartments, PGs and co-living spaces for rent in OMR, Chennai. Ideal for IT professionals near tech parks. Browse verified listings on RentIt.",
  alternates: { canonical: "https://rentit.in/apartments/omr" },
};

export default function OmrLocal() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>Apartments in OMR</h1>
        <p>Coming soon.</p>
      </div>
    </div>
  );
}
