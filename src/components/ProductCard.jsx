import React, { useState } from 'react';
import { useShopify } from '../context/ShopifyContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useShopify();
  const [isAdding, setIsAdding] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);

  const handleAddToCart = async () => {
    if (!product.variants || product.variants.length === 0) {
      console.error('No variants available for product:', product);
      alert('This product is not available for purchase');
      return;
    }

    setIsAdding(true);
    setAddSuccess(false);

    try {
      console.log('Adding product to cart:', {
        productId: product.id,
        variantId: product.variants[0].id,
        productTitle: product.title
      });

      await addToCart(product.variants[0].id, 1);
      
      setAddSuccess(true);
      setTimeout(() => setAddSuccess(false), 2000);
    } catch (error) {
      console.error('Failed to add product to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

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

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.images[0]?.src || '/placeholder.jpg'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-hope-aquablue mb-2">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-hope-aquablue">
            ${formatPrice(product.variants[0]?.price)}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={isAdding || !product.variants || product.variants.length === 0}
            className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
              addSuccess 
                ? 'bg-green-500 text-white' 
                : isAdding 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'bg-hope-aquablue text-white hover:bg-hope-aquablue/90'
            }`}
          >
            {isAdding ? 'Adding...' : addSuccess ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;