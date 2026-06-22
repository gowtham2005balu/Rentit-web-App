import type { Metadata } from 'next';
import Navbar from '../../components/Navbar';

export const metadata: Metadata = {
  title: "Flatmate Finder Chennai – Find Roommates & Share Rent | RentIt",
  description: "Use RentIt's Flatmate Finder to connect with verified roommates in Chennai. Share apartments, split rent, and find your ideal living partner near your workplace.",
  alternates: { canonical: "https://rentit.in/flatmate-finder" },
};

export default function FlatmateFinder() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>Flatmate Finder Chennai</h1>
        <p>Find Roommates & Share Rent. Coming soon.</p>
      </div>
    </div>
  );
}
