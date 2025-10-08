// Strapi v5 Response Types
export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Content Types
export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  gradient?: string;
  featured_order?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface Game {
  id: number;
  documentId: string;
  name: string;  // Changed from title to name
  slug: string;
  url: string;
  description: string;
  time_duration?: string;
  rating?: number;
  icon?: string;
  featured: boolean;
  category_slug?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

// API Response Types
export type CategoriesResponse = StrapiResponse<Category[]>;
export type GamesResponse = StrapiResponse<Game[]>;
