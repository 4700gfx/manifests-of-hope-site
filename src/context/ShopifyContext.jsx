import React, { createContext, useContext, useReducer, useEffect } from 'react';
import shopifyClient from '../config/Shopify.jsx';

const ShopifyContext = createContext();

const initialState = {
  products: [],
  collections: [],
  cart: null,
  isLoading: false,
  error: null
};

function shopifyReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload, isLoading: false };
    case 'SET_COLLECTIONS':
      return { ...state, collections: action.payload };
    case 'SET_CART':
      return { ...state, cart: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

export const ShopifyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shopifyReducer, initialState);

  // Initialize cart on app load
  useEffect(() => {
    initializeCart();
  }, []);

  const initializeCart = async () => {
    try {
      console.log('Initializing cart...');
      
      // Check if there's an existing cart in localStorage
      const existingCheckoutId = localStorage.getItem('shopify_checkout_id');
      
      if (existingCheckoutId) {
        try {
          // Try to fetch existing cart
          const existingCart = await shopifyClient.checkout.fetch(existingCheckoutId);
          if (existingCart && !existingCart.completedAt) {
            console.log('Found existing cart:', existingCart);
            dispatch({ type: 'SET_CART', payload: existingCart });
            return;
          }
        } catch (error) {
          console.log('Existing cart not found or invalid, creating new one');
          localStorage.removeItem('shopify_checkout_id');
        }
      }

      // Create new cart
      const cart = await shopifyClient.checkout.create();
      console.log('Created new cart:', cart);
      localStorage.setItem('shopify_checkout_id', cart.id);
      dispatch({ type: 'SET_CART', payload: cart });
    } catch (error) {
      console.error('Error initializing cart:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const fetchProducts = async (limit = 20) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });
    
    try {
      console.log('Fetching products...');
      const products = await shopifyClient.product.fetchAll(limit);
      console.log('Fetched products:', products);
      dispatch({ type: 'SET_PRODUCTS', payload: products });
    } catch (error) {
      console.error('Error fetching products:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const fetchCollections = async () => {
    try {
      console.log('Fetching collections...');
      const collections = await shopifyClient.collection.fetchAllWithProducts();
      console.log('Fetched collections:', collections);
      dispatch({ type: 'SET_COLLECTIONS', payload: collections });
    } catch (error) {
      console.error('Error fetching collections:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const addToCart = async (variantId, quantity = 1) => {
    try {
      console.log('Adding to cart:', { variantId, quantity, cartId: state.cart?.id });
      
      if (!state.cart) {
        console.error('No cart available');
        throw new Error('Cart not initialized');
      }

      const lineItemsToAdd = [{
        variantId: variantId,
        quantity: quantity
      }];

      const updatedCart = await shopifyClient.checkout.addLineItems(state.cart.id, lineItemsToAdd);
      console.log('Updated cart after adding item:', updatedCart);
      
      dispatch({ type: 'SET_CART', payload: updatedCart });
      return updatedCart;
    } catch (error) {
      console.error('Error adding to cart:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const removeFromCart = async (lineItemId) => {
    try {
      console.log('Removing from cart:', { lineItemId, cartId: state.cart?.id });
      
      if (!state.cart) {
        throw new Error('Cart not initialized');
      }

      const updatedCart = await shopifyClient.checkout.removeLineItems(state.cart.id, [lineItemId]);
      console.log('Updated cart after removing item:', updatedCart);
      
      dispatch({ type: 'SET_CART', payload: updatedCart });
      return updatedCart;
    } catch (error) {
      console.error('Error removing from cart:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const updateCartItem = async (lineItemId, quantity) => {
    try {
      console.log('Updating cart item:', { lineItemId, quantity, cartId: state.cart?.id });
      
      if (!state.cart) {
        throw new Error('Cart not initialized');
      }

      if (quantity <= 0) {
        return removeFromCart(lineItemId);
      }

      const lineItemsToUpdate = [{
        id: lineItemId,
        quantity: quantity
      }];

      const updatedCart = await shopifyClient.checkout.updateLineItems(state.cart.id, lineItemsToUpdate);
      console.log('Updated cart after updating quantity:', updatedCart);
      
      dispatch({ type: 'SET_CART', payload: updatedCart });
      return updatedCart;
    } catch (error) {
      console.error('Error updating cart item:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const value = {
    ...state,
    fetchProducts,
    fetchCollections,
    addToCart,
    removeFromCart,
    updateCartItem,
    initializeCart
  };

  return (
    <ShopifyContext.Provider value={value}>
      {children}
    </ShopifyContext.Provider>
  );
};

export const useShopify = () => {
  const context = useContext(ShopifyContext);
  if (!context) {
    throw new Error('useShopify must be used within a ShopifyProvider');
  }
  return context;
};