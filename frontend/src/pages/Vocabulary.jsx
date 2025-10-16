
import { useState, useMemo, useEffect } from "react";
import hiraganaData from "../data/vocab_hiragana.json";
import katakanaData from "../data/vocab_katakana.json";

export default function Vocabulary() {
  const [mode, setMode] = useState("hiragana");
  const [posFilter, setPosFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState(page)

  const [search, setSearch] = useState("");
  const [selectedWord, setSelectedWord] = useState(null);

  const pageSize = 50;

  const rawData = mode === "hiragana" ? hiraganaData : katakanaData;
  const data = Array.isArray(rawData) ? rawData : [];

  const posOptions = useMemo(() => {
    const set = new Set();
    data.forEach((item) => {
      if (item?.pos) set.add(item.pos);
    });
    return ["all", ...[...set].sort()];
  }, [data]);

  const getMeaning = (item) =>
    item?.english_translation ?? item?.meaning ?? item?.translation ?? "";
  const getRoman = (item) =>
    item?.romanization ?? item?.romaji ?? item?.roman ?? "";
  const getExampleJP = (item) =>
    item?.example_sentence_native ?? item?.example ?? "";
  const getExampleEN = (item) =>
    item?.example_sentence_english ??
    item?.example_en ??
    item?.example_english ??
    "";

  // Filtering + sorting + searching
  const filteredSorted = useMemo(() => {
    let list = data;

    if (posFilter !== "all") {
      list = list.filter(
        (it) => (it?.pos ?? "").toLowerCase() === posFilter.toLowerCase()
      );
    }

    if (search.trim()) {
      const s = search.toLowerCase();
      list = list.filter(
        (it) =>
          (it?.word ?? "").toLowerCase().includes(s) ||
          getMeaning(it).toLowerCase().includes(s)
      );
    }

    const sorted = [...list].sort((a, b) => {
      const fa = Number(a?.word_frequency ?? 0);
      const fb = Number(b?.word_frequency ?? 0);
      return sortOrder === "asc" ? fa - fb : fb - fa;
    });

    return sorted;
  }, [data, posFilter, sortOrder, search]);

  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / pageSize));
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const startIndex = (page - 1) * pageSize;
  const currentPageData = filteredSorted.slice(
    startIndex,
    startIndex + pageSize
  );

  useEffect(() => {
    setPage(1);
    setPosFilter("all");
    setSelectedWord(null);
    setSearch("");
  }, [mode]);

  useEffect(() => {
  window.scrollTo({ top: -2, behavior: "smooth" })
}, [page])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSelectedWord(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Scroll to top on page change
  const goToPage = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="text-gray-200 p-4">
      <h2 className="text-3xl font-extrabold mb-4">Vocabulary</h2>

      {/* Info Box */}
<div className="bg-gray-800/70 border border-gray-700 rounded-xl p-4 mb-8 shadow-lg">
  <p className="text-gray-300 leading-relaxed">
    Japanese vocabulary is organized into{" "}
    <span className="font-semibold text-indigo-400">JLPT levels</span>, 
    from beginner <span className="font-semibold">N5</span> to advanced{" "}
    <span className="font-semibold">N1</span>.  
    Words are sorted by <span className="font-semibold text-indigo-400">frequency</span>, 
    so you can focus on the most commonly used terms first.
    <span className="block mt-2">
      This section is divided into{" "}
      <span className="font-semibold text-indigo-400">Hiragana</span> and{" "}
      <span className="font-semibold text-indigo-400">Katakana</span> vocabulary, 
      with extra details like pronunciation, meaning, and usage examples 
      to help you learn effectively.
    </span>
  </p>
</div>


      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-4">
        {["hiragana", "katakana"].map((tab) => (
          <button
            key={tab}
            onClick={() => setMode(tab)}
            className={`flex-1 py-3 text-center font-semibold relative
              bg-gray-900 text-gray-400 hover:text-gray-200
              focus:outline-none ${mode === tab ? "text-indigo-400" : ""}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {mode === tab && (
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-indigo-500" />
            )}
          </button>
        ))}
      </div>

      {/* Filters + Search */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-400">POS:</label>
          <select
            value={posFilter}
            onChange={(e) => {
              setPosFilter(e.target.value);
              setPage(1);
            }}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
          >
            {posOptions.map((p) => (
              <option key={p} value={p}>
                {p === "all" ? "All POS" : p}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-400">Sort:</label>
          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setPage(1);
            }}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
          >
            <option value="asc">Frequency ↑</option>
            <option value="desc">Frequency ↓</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Search word or meaning..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
        />
      

        <div className="ml-auto text-sm text-gray-400">
          Page <span className="font-semibold">{page}</span>{" "}
          
        </div>
      </div>

      {/* Vocab Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {currentPageData.map((item, idx) => {
          const globalIndex = startIndex + idx + 1;
          const freq = item?.word_frequency ?? globalIndex;
          return (
            <div
              key={globalIndex}
              onClick={() => setSelectedWord(item)}
              className="cursor-pointer flex flex-col items-center justify-center bg-gray-800 rounded-xl p-5 shadow-md hover:bg-gray-700 transition"
            >
              <span className="text-xs text-gray-400 mb-1">#{freq}</span>
              <span className="text-3xl font-bold">{item?.word ?? "—"}</span>
              <span className="text-sm text-gray-400 mt-2 text-center">
                {getMeaning(item) || "—"}
              </span>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
     <div className="flex flex-wrap justify-center items-center gap-3 mt-6">
  {/* Prev */}
  <button
    disabled={page === 1}
    onClick={() => goToPage(page - 1)}
    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg disabled:opacity-50"
  >
    Prev
  </button>

  {/* Page info */}
  <div className="flex items-center gap-2 text-sm">
    Page <span className="font-semibold">{page}</span> /{" "}
    <span className="font-semibold">{totalPages}</span>
  </div>

  {/* Page input + Jump */}
  <div className="flex items-center gap-2">
    <input
      type="number"
      min={1}
      max={totalPages}
      value={pageInput}
      onChange={(e) => setPageInput(e.target.value)}
      className="w-16 bg-gray-800 border border-gray-700 rounded-lg px-2 py-1 text-sm"
    />
    <button
      onClick={() => {
        const val = Number(pageInput)
        if (val >= 1 && val <= totalPages) {
          goToPage(val)
        }
      }}
      className="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white text-sm"
    >
      Jump
    </button>
  </div>

  {/* Next */}
  <button
    disabled={page === totalPages}
    onClick={() => goToPage(page + 1)}
    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg disabled:opacity-50"
  >
    Next
  </button>
</div>


      {/* Modal */}
      {selectedWord && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/40"
          onClick={() => setSelectedWord(null)}
        >
          <div
            className="bg-gray-900 rounded-2xl p-6 w-11/12 max-w-md relative shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedWord(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 text-2xl font-bold"
              aria-label="Close"
            >
              ×
            </button>

            <div className="text-xs text-gray-400 mb-1">
              #{selectedWord.word_frequency ?? "—"}
            </div>
            <div className="text-5xl font-extrabold mb-2">
              {selectedWord.word}
            </div>
            <div className="text-xl text-gray-300 mb-3">
              {getRoman(selectedWord)}
            </div>
            <div className="text-indigo-400 font-semibold mb-4">
              {getMeaning(selectedWord)}
            </div>

            {(getExampleJP(selectedWord) || getExampleEN(selectedWord)) && (
              <div className="text-base text-gray-300 mb-3 space-y-1">
                {getExampleJP(selectedWord) && (
                  <div>{getExampleJP(selectedWord)}</div>
                )}
                {getExampleEN(selectedWord) && (
                  <div className="text-gray-400">{getExampleEN(selectedWord)}</div>
                )}
              </div>
            )}

            <div className="flex gap-4 mt-4 text-sm text-gray-400">
              <div>
                POS:{" "}
                <span className="text-gray-200">
                  {selectedWord.pos ?? "—"}
                </span>
              </div>
              <div>
                Frequency:{" "}
                <span className="text-gray-200">
                  {selectedWord.word_frequency ?? "—"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
