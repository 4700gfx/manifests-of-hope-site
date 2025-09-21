import Client from 'shopify-buy';

const client = Client.buildClient({
  domain: 'sewk0i-gb.myshopify.com',
  storefrontAccessToken: '60914b0d850ab17f011cfe09d7cab5ad',
  // Add these optional configurations for better compatibility
  apiVersion: '2023-10', // Use a recent API version
  source: 'web-app', // Identify your app source
});

export default client;