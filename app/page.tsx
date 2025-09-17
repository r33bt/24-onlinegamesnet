import GameCard from "@/components/GameCard"
import gamesData from "@/data/games.json"
import Link from "next/link"

export default function HomePage() {
  // Get 2 featured games from each category (16 total)
  const featuredGames = [
    ...gamesData.quick.slice(0, 2),
    ...gamesData.puzzle.slice(0, 2), 
    ...gamesData.action.slice(0, 2),
    ...gamesData.racing.slice(0, 2),
    ...gamesData.strategy.slice(0, 2),
    ...gamesData.creative.slice(0, 2),
    ...gamesData.cards.slice(0, 2),
    ...gamesData.multiplayer.slice(0, 2)
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-indigo-600 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold">
              🎮 OnlineGames.net
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-4 text-sm">
              <Link href="/quick" className="hover:text-indigo-200 transition-colors px-2 py-1 rounded">
                ⚡ Quick
              </Link>
              <Link href="/puzzle" className="hover:text-indigo-200 transition-colors px-2 py-1 rounded">
                🧩 Puzzle
              </Link>
              <Link href="/action" className="hover:text-indigo-200 transition-colors px-2 py-1 rounded">
                🎯 Action
              </Link>
              <Link href="/racing" className="hover:text-indigo-200 transition-colors px-2 py-1 rounded">
                🏎️ Racing
              </Link>
              <Link href="/strategy" className="hover:text-indigo-200 transition-colors px-2 py-1 rounded">
                ⚔️ Strategy
              </Link>
              <Link href="/creative" className="hover:text-indigo-200 transition-colors px-2 py-1 rounded">
                🎨 Creative
              </Link>
              <Link href="/cards" className="hover:text-indigo-200 transition-colors px-2 py-1 rounded">
                🃏 Cards
              </Link>
              <Link href="/multiplayer" className="hover:text-indigo-200 transition-colors px-2 py-1 rounded">
                👥 Party
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button className="text-white">☰</button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            🎮 OnlineGames.net
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            Play 60+ hand-picked browser games instantly! From quick 2-minute breaks to epic strategy sessions - no downloads required.
          </p>
          
          {/* Category Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-8">
            <Link href="/quick" className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-3 rounded-lg font-semibold transition-colors">
              ⚡ Quick Games
            </Link>
            <Link href="/puzzle" className="bg-green-500 hover:bg-green-600 px-4 py-3 rounded-lg font-semibold transition-colors">
              🧩 Puzzle Games
            </Link>
            <Link href="/action" className="bg-red-500 hover:bg-red-600 px-4 py-3 rounded-lg font-semibold transition-colors">
              🎯 Action Games
            </Link>
            <Link href="/racing" className="bg-orange-500 hover:bg-orange-600 px-4 py-3 rounded-lg font-semibold transition-colors">
              🏎️ Racing & Sports
            </Link>
            <Link href="/strategy" className="bg-purple-500 hover:bg-purple-600 px-4 py-3 rounded-lg font-semibold transition-colors">
              ⚔️ Strategy & RPG
            </Link>
            <Link href="/creative" className="bg-pink-500 hover:bg-pink-600 px-4 py-3 rounded-lg font-semibold transition-colors">
              🎨 Creative & Sim
            </Link>
            <Link href="/cards" className="bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded-lg font-semibold transition-colors">
              🃏 Cards & Board
            </Link>
            <Link href="/multiplayer" className="bg-teal-500 hover:bg-teal-600 px-4 py-3 rounded-lg font-semibold transition-colors">
              👥 Multiplayer
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
          🌟 Featured Games
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Top picks from each category - updated weekly
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredGames.slice(0, 12).map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg">
            Explore all <strong>64+ carefully curated games</strong> across 8 categories
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">64+</div>
              <p className="text-gray-600">Handpicked Games</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">8</div>
              <p className="text-gray-600">Game Categories</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">100%</div>
              <p className="text-gray-600">Free to Play</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">0</div>
              <p className="text-gray-600">Downloads Required</p>
            </div>
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