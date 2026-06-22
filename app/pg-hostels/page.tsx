import type { Metadata } from 'next';
import Navbar from '../../components/Navbar';

export const metadata: Metadata = {
  title: "PG & Hostels for Rent in Chennai – RentIt",
  description: "Find affordable PGs and hostels in Chennai near IT corridors and colleges. Male, female & co-ed options with food, Wi-Fi and furnished rooms available.",
  alternates: { canonical: "https://rentit.in/pg-hostels" },
};

export default function PgHostels() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>PG & Hostels for Rent in Chennai</h1>
        <p>Affordable PGs and hostels. Coming soon.</p>
      </div>
    </div>
  );
}
