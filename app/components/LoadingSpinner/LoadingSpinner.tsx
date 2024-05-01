import React, { useEffect } from "react";
import "./LoadingSpinner.css";
import Image from 'next/image';
import Spinner from "../../../public/assets/infinite-spinner.svg";
const LoadingSpinner: React.FC = () => {
    useEffect(() => {
        document.body.classList.add("loading-spinner-active");
    
        return () => {
          document.body.classList.remove("loading-spinner-active");
        };
      }, []);
  return (
    <div className="loading-spinner-overlay">
        <Image className="loading-spinner" src={Spinner} alt="Loading Spinner" />
    </div>
  );
};

export default LoadingSpinner;
