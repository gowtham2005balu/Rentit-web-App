import type { Metadata } from 'next';
import Navbar from '../../../components/Navbar';

export const metadata: Metadata = {
  title: "Apartments & Villas for Rent in ECR Chennai – RentIt",
  description: "Find beach-side apartments, villas and bungalows for rent on ECR, Chennai. Peaceful coastal living with easy city access. Browse verified ECR listings on RentIt.",
  alternates: { canonical: "https://rentit.in/apartments/ecr" },
};

export default function EcrLocal() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>Apartments in ECR</h1>
        <p>Coming soon.</p>
      </div>
    </div>
  );
}
