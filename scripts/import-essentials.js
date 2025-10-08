const fs = require('fs');
const path = require('path');

const STRAPI_URL = 'http://127.0.0.1:1337';

async function importEssentials() {
  console.log('🎯 Importing essential categories for testing...\n');
  
  // Read the data
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'strapi-import-data.json'), 'utf8')
  );

  // Import just 3 key categories to test
  const essentialCategories = data.categories.slice(0, 3);
  const essentialGames = data.games.filter(game => 
    ['quick', 'puzzle', 'action'].includes(game.category)
  ).slice(0, 6); // 2 games per category

  console.log('📁 Importing 3 categories...');
  for (const category of essentialCategories) {
    try {
      const response = await fetch(STRAPI_URL + '/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: category }),
      });
      
      if (response.ok) {
        console.log('✓ ' + category.name);
      } else {
        console.log('✗ ' + category.name + ':', await response.text());
      }
    } catch (error) {
      console.log('✗ ' + category.name + ':', error.message);
    }
  }

  console.log('\n🎮 Importing 6 sample games...');
  for (const game of essentialGames) {
    try {
      const response = await fetch(STRAPI_URL + '/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          data: {
            title: game.title,
            slug: game.slug,
            url: game.url,
            description: game.description,
            time_duration: game.time_duration,
            rating: game.rating,
            icon: game.icon,
            featured: false,
            category_slug: game.category
          }
        }),
      });
      
      if (response.ok) {
        console.log('✓ ' + game.title);
      } else {
        console.log('✗ ' + game.title + ':', await response.text());
      }
    } catch (error) {
      console.log('✗ ' + game.title + ':', error.message);
    }
  }
  
  console.log('\n✅ Essential import complete!');
}

importEssentials();
