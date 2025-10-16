import { useState } from "react"
import readingData from "../data/reading.json"

export default function Reading() {
  const [level, setLevel] = useState("N5")

  const levels = ["N5", "N4", "N3", "N2", "N1"]
  const filtered = readingData.filter((p) => p.level === level)

  return (
    <div className="text-gray-200">
      {/* Heading */}
      <h2 className="text-3xl font-extrabold mb-4">Reading Practice</h2>

      {/* Info Box */}
      <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-4 mb-8 shadow-lg">
        <p className="text-gray-300 leading-relaxed">
          Select a level and read Japanese passages.  
          Use the buttons under each passage to reveal{" "}
          <span className="text-indigo-400 font-semibold">furigana</span>,{" "}
          <span className="text-indigo-400 font-semibold">romaji</span>, or{" "}
          <span className="text-indigo-400 font-semibold">English</span>.
        </p>
      </div>

      {/* Level Selector */}
      <div className="flex justify-center mb-6">
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full max-w-xs px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {levels.map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl}
            </option>
          ))}
        </select>
      </div>

      {/* Passages */}
      <div className="space-y-8">
        {filtered.map((item) => (
          <Passage key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

function Passage({ item }) {
  const [showFurigana, setShowFurigana] = useState(false)
  const [showRomaji, setShowRomaji] = useState(false)
  const [showEnglish, setShowEnglish] = useState(false)

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-md border border-gray-700">
      {/* Japanese sentence only */}
      <p className="text-2xl mb-4">{item.jp}</p>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={() => setShowFurigana(!showFurigana)}
          className={`px-4 py-2 rounded-lg ${
            showFurigana ? "bg-indigo-600" : "bg-gray-700"
          }`}
        >
          Furigana
        </button>
        <button
          onClick={() => setShowRomaji(!showRomaji)}
          className={`px-4 py-2 rounded-lg ${
            showRomaji ? "bg-indigo-600" : "bg-gray-700"
          }`}
        >
          Romaji
        </button>
        <button
          onClick={() => setShowEnglish(!showEnglish)}
          className={`px-4 py-2 rounded-lg ${
            showEnglish ? "bg-indigo-600" : "bg-gray-700"
          }`}
        >
          English
        </button>
      </div>

      {/* Conditional reveals */}
      {showFurigana && (
        <p className="text-lg text-gray-300 mb-2">{item.furigana}</p>
      )}
      {showRomaji && (
        <p className="text-lg italic text-gray-300 mb-2">{item.romaji}</p>
      )}
      {showEnglish && (
        <p className="text-lg text-gray-400">{item.en}</p>
      )}
    </div>
  )
}
