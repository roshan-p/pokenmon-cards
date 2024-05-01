export interface ICard {
    id: string;
    name: string;
    images: {
      small: string;
    };
    cardmarket: {
      prices: {
        averageSellPrice: number;
      };
    };
    set: {
      total: number;
    };
  }
  export interface INavbarProps {
    cardData: ICard[];
    setCardData: React.Dispatch<React.SetStateAction<ICard[]>>;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number;
    setTotalPages: React.Dispatch<React.SetStateAction<number>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
export interface IHomepageProps {
    cardData: ICard[];
    setCardData: React.Dispatch<React.SetStateAction<ICard[]>>
    currentPage: number; 
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number; 
    setTotalPages: React.Dispatch<React.SetStateAction<number>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }