import type { Schema, Struct } from '@strapi/strapi';

export interface SharedBannerBlock extends Struct.ComponentSchema {
  collectionName: 'components_shared_banner_blocks';
  info: {
    displayName: 'banner_block';
    icon: 'landscape';
  };
  attributes: {
    button_color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    button_link: Schema.Attribute.String;
    button_text: Schema.Attribute.String;
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    show_banner: Schema.Attribute.Boolean;
    title: Schema.Attribute.String;
  };
}

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.String;
    ogUrl: Schema.Attribute.String;
  };
}

export interface SharedOrderItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_order_items';
  info: {
    displayName: 'OrderItem';
  };
  attributes: {
    price: Schema.Attribute.Decimal;
    product: Schema.Attribute.Relation<'manyToOne', 'api::product.product'>;
    quantity: Schema.Attribute.Integer;
  };
}

export interface SharedProductSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_product_sections';
  info: {
    description: '';
    displayName: 'product_section';
    icon: 'dashboard';
  };
  attributes: {
    banner: Schema.Attribute.Component<'shared.banner-block', false>;
    category: Schema.Attribute.Relation<'oneToOne', 'api::category.category'>;
    description: Schema.Attribute.String;
    layout_type: Schema.Attribute.Enumeration<
      ['only_products', 'products_with_a_banner']
    >;
    show_section: Schema.Attribute.Boolean;
    title: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface SharedSmallBanner extends Struct.ComponentSchema {
  collectionName: 'components_shared_small_banners';
  info: {
    displayName: 'small_banner';
    icon: 'book';
  };
  attributes: {
    background_color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    button_color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    button_text: Schema.Attribute.String;
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.banner-block': SharedBannerBlock;
      'shared.open-graph': SharedOpenGraph;
      'shared.order-item': SharedOrderItem;
      'shared.product-section': SharedProductSection;
      'shared.seo': SharedSeo;
      'shared.small-banner': SharedSmallBanner;
    }
  }
}
