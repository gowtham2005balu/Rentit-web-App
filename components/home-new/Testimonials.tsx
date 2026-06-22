"use client";

const stars = [1, 2, 3, 4, 5];

const testimonials = [
  {
    rating: 5,
    quote:
      "I found my dream 2BHK near Adyar Metro in just 3 days using Rentit AI. I just typed what I needed and got 12 perfect matches instantly. No broker, no fees.",
    initials: "AM",
    name: "Aditya Menon",
    role: "Software Engineer",
    location: "Adyar, Chennai",
    avatarBg: "bg-blue-500",
    accentColor: "#3B82F6",
    roleIcon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.31563 11.1583C1.99965 11.1583 1.73333 11.05 1.51667 10.8333C1.3 10.6167 1.19167 10.3503 1.19167 10.0344V4.31979C1.19167 4.00382 1.3 3.7375 1.51667 3.52083C1.73333 3.30417 1.99965 3.19583 2.31563 3.19583H4.45521V2.20729C4.45521 1.90035 4.56354 1.63854 4.78021 1.42187C4.99688 1.20521 5.26319 1.09687 5.57917 1.09687H7.43438C7.74132 1.09687 8.00313 1.20521 8.21979 1.42187C8.43646 1.63854 8.54479 1.90486 8.54479 2.22083V3.19583H10.6844C11.0003 3.19583 11.2667 3.30417 11.4833 3.52083C11.7 3.7375 11.8083 4.00382 11.8083 4.31979V10.0344C11.8083 10.3503 11.7 10.6167 11.4833 10.8333C11.2667 11.05 11.0003 11.1583 10.6844 11.1583H2.31563ZM2.31563 10.0344H10.6844V4.31979H2.31563V10.0344ZM5.57917 3.19583H7.42083V2.22083H5.57917V3.19583ZM2.31563 10.0344V4.31979V10.0344Z" fill="#F59E0B"/>
      </svg>
    ),
  },
  {
    rating: 5,
    quote:
      "As a girl moving to Chennai for college, finding a safe PG was stressful. Rentit showed me verified women-only PGs near my college. The chat with owners directly gave me so much confidence.",
    initials: "PS",
    name: "Priya Suresh",
    role: "Student",
    location: "T Nagar, Chennai",
    avatarBg: "bg-pink-500",
    accentColor: "#EC4899",
    roleIcon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.96563 9.57396C2.78507 9.49271 2.64063 9.35729 2.53229 9.16771C2.43299 8.97812 2.38333 8.77951 2.38333 8.57187V6.03958L1.04271 5.37604C0.934375 5.32187 0.853125 5.25417 0.798958 5.17292C0.753819 5.08264 0.73125 4.98785 0.73125 4.88854C0.73125 4.78021 0.753819 4.6809 0.798958 4.59062C0.853125 4.50035 0.934375 4.42812 1.04271 4.37396L5.49792 2.15312C5.57917 2.10799 5.66042 2.07639 5.74167 2.05833C5.83194 2.04028 5.91771 2.03125 5.99896 2.03125C6.08924 2.03125 6.175 2.04028 6.25625 2.05833C6.3375 2.07639 6.41875 2.10799 6.5 2.15312L11.6458 4.7125C11.7361 4.76667 11.8083 4.83889 11.8625 4.92917C11.9167 5.01042 11.9438 5.10069 11.9438 5.2V8.6125C11.9438 8.75694 11.8896 8.88333 11.7813 8.99167C11.6729 9.1 11.5465 9.15417 11.4021 9.15417C11.2576 9.15417 11.1313 9.1 11.0229 8.99167C10.9236 8.88333 10.874 8.75694 10.874 8.6125V5.41667L9.61458 6.03958V8.57187C9.61458 8.77951 9.56493 8.97812 9.46563 9.16771C9.36632 9.34826 9.22188 9.48368 9.03229 9.57396L6.5 10.8333C6.41875 10.8785 6.3375 10.9101 6.25625 10.9281C6.175 10.9462 6.08924 10.9552 5.99896 10.9552C5.91771 10.9552 5.83194 10.9462 5.74167 10.9281C5.66042 10.9101 5.57917 10.8785 5.49792 10.8333L2.96563 9.57396ZM5.99896 6.63542L9.54688 4.875L5.99896 3.11458L2.45104 4.875L5.99896 6.63542ZM5.99896 9.87187L8.54479 8.6125V6.59479L6.54063 7.58333C6.45035 7.6375 6.36007 7.67361 6.26979 7.69167C6.17951 7.70972 6.08924 7.71875 5.99896 7.71875C5.89965 7.71875 5.80486 7.70972 5.71458 7.69167C5.62431 7.67361 5.53854 7.6375 5.45729 7.58333L3.45312 6.59479V8.6125L5.99896 9.87187Z" fill="#F59E0B"/>
      </svg>
    ),
  },
  {
    rating: 5,
    quote:
      "We were a family of 4 relocating from Bangalore. Rentit's family-friendly filters and verified listings made the process so smooth. We moved into our new home in 2 weeks.",
    initials: "VR",
    name: "Vijay Rajan",
    role: "Family",
    location: "Anna Nagar, Chennai",
    avatarBg: "bg-teal-500",
    accentColor: "#14B8A6",
    roleIcon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.251 3.54792C9.91701 3.54792 9.63264 3.43507 9.39792 3.20937C9.17222 2.97465 9.05938 2.69028 9.05938 2.35625C9.05938 2.03125 9.17674 1.7559 9.41146 1.53021C9.64618 1.29549 9.92604 1.17812 10.251 1.17812C10.576 1.17812 10.8559 1.29549 11.0906 1.53021C11.3253 1.7559 11.4427 2.03576 11.4427 2.36979C11.4427 2.69479 11.3253 2.97465 11.0906 3.20937C10.8559 3.43507 10.576 3.54792 10.251 3.54792ZM9.47917 11.1719V7.475C9.47917 7.22222 9.425 6.99201 9.31667 6.78437C9.21736 6.56771 9.0684 6.38715 8.86979 6.24271L9.37083 4.80729C9.44306 4.63576 9.5559 4.49132 9.70938 4.37396C9.87188 4.24757 10.0524 4.18437 10.251 4.18437C10.4497 4.18437 10.6257 4.24757 10.7792 4.37396C10.9417 4.49132 11.0545 4.63576 11.1177 4.80729L12.3635 8.40937C12.4267 8.58993 12.4042 8.76146 12.2958 8.92396C12.1875 9.07743 12.034 9.15417 11.8354 9.15417H10.9146V11.1719C10.9146 11.3344 10.8604 11.4698 10.7521 11.5781C10.6438 11.6865 10.5128 11.7406 10.3594 11.7406H10.0344C9.8809 11.7406 9.75 11.6865 9.64167 11.5781C9.53333 11.4698 9.47917 11.3344 9.47917 11.1719ZM7.15 6.20208C6.91528 6.20208 6.71215 6.12083 6.54063 5.95833C6.3691 5.78681 6.28333 5.58368 6.28333 5.34896C6.28333 5.10521 6.36458 4.89757 6.52708 4.72604C6.69861 4.55451 6.90174 4.46875 7.13646 4.46875C7.38021 4.46875 7.58785 4.55451 7.75938 4.72604C7.9309 4.89757 8.01667 5.10521 8.01667 5.34896C8.01667 5.58368 7.9309 5.78681 7.75938 5.95833C7.59688 6.12083 7.39375 6.20208 7.15 6.20208ZM3.10104 3.54792C2.77604 3.54792 2.49618 3.43507 2.26146 3.20937C2.02674 2.97465 1.90938 2.69028 1.90938 2.35625C1.90938 2.03125 2.02674 1.7559 2.26146 1.53021C2.49618 1.29549 2.77604 1.17812 3.10104 1.17812C3.42604 1.17812 3.7059 1.29549 3.94063 1.53021C4.17535 1.7559 4.29271 2.03576 4.29271 2.36979C4.29271 2.69479 4.17535 2.97465 3.94063 3.20937C3.7059 3.43507 3.42604 3.54792 3.10104 3.54792ZM2.03125 11.1719V8.17917H1.59792C1.44444 8.17917 1.31354 8.125 1.20521 8.01667C1.1059 7.90833 1.05625 7.77743 1.05625 7.62396V5.32187C1.07431 5.01493 1.18715 4.75312 1.39479 4.53646C1.61146 4.31076 1.87326 4.19792 2.18021 4.19792H4.02188C4.33785 4.19792 4.60868 4.31076 4.83438 4.53646C5.06007 4.75312 5.16389 5.01493 5.14583 5.32187V7.62396C5.14583 7.77743 5.09167 7.90833 4.98333 8.01667C4.88403 8.125 4.75764 8.17917 4.60417 8.17917H4.17083V11.1719C4.17083 11.3344 4.11667 11.4698 4.00833 11.5781C3.9 11.6865 3.7691 11.7406 3.61563 11.7406H2.58646C2.43299 11.7406 2.30208 11.6865 2.19375 11.5781C2.08542 11.4698 2.03125 11.3344 2.03125 11.1719ZM6.28333 11.1719V9.77708C6.14792 9.77708 6.03056 9.73194 5.93125 9.64167C5.84097 9.54236 5.79583 9.425 5.79583 9.28958V7.58333C5.79583 7.37569 5.86806 7.19965 6.0125 7.05521C6.16597 6.90174 6.35104 6.825 6.56771 6.825H7.73229C7.94896 6.825 8.13403 6.90174 8.2875 7.05521C8.45 7.19965 8.52222 7.37569 8.50417 7.58333V9.28958C8.50417 9.425 8.45451 9.54236 8.35521 9.64167C8.26493 9.73194 8.14757 9.77708 8.00313 9.77708V11.1719C8.00313 11.3344 7.94896 11.4698 7.84063 11.5781C7.73229 11.6865 7.60139 11.7406 7.44792 11.7406H6.85208C6.68958 11.7406 6.55417 11.6865 6.44583 11.5781C6.3375 11.4698 6.28333 11.3344 6.28333 11.1719Z" fill="#F59E0B"/>
      </svg>
    ),
  },
  {
    rating: 5,
    quote:
      "I listed my 3 PGs on Rentit Premium and got 24 enquiries in the first week. The verified badge and Featured Listing gave me instant credibility. Best decision I made as a property owner.",
    initials: "RK",
    name: "Rajesh Kumar",
    role: "Property Owner",
    location: "Velachery, Chennai",
    avatarBg: "bg-orange-400",
    accentColor: "#FB923C",
    roleIcon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.61563 10.0344H4.79375V7.3125C4.79375 7.15903 4.84792 7.02812 4.95625 6.91979C5.07361 6.80243 5.20903 6.74375 5.3625 6.74375H7.6375C7.79097 6.74375 7.92188 6.80243 8.03021 6.91979C8.14757 7.02812 8.20625 7.15903 8.20625 7.3125V10.0344H9.38438V5.37604L6.5 3.22292L3.61563 5.37604V10.0344ZM2.49167 9.87187V5.37604C2.49167 5.20451 2.52778 5.04201 2.6 4.88854C2.68125 4.72604 2.7941 4.59062 2.93854 4.48229L5.82292 2.31562C6.03056 2.16215 6.25625 2.08542 6.5 2.08542C6.74375 2.08542 6.96945 2.16215 7.17708 2.31562L10.0615 4.48229C10.2059 4.59062 10.3142 4.72604 10.3865 4.88854C10.4677 5.04201 10.5083 5.20451 10.5083 5.37604V9.87187C10.5083 10.233 10.3819 10.5399 10.1292 10.7927C9.88542 11.0365 9.58299 11.1583 9.22188 11.1583H7.69167C7.52917 11.1583 7.39375 11.1042 7.28542 10.9958C7.17708 10.8875 7.12292 10.7566 7.12292 10.6031V7.82708H5.87708V10.6031C5.87708 10.7566 5.82292 10.8875 5.71458 10.9958C5.60625 11.1042 5.47083 11.1583 5.30833 11.1583H3.77813C3.41701 11.1583 3.11007 11.0365 2.85729 10.7927C2.61354 10.5399 2.49167 10.233 2.49167 9.87187Z" fill="#F59E0B"/>
      </svg>
    ),
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-20 px-4 font-sans">
      <style>{`
        .testimonial-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          cursor: default;
        }
        .testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px -8px rgba(0,0,0,0.10);
        }
        .testimonial-card:hover .card-border-accent {
          opacity: 1;
        }
        .card-border-accent {
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .testimonial-card:hover .avatar-ring {
          transform: scale(1.08);
          box-shadow: 0 0 0 3px rgba(255,255,255,1), 0 0 0 5px var(--accent-color);
        }
        .avatar-ring {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .testimonial-card:hover .quote-mark {
          transform: scale(1.15) translateY(-2px);
        }
        .quote-mark {
          display: inline-block;
          transition: transform 0.25s ease;
        }
      `}</style>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-orange-500 text-xs font-bold tracking-widest uppercase">● TESTIMONIALS</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 leading-tight">
            Real people. Real stories.
          </h2>
        </div>

        {/* 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="testimonial-card relative bg-gray-50 border border-gray-100 rounded-2xl p-7 flex flex-col justify-between"
            >
              {/* Accent border on hover */}
              <div
                className="card-border-accent"
                style={{ boxShadow: `inset 0 0 0 1.5px ${t.accentColor}30, 0 0 0 0 transparent` }}
              />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {stars.map((s) => (
                  <svg key={s} width="13" height="13" viewBox="0 0 13 13" fill={s <= t.rating ? "#F59E0B" : "none"} xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 1.2L7.7 4.3L11 4.6L8.4 6.7L9.2 10L6.5 8.2L3.8 10L4.6 6.7L2 4.6L5.3 4.3L6.5 1.2Z" stroke="#F59E0B" strokeWidth="0.8" strokeLinejoin="round" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 text-sm leading-relaxed italic mb-6 flex-1">
                <span className="quote-mark text-orange-400 font-black text-lg not-italic mr-1">"</span>
                {t.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`avatar-ring w-10 h-10 rounded-full ${t.avatarBg} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                  style={{ "--accent-color": t.accentColor }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                    {t.roleIcon}
                    {t.role} · {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}