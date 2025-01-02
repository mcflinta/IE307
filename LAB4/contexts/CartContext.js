import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
// 21521901 - Mai Quốc Cường
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { userInfo } = useContext(AuthContext);

  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    setCartTotal(total);
  }, [cartItems]);

  // Giỏ hàng
  const addToCart = (product) => {
    const existed = cartItems.find((item) => item.id === product.id);
    if (existed) {
      return false;
    }
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
    return true;
  };
  const removeFromCart = (productId) => {
    const newCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(newCart);
  };
  const increaseQuantity = (productId) => {
    const newCart = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(newCart);
  };
  const decreaseQuantity = (productId) => {
    const newCart = cartItems.map((item) => {
      if (item.id === productId) {
        if (item.quantity === 1) {
          return null;
        }
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }).filter(Boolean);
    setCartItems(newCart);
  };

  // Favorites
  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };
  const isFavorite = (productId) => {
    return favorites.includes(productId);
  };

  const value = {
    cartItems,
    cartTotal,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    favorites,
    toggleFavorite,
    isFavorite
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};
