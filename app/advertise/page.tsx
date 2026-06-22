import type { Metadata } from 'next';
import Navbar from '../../components/Navbar';

export const metadata: Metadata = {
  title: "Advertise on RentIt – Reach Chennai Renters",
  description: "Advertise your brand on RentIt and reach a highly targeted audience of renters across Chennai. Explore banner, featured listing and sponsored content options.",
  alternates: { canonical: "https://rentit.in/advertise" },
};

export default function Advertise() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>Advertise on RentIt</h1>
        <p>Coming soon.</p>
      </div>
    </div>
  );
}
