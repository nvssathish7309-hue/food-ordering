
import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = items.length > 0 ? 3.99 : 0;
  const total = subtotal + deliveryFee;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          <div className="px-6 py-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Your Basket</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500 p-2">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="bg-gray-100 p-8 rounded-full mb-4">
                  <i className="fas fa-shopping-basket text-gray-300 text-6xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Empty Basket</h3>
                <p className="text-gray-500">Your delicious choices will appear here!</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex space-x-4">
                  <img src={item.image} alt={item.name} className="h-20 w-20 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      <p className="font-bold text-orange-600">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center bg-gray-100 rounded-lg px-2 py-1">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="text-gray-500 hover:text-orange-600 px-2"
                        >
                          <i className="fas fa-minus text-xs"></i>
                        </button>
                        <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="text-gray-500 hover:text-orange-600 px-2"
                        >
                          <i className="fas fa-plus text-xs"></i>
                        </button>
                      </div>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-gray-400 hover:text-red-500 text-sm font-medium transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-gray-100 px-6 py-6 bg-gray-50">
              <div className="space-y-2 mb-6 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-900 text-lg font-bold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-orange-600">${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-orange-700 transform transition active:scale-95 shadow-lg shadow-orange-200">
                Go to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
