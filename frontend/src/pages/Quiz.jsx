
// import { useState, useEffect } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import data from "../data/characters.json"

// function shuffle(arr) {
//   const a = [...arr]
//   for (let i = a.length - 1; i > 0; --i) {
//     const j = Math.floor(Math.random() * (i + 1))
//     ;[a[i], a[j]] = [a[j], a[i]]
//   }
//   return a
// }

// export default function Quiz({ mode: propMode, group: propGroup, onExit }) {
//   const params = useParams()
//   const navigate = useNavigate()

//   // mode/group priority: props -> route params -> defaults
//   const mode = propMode || params.mode || "hiragana"
//   const group = propGroup || params.group || "basic"

//   const [questions, setQuestions] = useState([]) // shuffled list of character objects
//   const [index, setIndex] = useState(0)
//   const [options, setOptions] = useState([]) // current options (romaji strings)
//   const [feedback, setFeedback] = useState(null)
//   const [score, setScore] = useState(0)
//   const [locked, setLocked] = useState(false)
//   const [finished, setFinished] = useState(false)

//   // Build pool depending on data shape. This is robust to different JSON shapes.
//   function buildPool() {
//     if (!data) return []
//     // data[mode] ideally exists and is an object with groups
//     if (data[mode]) {
//       // If data[mode] is an array (flat), use it
//       if (Array.isArray(data[mode])) return [...data[mode]]
//       // If data[mode][group] exists and is array, use that
//       if (data[mode][group] && Array.isArray(data[mode][group])) {
//         return [...data[mode][group]]
//       }
//       // Fallback: flatten all groups under mode
//       const groups = Object.values(data[mode])
//         .filter(Boolean)
//         .flat()
//         .filter(Boolean)
//       if (groups.length) return groups
//     }

//     // Last fallback: flatten everything
//     const all = Object.values(data)
//       .flatMap((m) => (m && typeof m === "object" ? Object.values(m) : m))
//       .flat()
//       .filter(Boolean)
//     return Array.isArray(all) ? all : []
//   }

//   // Prepare shuffled questions when mode/group changes
//   useEffect(() => {
//     const pool = buildPool()
//     const shuffled = shuffle(pool)
//     setQuestions(shuffled)
//     setIndex(0)
//     setScore(0)
//     setFeedback(null)
//     setLocked(false)
//     setFinished(shuffled.length === 0)
//   }, [mode, group])

//   // generate options for current question (1 correct + up to 3 wrong)
//   useEffect(() => {
//     if (!questions || questions.length === 0) {
//       setOptions([])
//       return
//     }
//     const q = questions[index]
//     if (!q) {
//       setOptions([])
//       return
//     }

//     // collect romaji candidates (exclude current)
//     const candidates = questions
//       .map((c) => c.romaji)
//       .filter((r) => r && r !== q.romaji)

//     const wrongs = shuffle(candidates).slice(0, Math.min(3, candidates.length))
//     const opts = shuffle([q.romaji, ...wrongs])
//     setOptions(opts)
//   }, [questions, index])

//   const handleAnswer = (choice) => {
//     if (locked || finished) return
//     setLocked(true)

//     const q = questions[index]
//     if (!q) return

//     if (choice === q.romaji) {
//       setFeedback("✅ Correct!")
//       setScore((s) => s + 1)
//     } else {
//       setFeedback(`❌ Wrong! Correct: ${q.romaji}`)
//     }

//     // short delay then advance
//     setTimeout(() => {
//       const next = index + 1
//       if (next >= questions.length) {
//         setFinished(true)
//       } else {
//         setIndex(next)
//         setFeedback(null)
//       }
//       setLocked(false)
//     }, 900)
//   }

//   const handleExit = () => {
//     if (typeof onExit === "function") return onExit()
//     // fallback to router nav
//     navigate(-1)
//   }

