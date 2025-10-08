const fs = require('fs');
const STRAPI_URL = 'http://127.0.0.1:1337';

async function runDiagnostics() {
  console.log('🔍 COMPLETE DIAGNOSTICS\n');
  
  // 1. Check original data structure
  console.log('=== ORIGINAL DATA ===');
  const originalData = JSON.parse(fs.readFileSync('../data/games.json', 'utf8'));
  Object.keys(originalData).forEach(category => {
    console.log(category + ': ' + originalData[category].length + ' games');
    originalData[category].slice(0, 3).forEach(game => {
      console.log('  - ' + game.title);
    });
  });
  
  // 2. Check Strapi categories
  console.log('\n=== STRAPI CATEGORIES ===');
  const categoriesResponse = await fetch(STRAPI_URL + '/api/categories');
  const categories = await categoriesResponse.json();
  categories.data.forEach(category => {
    console.log('"' + category.name + '" → slug: "' + category.slug + '"');
  });
  
  // 3. Check Strapi games distribution
  console.log('\n=== STRAPI GAMES DISTRIBUTION ===');
  const gamesResponse = await fetch(STRAPI_URL + '/api/games');
  const games = await gamesResponse.json();
  
  const gamesByCategory = {};
  games.data.forEach(game => {
    const cat = game.category_slug || 'EMPTY';
    if (!gamesByCategory[cat]) gamesByCategory[cat] = [];
    gamesByCategory[cat].push(game.name);
  });
  
  Object.keys(gamesByCategory).forEach(category => {
    console.log('"' + category + '": ' + gamesByCategory[category].length + ' games');
    gamesByCategory[category].slice(0, 3).forEach(game => {
      console.log('  - ' + game);
    });
  });
  
  // 4. Sample game details
  console.log('\n=== SAMPLE GAMES ===');
  games.data.slice(0, 8).forEach(game => {
    console.log('"' + game.name + '" → category_slug: "' + (game.category_slug || 'EMPTY') + '"');
  });
}

runDiagnostics().catch(console.error);
