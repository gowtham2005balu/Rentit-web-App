"use client";
import { useState } from "react";

export default function CareersBuild() {
  const [voted, setVoted] = useState("yes");
  const [selected, setSelected] = useState(["Missing information"]);

  const toggleTag = (tag) => setSelected(s => s.includes(tag) ? s.filter(t => t !== tag) : [...s, tag]);
  const tags = ["Missing information", "Hard to understand", "Outdated content", "Broken steps", "Wrong answer"];

  return (
    <section className="w-full" style={{ background: "#ffffff", paddingLeft: "120px", paddingRight: "120px", paddingTop: "72px", paddingBottom: "72px" }}>
      <div className="flex flex-col items-center text-center mb-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="rounded-full" style={{ width: "7px", height: "7px", background: "#f5a623" }} />
          <span className="text-xs font-bold tracking-widest" style={{ color: "#f5a623", letterSpacing: "0.12em" }}>FEEDBACK</span>
        </div>
        <h2 className="font-black mb-2" style={{ fontSize: "40px", color: "#111827", lineHeight: "1.1" }}>Help us improve</h2>
        <p style={{ color: "#6b7280", fontSize: "15px" }}>Your feedback makes our support better for everyone.</p>
      </div>

      <div className="rounded-2xl p-8 mx-auto" style={{ maxWidth: "560px", border: "1px solid #e5e7eb", background: "#ffffff" }}>
        {/* Article ref */}
        <div className="flex items-center gap-3 pb-5 mb-5" style={{ borderBottom: "1px solid #f3f4f6" }}>
          <div className="flex items-center justify-center rounded-lg" style={{ width: "32px", height: "32px", background: "#f3f4f6" }}>
            <span style={{ fontSize: "14px" }}>📄</span>
          </div>
          <div>
            <div className="font-semibold text-sm" style={{ color: "#111827" }}>How to book a property on Rentit</div>
            <div className="text-xs" style={{ color: "#9ca3af" }}>Last updated: 28 May 2026 · 5 min read</div>
          </div>
        </div>

        <h3 className="font-bold text-center mb-2" style={{ fontSize: "18px", color: "#111827" }}>Was this article helpful?</h3>
        <p className="text-sm text-center mb-6" style={{ color: "#6b7280" }}>Let us know so we can continue to improve our support content.</p>

        {/* Vote buttons */}
        <div className="flex items-center gap-3 justify-center mb-7">
          <button
            onClick={() => setVoted("yes")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
            style={{
              background: voted === "yes" ? "#dcfce7" : "#f9fafb",
              border: voted === "yes" ? "2px solid #22c55e" : "1px solid #e5e7eb",
              color: "#374151",
            }}
          >
            <span style={{ fontSize: "18px" }}>👍</span> Yes, helpful!
          </button>
          <button
            onClick={() => setVoted("no")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
            style={{
              background: voted === "no" ? "#fde8e8" : "#f9fafb",
              border: voted === "no" ? "2px solid #ef4444" : "1px solid #e5e7eb",
              color: "#374151",
            }}
          >
            <span style={{ fontSize: "18px" }}>👎</span> Not helpful
          </button>
        </div>

        {/* What could be improved */}
        <div className="mb-5">
          <div className="font-semibold text-sm mb-3" style={{ color: "#111827" }}>What could be improved?</div>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, i) => (
              <button
                key={i}
                onClick={() => toggleTag(tag)}
                className="text-xs px-3 py-1.5 rounded-full"
                style={{
                  background: selected.includes(tag) ? "#1a2640" : "#f3f4f6",
                  color: selected.includes(tag) ? "#ffffff" : "#374151",
                  border: "none",
                }}
              >
                {tag}
              </button>
            ))}
          </div>
          <textarea
            readOnly
            placeholder="Tell us more — what was unclear or missing? (optional)"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
            style={{ border: "1px solid #e5e7eb", color: "#9ca3af", height: "90px", background: "#f9fafb" }}
          />
        </div>

        <button className="w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: "#1a2640" }}>
          Submit Feedback
        </button>

        {/* Rating */}
        <div className="flex items-center justify-center gap-2 mt-5">
          <span style={{ color: "#f5a623", fontSize: "14px" }}>⭐</span>
          <span className="font-bold text-sm" style={{ color: "#111827" }}>4.7 / 5 stars</span>
          <span className="text-xs" style={{ color: "#9ca3af" }}>Based on 1,204 article ratings from Rentit users</span>
        </div>
      </div>
    </section>
  );
}
