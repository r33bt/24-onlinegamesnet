import GameCard from "@/components/GameCard"
import gamesData from "@/data/games.json"
import Link from "next/link"

export default function MultiplayerGamesPage() {
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
              <Link href="/creative" className="hover:text-indigo-200 transition-colors">🎨 Creative</Link>
              <Link href="/cards" className="hover:text-indigo-200 transition-colors">🃏 Cards</Link>
              <Link href="/multiplayer" className="text-yellow-300 font-semibold">👥 Party</Link>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Header */}
      <section className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            👥 Multiplayer Party Games
          </h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Games are better with friends! Social party games, team challenges, and multiplayer fun that brings people together for laughs and competition.
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded">🎉 Social Fun</span>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded">👫 Play with Friends</span>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded">😂 Guaranteed Laughs</span>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {gamesData.multiplayer.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* Party Gaming Tips */}
      <section className="bg-teal-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900">
            🎉 Party Gaming Tips
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-lg">
              <span className="text-2xl block mb-2">📱</span>
              <p className="text-gray-700">Share room codes with friends via text or chat</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <span className="text-2xl block mb-2">🎭</span>
              <p className="text-gray-700">Embrace the chaos - funny fails make great memories</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <span className="text-2xl block mb-2">🏆</span>
              <p className="text-gray-700">Focus on fun, not just winning</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Play Together */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900">
            🚀 How to Play with Friends
          </h3>
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-teal-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <span className="text-teal-600 font-bold">1</span>
                </div>
                <p className="text-gray-700">Choose a multiplayer game</p>
              </div>
              <div className="text-center">
                <div className="bg-teal-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <span className="text-teal-600 font-bold">2</span>
                </div>
                <p className="text-gray-700">Create or join a room</p>
              </div>
              <div className="text-center">
                <div className="bg-teal-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <span className="text-teal-600 font-bold">3</span>
                </div>
                <p className="text-gray-700">Share the room code</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/creative" className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors">
                🎨 Creative
              </Link>
              <Link href="/action" className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors">
                🎯 Action
              </Link>
              <Link href="/cards" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors">
                🃏 Cards
              </Link>
              <Link href="/puzzle" className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors">
                🧩 Puzzle
              </Link>
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
