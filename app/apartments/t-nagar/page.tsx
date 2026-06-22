import type { Metadata } from 'next';
import Navbar from '../../../components/Navbar';

export const metadata: Metadata = {
  title: "Apartments & PGs for Rent in T. Nagar Chennai – RentIt",
  description: "Find apartments and PGs for rent in T. Nagar, Chennai. Central location with easy metro access, top shopping hubs and schools nearby. Verified listings on RentIt.",
  alternates: { canonical: "https://rentit.in/apartments/t-nagar" },
};

export default function TNagarLocal() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>Apartments in T. Nagar</h1>
        <p>Coming soon.</p>
      </div>
    </div>
  );
}
