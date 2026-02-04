
export enum Category {
  ALL = 'All',
  BURGER = 'Burgers',
  SUSHI = 'Sushi',
  PIZZA = 'Pizza',
  SALAD = 'Salads',
  DESSERT = 'Desserts',
  DRINK = 'Drinks'
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  rating: number;
  image: string;
  calories: number;
  isSpicy?: boolean;
  isVegetarian?: boolean;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export interface AIRecommendation {
  id: string;
  reason: string;
}
