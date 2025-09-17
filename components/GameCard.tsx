interface Game {
  id: string
  title: string
  url: string
  description: string
  time: string
  rating: number
  icon: string
}

interface GameCardProps {
  game: Game
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border">
      <div className="flex items-start gap-4">
        <div className="text-4xl">{game.icon}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-gray-900">{game.title}</h3>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < game.rating ? "text-yellow-400" : "text-gray-300"}>
                  ⭐
                </span>
              ))}
            </div>
          </div>
          <p className="text-gray-600 mb-3">{game.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
              ⏱️ {game.time}
            </span>
            <a
              href={game.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Play Now →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
