const fs = require('fs');
const path = require('path');

const STRAPI_URL = 'http://127.0.0.1:1337';

async function importData() {
  try {
    console.log('🚀 Starting data import to Strapi...\n');
    
    // Read the processed data
    const data = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'strapi-import-data.json'), 'utf8')
    );

    // First, create categories
    const categoryIds = {};
    console.log('📁 Creating categories...');
    
    for (const category of data.categories) {
      try {
        const response = await fetch(STRAPI_URL + '/api/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: category }),
        });
        
        if (response.ok) {
          const result = await response.json();
          categoryIds[category.slug] = result.data.documentId;
          console.log('✓ Created category: ' + category.name);
        } else {
          const error = await response.text();
          console.log('✗ Failed to create category ' + category.name + ': ' + error);
        }
      } catch (error) {
        console.log('✗ Error creating category ' + category.name + ': ' + error.message);
      }
    }

    // Then, create games
    console.log('\n🎮 Creating games...');
    let successCount = 0;
    let errorCount = 0;
    
    for (const game of data.games) {
      try {
        const gameData = {
          title: game.title,
          slug: game.slug,
          url: game.url,
          description: game.description,
          time_duration: game.time_duration,
          rating: game.rating,
          icon: game.icon,
          featured: game.featured,
          category_slug: game.category
        };
        
        const response = await fetch(STRAPI_URL + '/api/games', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: gameData }),
        });
        
        if (response.ok) {
          successCount++;
          console.log('✓ Created game: ' + game.title);
        } else {
          errorCount++;
          const error = await response.text();
          console.log('✗ Failed to create game ' + game.title + ': ' + error);
        }
      } catch (error) {
        errorCount++;
        console.log('✗ Error creating game ' + game.title + ': ' + error.message);
      }
    }

    console.log('\n🎉 Data import completed!');
    console.log('Categories created: ' + Object.keys(categoryIds).length);
    console.log('Games created successfully: ' + successCount);
    console.log('Games failed: ' + errorCount);
    
  } catch (error) {
    console.error('❌ Import failed:', error.message);
  }
}

importData();
