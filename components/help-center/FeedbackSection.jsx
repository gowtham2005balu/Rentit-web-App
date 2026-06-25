import { useState } from "react";

const improvementTags = [
  "Missing information",
  "Hard to understand",
  "Outdated content",
  "Broken steps",
  "Wrong answer",
];

export default function FeedbackSection() {
  const [helpful, setHelpful] = useState(null);
  const [selected, setSelected] = useState([]);

  const toggleTag = (tag) => {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-xl mx-auto text-center mb-10">
        <p className="text-[#D97706] text-xs font-semibold uppercase tracking-widest mb-3">
          ✦ Feedback
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Help us improve</h2>
        <p className="text-gray-500 text-sm">
          Your feedback makes our support better for everyone.
        </p>
      </div>

      <div className="w-[600px] mx-auto bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
        {/* Article header */}
        <div className="flex items-center gap-3 border-b border-gray-100 pb-5 mb-6">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm">
            📄
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">How to book a property on Rentit</p>
            <p className="text-xs text-gray-400">Last updated 28 May 2026 · 5 min read</p>
          </div>
        </div>

        <p className="text-base font-bold text-gray-900 text-center mb-1">
          Was this article helpful?
        </p>
        <p className="text-xs text-gray-500 text-center mb-6">
          Let us know so we can continue to improve our support content.
        </p>

        {/* Helpful buttons */}
        <div className="flex gap-3 justify-center mb-8">
          <button
            onClick={() => setHelpful(true)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
              helpful === true
                ? "border-green-400 bg-green-50 text-green-700"
                : "border-gray-200 text-gray-700 hover:border-green-300"
            }`}
          >
            👍 Yes, helpful!
          </button>
          <button
            onClick={() => setHelpful(false)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
              helpful === false
                ? "border-orange-400 bg-orange-50 text-orange-700"
                : "border-gray-200 text-gray-700 hover:border-orange-300"
            }`}
          >
            👎 Not helpful
          </button>
        </div>

        {/* Improvement tags */}
        <p className="text-sm font-semibold text-gray-900 mb-3">What could be improved?</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {improvementTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                selected.includes(tag)
                  ? "border-orange-400 bg-orange-50 text-orange-600"
                  : "border-gray-200 text-gray-600 hover:border-gray-400"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <textarea
          rows={3}
          placeholder="Tell us more — what was unclear or missing? (optional)"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 placeholder-gray-400 resize-none mb-5"
        />

        <button className="w-full bg-gray-900 text-white text-sm font-semibold py-3 rounded-xl hover:bg-gray-800 transition-colors mb-6">
          Submit Feedback
        </button>

        {/* Rating */}
        <div className="text-center text-sm text-gray-500">
          <span className="text-yellow-400 font-bold">★ 4.7 / 5 stars</span>
          <br />
          <span className="text-xs">Based on 1,204 article ratings from Rentit users</span>
        </div>
      </div>
    </section>
  );
}
