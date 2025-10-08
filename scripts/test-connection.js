async function testConnection() {
  console.log('Testing Node.js connectivity to Strapi...');
  
  try {
    // Test basic connection
    const response = await fetch('http://localhost:1337');
    console.log('✅ Can reach Strapi:', response.status);
    
    // Test API endpoint
    const apiResponse = await fetch('http://localhost:1337/api/categories');
    console.log('✅ API accessible:', apiResponse.status);
    const data = await apiResponse.json();
    console.log('✅ Current categories:', data.data.length);
    
  } catch (error) {
    console.log('❌ Connection failed:', error.message);
    
    // Try alternative addresses
    console.log('Trying 127.0.0.1...');
    try {
      const altResponse = await fetch('http://127.0.0.1:1337/api/categories');
      console.log('✅ 127.0.0.1 works:', altResponse.status);
    } catch (altError) {
      console.log('❌ 127.0.0.1 also failed:', altError.message);
    }
  }
}

testConnection();
