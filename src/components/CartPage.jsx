import React from 'react';
import { useShopify } from '../context/ShopifyContext';

const CartPage = () => {
  const { cart, removeFromCart, updateCartItem } = useShopify();

  // Helper function to safely get numeric value from price
  const getPriceValue = (priceObj) => {
    if (!priceObj) return 0;
    
    if (typeof priceObj === 'string') {
      const num = parseFloat(priceObj);
      return isNaN(num) ? 0 : num;
    }
    
    if (typeof priceObj === 'number') {
      return priceObj;
    }
    
    if (priceObj && priceObj.amount) {
      const num = parseFloat(priceObj.amount);
      return isNaN(num) ? 0 : num;
    }
    
    return 0;
  };

  // Format price for display
  const formatPrice = (priceObj) => {
    const value = getPriceValue(priceObj);
    return value.toFixed(2);
  };

  // Filter out invalid line items and calculate total
  const getValidLineItems = () => {
    if (!cart || !cart.lineItems || !Array.isArray(cart.lineItems)) {
      return [];
    }

    return cart.lineItems.filter(item => {
      // Filter out items that are missing essential data
      return item && 
             item.id && 
             item.title && 
             item.variant && 
             item.quantity > 0 &&
             getPriceValue(item.variant.price) > 0;
    });
  };

  const validLineItems = getValidLineItems();

  // Calculate total from valid items
  const calculateTotal = () => {
    return validLineItems.reduce((total, item) => {
      const itemPrice = getPriceValue(item.variant.price);
      const quantity = parseInt(item.quantity) || 0;
      return total + (itemPrice * quantity);
    }, 0);
  };

  const totalAmount = calculateTotal();
  const itemCount = validLineItems.reduce((count, item) => count + parseInt(item.quantity), 0);

  if (!cart || validLineItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-hope-aquablue/10 to-hope-aquablue/20 flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-2xl shadow-xl max-w-md mx-4">
          <div className="w-24 h-24 bg-hope-aquablue/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-hope-aquablue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Discover amazing products and add them to your cart!</p>
          <button className="bg-hope-aquablue text-white px-6 py-3 rounded-full font-semibold hover:bg-hope-aquablue/90 transition-colors duration-300">
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-hope-aquablue/10 to-hope-aquablue/20">
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="container mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-italic text-white mb-4">
              Shopping Cart
            </h1>
            <div className="flex items-center justify-center space-x-2 text-hope-aquablue">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
              </svg>
              <span className="text-lg font-semibold">{itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items Column */}
            <div className="lg:col-span-2 space-y-6">
              {validLineItems.map((item) => {
                const itemPrice = getPriceValue(item.variant.price);
                const quantity = parseInt(item.quantity) || 0;
                const lineTotal = itemPrice * quantity;
                
                return (
                  <div key={item.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="relative group">
                          <img
                            src={item.variant.image?.src || item.variant.image?.url || '/placeholder.jpg'}
                            alt={item.title || 'Product'}
                            className="w-28 h-28 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300"
                            onError={(e) => {
                              e.target.src = '/placeholder.jpg';
                            }}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 rounded-xl transition-colors duration-300"></div>
                        </div>
                      </div>

                                              {/* Quantity Badge */}
                        <div className="absolute -top-2 -right-2 bg-hope-aquablue text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                          {quantity}
                        </div>

                        {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
                          {item.title || 'Unknown Product'}
                        </h3>
                        
                        {/* Variant Information */}
                        <div className="space-y-1 mb-3">
                          {item.variant.title && item.variant.title !== 'Default Title' && (
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-gray-500">Variant:</span>
                              <span className="text-sm bg-gray-100 px-2 py-1 rounded-full text-gray-700">
                                {item.variant.title}
                              </span>
                            </div>
                          )}
                          
                          {item.variant.sku && (
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-gray-500">SKU:</span>
                              <span className="text-sm text-gray-600 font-mono">{item.variant.sku}</span>
                            </div>
                          )}
                          
                          {item.variant.weight && (
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-gray-500">Weight:</span>
                              <span className="text-sm text-gray-600">{item.variant.weight} {item.variant.weightUnit || 'g'}</span>
                            </div>
                          )}
                        </div>

                        {/* Price per item with quantity indicator */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-hope-aquablue">${formatPrice(itemPrice)}</span>
                            <span className="text-sm text-gray-500">each</span>
                          </div>
                          <div className="flex items-center space-x-2 bg-hope-aquablue/10 px-3 py-1 rounded-full">
                            <span className="text-sm font-medium text-hope-aquablue">Qty: {quantity}</span>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <label className="text-sm font-medium text-gray-600">Quantity:</label>
                            <div className="flex items-center bg-gray-50 rounded-lg">
                              <button
                                onClick={() => {
                                  if (quantity > 1) {
                                    updateCartItem(item.id, quantity - 1);
                                  }
                                }}
                                className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors duration-200"
                                disabled={quantity <= 1}
                              >
                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                              <input
                                type="number"
                                value={quantity}
                                onChange={(e) => {
                                  const newQuantity = parseInt(e.target.value);
                                  if (newQuantity > 0) {
                                    updateCartItem(item.id, newQuantity);
                                  }
                                }}
                                className="w-16 px-2 py-2 text-center bg-transparent border-none focus:outline-none font-semibold"
                                min="1"
                              />
                              <button
                                onClick={() => updateCartItem(item.id, quantity + 1)}
                                className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors duration-200"
                              >
                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                              </button>
                            </div>
                          </div>

                          {/* Line Total */}
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-800">${lineTotal.toFixed(2)}</p>
                            <p className="text-sm text-gray-500">Total for {quantity} {quantity === 1 ? 'item' : 'items'}</p>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <div className="flex-shrink-0">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors duration-200 group"
                          title="Remove item"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary Column */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {/* Item Count */}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Items ({itemCount}):</span>
                    <span className="font-semibold">${totalAmount.toFixed(2)}</span>
                  </div>
                  
                  {/* Estimated Shipping */}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Estimated Shipping:</span>
                    <span className="text-gray-500">Calculated at checkout</span>
                  </div>
                  
                  {/* Estimated Tax */}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Estimated Tax:</span>
                    <span className="text-gray-500">Calculated at checkout</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-6"></div>
                
                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-bold text-gray-800">Total:</span>
                  <span className="text-2xl font-bold text-hope-aquablue">${totalAmount.toFixed(2)}</span>
                </div>

                {/* Security Info */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-sm text-green-800 font-medium">Secure checkout powered by Shopify</span>
                  </div>
                </div>
                
                {/* Checkout Button */}
                <button
                  onClick={() => {
                    if (cart && cart.webUrl) {
                      window.open(cart.webUrl, '_blank');
                    } else {
                      console.error('No checkout URL available');
                      alert('Checkout URL not available. Please try refreshing the page.');
                    }
                  }}
                  className="w-full bg-gradient-to-r from-hope-aquablue to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-hope-aquablue/90 hover:to-blue-600/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Proceed to Checkout
                </button>

                {/* Additional Info */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    Free shipping on orders over $50
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    30-day return policy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartPage;