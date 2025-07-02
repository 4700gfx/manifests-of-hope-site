import React from 'react';
import { useShopify } from '../context/ShopifyContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useShopify();

  const handleAddToCart = () => {
    if (product.variants && product.variants.length > 0) {
      addToCart(product.variants[0].id);
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
            className="bg-hope-aquablue text-white px-6 py-2 rounded-full font-semibold hover:bg-hope-aquablue/90 transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;