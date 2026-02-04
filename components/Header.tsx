
import React from 'react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, onSearch, searchQuery }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-orange-500 p-2 rounded-lg">
            <i className="fas fa-utensils text-white text-xl"></i>
          </div>
          <span className="text-xl font-bold text-gray-900 hidden sm:block">GourmetDash <span className="text-orange-500">AI</span></span>
        </div>

        <div className="flex-1 max-w-md mx-4">
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 group-focus-within:text-orange-500 transition-colors">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all sm:text-sm"
              placeholder="Cravings? Search menu..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-gray-600 hover:text-orange-500 transition-colors"
          >
            <i className="fas fa-shopping-bag text-xl"></i>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-orange-600 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <button className="hidden sm:block bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
