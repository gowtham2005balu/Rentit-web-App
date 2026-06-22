import type { Metadata } from 'next';
import Navbar from '../../components/Navbar';

export const metadata: Metadata = {
  title: "Press & Media – RentIt News and Coverage",
  description: "Find the latest news, press releases and media coverage about RentIt. Download brand assets or get in touch with our media team for interviews and collaborations.",
  alternates: { canonical: "https://rentit.in/press" },
};

export default function Press() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>Press & Media</h1>
        <p>Coming soon.</p>
      </div>
    </div>
  );
}
