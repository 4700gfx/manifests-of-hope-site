import React, { useState } from 'react';
import { useShopify } from '../context/ShopifyContext';
import { ShoppingCart, Plus, Check, Star, Heart, Eye, Sparkles, Leaf } from 'lucide-react';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { addToCart } = useShopify();
  const [isAdding, setIsAdding] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

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
      setTimeout(() => setAddSuccess(false), 3000);
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

  // Generate random rating for demo purposes
  const rating = Math.floor(Math.random() * 2) + 4; // 4-5 stars
  const reviewCount = Math.floor(Math.random() * 200) + 50;

  if (viewMode === 'list') {
    return (
      <div 
        className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl hover:shadow-hope-aquablue/20 transition-all duration-700 transform hover:-translate-y-2 group overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col md:flex-row p-8 gap-8">
          {/* Image Section */}
          <div className="relative w-full md:w-80 h-80 flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-hope-aquablue/20 via-cyan-400/10 to-teal-500/20 rounded-2xl"></div>
            <div className="relative w-full h-full rounded-2xl overflow-hidden group-hover:scale-105 transition-transform duration-700">
              <img
                src={product.images[0]?.src || '/placeholder.jpg'}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
            </div>
            
            {/* Floating Action Buttons */}
            <div className={`absolute top-6 right-6 flex flex-col gap-3 transition-all duration-300 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className={`w-12 h-12 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 ${
                  isFavorited 
                    ? 'bg-red-500/80 text-white shadow-lg shadow-red-500/30' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
              <button className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300">
                <Eye className="w-5 h-5" />
              </button>
            </div>

            {/* Product Badge */}
            <div className="absolute top-6 left-6">
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                <Leaf className="w-4 h-4" />
                Natural
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              {/* Product Type */}
              <div className="text-hope-aquablue font-semibold text-sm uppercase tracking-wide mb-3">
                {product.productType || 'Wellness Product'}
              </div>

              {/* Title */}
              <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-hope-aquablue transition-colors duration-300">
                {product.title}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-300 text-sm">({reviewCount} reviews)</span>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-lg leading-relaxed mb-6 line-clamp-3">
                {product.description}
              </p>
            </div>

            {/* Bottom Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black bg-gradient-to-r from-hope-aquablue to-cyan-400 bg-clip-text text-transparent">
                  ${formatPrice(product.variants[0]?.price)}
                </span>
                <span className="text-gray-400 text-lg">USD</span>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAdding || !product.variants || product.variants.length === 0}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg ${
                  addSuccess
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-500/30 scale-105'
                    : isAdding
                    ? 'bg-gray-600 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-hope-aquablue to-cyan-500 text-white hover:shadow-xl hover:shadow-hope-aquablue/30 hover:scale-105 active:scale-95'
                }`}
              >
                {isAdding ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Adding...
                  </>
                ) : addSuccess ? (
                  <>
                    <Check className="w-6 h-6" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-6 h-6" />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View (Default)
  return (
    <div 
      className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl hover:shadow-hope-aquablue/30 transition-all duration-700 transform hover:-translate-y-4 hover:scale-105 group overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-hope-aquablue/20 to-cyan-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-teal-400/20 to-emerald-500/20 rounded-full blur-xl"></div>
      </div>

      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-hope-aquablue/10 via-transparent to-cyan-400/10"></div>
        <img
          src={product.images[0]?.src || '/placeholder.jpg'}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay with gradient */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
        
        {/* Floating Action Buttons */}
        <div className={`absolute top-6 right-6 flex flex-col gap-3 transition-all duration-500 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className={`w-12 h-12 rounded-full backdrop-blur-xl border border-white/30 flex items-center justify-center transition-all duration-300 shadow-lg ${
              isFavorited 
                ? 'bg-red-500/90 text-white shadow-red-500/40 scale-110' 
                : 'bg-white/20 text-white hover:bg-white/30 hover:scale-110'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
          <button className="w-12 h-12 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all duration-300 shadow-lg">
            <Eye className="w-5 h-5" />
          </button>
        </div>

        {/* Product Badge */}
        <div className="absolute top-6 left-6">
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Premium
          </div>
        </div>

        {/* Quick Add Button (appears on hover) */}
        <div className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <button
            onClick={handleAddToCart}
            disabled={isAdding || !product.variants || product.variants.length === 0}
            className="bg-white/90 backdrop-blur-sm text-hope-aquablue px-6 py-2 rounded-full font-bold text-sm hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Quick Add
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 relative z-10">
        {/* Product Type */}
        <div className="text-hope-aquablue font-semibold text-xs uppercase tracking-wider mb-3 opacity-80">
          {product.productType || 'Wellness Product'}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-hope-aquablue transition-colors duration-300 leading-tight">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
              />
            ))}
          </div>
          <span className="text-gray-400 text-xs">({reviewCount})</span>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-6 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-black bg-gradient-to-r from-hope-aquablue to-cyan-400 bg-clip-text text-transparent">
              ${formatPrice(product.variants[0]?.price)}
            </span>
            <span className="text-gray-500 text-xs">Free shipping</span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdding || !product.variants || product.variants.length === 0}
            className={`w-12 h-12 rounded-full font-bold transition-all duration-300 shadow-lg flex items-center justify-center ${
              addSuccess
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-500/40 scale-110'
                : isAdding
                ? 'bg-gray-600 text-white cursor-not-allowed'
                : 'bg-gradient-to-r from-hope-aquablue to-cyan-500 text-white hover:shadow-xl hover:shadow-hope-aquablue/40 hover:scale-110 active:scale-95'
            }`}
          >
            {isAdding ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : addSuccess ? (
              <Check className="w-6 h-6" />
            ) : (
              <ShoppingCart className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-hope-aquablue via-cyan-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

export default ProductCard;