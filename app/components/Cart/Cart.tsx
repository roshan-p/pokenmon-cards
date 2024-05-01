import React, { useState, useEffect } from "react";
import "./Cart.css";
import CloseIcon from "../../../public/assets/close.svg";
import Image from "next/image";
import useCartFunctions from "./CartController";

interface CartProps {
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ onClose }) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const { updateCartItemQuantity, displayQuantity, calculatePriceInRow, calculateTotalPrice, calculateTotalQuantity } = useCartFunctions(cartItems);

  useEffect(() => {
    const existingCartItems = localStorage.getItem("cartItems");
    const initialCartItems = existingCartItems ? JSON.parse(existingCartItems) : [];
    setCartItems(initialCartItems);
  }, []);

  const handleUpdateCartItemQuantity = (itemId: string, quantityChange: number) => {
    const updatedCartItems = updateCartItemQuantity(itemId, quantityChange);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
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
              ${calculatePriceInRow(card.id)}
            </li>
          </ul>
          <ul className="item-list-btn">
            <li
              className="column column1 btn1"
              onClick={() => handleUpdateCartItemQuantity(card.id, -1)}
            >
              -
            </li>
            <li className="column column2 btn2">{displayQuantity(card.id)}</li>
            <li
              className="column column3 btn3"
              onClick={() => handleUpdateCartItemQuantity(card.id, +1)}
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
        <button className="checkout-btn">Continue to Payment</button>
      </div>
    </div>
  );
};

export default Cart;
