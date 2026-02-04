
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import FoodCard from './components/FoodCard';
import CartDrawer from './components/CartDrawer';
import AIAssistant from './components/AIAssistant';
import { FoodItem, CartItem, Category, AIRecommendation } from './types';
import { MENU_ITEMS } from './constants';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [aiRecs, setAiRecs] = useState<AIRecommendation[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Filter Logic
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesCategory = activeCategory === Category.ALL || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Cart Logic
  const addToCart = (item: FoodItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    // Visual feedback could go here
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Recommendations mapping
  const recommendationMap = useMemo(() => {
    const map = new Map<string, string>();
    aiRecs.forEach(rec => map.set(rec.id, rec.reason));
    return map;
  }, [aiRecs]);

  // Sort: show recommended items first if any
  const displayItems = useMemo(() => {
    const recIds = aiRecs.map(r => r.id);
    const recItems = filteredItems.filter(item => recIds.includes(item.id));
    const nonRecItems = filteredItems.filter(item => !recIds.includes(item.id));
    return [...recItems, ...nonRecItems];
  }, [filteredItems, aiRecs]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-12 bg-gray-900 aspect-[16/6] md:aspect-[21/7]">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200" 
            alt="Hero Banner" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white max-w-lg leading-tight mb-4">
              Crave it. <br/>
              <span className="text-orange-500">Search it.</span> <br/>
              Eat it.
            </h1>
            <p className="text-gray-200 md:text-xl max-w-md hidden sm:block">
              Premium flavors delivered to your doorstep. Powered by intelligent culinary insights.
            </p>
          </div>
        </div>

        {/* AI Results Banner */}
        {aiRecs.length > 0 && (
          <div className="mb-8 p-6 bg-orange-600 rounded-2xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between animate-in fade-in slide-in-from-top-4">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-white/20 p-3 rounded-full mr-4">
                <i className="fas fa-sparkles text-2xl"></i>
              </div>
              <div>
                <h2 className="text-xl font-bold">Personalized Recommendations</h2>
                <p className="text-orange-100 opacity-90">Our AI curated these specifically based on your mood.</p>
              </div>
            </div>
            <button 
              onClick={() => setAiRecs([])}
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-sm font-semibold transition-colors border border-white/20"
            >
              Clear AI Results
            </button>
          </div>
        )}

        {/* Category Filters */}
        <div className="mb-10 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex space-x-3 min-w-max">
            {Object.values(Category).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 text-sm border ${
                  activeCategory === cat 
                    ? 'bg-orange-600 text-white border-orange-600 shadow-md transform scale-105' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-orange-200 hover:text-orange-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {displayItems.length > 0 ? (
            displayItems.map((item) => (
              <FoodCard 
                key={item.id} 
                item={item} 
                onAddToCart={addToCart}
                highlight={recommendationMap.get(item.id)}
              />
            ))
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
              <div className="bg-gray-100 p-8 rounded-full mb-6">
                <i className="fas fa-search-minus text-gray-300 text-6xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No matching dishes</h3>
              <p className="text-gray-500 max-w-sm">We couldn't find any items matching your current filters. Try searching for something else!</p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-orange-500 p-2 rounded-lg">
                <i className="fas fa-utensils text-white text-xl"></i>
              </div>
              <span className="text-xl font-bold text-gray-900">GourmetDash <span className="text-orange-500">AI</span></span>
            </div>
            <p className="text-gray-500 max-w-sm">
              The next generation of food ordering. Using advanced AI to match your cravings with the perfect dish.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-orange-500 hover:text-white transition-all"><i className="fab fa-instagram"></i></a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-orange-500 hover:text-white transition-all"><i className="fab fa-twitter"></i></a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-orange-500 hover:text-white transition-all"><i className="fab fa-facebook-f"></i></a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-8 mt-8 border-t border-gray-100 text-center text-gray-400 text-xs">
          © 2024 GourmetDash AI. All rights reserved.
        </div>
      </footer>

      {/* Overlays */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />

      <AIAssistant 
        menu={MENU_ITEMS} 
        onRecommendationsFound={setAiRecs}
        isLoading={isAiLoading}
        setIsLoading={setIsAiLoading}
      />

      {/* AI Loading State Overlay */}
      {isAiLoading && (
        <div className="fixed inset-0 z-[100] bg-white/60 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300">
          <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 flex flex-col items-center">
            <div className="relative mb-6">
              <div className="w-16 h-16 border-4 border-orange-100 border-t-orange-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fas fa-magic text-orange-600 text-xl"></i>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">AI Concierge at Work</h3>
            <p className="text-gray-500 text-sm">Crafting the perfect menu just for you...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
