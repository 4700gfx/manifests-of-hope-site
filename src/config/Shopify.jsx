import Client from 'shopify-buy';

const client = Client.buildClient({
  domain: 'sewk0i-gb.myshopify.com', // Replace with your actual Shopify domain
  storefrontAccessToken: '60914b0d850ab17f011cfe09d7cab5ad', // Replace with your actual token
});

export default client;

