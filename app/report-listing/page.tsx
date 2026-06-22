import type { Metadata } from 'next';
import Navbar from '../../components/Navbar';

export const metadata: Metadata = {
  title: "Report a Listing – RentIt",
  description: "Found a suspicious or fraudulent rental listing on RentIt? Report it here and our trust and safety team will investigate and take action promptly.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://rentit.in/report-listing" },
};

export default function ReportListing() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>Report a Listing</h1>
        <p>Coming soon.</p>
      </div>
    </div>
  );
}
