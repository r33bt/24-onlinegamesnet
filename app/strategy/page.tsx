import GameCard from "@/components/GameCard"
import gamesData from "@/data/games.json"
import Link from "next/link"

export default function StrategyGamesPage() {
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
              <Link href="/strategy" className="text-yellow-300 font-semibold">⚔️ Strategy</Link>
              <Link href="/creative" className="hover:text-indigo-200 transition-colors">🎨 Creative</Link>
              <Link href="/cards" className="hover:text-indigo-200 transition-colors">🃏 Cards</Link>
              <Link href="/multiplayer" className="hover:text-indigo-200 transition-colors">👥 Party</Link>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ⚔️ Strategy & RPG Games
          </h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Command armies, build empires, and master tactical warfare! Deep strategic gameplay that challenges your mind and rewards careful planning.
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded">🧠 Deep Thinking</span>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded">⏱️ 20+ minutes</span>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded">🏆 Rewarding</span>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {gamesData.strategy.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* Strategy Tips */}
      <section className="bg-purple-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900">
            ⚔️ Strategic Mastery Tips
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-lg">
              <span className="text-2xl block mb-2">📋</span>
              <p className="text-gray-700">Plan ahead - think 3-5 moves in advance</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <span className="text-2xl block mb-2">⚖️</span>
              <p className="text-gray-700">Balance offense and defense for long-term success</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <span className="text-2xl block mb-2">📚</span>
              <p className="text-gray-700">Learn from losses - every defeat teaches strategy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation to other categories */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900">
            Need a Mental Break?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <Link href="/quick" className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-3 rounded-lg font-semibold transition-colors">
              ⚡ Quick Games
            </Link>
            <Link href="/creative" className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors">
              🎨 Creative
            </Link>
            <Link href="/cards" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors">
              🃏 Cards
            </Link>
            <Link href="/racing" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors">
              🏎️ Racing
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