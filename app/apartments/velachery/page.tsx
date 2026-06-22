import type { Metadata } from 'next';
import Navbar from '../../../components/Navbar';

export const metadata: Metadata = {
  title: "Apartments & PGs for Rent in Velachery Chennai – RentIt",
  description: "Rent apartments, PGs and flatmate rooms in Velachery, Chennai. Well-connected locality near OMR and Guindy with great metro access. Verified listings on RentIt.",
  alternates: { canonical: "https://rentit.in/apartments/velachery" },
};

export default function VelacheryLocal() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>Apartments in Velachery</h1>
        <p>Coming soon.</p>
      </div>
    </div>
  );
}
