
import { FoodItem, Category } from './types';

export const MENU_ITEMS: FoodItem[] = [
  {
    id: '1',
    name: 'Truffle Umami Burger',
    description: 'Aged wagyu beef, black truffle aioli, caramelized onions, and swiss cheese on a brioche bun.',
    price: 18.99,
    category: Category.BURGER,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    calories: 850
  },
  {
    id: '2',
    name: 'Dragon Roll Premium',
    description: 'Shrimp tempura, eel, avocado, topped with spicy tuna and unagi sauce.',
    price: 22.50,
    category: Category.SUSHI,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800',
    calories: 420,
    isSpicy: true
  },
  {
    id: '3',
    name: 'Quinoa Power Bowl',
    description: 'Roasted sweet potato, avocado, kale, chickpeas, and lemon-tahini dressing.',
    price: 14.50,
    category: Category.SALAD,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    calories: 380,
    isVegetarian: true
  },
  {
    id: '4',
    name: 'Artisan Margherita',
    description: 'San Marzano tomatoes, fresh buffalo mozzarella, basil, and extra virgin olive oil.',
    price: 16.00,
    category: Category.PIZZA,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&q=80&w=800',
    calories: 720,
    isVegetarian: true
  },
  {
    id: '5',
    name: 'Spicy Salmon Sashimi',
    description: 'Fresh Atlantic salmon with jalapeño and ponzu citrus sauce.',
    price: 19.00,
    category: Category.SUSHI,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&q=80&w=800',
    calories: 250,
    isSpicy: true
  },
  {
    id: '6',
    name: 'Double Bacon King',
    description: 'Double beef patty, crispy bacon, American cheese, and classic condiments.',
    price: 15.50,
    category: Category.BURGER,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=800',
    calories: 1100
  },
  {
    id: '7',
    name: 'Garden Harvest Pizza',
    description: 'Bell peppers, red onions, mushrooms, olives, and spinach on a whole-wheat crust.',
    price: 17.50,
    category: Category.PIZZA,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
    calories: 680,
    isVegetarian: true
  },
  {
    id: '8',
    name: 'Molten Lava Cake',
    description: 'Rich dark chocolate cake with a gooey warm center, served with vanilla bean gelato.',
    price: 9.99,
    category: Category.DESSERT,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=800',
    calories: 550,
    isVegetarian: true
  },
  {
    id: '9',
    name: 'Iced Matcha Latte',
    description: 'Premium ceremonial grade matcha whisked with oat milk and honey.',
    price: 5.50,
    category: Category.DRINK,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80&w=800',
    calories: 120,
    isVegetarian: true
  }
];
