

import { useState } from "react"
import data from "../data/characters.json"
import CharacterCard from "../components/CharacterCard"
import { useNavigate } from "react-router-dom"
import Quiz from "./Quiz"


export default function Characters() {
  const [mode, setMode] = useState("hiragana")
  const [group, setGroup] = useState("basic") 
  const [isQuiz, setIsQuiz] = useState(false)
  const navigate = useNavigate()
  const [quizIndex, setQuizIndex] = useState(0)

  const currentData = data[mode][group]

  return (
    <div className="text-gray-200">
      <h2 className="text-3xl font-extrabold mb-4">Characters</h2>

      {/* Info Box */}
      <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-4 mb-8 shadow-lg">
        <p className="text-gray-300 leading-relaxed">
          Japanese uses two main phonetic scripts:{" "}
          <span className="font-semibold text-indigo-400">Hiragana</span> and{" "}
          <span className="font-semibold text-indigo-400">Katakana</span>.  
          Both represent the same sounds but are used differently.  
          <span className="block mt-2">
            Hiragana is used for native words, while Katakana is often used for
            foreign words and names.
          </span>
        </p>
      </div>

      {/* Script Tabs */}
      <div className="flex border-b border-gray-700 mb-4">
        {["hiragana", "katakana"].map((tab) => (
          <button
            key={tab}
            onClick={() => { setMode(tab); setGroup("basic") }}
            className={`flex-1 py-3 text-center font-semibold relative 
              bg-gray-900 text-gray-400 hover:text-gray-200
              focus:outline-none focus:ring-0
              ${mode === tab ? "text-indigo-400" : ""}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {mode === tab && (
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-indigo-500"></span>
            )}
          </button>
        ))}
      </div>


      <div className="flex items-center border-b border-gray-700 mb-6">
  {/* Group buttons (Basic, Dakuten, Yoon, etc.) */}
  <div className="flex space-x-2 flex-1">
    {Object.keys(data[mode]).map((g) => (
      <button
        key={g}
        onClick={() => setGroup(g)}
        className={`px-3 py-2 text-sm font-semibold relative
          text-gray-400 hover:text-gray-200
          focus:outline-none focus:ring-0
          ${group === g ? "text-indigo-400" : ""}`}
      >
        {g.charAt(0).toUpperCase() + g.slice(1)}
        {group === g && (
          <span className="absolute left-0 bottom-0 w-full h-0.5 bg-indigo-500"></span>
        )}
      </button>
    ))}
  </div>

  {/* Quiz button aligned right */}
  <button
  onClick={() => navigate(`/quiz/${mode}/${group}`)}
  className="ml-auto px-6 py-2 rounded-2xl !bg-blue-400 text-white font-bold text-sm shadow-lg 
             hover:bg-blue-300 hover:scale-105 transition-transform duration-200 ease-in-out 
             active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-200"
>
  Quiz
</button>
</div>

      {/* Character Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
        {currentData.map((item, index) => (
          <CharacterCard
            key={index}
            char={item.char}
            romaji={item.romaji}
            examples={item.examples}
            strokes={item.strokeSvg}

          />
        ))}
      </div>
    </div>
  )
}
