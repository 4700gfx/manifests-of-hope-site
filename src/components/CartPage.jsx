import React from 'react';
import { useShopify } from '../context/ShopifyContext';

const CartPage = () => {
  const { cart, removeFromCart, updateCartItem } = useShopify();

  // Helper function to format price
  const formatPrice = (priceObj) => {
    if (typeof priceObj === 'string') {
      return priceObj;
    }
    if (priceObj && priceObj.amount) {
      return parseFloat(priceObj.amount).toFixed(2);
    }
    return '0.00';
  };

  if (!cart || cart.lineItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-hope-aquablue mb-4">Your cart is empty</h2>
          <p className="text-gray-600">Add some products to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-hope-aquablue text-center mb-12">
          Shopping Cart
        </h1>
        <div className="space-y-6">
          {cart.lineItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-6 shadow-lg flex items-center space-x-6">
              <img
                src={item.variant.image?.src || '/placeholder.jpg'}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-hope-aquablue">{item.title}</h3>
                <p className="text-gray-600">${formatPrice(item.variant.price)}</p>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateCartItem(item.id, parseInt(e.target.value))}
                  className="w-16 px-2 py-1 border rounded"
                  min="1"
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 bg-hope-aquablue/10 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-2xl font-bold">
              Total: ${formatPrice(cart.totalPrice)}
            </span>
          </div>
          <button
            onClick={() => window.open(cart.webUrl)}
            className="w-full bg-hope-aquablue text-white py-4 rounded-full font-bold text-lg hover:bg-hope-aquablue/90 transition-colors duration-300"
          >
            Checkout with Shopify
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartPage;