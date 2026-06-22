export default function JoinUs() {
  return (
    <section
      className="w-full font-sans py-24 px-6 flex items-center"
      style={{
        background: "linear-gradient(rgba(15,27,45,0.82), rgba(15,27,45,0.88)), url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1440&q=80') center/cover no-repeat",
        minHeight: "580px",
      }}
    >
      <div className="max-w-5xl mx-auto w-full text-left">
    

        {/* h1 (justified left properly) */}
        <h1 className="font-black text-white mb-5 text-left" style={{ fontSize: "74px", lineHeight: "1.05", letterSpacing: "-2px", maxWidth: "780px" }}>
          Build the future of
          accommodation<br />
          future of <span style={{ color: "#F59E0B" }}>discovery.</span>
        </h1>

        {/* p */}
        <p className="mb-10 text-left text-gray-300" style={{ fontSize: "18px", maxWidth: "520px", lineHeight: "1.6" }}>
          Join a team that's redefining how people find their next home. Your best work is waiting for a problem this important.
        </p>

        {/* Rectangular buttons */}
        <div className="flex items-center gap-4">
          <a 
            href="#open-roles"
            className="flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-white transition-all hover:brightness-110" 
            style={{ background: "#F59E0B", fontSize: "16px", textDecoration: "none" }}
          >
            View Open Roles →
          </a>
          <a 
            href="mailto:careers@rentit.in"
            className="px-7 py-4 rounded-xl font-bold transition-all hover:bg-white/10" 
            style={{ border: "1.5px solid rgba(255,255,255,0.3)", color: "#ffff", fontSize: "16px", background: "Transparent", textDecoration: "none" }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
