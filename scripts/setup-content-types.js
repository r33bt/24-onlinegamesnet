const fs = require('fs');
const path = require('path');

const STRAPI_URL = 'http://localhost:1337';

// Content type definitions
const contentTypes = {
  // Categories Collection Type
  'api::category.category': {
    kind: 'collectionType',
    collectionName: 'categories',
    info: {
      singularName: 'category',
      pluralName: 'categories',
      displayName: 'Category',
      description: 'Game categories'
    },
    options: {
      draftAndPublish: false,
    },
    pluginOptions: {},
    attributes: {
      name: {
        type: 'string',
        required: true
      },
      slug: {
        type: 'uid',
        targetField: 'name',
        required: true
      },
      description: {
        type: 'richtext'
      },
      icon: {
        type: 'string'
      },
      gradient: {
        type: 'string'
      },
      featured_order: {
        type: 'integer'
      },
      tips: {
        type: 'component',
        repeatable: true,
        component: 'shared.tip'
      },
      games: {
        type: 'relation',
        relation: 'oneToMany',
        target: 'api::game.game',
        mappedBy: 'category'
      }
    }
  },

  // Games Collection Type
  'api::game.game': {
    kind: 'collectionType',
    collectionName: 'games',
    info: {
      singularName: 'game',
      pluralName: 'games',
      displayName: 'Game',
      description: 'Browser games'
    },
    options: {
      draftAndPublish: false,
    },
    pluginOptions: {},
    attributes: {
      title: {
        type: 'string',
        required: true
      },
      slug: {
        type: 'uid',
        targetField: 'title',
        required: true
      },
      url: {
        type: 'string',
        required: true
      },
      description: {
        type: 'richtext',
        required: true
      },
      time_duration: {
        type: 'string'
      },
      rating: {
        type: 'integer',
        min: 1,
        max: 5
      },
      icon: {
        type: 'string'
      },
      featured: {
        type: 'boolean',
        default: false
      },
      category: {
        type: 'relation',
        relation: 'manyToOne',
        target: 'api::category.category',
        inversedBy: 'games'
      }
    }
  }
};

// Component definitions
const components = {
  'shared.tip': {
    collectionName: 'components_shared_tips',
    info: {
      displayName: 'Tip',
      description: 'Tips and advice'
    },
    options: {},
    attributes: {
      icon: {
        type: 'string'
      },
      text: {
        type: 'string'
      }
    }
  }
};

async function createComponents() {
  console.log('🔧 Creating components...');
  
  for (const [componentName, componentSchema] of Object.entries(components)) {
    try {
      const response = await fetch(STRAPI_URL + '/admin/components', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          component: {
            category: componentName.split('.')[0],
            displayName: componentSchema.info.displayName,
            icon: 'bulletList',
            ...componentSchema
          }
        }),
      });
      
      if (response.ok) {
        console.log('✓ Created component: ' + componentName);
      } else {
        const error = await response.text();
        console.log('✗ Failed to create component ' + componentName + ': ' + error);
      }
    } catch (error) {
      console.log('✗ Error creating component ' + componentName + ': ' + error.message);
    }
  }
}

async function createContentTypes() {
  console.log('📋 Creating content types...');
  
  for (const [contentTypeName, schema] of Object.entries(contentTypes)) {
    try {
      const response = await fetch(STRAPI_URL + '/admin/content-types', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentType: schema
        }),
      });
      
      if (response.ok) {
        console.log('✓ Created content type: ' + contentTypeName);
      } else {
        const error = await response.text();
        console.log('✗ Failed to create content type ' + contentTypeName + ': ' + error);
      }
    } catch (error) {
      console.log('✗ Error creating content type ' + contentTypeName + ': ' + error.message);
    }
  }
}

async function setPermissions() {
  console.log('🔑 Setting API permissions...');
  
  try {
    // Get public role
    const rolesResponse = await fetch(STRAPI_URL + '/admin/users-permissions/roles');
    const roles = await rolesResponse.json();
    const publicRole = roles.roles.find(role => role.type === 'public');
    
    if (publicRole) {
      // Update permissions for public role
      const permissions = {
        ...publicRole.permissions,
        'api::category': {
          controllers: {
            category: {
              find: { enabled: true },
              findOne: { enabled: true }
            }
          }
        },
        'api::game': {
          controllers: {
            game: {
              find: { enabled: true },
              findOne: { enabled: true }
            }
          }
        }
      };
      
      const updateResponse = await fetch(STRAPI_URL + '/admin/users-permissions/roles/' + publicRole.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...publicRole,
          permissions
        }),
      });
      
      if (updateResponse.ok) {
        console.log('✓ Updated API permissions for public role');
      }
    }
  } catch (error) {
    console.log('⚠️ Could not set permissions automatically - will need to set manually');
  }
}

async function restartStrapi() {
  console.log('🔄 Triggering Strapi restart...');
  
  try {
    await fetch(STRAPI_URL + '/admin/server/restart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log('✓ Strapi restart triggered');
  } catch (error) {
    console.log('⚠️ Could not restart automatically - please restart Strapi manually');
  }
}

async function setupStrapi() {
  console.log('🚀 Setting up Strapi content model...\n');
  
  try {
    // Create components first
    await createComponents();
    
    // Wait a bit for components to be created
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create content types
    await createContentTypes();
    
    // Set permissions
    await setPermissions();
    
    // Restart Strapi
    await restartStrapi();
    
    console.log('\n🎉 Setup completed! Wait for Strapi to restart, then run the import script.');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  }
}

setupStrapi();
