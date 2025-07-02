import React, { createContext, useContext, useReducer, useEffect } from 'react';
import shopifyClient from '../config/shopify';

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
      const cart = await shopifyClient.checkout.create();
      dispatch({ type: 'SET_CART', payload: cart });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const fetchProducts = async (limit = 20) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const products = await shopifyClient.product.fetchAll(limit);
      dispatch({ type: 'SET_PRODUCTS', payload: products });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const fetchCollections = async () => {
    try {
      const collections = await shopifyClient.collection.fetchAllWithProducts();
      dispatch({ type: 'SET_COLLECTIONS', payload: collections });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const addToCart = async (variantId, quantity = 1) => {
    try {
      const lineItemsToAdd = [{
        variantId: variantId,
        quantity: quantity
      }];
      
      const cart = await shopifyClient.checkout.addLineItems(state.cart.id, lineItemsToAdd);
      dispatch({ type: 'SET_CART', payload: cart });
      return cart;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const removeFromCart = async (lineItemId) => {
    try {
      const cart = await shopifyClient.checkout.removeLineItems(state.cart.id, [lineItemId]);
      dispatch({ type: 'SET_CART', payload: cart });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const updateCartItem = async (lineItemId, quantity) => {
    try {
      const lineItemsToUpdate = [{
        id: lineItemId,
        quantity: quantity
      }];
      
      const cart = await shopifyClient.checkout.updateLineItems(state.cart.id, lineItemsToUpdate);
      dispatch({ type: 'SET_CART', payload: cart });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const value = {
    ...state,
    fetchProducts,
    fetchCollections,
    addToCart,
    removeFromCart,
    updateCartItem
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