import { useState, useEffect } from "react"
import kanjiData from "../data/kanji.json" // your dataset

export default function Kanji() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [selectedKanji, setSelectedKanji] = useState(null)
  const [pageInput, setPageInput] = useState(page)

  useEffect(() => {
    setPageInput(page)
  }, [page])

  const perPage = 50

  // Filter by search (word or meaning)
  const filtered = kanjiData.filter(
    (item) =>
      item.word.includes(search) ||
      item.english_translation.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filtered.length / perPage)
  const currentData = filtered.slice((page - 1) * perPage, page * perPage)

  const goToPage = (p) => {
    if (p >= 1 && p <= totalPages) {
      setPage(p)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="text-gray-200">
      <h2 className="text-3xl font-extrabold mb-4">Kanji</h2>

      {/* Info Box */}
      <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-4 mb-8 shadow-lg">
        <p className="text-gray-300 leading-relaxed">
          Kanji are Chinese characters used in Japanese writing. 
          Each kanji usually represents both a{" "}
          <span className="font-semibold text-indigo-400">meaning</span> and a{" "}
          <span className="font-semibold text-indigo-400">reading</span>.  
          They are combined with Hiragana and Katakana to form full sentences.
          <span className="block mt-2">
            This page lists Kanji vocabulary divided by frequency and level, 
            helping you build recognition step by step.
          </span>
        </p>
      </div>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search kanji or meaning..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
        {currentData.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center bg-gray-800 rounded-xl p-6 shadow-md hover:bg-gray-700 transition cursor-pointer transform hover:scale-105"
            onClick={() => setSelectedKanji(item)}
          >
            <span className="text-sm text-gray-400 mb-2">
              #{item.word_frequency}
            </span>
            <span className="text-4xl font-bold">{item.word}</span>
            <span className="text-sm text-gray-400 mt-2">
              {item.english_translation}
            </span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center items-center gap-3 mt-6">
        <button
          disabled={page === 1}
          onClick={() => goToPage(page - 1)}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg disabled:opacity-50"
        >
          Prev
        </button>

        <div className="flex items-center gap-2 text-sm">
          Page <span className="font-semibold">{page}</span> /{" "}
          <span className="font-semibold">{totalPages}</span>
        </div>

        <input
          type="number"
          min={1}
          max={totalPages}
          value={pageInput}
          onChange={(e) => setPageInput(Number(e.target.value))}
          className="w-16 bg-gray-800 border border-gray-700 rounded-lg px-2 py-1 text-sm"
        />

        <button
          onClick={() => goToPage(pageInput)}
          className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm"
        >
          Jump
        </button>

        <button
          disabled={page === totalPages}
          onClick={() => goToPage(page + 1)}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {selectedKanji && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/40"
          onClick={() => setSelectedKanji(null)}
        >
          <div
            className="bg-gray-900 rounded-2xl p-6 w-11/12 max-w-md relative shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedKanji(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>

            <div className="flex flex-col items-center text-center">
              <span className="text-sm text-gray-400 mb-2">
                #{selectedKanji.word_frequency}
              </span>
              <span className="text-6xl font-bold mb-4">{selectedKanji.word}</span>
              <span className="text-xl text-indigo-400 mb-2">
                {selectedKanji.romanization}
              </span>
              <span className="text-lg text-gray-300 mb-4">
                {selectedKanji.english_translation}
              </span>

              <p className="text-gray-400 text-sm italic mb-1">
                {selectedKanji.pos}
              </p>

              {selectedKanji.example_sentence_native && (
                <p className="text-gray-200 mt-2">
                  {selectedKanji.example_sentence_native}
                </p>
              )}
              {selectedKanji.example_sentence_english && (
                <p className="text-gray-400 text-sm">
                  {selectedKanji.example_sentence_english}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
