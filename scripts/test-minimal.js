const STRAPI_URL = 'http://127.0.0.1:1337';

async function testMinimal() {
  console.log('🧪 Testing minimal category creation...');
  
  // Test with only the fields we know work (from existing data)
  const minimalCategory = {
    name: 'Test Category 3',
    description: 'Another test category',
    icon: '🧪',
    gradient: 'from-blue-400 to-blue-600',
    featured_order: 3
    // NOTE: Excluding 'slug' - maybe it's auto-generated?
  };
  
  try {
    const response = await fetch(STRAPI_URL + '/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: minimalCategory }),
    });
    
    console.log('Response status:', response.status);
    const result = await response.text();
    console.log('Response:', result);
    
  } catch (error) {
    console.log('Error:', error.message);
  }
  
  console.log('\n🧪 Testing minimal game creation...');
  
  const minimalGame = {
    url: 'https://example.com',
    description: 'Test game description',
    category_slug: 'quick'
    // NOTE: Excluding 'title' and 'slug' - maybe auto-generated?
  };
  
  try {
    const response = await fetch(STRAPI_URL + '/api/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: minimalGame }),
    });
    
    console.log('Response status:', response.status);
    const result = await response.text();
    console.log('Response:', result);
    
  } catch (error) {
    console.log('Error:', error.message);
  }
}

testMinimal();
