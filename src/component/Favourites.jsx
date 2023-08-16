import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
const Favourites = () => {
  const { favourites, removeEmoji } = useContext(AppContext);
  console.log(favourites);
  return (
    <>
      {favourites.length > 0 ? (
        favourites.map((movie) => {
          return (
            <div key={movie.id} className="flex my-2 mx-1">
              <img
                src={`https://image.tmdb.org/t/p/original/t/p/w200/${movie.poster_path}`}
                alt="#"
                className="h-[30vh] rounded-xl"
              />
              <div className="ml-2">
                <div className="font-medium">{movie.title || movie.name}</div>
                <h1>Overview:- {movie.overview}</h1>
              </div>
              <button
                className=" absolute right-0  rounded-xl text-white "
                onClick={() => removeEmoji(movie.id)}
              >
                ❌
              </button>
            </div>
          );
        })
      ) : (
        <h1 className=" font-bold text-center ">
          You Don't have any Favourite Movie
        </h1>
      )}
    </>
  );
};

export default Favourites;
