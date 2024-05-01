import React from "react";
import Image from 'next/image';
import "./Card.css";
import ShoppingBag from "../../../public/assets/shopping-bag.svg";
import Ellipse from "../../../public/assets/ellipse.svg";

interface CardProps {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  addToCart: ()=>void
}

const Card: React.FC<CardProps> = ({ id, name, imageUrl, price, quantity, addToCart }) => {
  return (
    <div key={id} className="card">
      <div className="card-details">
        <Image className="card-image" src={imageUrl ?? ''} alt={name} width={102} height={142}/>
        <div className="card-title">{name}</div>
        <div className="card-price">
          ${price}  <Image className="price-separator" src={Ellipse} alt="Ellipse" width={4} height={4}/> {quantity > 0 ? quantity + " cards" : "out of stock"}
          <button className="add-to-cart-btn" onClick={()=>addToCart()}>
            <Image className="btn-image" src={ShoppingBag} alt="Shopping Bag" /> Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
