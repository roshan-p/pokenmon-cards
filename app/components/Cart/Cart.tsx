import React, { useState, useEffect } from "react";
import "./Cart.css";
import CloseIcon from "../../../public/assets/close.svg";
import Image from "next/image";

interface CartProps {
  onClose: ()=>void
}

const Cart: React.FC<CartProps> = ({ onClose }) => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const existingCartItems = localStorage.getItem("cartItems");
    const initialCartItems = existingCartItems
      ? JSON.parse(existingCartItems)
      : [];
    setCartItems(initialCartItems);
  }, []);

  const updateCartItemQuantity = (itemId: string, quantityChange: number) => {
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

    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const displayQuantity = (itemId: string) => {
    const item = cartItems.find((obj: any) => obj.id === itemId);
    return item ? item.quantity : 0;
  };

  const calCulatePriceInRow = (itemId: string) => {
    const item = cartItems.find((obj: any) => obj.id === itemId);
    return item ? item.quantity * item.cardmarket.prices.averageSellPrice : 0;
  };


  const calculateTotalPrice = () => {
    return cartItems.reduce((totalPrice, item) => {
      return totalPrice + (item.quantity * item.cardmarket.prices.averageSellPrice);
    }, 0);
  };

  const calculateTotalQuantity = () => {
    return cartItems.reduce((totalAmount, item) => {
      return totalAmount + item.quantity ;
    }, 0);
  };

  const clearAll = () => {
    localStorage.removeItem('cartItems')
    setCartItems([]);
  };

  return (
    <div className="cart-modal">
      <div className="cart-modal-header">
        <div className="left-section">
          <div className="cart-header">Cart</div>
          <div onClick={()=>{clearAll()}} className="clear-all">Clear all</div>
        </div>
        <div onClick={()=>{onClose()}} className="close-section">
          <Image
            className="cart-close-icon"
            src={CloseIcon}
            alt="Cart Close Icon"
          />
        </div>
      </div>

      <ul className="item-list-header">
        <li className="column column1">Item</li>
        <li className="column column2">Qty</li>
        <li className="column column3">Price</li>
      </ul>
      {cartItems.map((card: any) => (
        <div key={card.id}>
          <ul key={card.id} className="item-list">
            <li key={card.id} className="column column1">
              <Image
                width={44}
                height={60}
                src={card.images.small}
                alt="Cart Close Icon"
              />
            </li>
            <li key={card.id} className="column column2">
              {card.name}
              <br></br>${card.cardmarket.prices.averageSellPrice}
            </li>
            <li key={card.id} className="column column3">
              ${calCulatePriceInRow(card.id)}
            </li>
          </ul>
          <ul className="item-list-btn">
            <li
              className="column column1 btn1"
              onClick={() => updateCartItemQuantity(card.id, -1)}
            >
              -
            </li>
            <li className="column column2 btn2">{displayQuantity(card.id)}</li>
            <li
              className="column column3 btn3"
              onClick={() => updateCartItemQuantity(card.id, +1)}
            >
              +
            </li>
          </ul>
        </div>
      ))}

      <div className="cart-footer">
        <div className="cart-amount-wrapper">
          <div className="small-title">Total card amount</div>
          <div>{calculateTotalQuantity()}</div>
        </div>
        <div className="cart-price-wrapper">
        <div className="small-title">Total price</div>
          <div>${calculateTotalPrice()}</div>
        </div>
        <button className="checkout-btn">Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
