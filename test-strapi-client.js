// Simple test without TypeScript
const STRAPI_URL = 'http://localhost:1337';

async function testClient() {
  console.log('🧪 Testing Strapi client...\n');
  
  try {
    // Test categories
    const categoriesResponse = await fetch(STRAPI_URL + '/api/categories?sort=featured_order:asc');
    const categories = await categoriesResponse.json();
    console.log('✅ Categories:', categories.data.length);
    
    // Test games
    const gamesResponse = await fetch(STRAPI_URL + '/api/games');
    const games = await gamesResponse.json();
    console.log('✅ Games:', games.data.length);
    
    // Test category-specific games
    if (categories.data.length > 0) {
      const firstCategory = categories.data[0];
      const categoryGamesResponse = await fetch(STRAPI_URL + '/api/games?filters[category_slug][\]=' + firstCategory.slug);
      const categoryGames = await categoryGamesResponse.json();
      console.log('✅ Games in "' + firstCategory.name + '":', categoryGames.data.length);
    }
    
    console.log('\n🎉 Client test successful!');
    
  } catch (error) {
    console.error('❌ Client test failed:', error.message);
  }
}

testClient();
