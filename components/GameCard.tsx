// Update GameCard to use 'name' instead of 'title'
import Link from 'next/link';
import { Game } from '@/lib/types';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4">
      <div className="flex items-center mb-3">
        <span className="text-2xl mr-3">{game.icon}</span>
        <div>
          <h3 className="font-semibold text-gray-900">{game.name}</h3>
          <p className="text-sm text-gray-600">{game.time_duration}</p>
        </div>
      </div>
      
      <p className="text-gray-700 text-sm mb-4 line-clamp-2">
        {game.description}
      </p>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-yellow-400">⭐</span>
          <span className="text-sm text-gray-600 ml-1">{game.rating}</span>
        </div>
        
        <a
          href={game.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
        >
          Play Now
        </a>
      </div>
    </div>
  );
}
