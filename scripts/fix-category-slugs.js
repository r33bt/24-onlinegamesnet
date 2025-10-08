const STRAPI_URL = 'http://127.0.0.1:1337';

const categorySlugFixes = {
  'quick-games': 'quick',
  'puzzle-games': 'puzzle', 
  'action-games': 'action',
  'racing-sports': 'racing',
  'strategy-rpg': 'strategy',
  'creative-simulation': 'creative',
  'cards-board': 'cards',
  'multiplayer': 'multiplayer'  // This one is already correct
};

async function fixCategorySlugs() {
  console.log('🔧 Fixing category slugs to match original data...');
  
  const response = await fetch(STRAPI_URL + '/api/categories');
  const categories = await response.json();
  
  for (const category of categories.data) {
    const newSlug = categorySlugFixes[category.slug];
    
    if (newSlug && newSlug !== category.slug) {
      console.log(`Updating ${category.name}: ${category.slug} → ${newSlug}`);
      
      try {
        await fetch(STRAPI_URL + '/api/categories/' + category.documentId, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            data: { slug: newSlug }
          }),
        });
      } catch (error) {
        console.log('✗ Failed:', error.message);
      }
    }
  }
  
  console.log('✅ Category slugs fixed to match original data!');
}

fixCategorySlugs();
