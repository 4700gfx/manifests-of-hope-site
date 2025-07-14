import React, { useEffect, useState, useMemo } from 'react';
import { useShopify } from '../context/ShopifyContext';
import ProductCard from './ProductCard';
import { Search, Filter, Grid, List, ChevronDown, Leaf, Droplets, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const itemsPerPage = 12;

  const typesOfProducts = {
    "Tea": {
      description: "Our Teas are homemade and ready to brew to perfection.",
      icon: <Leaf className="w-8 h-8" />,
      color: "from-green-400 to-emerald-600"
    },
    "Body Butters and Oils": {
      description: "Made with a blend of oils and herbs to nourish your skin.",
      icon: <Droplets className="w-8 h-8" />,
      color: "from-blue-400 to-cyan-600"
    },
    "Wellness Plans & More": {
      description: "Manifest of Hope wellness plans and tools for mind & body.",
      icon: <Heart className="w-8 h-8" />,
      color: "from-purple-400 to-pink-600"
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
    }, 500);

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-rose-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-hope-aquablue mx-auto mb-4"></div>
          <div className="text-2xl text-hope-aquablue font-medium">Loading products...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <div className="text-2xl text-red-500 mb-4">Oops! Something went wrong</div>
          <div className="text-gray-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hope-bg text-white">
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="container mx-auto">

          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-hope-aquablue to-indigo-600 bg-clip-text text-transparent mb-6">
              Wellness Products
            </h1>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Explore wellness tools to uplift your mind, body and spirit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {Object.entries(typesOfProducts).map(([type, info]) => (
              <div key={type} className="group relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                <div className="relative p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${info.color} text-white mb-6`}>
                    {info.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{type}</h3>
                  <p className="text-gray-600 leading-relaxed">{info.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-8">

            {/* Filters Sidebar */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8 text-gray-800">
                <div className="flex items-center gap-3 mb-6">
                  <Filter className="w-5 h-5 text-hope-aquablue" />
                  <h3 className="text-xl font-bold">Filters</h3>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={filters.searchTerm}
                      onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-hope-aquablue"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={filters.selectedCategory}
                    onChange={(e) => setFilters(prev => ({ ...prev, selectedCategory: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                  >
                    <option value="name">Name (A-Z)</option>
                    <option value="price-low">Price (Low to High)</option>
                    <option value="price-high">Price (High to Low)</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Price Range</label>
                  <input
                    type="number"
                    placeholder="Min Price"
                    value={filters.priceRange.min}
                    onChange={(e) => setFilters(prev => ({ ...prev, priceRange: { ...prev.priceRange, min: e.target.value } }))}
                    className="w-full mb-3 px-4 py-3 border border-gray-200 rounded-xl"
                  />
                  <input
                    type="number"
                    placeholder="Max Price"
                    value={filters.priceRange.max}
                    onChange={(e) => setFilters(prev => ({ ...prev, priceRange: { ...prev.priceRange, max: e.target.value } }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Top Bar */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <p className="text-gray-600">
                      Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
                    </p>
                    <span className="text-gray-400">|</span>
                    <p className="text-gray-600">Page {currentPage} of {totalPages}</p>
                  </div>
                  
                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-md' : 'hover:bg-gray-200'}`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-md' : 'hover:bg-gray-200'}`}
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
                  paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} viewMode={viewMode} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20">
                    <div className="text-gray-400 text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-bold text-gray-600 mb-2">No products found</h3>
                    <p className="text-gray-500">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>
                    
                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-hope-aquablue text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;