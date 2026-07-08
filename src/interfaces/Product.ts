export interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  image: string; // Changed from icon to image (full image URL)
  description: string;
  category: 'vegetable' | 'fruit' | 'nonveg' | 'milk' | 'grocery';
  rating?: number;
  inStock?: boolean;
}