import type { Metadata } from 'next';
import Navbar from '../../components/Navbar';

export const metadata: Metadata = {
  title: "Co-living Spaces for Rent in Chennai – RentIt",
  description: "Discover fully managed co-living spaces in Chennai. All-inclusive rent, furnished rooms, shared amenities and community living near OMR, Velachery and Anna Nagar.",
  alternates: { canonical: "https://rentit.in/co-living-spaces" },
};

export default function CoLivingSpaces() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>Co-living Spaces for Rent in Chennai</h1>
        <p>Fully managed co-living spaces. Coming soon.</p>
      </div>
    </div>
  );
}
