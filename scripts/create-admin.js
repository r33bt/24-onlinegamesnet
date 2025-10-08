const STRAPI_URL = 'http://localhost:1337';

async function createAdmin() {
  console.log('👤 Creating admin user...');
  
  const adminData = {
    firstname: 'Admin',
    lastname: 'User',
    email: 'admin@example.com',
    password: 'AdminPassword123!'
  };
  
  try {
    const response = await fetch(STRAPI_URL + '/admin/register-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adminData),
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✓ Admin user created successfully!');
      console.log('📧 Email: admin@example.com');
      console.log('🔑 Password: AdminPassword123!');
      console.log('🔗 Admin URL: http://localhost:1337/admin');
      return result;
    } else {
      const error = await response.text();
      console.log('✗ Failed to create admin: ' + error);
    }
  } catch (error) {
    console.log('✗ Error creating admin: ' + error.message);
  }
}

createAdmin();
