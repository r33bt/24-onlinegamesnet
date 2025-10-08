import type { Schema, Struct } from '@strapi/strapi';

export interface SharedTip extends Struct.ComponentSchema {
  collectionName: 'components_shared_tips';
  info: {
    displayName: 'Tip';
  };
  attributes: {
    icon: Schema.Attribute.String;
    text: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.tip': SharedTip;
    }
  }
}
