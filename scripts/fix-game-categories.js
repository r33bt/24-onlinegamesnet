const STRAPI_URL = 'http://127.0.0.1:1337';

const categoryMapping = {
  'quick': 'quick-games',
  'puzzle': 'puzzle-games', 
  'action': 'action-games',
  'racing': 'racing-sports',
  'strategy': 'strategy-rpg',
  'creative': 'creative-simulation',
  'cards': 'cards-board',
  'multiplayer': 'multiplayer'
};

async function fixGameCategories() {
  console.log('🔧 Fixing game category links...');
  
  const response = await fetch(STRAPI_URL + '/api/games');
  const games = await response.json();
  
  let fixedCount = 0;
  
  for (const game of games.data) {
    const oldCategory = game.category_slug;
    const newCategory = categoryMapping[oldCategory];
    
    if (newCategory && oldCategory !== newCategory) {
      console.log(`Updating ${game.name}: ${oldCategory} → ${newCategory}`);
      
      try {
        await fetch(STRAPI_URL + '/api/games/' + game.documentId, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            data: { category_slug: newCategory }
          }),
        });
        fixedCount++;
      } catch (error) {
        console.log('✗ Failed:', error.message);
      }
    }
  }
  
  console.log(`✅ Fixed ${fixedCount} games`);
}

fixGameCategories();
