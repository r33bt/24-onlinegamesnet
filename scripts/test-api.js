const STRAPI_URL = 'http://localhost:1337';

async function testAPI() {
  try {
    console.log('Testing Categories API...');
    const categoriesResponse = await fetch(STRAPI_URL + '/api/categories');
    console.log('Categories Status:', categoriesResponse.status);
    console.log('Categories Response:', await categoriesResponse.text());
    
    console.log('\nTesting Games API...');
    const gamesResponse = await fetch(STRAPI_URL + '/api/games');
    console.log('Games Status:', gamesResponse.status);
    console.log('Games Response:', await gamesResponse.text());
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAPI();
