import React, { createContext, useState } from "react";

const AppContext = createContext(null);
const AppContextProvider = ({ children }) => {
  const [favourites, setFavorites] = useState([]);
  
  const addEmoji = (movie) => {
    const newFav = [...favourites, movie];
    setFavorites(newFav);
  };
  const removeEmoji = (id) => {
    // whichever elem -> not equal to my id
    const filteredFav = favourites.filter((element) => {
      return element.id !== id;
    });
    setFavorites(filteredFav);
  };
  return (
    <AppContext.Provider
      value={{ favourites, addEmoji, removeEmoji }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider, AppContext };
