import React, { useEffect, useState, useMemo } from 'react';
import { useShopify } from '../context/ShopifyContext';
import ProductCard from './ProductCard';
import { Search, Filter, Grid, List, ChevronDown, ChevronUp, Leaf, Droplets, Heart, ChevronLeft, ChevronRight, X } from 'lucide-react';

const ShopPage = () => {
  const { products, fetchProducts, isLoading, error } = useShopify();

  // Instant filter state (as user types/selects)
  const [filters, setFilters] = useState({
    searchTerm: '',
    selectedCategory: 'all',
    sortBy: 'name',
    priceRange: { min: '', max: '' }
  });

  // Debounced filters
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const itemsPerPage = 12;

  const typesOfProducts = {
    "Tea": {
      description: "Our Teas are homemade and ready to brew to perfection.",
      icon: <Leaf className="w-8 h-8" />,
      color: "from-emerald-400 via-teal-500 to-green-600",
      bgColor: "bg-emerald-50",
      iconBg: "bg-gradient-to-br from-emerald-400 to-green-600"
    },
    "Body Butters and Oils": {
      description: "Made with a blend of oils and herbs to nourish your skin.",
      icon: <Droplets className="w-8 h-8" />,
      color: "from-blue-400 via-cyan-500 to-teal-600",
      bgColor: "bg-cyan-50",
      iconBg: "bg-gradient-to-br from-blue-400 to-cyan-600"
    },
    "Wellness Plans & More": {
      description: "Manifest of Hope wellness plans and tools for mind & body.",
      icon: <Heart className="w-8 h-8" />,
      color: "from-purple-400 via-pink-500 to-rose-600",
      bgColor: "bg-purple-50",
      iconBg: "bg-gradient-to-br from-purple-400 to-pink-600"
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Debounce all filters
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(handler);
  }, [filters]);

  // Categories from products
  const categories = useMemo(() => {
    if (!products) return [];
    const cats = products.reduce((acc, product) => {
      if (product.productType && !acc.includes(product.productType)) {
        acc.push(product.productType);
      }
      return acc;
    }, []);
    return cats;
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    const { searchTerm, selectedCategory, sortBy, priceRange } = debouncedFilters;

    let filtered = products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || product.productType === selectedCategory;

      const price = parseFloat(product.variants?.[0]?.price || 0);
      const matchesPrice = (!priceRange.min || price >= parseFloat(priceRange.min)) &&
        (!priceRange.max || price <= parseFloat(priceRange.max));

      return matchesSearch && matchesCategory && matchesPrice;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'price-low':
          return parseFloat(a.variants?.[0]?.price || 0) - parseFloat(b.variants?.[0]?.price || 0);
        case 'price-high':
          return parseFloat(b.variants?.[0]?.price || 0) - parseFloat(a.variants?.[0]?.price || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, debouncedFilters]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      selectedCategory: 'all',
      sortBy: 'name',
      priceRange: { min: '', max: '' }
    });
  };

  const hasActiveFilters = filters.searchTerm || filters.selectedCategory !== 'all' || 
    filters.priceRange.min || filters.priceRange.max || filters.sortBy !== 'name';

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-hope-bg via-slate-900 to-hope-bg">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-hope-aquablue/20 border-t-hope-aquablue mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-hope-aquablue/20 to-transparent animate-pulse"></div>
          </div>
          <div className="text-2xl text-white font-medium bg-gradient-to-r from-hope-aquablue to-cyan-400 bg-clip-text text-transparent">
            Loading wellness products...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900/20 to-rose-900/20 backdrop-blur-sm">
        <div className="text-center p-8 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20">
          <div className="text-3xl text-red-400 mb-6 font-bold">Oops! Something went wrong</div>
          <div className="text-gray-200 mb-6">{error}</div>
          <button 
            onClick={() => fetchProducts()} 
            className="px-6 py-3 bg-gradient-to-r from-hope-aquablue to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hope-bg text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-transparent to-slate-800/30"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-hope-aquablue/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
      
      <section className="relative px-4 sm:px-6 lg:px-8 py-20">
        <div className="container mx-auto">

          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-hope-aquablue via-cyan-400 to-teal-400 bg-clip-text text-transparent mb-8">
              Wellness Collection
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Discover handcrafted wellness products designed to nurture your mind, body, and spirit with nature's finest ingredients.
            </p>
          </div>

          {/* Product Types Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {Object.entries(typesOfProducts).map(([type, info]) => (
              <div key={type} className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl hover:shadow-hope-aquablue/20 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105">
                <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-5 group-hover:opacity-15 transition-all duration-500`}></div>
                <div className="relative p-8">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl ${info.iconBg} text-white mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110`}>
                    {info.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-hope-aquablue transition-colors duration-300">{type}</h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">{info.description}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-hope-aquablue to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-8">

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="w-full flex items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <Filter className="w-5 h-5 text-hope-aquablue" />
                  <span className="font-semibold">Filters & Search</span>
                  {hasActiveFilters && (
                    <span className="bg-hope-aquablue text-white text-xs px-2 py-1 rounded-full">Active</span>
                  )}
                </div>
                {isFiltersOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>

            {/* Filters Sidebar */}
            <div className={`w-full lg:w-80 flex-shrink-0 transition-all duration-300 ${isFiltersOpen || window.innerWidth >= 1024 ? 'block' : 'hidden'} lg:block`}>
              <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8 sticky top-8 text-white">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-hope-aquablue to-cyan-500 rounded-xl flex items-center justify-center">
                      <Filter className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">Filters</h3>
                  </div>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-2 px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg text-sm transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                      Clear
                    </button>
                  )}
                </div>

                {/* Search */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold mb-3 text-hope-aquablue">Search Products</label>
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-hope-aquablue transition-colors" />
                    <input
                      type="text"
                      placeholder="Search wellness products..."
                      value={filters.searchTerm}
                      onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-hope-aquablue/50 focus:border-hope-aquablue/50 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold mb-3 text-hope-aquablue">Category</label>
                  <div className="relative">
                    <select
                      value={filters.selectedCategory}
                      onChange={(e) => setFilters(prev => ({ ...prev, selectedCategory: e.target.value }))}
                      className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white appearance-none cursor-pointer focus:ring-2 focus:ring-hope-aquablue/50 transition-all duration-200"
                    >
                      <option value="all" className="bg-slate-800">All Categories</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat} className="bg-slate-800">{cat}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  </div>
                </div>

                {/* Sort By */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold mb-3 text-hope-aquablue">Sort By</label>
                  <div className="relative">
                    <select
                      value={filters.sortBy}
                      onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                      className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white appearance-none cursor-pointer focus:ring-2 focus:ring-hope-aquablue/50 transition-all duration-200"
                    >
                      <option value="name" className="bg-slate-800">Name (A-Z)</option>
                      <option value="price-low" className="bg-slate-800">Price (Low to High)</option>
                      <option value="price-high" className="bg-slate-800">Price (High to Low)</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold mb-3 text-hope-aquablue">Price Range</label>
                  <div className="space-y-3">
                    <input
                      type="number"
                      placeholder="Min Price ($)"
                      value={filters.priceRange.min}
                      onChange={(e) => setFilters(prev => ({ ...prev, priceRange: { ...prev.priceRange, min: e.target.value } }))}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-hope-aquablue/50 transition-all duration-200"
                    />
                    <input
                      type="number"
                      placeholder="Max Price ($)"
                      value={filters.priceRange.max}
                      onChange={(e) => setFilters(prev => ({ ...prev, priceRange: { ...prev.priceRange, max: e.target.value } }))}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-hope-aquablue/50 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Top Bar */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="flex flex-col sm:flex-row items-center gap-4 text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-hope-aquablue rounded-full animate-pulse"></span>
                      <p className="font-medium">
                        Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
                      </p>
                    </div>
                    <span className="hidden sm:block text-gray-500">•</span>
                    <p className="text-sm bg-gradient-to-r from-hope-aquablue to-cyan-400 bg-clip-text text-transparent font-semibold">
                      Page {currentPage} of {totalPages}
                    </p>
                  </div>
                  
                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 rounded-xl transition-all duration-200 ${
                        viewMode === 'grid' 
                          ? 'bg-gradient-to-r from-hope-aquablue to-cyan-500 text-white shadow-lg shadow-hope-aquablue/25' 
                          : 'hover:bg-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 rounded-xl transition-all duration-200 ${
                        viewMode === 'list' 
                          ? 'bg-gradient-to-r from-hope-aquablue to-cyan-500 text-white shadow-lg shadow-hope-aquablue/25' 
                          : 'hover:bg-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className={`${viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8' 
                : 'flex flex-col gap-6'
              } mb-8`}>
                {paginatedProducts.length > 0 ? (
                  paginatedProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ProductCard product={product} viewMode={viewMode} />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-24">
                    <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-16 max-w-md mx-auto">
                      <div className="text-6xl mb-6 opacity-50">🔍</div>
                      <h3 className="text-3xl font-bold text-white mb-4">No products found</h3>
                      <p className="text-gray-400 mb-8 leading-relaxed">Try adjusting your search terms or filters to discover more wellness products.</p>
                      {hasActiveFilters && (
                        <button
                          onClick={clearFilters}
                          className="px-6 py-3 bg-gradient-to-r from-hope-aquablue to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-hope-aquablue/25 transition-all transform hover:scale-105"
                        >
                          Clear All Filters
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl p-8">
                  <div className="flex justify-center items-center space-x-3">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-white font-medium"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Previous
                    </button>
                    
                    {/* Page Numbers */}
                    <div className="flex space-x-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-12 h-12 rounded-xl font-semibold transition-all duration-200 ${
                            currentPage === page
                              ? 'bg-gradient-to-r from-hope-aquablue to-cyan-500 text-white shadow-lg shadow-hope-aquablue/25 transform scale-110'
                              : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white hover:scale-105'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-white font-medium"
                    >
                      Next
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ShopPage;