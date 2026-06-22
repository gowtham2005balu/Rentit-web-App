"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function RentitNavbar() {
  const pathname = usePathname();
  return (
    <nav
  className="sticky top-0 z-50 w-full flex items-center justify-between px-10 py-4"
  style={{ background: "#ffffff", borderBottom: "1px solid #e8e8e8" }}
>
      {/* Logo — clicking goes home */}
      <div className="flex items-center gap-8">
        <Link href="/" className="font-black text-xl tracking-tight no-underline">
          <span style={{ color: "#1a2e4a" }}>RENT</span>
          <span style={{ color: "#f5a623" }}>IT</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-7">
          {[
  { name: "Home", path: "/rentit" },
  { name: "About Us", path: "/about" },
  { name: "Careers", path: "/careers" },
  { name: "Blog", path: "/blog" },
  { name: "Help Center", path: "/help" },
].map((item) => {
  const isActive = pathname === item.path;
  return (
    <Link
      key={item.name}
      href={item.path}
      className={`text-sm font-medium hover:text-black transition-colors ${
        isActive ? "text-black font-black" : "text-gray-500"
      }`}
    >
      {item.name}
    </Link>
  );
})}
        </div>
      </div>

      {/* Right Buttons */}
      <div className="flex items-center gap-3">
        <Link href="/add-property">
          <button
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white"
            style={{ background: "#1a2e4a" }}
          >
            Post Your Property
          </button>
        </Link>

        <Link href="/">
          <button
            className="px-5 py-2.5 rounded-full text-sm font-semibold"
            style={{ border: "1.5px solid #d1d5db", color: "#1a2e4a" }}
          >
            Find a Home
          </button>
        </Link>
      </div>
    </nav>
  );
}