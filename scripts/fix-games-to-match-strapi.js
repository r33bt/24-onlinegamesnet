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

async function fixGamesToMatchStrapi() {
  console.log('🔧 Updating games to match Strapi categories...');
  
  const response = await fetch(STRAPI_URL + '/api/games');
  const games = await response.json();
  
  let updatedCount = 0;
  
  for (const game of games.data) {
    const currentCategory = game.category_slug;
    const correctCategory = categoryMapping[currentCategory];
    
    if (correctCategory && currentCategory !== correctCategory) {
      console.log('Updating "' + game.name + '": ' + currentCategory + ' → ' + correctCategory);
      
      try {
        await fetch(STRAPI_URL + '/api/games/' + game.documentId, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            data: { category_slug: correctCategory }
          }),
        });
        updatedCount++;
      } catch (error) {
        console.log('✗ Failed:', error.message);
      }
    }
  }
  
  console.log('✅ Updated ' + updatedCount + ' games to match Strapi categories');
}

fixGamesToMatchStrapi();
