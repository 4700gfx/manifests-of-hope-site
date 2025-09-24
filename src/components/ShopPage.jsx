import React, { useEffect, useState, useMemo } from 'react';
import { useShopify } from '../context/ShopifyContext';
import ProductCard from './ProductCard';
import { Search, Filter, Grid, List, ChevronDown, ChevronUp, Leaf, Droplets, Heart, ChevronLeft, ChevronRight, X, Sparkles, Star } from 'lucide-react';

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
      description: "Handcrafted herbal blends designed to soothe your mind and energize your spirit with nature's finest ingredients.",
      icon: <Leaf className="w-8 h-8" />,
      gradient: "from-emerald-400 via-teal-500 to-green-600",
      bgGradient: "from-emerald-500/20 via-teal-500/10 to-green-600/20",
      cardBg: "bg-gradient-to-br from-emerald-50/10 to-green-100/10",
      iconBg: "bg-gradient-to-br from-emerald-500 to-green-600",
      shadowColor: "shadow-emerald-500/25",
      accentColor: "emerald-400"
    },
    "Body Butters and Oils": {
      description: "Luxurious formulations with premium oils and botanical extracts to deeply nourish and restore your skin's natural glow.",
      icon: <Droplets className="w-8 h-8" />,
      gradient: "from-blue-400 via-cyan-500 to-teal-600",
      bgGradient: "from-blue-500/20 via-cyan-500/10 to-teal-600/20",
      cardBg: "bg-gradient-to-br from-blue-50/10 to-cyan-100/10",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-600",
      shadowColor: "shadow-cyan-500/25",
      accentColor: "cyan-400"
    },
    "Wellness Plans & More": {
      description: "Comprehensive wellness strategies and mindful tools crafted to support your journey toward holistic well-being.",
      icon: <Heart className="w-8 h-8" />,
      gradient: "from-purple-400 via-pink-500 to-rose-600",
      bgGradient: "from-purple-500/20 via-pink-500/10 to-rose-600/20",
      cardBg: "bg-gradient-to-br from-purple-50/10 to-pink-100/10",
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-600",
      shadowColor: "shadow-purple-500/25",
      accentColor: "purple-400"
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
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-hope-aquablue/20 border-t-hope-aquablue mx-auto mb-8"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-hope-aquablue/30 to-cyan-400/30 animate-pulse blur-sm"></div>
            <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-hope-aquablue animate-pulse" />
          </div>
          <div className="text-3xl text-white font-bold bg-gradient-to-r from-hope-aquablue via-cyan-400 to-teal-400 bg-clip-text text-transparent mb-4">
            Curating Wellness Products
          </div>
          <div className="text-gray-300 animate-pulse">Discovering nature's finest ingredients...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900/20 to-rose-900/20 backdrop-blur-sm">
        <div className="text-center p-10 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 max-w-md mx-4">
          <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <X className="w-10 h-10 text-white" />
          </div>
          <div className="text-3xl text-red-400 mb-4 font-bold">Connection Issue</div>
          <div className="text-gray-200 mb-8 leading-relaxed">{error}</div>
          <button 
            onClick={() => fetchProducts()} 
            className="px-8 py-4 bg-gradient-to-r from-hope-aquablue to-cyan-500 text-white rounded-2xl font-semibold hover:shadow-xl hover:shadow-hope-aquablue/30 transition-all transform hover:scale-105 active:scale-95"
          >
            Reconnect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hope-bg text-white relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-transparent to-slate-800/40"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-hope-aquablue/15 via-cyan-400/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/15 via-pink-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-teal-500/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      <section className="relative px-4 sm:px-6 lg:px-8 py-20">
        <div className="container mx-auto">

          {/* Enhanced Header */}
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-hope-aquablue/20 to-cyan-400/20 backdrop-blur-sm rounded-full border border-hope-aquablue/30 mb-8">
              <Sparkles className="w-5 h-5 text-hope-aquablue" />
              <span className="text-hope-aquablue font-semibold">Premium Wellness Collection</span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-black bg-gradient-to-r from-hope-aquablue via-cyan-400 to-teal-400 bg-clip-text text-transparent mb-8 leading-tight">
              Wellness
              <span className="block bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
                Collection
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Discover handcrafted wellness products designed to nurture your mind, body, and spirit with nature's finest ingredients and holistic care.
            </p>
          </div>

          {/* Enhanced Product Types Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-28">
            {Object.entries(typesOfProducts).map(([type, info], index) => (
              <div 
                key={type} 
                className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl hover:shadow-hope-aquablue/25 transition-all duration-700 transform hover:-translate-y-4 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${info.bgGradient} opacity-0 group-hover:opacity-100 transition-all duration-700`}></div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                <div className="relative p-10">
                  <div className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl ${info.iconBg} text-white mb-8 shadow-xl ${info.shadowColor} group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3`}>
                    {info.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-5 group-hover:text-hope-aquablue transition-all duration-300">{type}</h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-all duration-300 text-sm">{info.description}</p>
                </div>

                {/* Enhanced bottom accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${info.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
                
                {/* Floating particles effect */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className={`w-2 h-2 bg-${info.accentColor} rounded-full animate-ping`}></div>
                </div>
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-700" style={{animationDelay: '0.2s'}}>
                  <div className={`w-1 h-1 bg-${info.accentColor} rounded-full animate-ping`}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-10">

            {/* Enhanced Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="w-full flex items-center justify-between px-8 py-5 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 text-white hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-hope-aquablue/20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-hope-aquablue to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Filter className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">Filters & Search</div>
                    <div className="text-sm text-gray-400">Refine your selection</div>
                  </div>
                  {hasActiveFilters && (
                    <div className="bg-gradient-to-r from-hope-aquablue to-cyan-400 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                      Active
                    </div>
                  )}
                </div>
                <div className={`transition-transform duration-300 ${isFiltersOpen ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-6 h-6" />
                </div>
              </button>
            </div>

            {/* Enhanced Filters Sidebar */}
            <div className={`w-full lg:w-96 flex-shrink-0 transition-all duration-500 ${isFiltersOpen || window.innerWidth >= 1024 ? 'block' : 'hidden'} lg:block`}>
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-10 sticky top-8 text-white">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-hope-aquablue to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl">
                      <Filter className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Filters</h3>
                      <p className="text-gray-400 text-sm">Refine your search</p>
                    </div>
                  </div>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/20 to-rose-500/20 hover:from-red-500/30 hover:to-rose-500/30 text-red-300 rounded-xl text-sm transition-all duration-300 border border-red-500/20 hover:border-red-500/30"
                    >
                      <X className="w-4 h-4" />
                      Clear All
                    </button>
                  )}
                </div>

                {/* Enhanced Search */}
                <div className="mb-10">
                  <label className="block text-sm font-bold mb-4 text-hope-aquablue uppercase tracking-wide">Search Products</label>
                  <div className="relative group">
                    <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-hope-aquablue transition-all duration-300" />
                    <input
                      type="text"
                      placeholder="Search wellness products..."
                      value={filters.searchTerm}
                      onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                      className="w-full pl-14 pr-5 py-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-hope-aquablue/50 focus:border-hope-aquablue/50 transition-all duration-300 hover:bg-white/15"
                    />
                  </div>
                </div>

                {/* Enhanced Category */}
                <div className="mb-10">
                  <label className="block text-sm font-bold mb-4 text-hope-aquablue uppercase tracking-wide">Category</label>
                  <div className="relative">
                    <select
                      value={filters.selectedCategory}
                      onChange={(e) => setFilters(prev => ({ ...prev, selectedCategory: e.target.value }))}
                      className="w-full px-5 py-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white appearance-none cursor-pointer focus:ring-2 focus:ring-hope-aquablue/50 transition-all duration-300 hover:bg-white/15"
                    >
                      <option value="all" className="bg-slate-800">All Categories</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat} className="bg-slate-800">{cat}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  </div>
                </div>

                {/* Enhanced Sort By */}
                <div className="mb-10">
                  <label className="block text-sm font-bold mb-4 text-hope-aquablue uppercase tracking-wide">Sort By</label>
                  <div className="relative">
                    <select
                      value={filters.sortBy}
                      onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                      className="w-full px-5 py-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white appearance-none cursor-pointer focus:ring-2 focus:ring-hope-aquablue/50 transition-all duration-300 hover:bg-white/15"
                    >
                      <option value="name" className="bg-slate-800">Name (A-Z)</option>
                      <option value="price-low" className="bg-slate-800">Price (Low to High)</option>
                      <option value="price-high" className="bg-slate-800">Price (High to Low)</option>
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  </div>
                </div>

                {/* Enhanced Price Range */}
                <div>
                  <label className="block text-sm font-bold mb-4 text-hope-aquablue uppercase tracking-wide">Price Range</label>
                  <div className="space-y-4">
                    <input
                      type="number"
                      placeholder="Minimum Price ($)"
                      value={filters.priceRange.min}
                      onChange={(e) => setFilters(prev => ({ ...prev, priceRange: { ...prev.priceRange, min: e.target.value } }))}
                      className="w-full px-5 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-hope-aquablue/50 transition-all duration-300 hover:bg-white/15"
                    />
                    <input
                      type="number"
                      placeholder="Maximum Price ($)"
                      value={filters.priceRange.max}
                      onChange={(e) => setFilters(prev => ({ ...prev, priceRange: { ...prev.priceRange, max: e.target.value } }))}
                      className="w-full px-5 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-hope-aquablue/50 transition-all duration-300 hover:bg-white/15"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Enhanced Top Bar */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl p-8 mb-10">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
                  <div className="flex flex-col sm:flex-row items-center gap-6 text-gray-300">
                    <div className="flex items-center gap-3">
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-hope-aquablue rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg">
                          {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length}
                        </p>
                        <p className="text-sm text-gray-400">Premium wellness products</p>
                      </div>
                    </div>
                    <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                    <div className="text-center">
                      <p className="text-lg bg-gradient-to-r from-hope-aquablue to-cyan-400 bg-clip-text text-transparent font-bold">
                        Page {currentPage}
                      </p>
                      <p className="text-sm text-gray-400">of {totalPages} pages</p>
                    </div>
                  </div>
                  
                  {/* Enhanced View Mode Toggle */}
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20 shadow-lg">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-4 rounded-xl transition-all duration-300 ${
                        viewMode === 'grid' 
                          ? 'bg-gradient-to-r from-hope-aquablue to-cyan-500 text-white shadow-lg shadow-hope-aquablue/30 scale-110' 
                          : 'hover:bg-white/15 text-gray-400 hover:text-white hover:scale-105'
                      }`}
                    >
                      <Grid className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-4 rounded-xl transition-all duration-300 ${
                        viewMode === 'list' 
                          ? 'bg-gradient-to-r from-hope-aquablue to-cyan-500 text-white shadow-lg shadow-hope-aquablue/30 scale-110' 
                          : 'hover:bg-white/15 text-gray-400 hover:text-white hover:scale-105'
                      }`}
                    >
                      <List className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className={`${viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10' 
                : 'flex flex-col gap-8'
              } mb-12`}>
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
                  <div className="col-span-full text-center py-32">
                    <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-20 max-w-lg mx-auto shadow-2xl">
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-400/20 to-gray-600/20 rounded-full flex items-center justify-center mx-auto mb-8">
                        <Search className="w-12 h-12 text-gray-400" />
                      </div>
                      <h3 className="text-4xl font-bold text-white mb-6">No Products Found</h3>
                      <p className="text-gray-400 mb-10 leading-relaxed text-lg">We couldn't find any wellness products matching your current search criteria. Try adjusting your filters or search terms.</p>
                      {hasActiveFilters && (
                        <button
                          onClick={clearFilters}
                          className="px-8 py-4 bg-gradient-to-r from-hope-aquablue to-cyan-500 text-white rounded-2xl font-bold hover:shadow-xl hover:shadow-hope-aquablue/30 transition-all transform hover:scale-105 active:scale-95"
                        >
                          Reset All Filters
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Pagination */}
              {totalPages > 1 && (
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-10">
                  <div className="flex justify-center items-center space-x-4">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                    >
                      <ChevronLeft className="w-6 h-6" />
                      Previous
                    </button>
                    
                    {/* Enhanced Page Numbers */}
                    <div className="flex space-x-3">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-16 h-16 rounded-2xl font-bold transition-all duration-300 shadow-lg ${
                            currentPage === page
                              ? 'bg-gradient-to-r from-hope-aquablue to-cyan-500 text-white shadow-hope-aquablue/40 transform scale-110 shadow-2xl'
                              : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white hover:scale-105 hover:shadow-xl'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                    >
                      Next
                      <ChevronRight className="w-6 h-6" />
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
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 6s ease infinite;
        }

        /* Custom scrollbar for better UX */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #22d3ee, #06b6d4);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #06b6d4, #0891b2);
        }

        /* Enhanced focus states */
        input:focus, select:focus, button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.3);
        }

        /* Smooth transitions for all interactive elements */
        button, input, select {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};

export default ShopPage;