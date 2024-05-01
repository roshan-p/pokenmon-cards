"use client";
import { useState } from "react";
import Homepage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import { ICard } from "./components/interface";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

export default function Home() {
  const [cardData, setCardData] = useState<ICard[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="wrapper">
      {isLoading && <LoadingSpinner />}
      <Navbar
        cardData={cardData}
        setCardData={setCardData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <Homepage
        cardData={cardData}
        setCardData={setCardData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}
