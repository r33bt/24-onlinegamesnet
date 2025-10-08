import { Category, Game, CategoriesResponse, GamesResponse } from './types';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

class StrapiClient {
  private baseURL: string;

  constructor(baseURL: string = STRAPI_URL) {
    this.baseURL = baseURL;
  }

  private async fetchAPI(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}/api${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      // Enable Next.js ISR caching
      next: { revalidate: 3600 }, // Cache for 1 hour
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Get all categories
  async getCategories(): Promise<Category[]> {
    const response: CategoriesResponse = await this.fetchAPI('/categories?sort=featured_order:asc');
    return response.data;
  }

 // Get category by slug
async getCategoryBySlug(slug: string): Promise<Category | null> {
  const response: CategoriesResponse = await this.fetchAPI(`/categories?filters[slug][$eq]=${slug}`);
  return response.data[0] || null;
}

// Get games by category
async getGamesByCategory(categorySlug: string): Promise<Game[]> {
  const response: GamesResponse = await this.fetchAPI(`/games?filters[category_slug][$eq]=${categorySlug}`);
  return response.data;
}

  // Get all games
  async getAllGames(): Promise<Game[]> {
    const response: GamesResponse = await this.fetchAPI('/games');
    return response.data;
  }

  // Get featured games for homepage (2 from each category)
async getFeaturedGames(): Promise<Game[]> {
  try {
    // Get all games first (simpler approach)
    const allGames = await this.getAllGames();
    
    if (allGames.length === 0) {
      return [];
    }
    
    // Group games by category and take 2 from each
    const gamesByCategory: { [key: string]: Game[] } = {};
    
    allGames.forEach(game => {
      const category = game.category_slug || 'uncategorized';
      if (!gamesByCategory[category]) {
        gamesByCategory[category] = [];
      }
      if (gamesByCategory[category].length < 2) {
        gamesByCategory[category].push(game);
      }
    });
    
    // Flatten the result
    const featuredGames: Game[] = [];
    Object.values(gamesByCategory).forEach(games => {
      featuredGames.push(...games);
    });
    
    return featuredGames.slice(0, 16); // Max 16 games on homepage
    
  } catch (error) {
    console.error('Error fetching featured games:', error);
    return [];
  }
}

}

export const strapiClient = new StrapiClient();
export default strapiClient;
