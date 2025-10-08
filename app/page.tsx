import GameCard from "@/components/GameCard";
import strapiClient from "@/lib/strapi-client";
import Link from "next/link";
import { Category, Game } from "@/lib/types";

export const revalidate = 3600;

export default async function HomePage() {
  try {
    const [categories, featuredGames] = await Promise.all([
      strapiClient.getCategories(),
      strapiClient.getFeaturedGames()
    ]);

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-indigo-600 text-white shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-xl font-bold">
                🎮 OnlineGames.net
              </Link>
              
              {/* Desktop Menu - Fixed Navigation */}
              <div className="hidden lg:flex space-x-6 text-sm">
                {categories.slice(0, 6).map((category) => (
                  <Link
                    key={category.documentId}
                    href={`/${category.slug}`}
                    className="hover:text-indigo-200 transition-colors px-3 py-2 rounded-md hover:bg-indigo-700"
                  >
                    <span className="mr-1">{category.icon}</span>
                    {category.name.split(' ')[0]}
                  </Link>
                ))}
                <Link
                  href="/"
                  className="hover:text-indigo-200 transition-colors px-3 py-2 rounded-md hover:bg-indigo-700"
                >
                  All Games
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
              Play hand-picked browser games instantly! No downloads required.
            </p>
            
            {/* Category Grid - Updated with better styling */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-8">
              {categories.map((category) => (
                <Link
                  key={category.documentId}
                  href={`/${category.slug}`}
                  className={`bg-gradient-to-r ${category.gradient || 'from-blue-400 to-blue-600'} hover:opacity-90 px-6 py-4 rounded-xl font-semibold transition-all duration-300 text-white shadow-lg hover:shadow-xl transform hover:scale-105`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <div className="text-sm font-medium leading-tight">{category.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Games */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
            🌟 Featured Games
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Top picks from our curated collection
          </p>
          
          {featuredGames.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredGames.map((game) => (
                <GameCard key={game.documentId} game={game} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">
                🚀 Setting up your games library...
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Add games via the <a href="http://localhost:1337/admin" target="_blank" className="text-blue-600 hover:underline">Strapi Admin Panel</a>
              </p>
            </div>
          )}
        </section>

        {/* Quick Stats */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-indigo-600 mb-2">{featuredGames.length * 4}+</div>
                <p className="text-gray-600">Curated Games</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">{categories.length}</div>
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
            <p className="text-sm text-gray-400 mt-2">Free games, no downloads required</p>
          </div>
        </footer>
      </div>
    );
  } catch (error) {
    console.error('Homepage error:', error);
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">🎮 OnlineGames.net</h1>
          <p className="text-gray-600">Setting up your games library...</p>
          <p className="text-sm text-gray-500 mt-2">
            <a href="http://localhost:1337/admin" target="_blank" className="text-blue-600 hover:underline">
              Add content via Strapi Admin
            </a>
          </p>
        </div>
      </div>
    );
  }
}
