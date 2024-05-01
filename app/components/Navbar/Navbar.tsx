import React, { useEffect, useState } from "react";
import "./Navbar.css";
import Image from "next/image";
import Search from "../../../public/assets/search.svg";
import CartIcon from "../../../public/assets/cart.svg";
import { INavbarProps } from "../interface";
import axios from "axios";
import Cart from "../Cart/Cart";

const Navbar: React.FC<INavbarProps> = ({
  cardData,
  setCardData,
  currentPage,
  setCurrentPage,
  totalPages,
  setTotalPages,
  setIsLoading,
  isLoading
}) => {
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    if (showCart) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [showCart]);

  
  const searchByName = async (pokemonName: string) => {
    const encodedName = encodeURIComponent(pokemonName);
    let apiUrl = `https://api.pokemontcg.io/v2/cards`;
    setIsLoading(true)
    if (pokemonName) {
      apiUrl = `https://api.pokemontcg.io/v2/cards?q=name:"${encodedName}"`;
    }
    try {
      const response = await axios.get<any>(apiUrl, {
        params: {
          pageSize: 20, 
          page: 1,
        },
      });
      const totalCount = response.data.totalCount;
      const totalPages = Math.ceil(totalCount / 20); 
      setTotalPages(totalPages);
      setCardData(response.data.data);
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error("Error fetching cards:", error);
    }
  };
  const toggleCart = () => {
    setShowCart(!showCart);
  };
  return (
    <nav className="navbar">
      <div className="navbar-title">Pokemon Card Market</div>
      <div className="navbar-cart">
        <div className="search-input-container">
          <Image className="search-icon" src={Search} alt="Search Icon" />
          <input
            className="search-input-field"
            type="text"
            placeholder="Search by Name"
            onChange={(e) => {
              searchByName(e.target.value);
            }}
          />
        </div>
        <div className="main-cart-btn" onClick={toggleCart}>
          <Image className="cart-icon" src={CartIcon} alt="Cart Icon" />
        </div>
      </div>
      {showCart &&  <><div className="modal-backdrop" onClick={toggleCart}></div><Cart onClose={toggleCart} /></>}
    </nav>
  );
};

export default Navbar;
