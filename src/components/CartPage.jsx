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

  // Debug logging
  console.log('Cart Debug Info:', {
    cart: cart,
    lineItems: cart?.lineItems,
    validLineItems: validLineItems,
    totalAmount: totalAmount,
    itemCount: itemCount
  });

  if (!cart || validLineItems.length === 0) {
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
        
        {/* Debug info - remove this in production */}
        <div className="mb-4 p-4 bg-gray-100 rounded text-sm">
          <p><strong>Debug Info:</strong></p>
          <p>Cart exists: {cart ? 'Yes' : 'No'}</p>
          <p>Total line items: {cart?.lineItems?.length || 0}</p>
          <p>Valid line items: {validLineItems.length}</p>
          <p>Calculated total: ${totalAmount.toFixed(2)}</p>
          <p>Total items: {itemCount}</p>
          <p>Shopify total: {JSON.stringify(cart?.totalPrice)}</p>
          
          {/* Show raw line items for debugging */}
          <details className="mt-2">
            <summary className="cursor-pointer">Raw line items data</summary>
            <pre className="mt-2 text-xs bg-white p-2 rounded overflow-auto max-h-40">
              {JSON.stringify(cart?.lineItems, null, 2)}
            </pre>
          </details>
        </div>

        <div className="space-y-6">
          {validLineItems.map((item) => {
            const itemPrice = getPriceValue(item.variant.price);
            const quantity = parseInt(item.quantity) || 0;
            const lineTotal = itemPrice * quantity;
            
            return (
              <div key={item.id} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-6">
                  <img
                    src={item.variant.image?.src || item.variant.image?.url || '/placeholder.jpg'}
                    alt={item.title || 'Product'}
                    className="w-24 h-24 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = '/placeholder.jpg';
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-hope-aquablue">
                      {item.title || 'Unknown Product'}
                    </h3>
                    <p className="text-gray-600">
                      ${formatPrice(itemPrice)} each
                      {item.variant.title && item.variant.title !== 'Default Title' && (
                        <span className="text-sm text-gray-500 ml-2">({item.variant.title})</span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <label className="text-sm text-gray-600">Qty:</label>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value);
                          if (newQuantity > 0) {
                            updateCartItem(item.id, newQuantity);
                          }
                        }}
                        className="w-16 px-2 py-1 border rounded text-center"
                        min="1"
                      />
                    </div>
                    <div className="text-right min-w-[80px]">
                      <p className="font-semibold">${lineTotal.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-hope-aquablue/10 rounded-xl p-6">
          <div className="space-y-4">
            {/* Subtotal breakdown */}
            <div className="flex justify-between items-center text-lg">
              <span>Subtotal ({itemCount} items):</span>
              <span className="font-semibold">${totalAmount.toFixed(2)}</span>
            </div>
            
            {/* Taxes and shipping info */}
            <div className="text-sm text-gray-600 border-t pt-4">
              <p>• Taxes and shipping calculated at checkout</p>
              <p>• Secure checkout powered by Shopify</p>
            </div>
            
            {/* Total */}
            <div className="flex justify-between items-center text-2xl font-bold border-t pt-4">
              <span>Total:</span>
              <span className="text-hope-aquablue">${totalAmount.toFixed(2)}</span>
            </div>
          </div>
          
          <button
            onClick={() => {
              if (cart && cart.webUrl) {
                window.open(cart.webUrl, '_blank');
              } else {
                console.error('No checkout URL available');
                alert('Checkout URL not available. Please try refreshing the page.');
              }
            }}
            className="w-full bg-hope-aquablue text-white py-4 rounded-full font-bold text-lg hover:bg-hope-aquablue/90 transition-colors duration-300 mt-6"
          >
            Checkout with Shopify
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartPage;