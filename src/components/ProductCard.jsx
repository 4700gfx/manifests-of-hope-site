import React, { useState, useCallback, memo } from 'react';
import { ShoppingCart, Plus, Check, Star, Heart, ChevronLeft, ChevronRight, Eye, X } from 'lucide-react';

const ProductCard = memo(({ product, viewMode = 'grid' }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);

  const handleAddToCart = useCallback(async () => {
    if (!product.variants?.length) {
      console.error('No variants available');
      return;
    }

    setIsAdding(true);
    setAddSuccess(false);

    try {
      // Simulated add to cart - replace with your actual context call
      await new Promise(resolve => setTimeout(resolve, 800));
      setAddSuccess(true);
      setTimeout(() => setAddSuccess(false), 2500);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAdding(false);
    }
  }, [product.variants]);

  const formatPrice = useCallback((priceObj) => {
    if (typeof priceObj === 'string') return priceObj;
    if (priceObj?.amount) return parseFloat(priceObj.amount).toFixed(2);
    return '0.00';
  }, []);

  const rating = 4;
  const reviewCount = Math.floor(Math.random() * 200) + 50;

  const navigateImage = useCallback((direction) => (e) => {
    e?.stopPropagation();
    if (!product.images?.length) return;
    
    setCurrentImageIndex(prev => {
      if (direction === 'next') {
        return prev === product.images.length - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? product.images.length - 1 : prev - 1;
    });
  }, [product.images]);

  const getCurrentImage = () => {
    return product.images?.[currentImageIndex]?.src || '/placeholder.jpg';
  };

  const hasMultipleImages = product.images?.length > 1;
  const price = formatPrice(product.variants?.[0]?.price);

  // Full Screen Image Modal
  const ImageModal = () => (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-[fadeIn_0.3s_ease-out]"
      onClick={() => setShowImageModal(false)}
      style={{ animation: 'fadeIn 0.3s ease-out' }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
      {/* Close button */}
      <button 
        onClick={() => setShowImageModal(false)}
        className="absolute top-6 right-6 z-10 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:rotate-90 border border-white/20"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Image container */}
      <div 
        className="relative max-w-6xl w-full max-h-[85vh] animate-[scaleIn_0.4s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main image */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20">
          <img 
            src={getCurrentImage()}
            alt={product.title}
            className="w-full h-full object-contain max-h-[85vh]"
          />
          
          {/* Navigation for multiple images */}
          {hasMultipleImages && (
            <>
              <button 
                onClick={navigateImage('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/70 hover:bg-black/90 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 border border-white/20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={navigateImage('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/70 hover:bg-black/90 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 border border-white/20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {hasMultipleImages && (
          <div className="flex gap-3 mt-6 justify-center overflow-x-auto pb-2 animate-[slideUp_0.5s_ease-out]">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-110 ${
                  idx === currentImageIndex 
                    ? 'border-hope-aquablue shadow-lg shadow-hope-aquablue/50' 
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                <img 
                  src={img.src}
                  alt={`${product.title} ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                {idx === currentImageIndex && (
                  <div className="absolute inset-0 bg-hope-aquablue/20" />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Product info bar */}
        <div className="mt-4 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 animate-[slideUp_0.6s_ease-out]">
          <h3 className="text-white font-bold text-xl mb-1">{product.title}</h3>
          <p className="text-gray-400 text-sm">{product.productType || 'Wellness Product'}</p>
        </div>
      </div>
    </div>
  );

  // ListView Component
  if (viewMode === 'list') {
    return (
      <>
        <article 
          className="group relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-3xl rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden transition-all duration-700 ease-out hover:shadow-hope-aquablue/30 hover:shadow-2xl hover:border-white/20 hover:-translate-y-1"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-hope-aquablue/0 via-cyan-500/0 to-teal-400/0 group-hover:from-hope-aquablue/5 group-hover:via-cyan-500/5 group-hover:to-teal-400/5 transition-all duration-1000 ease-out" />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-hope-aquablue/0 to-cyan-400/0 group-hover:from-hope-aquablue/20 group-hover:to-cyan-400/10 rounded-full blur-3xl transition-all duration-1000 ease-out" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-400/0 to-emerald-500/0 group-hover:from-teal-400/10 group-hover:to-emerald-500/10 rounded-full blur-3xl transition-all duration-1000 ease-out" />
          
          <div className="relative flex flex-col md:flex-row gap-6 p-6 lg:p-8">
            {/* Image Container */}
            <div className="relative w-full md:w-72 lg:w-80 h-72 lg:h-80 flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-hope-aquablue/20 to-cyan-400/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out scale-95 group-hover:scale-100" />
              
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-500 ease-out shadow-xl group-hover:shadow-2xl">
                <img
                  src={getCurrentImage()}
                  alt={product.title}
                  className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
                
                {/* Image navigation */}
                {hasMultipleImages && (
                  <>
                    <button 
                      onClick={navigateImage('prev')}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-xl hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 hover:scale-110 border border-white/20"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={navigateImage('next')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-xl hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 hover:scale-110 border border-white/20"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    
                    {/* Image indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {product.images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                            idx === currentImageIndex 
                              ? 'bg-white w-10 shadow-lg shadow-white/50' 
                              : 'bg-white/30 w-1.5 hover:bg-white/50 hover:w-6'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
                
                {/* Action buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-3 transition-all duration-500 ease-out">
                  <button
                    onClick={() => setIsFavorited(!isFavorited)}
                    className={`w-11 h-11 rounded-full backdrop-blur-xl border transition-all duration-500 ease-out flex items-center justify-center shadow-lg ${
                      isFavorited 
                        ? 'bg-red-500/90 border-red-400/50 text-white shadow-red-500/50 scale-110 rotate-12' 
                        : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-110 hover:rotate-12 opacity-0 group-hover:opacity-100'
                    }`}
                    aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart className={`w-5 h-5 transition-all duration-500 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={() => setShowImageModal(true)}
                    className="w-11 h-11 rounded-full backdrop-blur-xl border border-white/20 bg-white/10 text-white hover:bg-white/20 hover:scale-110 flex items-center justify-center transition-all duration-500 ease-out shadow-lg opacity-0 group-hover:opacity-100"
                    aria-label="View full image"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between min-w-0">
              <div className="space-y-4">
                {/* Category badge */}
                <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-hope-aquablue/20 to-cyan-500/20 border border-hope-aquablue/30 rounded-full text-hope-aquablue font-semibold text-xs uppercase tracking-wider shadow-lg shadow-hope-aquablue/10 transition-all duration-500 group-hover:shadow-hope-aquablue/30 group-hover:scale-105">
                  {product.productType || 'Wellness Product'}
                </span>

                {/* Title */}
                <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight transition-all duration-500 ease-out group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-hope-aquablue group-hover:via-cyan-400 group-hover:to-teal-400 group-hover:bg-clip-text">
                  {product.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 transition-all duration-300 ${
                          i < rating ? 'text-yellow-400 fill-yellow-400 scale-100' : 'text-gray-600 scale-90'
                        }`}
                        style={{ transitionDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm font-medium">({reviewCount} reviews)</span>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-base leading-relaxed line-clamp-2 lg:line-clamp-3 transition-colors duration-500 group-hover:text-gray-200">
                  {product.description}
                </p>
              </div>

              {/* Price and CTA */}
              <div className="flex items-center justify-between gap-4 flex-wrap mt-6 pt-6 border-t border-white/10 group-hover:border-white/20 transition-colors duration-500">
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-hope-aquablue via-cyan-400 to-teal-400 bg-clip-text text-transparent transition-all duration-500 group-hover:scale-105">
                      ${price}
                    </span>
                    <span className="text-gray-500 text-sm font-medium">USD</span>
                  </div>
                  <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                    Free shipping
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isAdding || !product.variants?.length}
                  className={`group/btn relative flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base transition-all duration-500 ease-out shadow-lg overflow-hidden ${
                    addSuccess
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-500/50 scale-105'
                      : isAdding
                      ? 'bg-gray-700 text-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-hope-aquablue via-cyan-500 to-teal-500 text-white hover:shadow-2xl hover:shadow-hope-aquablue/50 hover:scale-105 active:scale-95'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 opacity-0 transition-opacity duration-500 ease-out ${!isAdding && !addSuccess ? 'group-hover/btn:opacity-100' : ''}`} />
                  <span className="relative z-10 flex items-center gap-3">
                    {isAdding ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Adding...
                      </>
                    ) : addSuccess ? (
                      <>
                        <Check className="w-6 h-6 animate-[scaleIn_0.5s_ease-out]" />
                        Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5 transition-transform duration-500 group-hover/btn:scale-110 group-hover/btn:rotate-12" />
                        Add to Cart
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </article>
        {showImageModal && <ImageModal />}
      </>
    );
  }

  // Grid View
  return (
    <>
      <article 
        className="group relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-3xl rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden transition-all duration-700 ease-out hover:shadow-hope-aquablue/40 hover:shadow-2xl hover:border-white/20 hover:-translate-y-3 hover:scale-[1.03]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-out">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-hope-aquablue/30 to-cyan-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-gradient-to-br from-teal-400/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Image Section */}
        <div className="relative aspect-square overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-hope-aquablue/10 via-transparent to-cyan-400/10 z-10 pointer-events-none transition-opacity duration-700 group-hover:opacity-50" />
          
          <img
            src={getCurrentImage()}
            alt={product.title}
            className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-125 group-hover:rotate-2"
            loading="lazy"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-all duration-700 ease-out" />
          
          {/* Image navigation */}
          {hasMultipleImages && (
            <>
              <button 
                onClick={navigateImage('prev')}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-xl hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-500 ease-out z-20 opacity-0 group-hover:opacity-100 hover:scale-110 border border-white/20"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={navigateImage('next')}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-xl hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-500 ease-out z-20 opacity-0 group-hover:opacity-100 hover:scale-110 border border-white/20"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {product.images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                      idx === currentImageIndex 
                        ? 'bg-white w-10 shadow-lg shadow-white/50' 
                        : 'bg-white/30 w-1.5 hover:bg-white/50 hover:w-6'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          
          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex flex-col gap-3 z-20">
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className={`w-12 h-12 rounded-full backdrop-blur-xl border transition-all duration-500 ease-out flex items-center justify-center shadow-lg ${
                isFavorited 
                  ? 'bg-red-500/90 border-red-400/50 text-white shadow-red-500/50 scale-110 rotate-12' 
                  : 'bg-white/10 border-white/30 text-white hover:bg-white/20 hover:scale-110 hover:rotate-12 opacity-0 group-hover:opacity-100'
              }`}
              aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`w-5 h-5 transition-all duration-500 ${isFavorited ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => setShowImageModal(true)}
              className="w-12 h-12 rounded-full backdrop-blur-xl border border-white/30 bg-white/10 text-white hover:bg-white/20 hover:scale-110 flex items-center justify-center transition-all duration-500 ease-out shadow-lg opacity-0 group-hover:opacity-100"
              aria-label="View full image"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding || !product.variants?.length}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-white/95 backdrop-blur-md text-slate-900 px-6 py-3 rounded-full font-bold text-sm hover:bg-white hover:scale-110 transition-all duration-500 ease-out shadow-xl flex items-center gap-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4"
          >
            <Plus className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180" />
            Quick Add
          </button>
        </div>

        {/* Content Section */}
        <div className="relative p-6 space-y-3 z-10">
          {/* Category */}
          <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-hope-aquablue/20 to-cyan-500/20 border border-hope-aquablue/30 rounded-full text-hope-aquablue font-semibold text-[10px] uppercase tracking-wider shadow-lg shadow-hope-aquablue/10 transition-all duration-500 group-hover:shadow-hope-aquablue/30 group-hover:scale-105">
            {product.productType || 'Wellness'}
          </span>

          {/* Title */}
          <h3 className="text-lg font-bold text-white leading-tight line-clamp-2 transition-all duration-500 ease-out group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-hope-aquablue group-hover:via-cyan-400 group-hover:to-teal-400 group-hover:bg-clip-text min-h-[3.5rem]">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 transition-all duration-300 ${
                    i < rating ? 'text-yellow-400 fill-yellow-400 scale-100' : 'text-gray-600 scale-90'
                  }`}
                  style={{ transitionDelay: `${i * 50}ms` }}
                />
              ))}
            </div>
            <span className="text-gray-400 text-xs font-medium transition-colors duration-500 group-hover:text-gray-300">({reviewCount})</span>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 min-h-[2.5rem] transition-colors duration-500 group-hover:text-gray-300">
            {product.description}
          </p>

          {/* Price and Cart Button */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-black bg-gradient-to-r from-hope-aquablue via-cyan-400 to-teal-400 bg-clip-text text-transparent leading-none transition-all duration-500 group-hover:scale-105">
                ${price}
              </span>
              <span className="text-emerald-400 text-[10px] font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                Free shipping
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isAdding || !product.variants?.length}
              className={`relative w-13 h-13 rounded-full font-bold transition-all duration-500 ease-out shadow-lg flex items-center justify-center overflow-hidden ${
                addSuccess
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-500/60 scale-110'
                  : isAdding
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-hope-aquablue to-cyan-500 text-white hover:shadow-2xl hover:shadow-hope-aquablue/60 hover:scale-110 hover:rotate-12 active:scale-95'
              }`}
              aria-label="Add to cart"
            >
              {isAdding ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : addSuccess ? (
                <Check className="w-5 h-5 animate-[scaleIn_0.5s_ease-out]" />
              ) : (
                <ShoppingCart className="w-5 h-5 transition-transform duration-500 group-hover:scale-110" />
              )}
            </button>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-hope-aquablue via-cyan-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out" />
      </article>
      {showImageModal && <ImageModal />}
    </>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;