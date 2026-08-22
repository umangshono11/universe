import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const STORAGE_KEY = 'kdh_cart_items_v1';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load cart from storage', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [cartItems]);

  const addToCart = (product, variant = null) => {
    if (!product) return;
    const productId = product._id?.$oid || product.id || String(product.title);
    const itemVariant = variant || (product.marbles?.[0]?.name || product.material || 'Default');
    const image = product.images?.[0]?.filePath || product.image || '';

    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === productId && item.variant === itemVariant);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: productId,
            title: product.title,
            group: product.groupName || product.group || '',
            material: product.material || '',
            variant: itemVariant,
            image,
            leadTime: product.leadTime || '30 Days',
            quantity: 1,
            addedAt: Date.now()
          }
        ];
      }
    });
  };

  const removeFromCart = (productId, variant = null) => {
    setCartItems(prev => prev.filter(item => {
      if (variant) {
        return !(item.id === productId && item.variant === variant);
      }
      return item.id !== productId;
    }));
  };

  const updateQuantity = (productId, variant, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, variant);
      return;
    }
    setCartItems(prev => prev.map(item => {
      if (item.id === productId && item.variant === variant) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const isInCart = (productId, variant = null) => {
    return cartItems.some(item => {
      if (variant) {
        return item.id === productId && item.variant === variant;
      }
      return item.id === productId;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        isInCart,
        clearCart,
        cartCount,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
