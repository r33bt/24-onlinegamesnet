import GameCard from "@/components/GameCard"
import gamesData from "@/data/games.json"
import Link from "next/link"

export default function PuzzleGamesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-indigo-600 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold">
              🎮 OnlineGames.net
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/quick" className="hover:text-indigo-200 transition-colors">⚡ Quick</Link>
              <Link href="/puzzle" className="text-yellow-300 font-semibold">🧩 Puzzle</Link>
              <Link href="/action" className="hover:text-indigo-200 transition-colors">🎯 Action</Link>
              <Link href="/racing" className="hover:text-indigo-200 transition-colors">🏎️ Racing</Link>
              <Link href="/strategy" className="hover:text-indigo-200 transition-colors">⚔️ Strategy</Link>
              <Link href="/creative" className="hover:text-indigo-200 transition-colors">🎨 Creative</Link>
              <Link href="/cards" className="hover:text-indigo-200 transition-colors">🃏 Cards</Link>
              <Link href="/multiplayer" className="hover:text-indigo-200 transition-colors">👥 Party</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🧩 Puzzle Games
          </h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Challenge your mind with brain-teasing puzzles! From classic match-3 games to complex logic challenges that will keep you thinking for hours.
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded">🧠 Brain Training</span>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded">🎯 Logic & Reason</span>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded">🏆 Problem Solving</span>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {gamesData.puzzle.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* Puzzle Tips */}
      <section className="bg-green-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900">
            🧩 Puzzle Master Tips
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-lg">
              <span className="text-2xl block mb-2">🔍</span>
              <p className="text-gray-700">Look for patterns and connections first</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <span className="text-2xl block mb-2">🎯</span>
              <p className="text-gray-700">Start with easier moves to clear the board</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <span className="text-2xl block mb-2">💡</span>
              <p className="text-gray-700">Take breaks - fresh eyes see new solutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation to other categories */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900">
            More Brain Challenges
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <Link href="/strategy" className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors">
              ⚔️ Strategy
            </Link>
            <Link href="/cards" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors">
              🃏 Cards
            </Link>
            <Link href="/creative" className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors">
              🎨 Creative
            </Link>
            <Link href="/quick" className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-3 rounded-lg font-semibold transition-colors">
              ⚡ Quick
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 OnlineGames.net - Your destination for instant browser gaming</p>
        </div>
      </footer>
    </div>
  )
}
