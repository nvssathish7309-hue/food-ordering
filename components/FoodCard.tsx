
import React from 'react';
import { FoodItem } from '../types';

interface FoodCardProps {
  item: FoodItem;
  onAddToCart: (item: FoodItem) => void;
  highlight?: string;
}

const FoodCard: React.FC<FoodCardProps> = ({ item, onAddToCart, highlight }) => {
  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group ${highlight ? 'ring-2 ring-orange-500 ring-offset-2' : ''}`}>
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {item.isSpicy && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">
              <i className="fas fa-fire mr-1"></i> Spicy
            </span>
          )}
          {item.isVegetarian && (
            <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">
              <i className="fas fa-leaf mr-1"></i> Veg
            </span>
          )}
        </div>
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold text-gray-800 flex items-center shadow-sm">
          <i className="fas fa-star text-yellow-400 mr-1"></i> {item.rating}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-orange-600 transition-colors">
            {item.name}
          </h3>
          <span className="font-bold text-orange-600 whitespace-nowrap">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
          {item.description}
        </p>
        
        {highlight && (
          <div className="mb-4 p-2 bg-orange-50 rounded-lg text-xs italic text-orange-700 border border-orange-100">
            <i className="fas fa-sparkles mr-1"></i> {highlight}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs text-gray-400 font-medium">
            <i className="far fa-clock mr-1"></i> 20-30 min • {item.calories} kcal
          </span>
          <button 
            onClick={() => onAddToCart(item)}
            className="bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white p-2.5 rounded-xl transition-all duration-300 transform active:scale-95"
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
