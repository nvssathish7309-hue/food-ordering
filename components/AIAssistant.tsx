
import React, { useState } from 'react';
import { getFoodRecommendations } from '../services/geminiService';
import { FoodItem, AIRecommendation } from '../types';

interface AIAssistantProps {
  menu: FoodItem[];
  onRecommendationsFound: (recs: AIRecommendation[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ menu, onRecommendationsFound, isLoading, setIsLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    const results = await getFoodRecommendations(prompt, menu);
    onRecommendationsFound(results);
    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-orange-600 p-4 text-white">
            <h3 className="font-bold flex items-center">
              <i className="fas fa-sparkles mr-2"></i> Food Concierge
            </h3>
            <p className="text-xs text-orange-100 mt-1">Tell me what you're in the mood for!</p>
          </div>
          <form onSubmit={handleSubmit} className="p-4">
            <textarea
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none h-24"
              placeholder="e.g. 'I want something spicy with seafood' or 'Help me find a healthy vegetarian dinner'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="w-full mt-3 bg-gray-900 text-white py-2 rounded-xl font-bold text-sm hover:bg-gray-800 disabled:opacity-50 transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin mr-2"></i>
              ) : (
                <i className="fas fa-magic mr-2"></i>
              )}
              Find Options
            </button>
          </form>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-orange-600 text-white rounded-full shadow-lg hover:shadow-xl hover:bg-orange-700 transition-all duration-300 flex items-center justify-center transform active:scale-95 border-4 border-white"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-wand-magic-sparkles'} text-xl`}></i>
      </button>
    </div>
  );
};

export default AIAssistant;
