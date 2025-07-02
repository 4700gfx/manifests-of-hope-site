import React, { useEffect } from 'react';
import { useShopify } from '../context/ShopifyContext';
import ProductCard from './ProductCard';

const ShopPage = () => {
  const { products, fetchProducts, isLoading, error } = useShopify();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-hope-aquablue">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20">
      <div className="container mx-auto">
        <h1 className="text-4xl lg:text-5xl font-bold text-hope-aquablue text-center mb-12">
          Wellness Products
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopPage;