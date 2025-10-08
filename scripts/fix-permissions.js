const STRAPI_URL = 'http://localhost:1337';

async function fixPermissions() {
  try {
    // Get the public role
    const rolesResponse = await fetch(STRAPI_URL + '/users-permissions/roles');
    const roles = await rolesResponse.json();
    
    console.log('Available roles:', roles);
    
    const publicRole = roles.roles?.find(role => role.type === 'public');
    
    if (publicRole) {
      console.log('Found public role:', publicRole.id);
      
      // Update permissions
      const updatedPermissions = {
        ...publicRole.permissions,
        'api::category': {
          'controllers': {
            'category': {
              'find': { 'enabled': true },
              'findOne': { 'enabled': true }
            }
          }
        },
        'api::game': {
          'controllers': {
            'game': {
              'find': { 'enabled': true },
              'findOne': { 'enabled': true }
            }
          }
        }
      };
      
      const updateResponse = await fetch(STRAPI_URL + '/users-permissions/roles/' + publicRole.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...publicRole,
          permissions: updatedPermissions
        }),
      });
      
      if (updateResponse.ok) {
        console.log('✅ Permissions updated successfully!');
      } else {
        console.log('❌ Failed to update permissions:', await updateResponse.text());
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

fixPermissions();
