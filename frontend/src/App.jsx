import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"

// import your actual pages
import Characters from "./pages/Characters"
import Vocabulary from "./pages/Vocabulary"
import Grammar from "./pages/Grammar"
import Kanji from "./pages/Kanji"
import Reading from "./pages/Reading"
import Quiz from "./pages/Quiz"

export default function App() {
  return (
    <Router>
      {/* Full width + full height app */}
      <div className="flex h-screen w-screen bg-gray-900 text-gray-200">
        {/* Sidebar (collapsible) */}
        <Sidebar />

        {/* Main content (always fills rest of screen) */}
        <main className="flex-1 bg-gray-900 p-6 overflow-y-auto">
          <Routes>
            <Route path="/characters" element={<Characters />} />
            <Route path="/quiz/:mode/:group" element={<Quiz />} />
            <Route path="/vocabulary" element={<Vocabulary />} />
            <Route path="/grammar" element={<Grammar />} />
            <Route path="/kanji" element={<Kanji />} />
            <Route path="/reading" element={<Reading />} />

            {/* Default route */}
            <Route path="/" element={<Characters />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
