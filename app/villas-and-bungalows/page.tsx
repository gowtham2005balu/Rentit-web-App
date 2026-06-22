import type { Metadata } from 'next';
import Navbar from '../../components/Navbar';

export const metadata: Metadata = {
  title: "Villas & Bungalows for Rent in Chennai – RentIt",
  description: "Rent premium villas and bungalows in Chennai. Find spacious, verified independent houses across ECR, Adyar, Anna Nagar and top Chennai localities on RentIt.",
  alternates: { canonical: "https://rentit.in/villas-and-bungalows" },
};

export default function VillasAndBungalows() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>Villas & Bungalows for Rent in Chennai</h1>
        <p>Premium villas and bungalows. Coming soon.</p>
      </div>
    </div>
  );
}
