import GameCard from '@/components/GameCard';
import strapiClient from '@/lib/strapi-client';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const revalidate = 3600;

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  try {
    // Await params first (Next.js 15 requirement)
    const { slug } = await params;
    
    // Get category and its games
    const [category, games, allCategories] = await Promise.all([
      strapiClient.getCategoryBySlug(slug),
      strapiClient.getGamesByCategory(slug),
      strapiClient.getCategories()
    ]);

    if (!category) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation - Match Homepage Style */}
        <nav className="bg-indigo-600 text-white shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-xl font-bold">
                🎮 OnlineGames.net
              </Link>
              
              {/* Desktop Menu - Same as Homepage */}
              <div className="hidden lg:flex space-x-6 text-sm">
                {allCategories.slice(0, 6).map((cat) => (
                  <Link
                    key={cat.documentId}
                    href={`/${cat.slug}`}
                    className={`hover:text-indigo-200 transition-colors px-3 py-2 rounded-md hover:bg-indigo-700 ${cat.slug === slug ? 'bg-indigo-700' : ''}`}
                  >
                    <span className="mr-1">{cat.icon}</span>
                    {cat.name.split(' ')[0]}
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

        {/* Category Header */}
        <section className={`bg-gradient-to-r ${category.gradient || 'from-indigo-500 to-purple-600'} text-white py-16`}>
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {category.icon} {category.name}
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              {category.description}
            </p>
            <div className="text-lg">
              {games.length} games available
            </div>
          </div>
        </section>

        {/* Games Grid */}
        <section className="container mx-auto px-4 py-16">
          {games.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {games.map((game) => (
                <GameCard key={game.documentId} game={game} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No games found in this category yet.
              </p>
              <Link href="/" className="text-indigo-600 hover:underline mt-4 inline-block">
                Browse other categories
              </Link>
            </div>
          )}
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
    console.error('Category page error:', error);
    notFound();
  }
}
