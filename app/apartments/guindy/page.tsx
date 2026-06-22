import type { Metadata } from 'next';
import Navbar from '../../../components/Navbar';

export const metadata: Metadata = {
  title: "Apartments & PGs for Rent in Guindy Chennai – RentIt",
  description: "Rent apartments, PGs and co-living spaces in Guindy, Chennai. Ideal for professionals near Guindy Industrial Estate and St. Thomas Mount. Browse RentIt listings.",
  alternates: { canonical: "https://rentit.in/apartments/guindy" },
};

export default function GuindyLocal() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>Apartments in Guindy</h1>
        <p>Coming soon.</p>
      </div>
    </div>
  );
}
