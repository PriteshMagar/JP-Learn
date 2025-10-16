import { useState } from "react";
import grammarData from "../data/grammar.json";

export default function Grammar() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  // filter grammar rules
  const filtered = grammarData.filter(
    (g) =>
      g.title.toLowerCase().includes(search.toLowerCase()) ||
      g.explanation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="text-gray-200">
      <h2 className="text-3xl font-extrabold mb-4">Grammar</h2>

      {/* Info Box */}
      <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-4 mb-8 shadow-lg">
        <p className="text-gray-300 leading-relaxed">
          Grammar is the backbone of Japanese. It explains how{" "}
          <span className="font-semibold text-indigo-400">words</span> and{" "}
          <span className="font-semibold text-indigo-400">particles</span> fit
          together to form correct sentences.
          <span className="block mt-2">
            This section lists grammar rules with explanations and usage
            examples to help you build sentences naturally.
          </span>
        </p>
      </div>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search grammar rule..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Grid of grammar cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {filtered.map((g) => (
          <div
            key={g.id}
            onClick={() => setSelected(g)}
            className="bg-gray-800 rounded-xl p-5 shadow-md hover:bg-gray-700 transition cursor-pointer transform hover:scale-105"
          >
            <h3 className="text-lg font-bold text-indigo-400">{g.title}</h3>
            <p className="text-sm text-gray-400 mt-2 line-clamp-2">
              {g.explanation}
            </p>
            <span className="text-xs text-gray-500 block mt-3">
              Level: {g.level}
            </span>
          </div>
        ))}
      </div>

      {/* Modal for details */}
      {selected && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/40"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-gray-900 rounded-2xl p-6 w-11/12 max-w-md relative shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-indigo-400 mb-2">
                {selected.title}
              </h2>
              <p className="text-gray-300 mb-4">{selected.explanation}</p>

              <div className="space-y-3 text-left">
                {selected.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="p-3 bg-gray-800 rounded-lg border border-gray-700"
                  >
                    <p className="text-blue-400 font-medium">{ex.jp}</p>
                    <p className="text-gray-400 text-sm">{ex.en}</p>
                  </div>
                ))}
              </div>

              <span className="text-xs text-gray-500 block mt-4">
                Level: {selected.level}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
