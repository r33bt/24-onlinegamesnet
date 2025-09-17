import Link from "next/link"

export default function Navigation() {
  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            🎮 OnlineGames.net
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/quick" className="hover:text-indigo-200 transition-colors">
              ⚡ Quick Games
            </Link>
            <Link href="/puzzle" className="hover:text-indigo-200 transition-colors">
              🧩 Puzzle Games
            </Link>
            <Link href="/action" className="hover:text-indigo-200 transition-colors">
              🎯 Action Games
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
