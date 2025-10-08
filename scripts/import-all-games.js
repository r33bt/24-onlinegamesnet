const fs = require('fs');
const path = require('path');

const STRAPI_URL = 'http://127.0.0.1:1337';

async function importAllGames() {
  console.log('🚀 Importing ALL 64 games...\n');
  
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'strapi-import-data.json'), 'utf8')
  );

  console.log('🎮 Importing ' + data.games.length + ' games...');
  let successCount = 0;
  let errorCount = 0;
  
  for (const [index, game] of data.games.entries()) {
    const gameData = {
      name: game.title,
      url: game.url,
      description: game.description,
      time_duration: game.time_duration,
      rating: game.rating,
      icon: game.icon,
      featured: game.featured,
      category_slug: game.category
    };
    
    try {
      const response = await fetch(STRAPI_URL + '/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: gameData }),
      });
      
      if (response.ok) {
        successCount++;
        console.log('✓ [' + (index + 1) + '/64] ' + gameData.name);
      } else {
        errorCount++;
        const error = await response.text();
        console.log('✗ [' + (index + 1) + '/64] ' + gameData.name + ': ' + error);
      }
    } catch (error) {
      errorCount++;
      console.log('✗ [' + (index + 1) + '/64] ' + gameData.name + ': ' + error.message);
    }
    
    // Small delay to avoid overwhelming Strapi
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('\n🎉 IMPORT COMPLETE!');
  console.log('✅ Success: ' + successCount + ' games');
  console.log('❌ Errors: ' + errorCount + ' games');
  console.log('📊 Total: ' + (successCount + errorCount) + ' games processed');
}

importAllGames();
