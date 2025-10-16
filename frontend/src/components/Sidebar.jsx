import { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../assets/logo.png"
import profile from "../assets/profile.png"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { name: "Characters", icon: "🔤", path: "/characters" },
    { name: "Vocabulary", icon: "📖", path: "/vocabulary" },
    { name: "Grammar", icon: "✏️", path: "/grammar" },
    { name: "Kanji", icon: "🈶", path: "/kanji" },
    { name: "Reading", icon: "📚", path: "/reading" },
  ]

  return (
    <aside
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={`h-screen bg-gray-900 text-gray-200 flex flex-col border-r border-gray-700 
        transition-all duration-300 ease-in-out ${isOpen ? "w-64" : "w-20"}`}
    >
      {/* ---------- Top Section ---------- */}
      <div className="p-3 flex items-center">
        {isOpen ? (
          <span className="text-lg font-bold whitespace-nowrap transition-all duration-300">
            JP Learn
          </span>
        ) : (
            <div className="text-lg font-bold"> JP Learn</div>
        //   <img
        //     src={logo}
        //     alt="Logo"
        //     className="w-8 h-8 transition-all duration-300 mx-auto"
        //   />
        )}
      </div>

      {/* ---------- Menu Items ---------- */}
      <nav className="flex-1 px-2 py-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-800 transition-colors"
          >
            {/* Icon */}
            <span className="text-xl">{item.icon}</span>

            {/* Label */}
            <span
              className={`ml-3 whitespace-nowrap overflow-hidden transition-all duration-300 
                ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"}`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </nav>

      
      {/* <div
        className={`p-3 border-t border-gray-700 flex items-center transition-all duration-300 ${
          isOpen ? "justify-start" : "justify-center"
        }`}
      >
        <img src={profile} alt="Profile" className="w-8 h-8 rounded-full" />

        <div
          className={`ml-3 transition-all duration-300 overflow-hidden ${
            isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
          }`}
        >
          <p className="text-sm font-semibold">User Name</p>
          <p className="text-xs text-gray-400">user@email.com</p>
        </div>
      </div> */}
    </aside>
  )
}
