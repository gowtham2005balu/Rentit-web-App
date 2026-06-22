import type { Metadata } from 'next';
import Navbar from '../../../components/Navbar';

export const metadata: Metadata = {
  title: "Apartments & PGs for Rent in Porur Chennai – RentIt",
  description: "Rent apartments and PGs in Porur, Chennai. Affordable rentals near DLF IT Park and Ramapuram. Browse verified listings for 1BHK, 2BHK and PG rooms on RentIt.",
  alternates: { canonical: "https://rentit.in/apartments/porur" },
};

export default function PorurLocal() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>Apartments in Porur</h1>
        <p>Coming soon.</p>
      </div>
    </div>
  );
}
