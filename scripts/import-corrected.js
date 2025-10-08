const fs = require('fs');
const path = require('path');

const STRAPI_URL = 'http://127.0.0.1:1337';

async function importCorrected() {
  console.log('🔧 Importing with CORRECTED field mapping...\n');
  
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'strapi-import-data.json'), 'utf8')
  );

  // Import categories (no slug field - auto-generated)
  console.log('📁 Importing 8 categories...');
  for (const category of data.categories) {
    const categoryData = {
      name: category.slug === 'quick' ? 'Quick Games' :
            category.slug === 'puzzle' ? 'Puzzle Games' :
            category.slug === 'action' ? 'Action Games' :
            category.slug === 'racing' ? 'Racing & Sports' :
            category.slug === 'strategy' ? 'Strategy & RPG' :
            category.slug === 'creative' ? 'Creative & Simulation' :
            category.slug === 'cards' ? 'Cards & Board' :
            category.slug === 'multiplayer' ? 'Multiplayer' : category.slug,
      description: category.description || 'Game category',
      icon: category.icon,
      gradient: category.gradient,
      featured_order: category.featured_order
      // slug will be auto-generated from name
    };
    
    try {
      const response = await fetch(STRAPI_URL + '/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: categoryData }),
      });
      
      if (response.ok) {
        console.log('✓ ' + categoryData.name);
      } else {
        const error = await response.text();
        console.log('✗ ' + categoryData.name + ':', error);
      }
    } catch (error) {
      console.log('✗ ' + categoryData.name + ':', error.message);
    }
  }

  console.log('\n🎮 Importing first 6 games (using name field)...');
  for (const game of data.games.slice(0, 6)) {
    const gameData = {
      name: game.title,  // KEY FIX: title -> name
      url: game.url,
      description: game.description,
      time_duration: game.time_duration,
      rating: game.rating,
      icon: game.icon,
      featured: game.featured,
      category_slug: game.category
      // slug will be auto-generated from name
    };
    
    try {
      const response = await fetch(STRAPI_URL + '/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: gameData }),
      });
      
      if (response.ok) {
        console.log('✓ ' + gameData.name);
      } else {
        const error = await response.text();
        console.log('✗ ' + gameData.name + ':', error);
      }
    } catch (error) {
      console.log('✗ ' + gameData.name + ':', error.message);
    }
  }
  
  console.log('\n✅ Corrected import complete!');
}

importCorrected();
