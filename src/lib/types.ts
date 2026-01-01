
export interface Property {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  imageHint?: string;
  pricePerFraction: number;
  totalFractions: number;
  availableFractions: number;
  description: string;
  propertyType: 'Apartment' | 'House' | 'Commercial' | 'Land';
  dateAdded: string; // ISO string
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  walletAddress?: string;
}

export type FilterOptions = {
  searchTerm?: string;
  propertyType?: Property['propertyType'][];
  priceRange?: [number, number];
  sortBy?: 'price-asc' | 'price-desc' | 'date-desc' | 'date-asc';
};
