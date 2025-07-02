import React, { useState } from 'react';
import shopifyClient from '../config/shopify';

const ShopifyTest = () => {
  const [testResult, setTestResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const testConnection = async () => {
    setIsLoading(true);
    setTestResult('Testing connection...');
    
    try {
      console.log('Shopify Client Config:', {
        domain: shopifyClient.config.domain,
        storefrontAccessToken: shopifyClient.config.storefrontAccessToken ? 'Token exists' : 'No token'
      });

      // Test fetching shop info first
      const shop = await shopifyClient.shop.fetchInfo();
      console.log('Shop info:', shop);
      
      setTestResult(`✅ Connection successful! Shop: ${shop.name}`);
      
      // Now test fetching products
      const products = await shopifyClient.product.fetchAll(5);
      console.log('Products:', products);
      
      setTestResult(prev => prev + `\n✅ Products fetched: ${products.length} products found`);
      
    } catch (error) {
      console.error('Shopify connection error:', error);
      setTestResult(`❌ Error: ${error.message}`);
      
      // Log more details about the error
      if (error.networkError) {
        console.error('Network Error Details:', error.networkError);
      }
      if (error.graphQLErrors) {
        console.error('GraphQL Errors:', error.graphQLErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Shopify Connection Test</h2>
      
      <button
        onClick={testConnection}
        disabled={isLoading}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? 'Testing...' : 'Test Shopify Connection'}
      </button>
      
      {testResult && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <pre className="whitespace-pre-wrap text-sm">{testResult}</pre>
        </div>
      )}
      
      <div className="mt-6 text-sm text-gray-600">
        <p><strong>Current Config:</strong></p>
        <p>Domain: {shopifyClient.config.domain || 'Not set'}</p>
        <p>Token: {shopifyClient.config.storefrontAccessToken ? 'Set' : 'Not set'}</p>
      </div>
    </div>
  );
};

export default ShopifyTest;