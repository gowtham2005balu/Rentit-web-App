import type { Metadata } from 'next';
import Navbar from '../../components/Navbar';

export const metadata: Metadata = {
  title: "New Rental Projects in Chennai – RentIt",
  description: "Explore newly launched rental projects in Chennai. Be the first to rent in new residential and commercial developments across top Chennai localities on RentIt.",
  alternates: { canonical: "https://rentit.in/new-projects" },
};

export default function NewProjects() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>New Rental Projects in Chennai</h1>
        <p>New projects. Coming soon.</p>
      </div>
    </div>
  );
}
