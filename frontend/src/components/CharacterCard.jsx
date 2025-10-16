
 export default function CharacterCard({ char, romaji, examples }) {
  return (
    <div className="relative group flex flex-col items-center justify-center bg-gray-800 rounded-xl p-6 shadow-md hover:bg-gray-700 transition cursor-pointer">
      {/* Main Character */}
      <span className="text-4xl font-bold">{char}</span>
      <span className="text-sm text-gray-400 mt-2">{romaji}</span>

      {/* Hover Info */}
      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
                      bg-gray-900 text-gray-200 text-sm rounded-lg shadow-lg 
                      px-3 py-2 opacity-0 group-hover:opacity-100 
                      pointer-events-none group-hover:pointer-events-auto
                      transition-opacity duration-300 whitespace-nowrap z-10">
        {examples && examples.length > 0 ? (
          <>
            <p className="font-semibold"></p>
            {examples.map((ex, idx) => (
              <p key={idx}>{ex}</p>
            ))}
          </>
        ) : (
          <p>No examples</p>
        )}
      </div>
    </div>
  )
}
