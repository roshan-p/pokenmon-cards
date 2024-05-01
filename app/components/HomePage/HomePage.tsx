import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./HomePage.css";
import Card from "../Card/Card";
import { IHomepageProps, ICard } from "../interface";

interface PokemonCardSets {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: {
    unlimited: string;
  };
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: {
    symbol: string;
    logo: string;
  };
}

const HomePage: React.FC<IHomepageProps> = ({
  cardData,
  setCardData,
  currentPage,
  setCurrentPage,
  totalPages,
  setTotalPages,
  isLoading,
  setIsLoading,
}) => {
  const [sets, setSets] = useState<PokemonCardSets[]>([]);
  const [rarities, setRarities] = useState([]);
  const [types, setTypes] = useState([]);
  const [displayCard, setDisplayCard] = useState<ICard[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<any>(
          "https://api.pokemontcg.io/v2/cards",
          {
            params: {
              pageSize: 20,
              page: currentPage,
            },
          }
        );

        const totalCount = response.data.totalCount;
        const totalPages = Math.ceil(totalCount / 20);
        setIsLoading(false);
        setTotalPages(totalPages);
        setCardData(response.data.data);
        setDisplayCard(response.data.data);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching cards:", error);
      }
    };
    const fetchSets = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<any>(
          "https://api.pokemontcg.io/v2/sets"
        );
        setSets(response.data.data);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching cards:", error);
      }
    };
    const fetchRarities = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<any>(
          "https://api.pokemontcg.io/v2/rarities"
        );
        setRarities(response.data.data);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching cards:", error);
      }
    };
    const fetchTypes = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<any>(
          "https://api.pokemontcg.io/v2/types"
        );

        setTypes(response.data.data);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching cards:", error);
      }
    };
    fetchCards();
    fetchRarities();
    fetchSets();
    fetchTypes();
  }, [currentPage, setCardData, setIsLoading, setTotalPages]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const renderPagination = useCallback(() => {
    const pageButtons = [];
    const maxPagesToShow = 5; // Maximum number of pages to show in the pagination

    if (totalPages <= maxPagesToShow) {
      // If total pages is less than or equal to maxPagesToShow, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </button>
        );
      }
    } else {
      // Show pagination with ellipses
      const leftEllipsis =
        currentPage > 3 ? (
          <button key="leftEllipsis" className="ellipsis" disabled>
            ...
          </button>
        ) : null;

      const rightEllipsis =
        currentPage < totalPages - 2 ? (
          <button key="rightEllipsis" className="ellipsis" disabled>
            ...
          </button>
        ) : null;

      if (currentPage <= 3) {
        // Show buttons without left ellipsis
        for (let i = 1; i <= 5; i++) {
          pageButtons.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={currentPage === i ? "active" : ""}
            >
              {i}
            </button>
          );
        }
        pageButtons.push(
          rightEllipsis,
          <button key={totalPages} onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </button>
        );
      } else if (currentPage >= totalPages - 2) {
        // Show buttons without right ellipsis
        pageButtons.push(
          <button key={1} onClick={() => handlePageChange(1)}>
            1
          </button>,
          leftEllipsis
        );
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageButtons.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={currentPage === i ? "active" : ""}
            >
              {i}
            </button>
          );
        }
      } else {
        // Show buttons with both ellipses
        pageButtons.push(
          <button key={1} onClick={() => handlePageChange(1)}>
            1
          </button>,
          leftEllipsis
        );
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageButtons.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={currentPage === i ? "active" : ""}
            >
              {i}
            </button>
          );
        }
        pageButtons.push(
          rightEllipsis,
          <button key={totalPages} onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </button>
        );
      }
    }

    return pageButtons;
  }, [currentPage, handlePageChange, totalPages]);

  const addToCart = (item: ICard) => {
    const existingCartItems = localStorage.getItem("cartItems");
    const cartItems = existingCartItems ? JSON.parse(existingCartItems) : [];
    const newItem = { ...item, quantity: 1 };
    cartItems.push(newItem);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  const filterSet = (value: string) => {
    if (!value) {
      setDisplayCard(cardData);
      return;
    }
    const newItem = cardData.filter((item: any) => item.set.id === value);
    console.log(newItem);
    setDisplayCard(newItem);
  };
  const filterType = (value: string) => {
    if (!value) {
      setDisplayCard(cardData);
      return;
    }
    const newItem = cardData.filter((item: any) => item.types.includes(value));
    console.log(newItem);
    setDisplayCard(newItem);
  };
  const filterRariry = (value: string) => {
    if (!value) {
      setDisplayCard(cardData);
      return;
    }
    const newItem = cardData.filter((item: any) => item.rarity === value);
    setDisplayCard(newItem);
  };
  return (
    <div className="homepage-container">
      {!isLoading && (
        <div className="homepage">
          <div className="card-list-header">
            <div className="card-list-title">Choose Card</div>
            <div className="selector-wrapper">
              <div className="set-selector-wrapper">
                <select
                  className="set-selector"
                  onChange={(e) => {
                    filterSet(e.target.value);
                  }}
                >
                  <option value="">Set</option>
                  {sets.map((set) => (
                    <option key={set.id} value={set.id}>
                      {set.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="rariry-selector-wrapper">
                <select
                  className="rariry-selector"
                  onChange={(e) => {
                    filterRariry(e.target.value);
                  }}
                >
                  <option value="">Rarity</option>
                  {rarities.map((rarity) => (
                    <option key={rarity} value={rarity}>
                      {rarity}
                    </option>
                  ))}
                </select>
              </div>
              <div className="type-selector-wrapper">
                <select
                  className="type-selector"
                  onChange={(e) => {
                    filterType(e.target.value);
                  }}
                >
                  <option value="">Type</option>
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="card-grid">
            {displayCard.map((card: ICard) => (
              <Card
                key={card.id}
                id={card.id}
                name={card.name}
                imageUrl={card.images.small}
                price={card.cardmarket.prices.averageSellPrice}
                quantity={card.set.total}
                addToCart={() => {
                  addToCart(card);
                }}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="pagination">{renderPagination()}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
