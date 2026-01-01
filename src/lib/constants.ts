
import type { Property } from './types';
import imageData from '@/app/lib/placeholder-images.json';

// Note: In a real application, you would fetch this data from your smart contracts.
// This mock data is now derived from a separate JSON file for better separation of concerns.
export const MOCK_PROPERTIES: Property[] = imageData.properties.map(p => ({
  ...p,
  // In a real scenario, these values would come from the blockchain.
  pricePerFraction: Math.floor(Math.random() * (500 - 50 + 1)) + 50,
  totalFractions: Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000,
  availableFractions: Math.floor(Math.random() * 900) + 100,
}));


export const PROPERTY_TYPES: Property['propertyType'][] = ['Apartment', 'House', 'Commercial', 'Land'];
