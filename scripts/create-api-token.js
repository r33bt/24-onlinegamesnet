const STRAPI_URL = 'http://127.0.0.1:1337';

async function createAPIToken() {
  console.log('🔑 Creating API token for bulk import...');
  
  try {
    // First, let's see what endpoints are available
    const response = await fetch(STRAPI_URL + '/admin/api-tokens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Import Token',
        description: 'Token for bulk game import',
        type: 'read-only',
        permissions: []
      }),
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ API Token created:', result.data.accessToken);
      return result.data.accessToken;
    } else {
      console.log('❌ Token creation failed:', await response.text());
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

createAPIToken();
