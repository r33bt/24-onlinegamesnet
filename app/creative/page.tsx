import GameCard from "@/components/GameCard"
import gamesData from "@/data/games.json"
import Link from "next/link"

export default function CreativeGamesPage() {
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
              <Link href="/puzzle" className="hover:text-indigo-200 transition-colors">🧩 Puzzle</Link>
              <Link href="/action" className="hover:text-indigo-200 transition-colors">🎯 Action</Link>
              <Link href="/racing" className="hover:text-indigo-200 transition-colors">🏎️ Racing</Link>
              <Link href="/strategy" className="hover:text-indigo-200 transition-colors">⚔️ Strategy</Link>
              <Link href="/creative" className="text-yellow-300 font-semibold">🎨 Creative</Link>
              <Link href="/cards" className="hover:text-indigo-200 transition-colors">🃏 Cards</Link>
              <Link href="/multiplayer" className="hover:text-indigo-200 transition-colors">👥 Party</Link>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🎨 Creative & Simulation Games
          </h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Unleash your imagination! Build worlds, create art, and simulate life. Express yourself through digital creativity and sandbox experiences.
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded">🎨 Artistic Expression</span>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded">🏗️ Building & Creating</span>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded">🌈 Unlimited Possibilities</span>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {gamesData.creative.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* Creative Tips */}
      <section className="bg-pink-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900">
            🎨 Creative Gaming Tips
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-lg">
              <span className="text-2xl block mb-2">💡</span>
              <p className="text-gray-700">Start small - build up your ideas gradually</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <span className="text-2xl block mb-2">🎯</span>
              <p className="text-gray-700">Experiment freely - there are no wrong moves</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <span className="text-2xl block mb-2">🌟</span>
              <p className="text-gray-700">Share your creations - inspire others</p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation to other categories */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900">
            Ready for Something Different?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <Link href="/puzzle" className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors">
              🧩 Puzzle Games
            </Link>
            <Link href="/multiplayer" className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors">
              👥 Party Games
            </Link>
            <Link href="/action" className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors">
              🎯 Action
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