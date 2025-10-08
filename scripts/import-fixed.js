const fs = require('fs');
const path = require('path');

const STRAPI_URL = 'http://127.0.0.1:1337';

async function importFixed() {
  console.log('🔧 Importing with corrected data structure...\n');
  
  // Read and fix the data
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'strapi-import-data.json'), 'utf8')
  );

  // Fix categories - add missing name field, remove tips
  console.log('📁 Importing 8 categories...');
  for (const category of data.categories) {
    const fixedCategory = {
      name: category.slug === 'quick' ? 'Quick Games' :
            category.slug === 'puzzle' ? 'Puzzle Games' :
            category.slug === 'action' ? 'Action Games' :
            category.slug === 'racing' ? 'Racing & Sports' :
            category.slug === 'strategy' ? 'Strategy & RPG' :
            category.slug === 'creative' ? 'Creative & Simulation' :
            category.slug === 'cards' ? 'Cards & Board' :
            category.slug === 'multiplayer' ? 'Multiplayer' : category.slug,
      slug: category.slug,
      description: category.description || 'Game category',
      icon: category.icon,
      gradient: category.gradient,
      featured_order: category.featured_order
      // Remove 'tips' field - not in Strapi schema
    };
    
    try {
      const response = await fetch(STRAPI_URL + '/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: fixedCategory }),
      });
      
      if (response.ok) {
        console.log('✓ ' + fixedCategory.name);
      } else {
        console.log('✗ ' + fixedCategory.name + ':', await response.text());
      }
    } catch (error) {
      console.log('✗ ' + fixedCategory.name + ':', error.message);
    }
  }

  console.log('\n🎮 Importing first 6 games (test batch)...');
  for (const game of data.games.slice(0, 6)) {
    const fixedGame = {
      title: game.title,
      slug: game.slug,
      url: game.url,
      description: game.description,
      time_duration: game.time_duration,
      rating: game.rating,
      icon: game.icon,
      featured: game.featured,
      category_slug: game.category  // Fix: category -> category_slug
    };
    
    try {
      const response = await fetch(STRAPI_URL + '/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: fixedGame }),
      });
      
      if (response.ok) {
        console.log('✓ ' + fixedGame.title);
      } else {
        console.log('✗ ' + fixedGame.title + ':', await response.text());
      }
    } catch (error) {
      console.log('✗ ' + fixedGame.title + ':', error.message);
    }
  }
  
  console.log('\n✅ Fixed import complete!');
}

importFixed();
