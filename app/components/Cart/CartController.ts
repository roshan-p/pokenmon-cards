import { useCallback } from 'react';

const useCartFunctions = (cartItems: any[]) => {
  const updateCartItemQuantity = useCallback((itemId: string, quantityChange: number) => {
    const updatedCartItems = cartItems
      .map((item: any) => {
        if (item.id === itemId) {
          const updatedQuantity = item.quantity + quantityChange;
          if (updatedQuantity <= 0) return null;
          return { ...item, quantity: updatedQuantity };
        }
        return item;
      })
      .filter((item: any) => item !== null);
  
    return updatedCartItems;
  }, [cartItems]);
  
  const displayQuantity = useCallback((itemId: string) => {
    const item = cartItems.find((obj: any) => obj.id === itemId);
    return item ? item.quantity : 0;
  }, [cartItems]);
  
  const calculatePriceInRow = useCallback((itemId: string) => {
    const item = cartItems.find((obj: any) => obj.id === itemId);
    return item ? item.quantity * item.cardmarket.prices.averageSellPrice : 0;
  }, [cartItems]);
  
  const calculateTotalPrice = useCallback(() => {
    return cartItems.reduce((totalPrice, item) => {
      return totalPrice + (item.quantity * item.cardmarket.prices.averageSellPrice);
    }, 0);
  }, [cartItems]);
  
  const calculateTotalQuantity = useCallback(() => {
    return cartItems.reduce((totalAmount, item) => {
      return totalAmount + item.quantity;
    }, 0);
  }, [cartItems]);

  return { updateCartItemQuantity, displayQuantity, calculatePriceInRow, calculateTotalPrice, calculateTotalQuantity };
};

export default useCartFunctions;