//   if (finished) {
//     return (
//       <div className="flex flex-col items-center justify-center h-full text-gray-200 p-6">
//         <div className="text-center">
//           <h2 className="text-3xl font-bold mb-4">🎉 Quiz Finished</h2>
//           <p className="text-xl mb-4">
//             Mode: <span className="font-semibold">{mode}</span> · Group:{" "}
//             <span className="font-semibold">{group}</span>
//           </p>
//           <p className="text-2xl mb-6">Final Score: {score} / {questions.length}</p>
//           <div className="flex gap-3 justify-center">
//             <button
//               onClick={() => {
//                 // restart same quiz
//                 const shuffled = shuffle(buildPool())
//                 setQuestions(shuffled)
//                 setIndex(0)
//                 setScore(0)
//                 setFeedback(null)
//                 setFinished(shuffled.length === 0)
//               }}
//               className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700"
//             >
//               Restart
//             </button>
//             <button
//               onClick={handleExit}
//               className="px-4 py-2 rounded font-semibold text-white 
//              !bg-red-700 hover:!bg-red-600 transition-colors duration-200"
//             >
//               Exit
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (!questions || questions.length === 0) {
//     return (
//       <div className="flex items-center justify-center h-full text-gray-200">
//         <p>No characters found for <span className="font-semibold">{mode}</span> / <span className="font-semibold">{group}</span>.</p>
//       </div>
//     )
//   }

//   const question = questions[index]

//   return (
//     <div className="flex flex-col items-center justify-start text-gray-200 p-6 min-h-[60vh]">
//       <div className="flex w-full justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">
//           Quiz ({mode} - {group})
//         </h2>
//         <div className="flex items-center gap-3">
//           <div className="text-sm text-gray-400">Score: {score}</div>
//           <button
//             onClick={handleExit}
//             className="px-4 py-2 rounded font-semibold text-white 
//              !bg-red-700 hover:!bg-red-600 transition-colors duration-200"
//           >
//             Exit
//           </button>
//         </div>
//       </div>

//       <p className="mb-2">Question {index + 1} / {questions.length}</p>

//       <div className="text-7xl font-bold mb-8">{question.char}</div>

//       <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
//         {options.map((opt, i) => (
//           <button
//             key={i}
//             onClick={() => handleAnswer(opt)}
//             disabled={locked}
//             className={`py-3 px-4 rounded-lg text-lg font-semibold transition 
//               ${locked ? "opacity-70 cursor-not-allowed" : "hover:bg-indigo-600"} 
//               bg-gray-800`}
//           >
//             {opt}
//           </button>
//         ))}
//       </div>

//       {feedback && <p className="mt-4 text-lg">{feedback}</p>}
//     </div>
//   )
// }

// src/pages/Quiz.jsx
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import data from "../data/characters.json"

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; --i) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Quiz({ mode: propMode, group: propGroup, onExit }) {
  const params = useParams()
  const navigate = useNavigate()

  const mode = propMode || params.mode || "hiragana"
  const group = propGroup || params.group || "basic"

  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [options, setOptions] = useState([])
  const [score, setScore] = useState(0)
  const [locked, setLocked] = useState(false)
  const [finished, setFinished] = useState(false)
  const [selected, setSelected] = useState(null) // store chosen answer

  function buildPool() {
    if (!data) return []
    if (data[mode]) {
      if (Array.isArray(data[mode])) return [...data[mode]]
      if (data[mode][group] && Array.isArray(data[mode][group])) {
        return [...data[mode][group]]
      }
      return Object.values(data[mode]).flat()
    }
    return Object.values(data).flatMap((m) =>
      m && typeof m === "object" ? Object.values(m) : m
    ).flat()
  }

  useEffect(() => {
    const pool = buildPool()
    const shuffled = shuffle(pool)
    setQuestions(shuffled)
    setIndex(0)
    setScore(0)
    setLocked(false)
    setFinished(shuffled.length === 0)
    setSelected(null)
  }, [mode, group])

  useEffect(() => {
    if (!questions.length) {
      setOptions([])
      return
    }
    const q = questions[index]
    if (!q) return
    const candidates = questions
      .map((c) => c.romaji)
      .filter((r) => r && r !== q.romaji)
    const wrongs = shuffle(candidates).slice(0, Math.min(3, candidates.length))
    setOptions(shuffle([q.romaji, ...wrongs]))
  }, [questions, index])

  const handleAnswer = (choice) => {
    if (locked || finished) return
    setLocked(true)
    setSelected(choice)

    const q = questions[index]
    if (choice === q.romaji) {
      setScore((s) => s + 1)
    }

    setTimeout(() => {
      const next = index + 1
      if (next >= questions.length) {
        setFinished(true)
      } else {
        setIndex(next)
        setSelected(null)
      }
      setLocked(false)
    }, 1200)
  }

  const handleExit = () => {
    if (typeof onExit === "function") return onExit()
    navigate(-1)
  }

  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-200 p-6">
        <h2 className="text-3xl font-bold mb-4">Quiz Finished</h2>
        <p className="text-xl mb-4">
          Mode: <span className="font-semibold">{mode}</span> · Group:{" "}
          <span className="font-semibold">{group}</span>
        </p>
        <p className="text-2xl mb-6">
          Final Score: {score} / {questions.length}
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => {
              const shuffled = shuffle(buildPool())
              setQuestions(shuffled)
              setIndex(0)
              setScore(0)
              setFinished(shuffled.length === 0)
              setSelected(null)
            }}
            className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700"
          >
            Restart
          </button>
          <button
            onClick={handleExit}
            className="px-4 py-2 !bg-red-700 rounded hover:bg-gray-600"
          >
            Exit
          </button>
        </div>
      </div>
    )
  }

  if (!questions.length) {
    return (
      <div className="flex items-center justify-center h-full text-gray-200">
        <p>No characters found for {mode}/{group}.</p>
      </div>
    )
  }

  const q = questions[index]

  return (
    <div className="flex flex-col items-center text-gray-200 p-6 min-h-[60vh]">
      <div className="flex w-full justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quiz ({mode} - {group})</h2>
        <div className="flex items-center gap-3">
          <div className="text-lg text-gray-400">Score: {score}</div>
          <button
            onClick={handleExit}
            className="px-3 py-2 !bg-red-700 hover:bg-gray-600 rounded-lg"
          >
            Exit
          </button>
        </div>
      </div>

      <p className="mb-2">Question {index + 1} / {questions.length}</p>
      <div className="text-7xl font-bold mb-8">{q.char}</div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
        {options.map((opt, i) => {
          let color = "bg-gray-800 hover:bg-indigo-600"
          if (selected) {
            if (opt === q.romaji) {
              color = "!bg-green-800"
            } else if (opt === selected) {
              color = "!bg-red-600"
            } else {
              color = "bg-gray-800"
            }
          }
          return (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              disabled={locked}
              className={`py-3 px-4 rounded-lg text-lg font-semibold transition ${color}`}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}
