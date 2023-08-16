import React, { useEffect } from "react";

import axios from "axios";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
export const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchmovie, setSearchmovie] = useState([]);
  const [showPage, setShowPage] = useState(false);
  const [pageNum, setPage] = useState(1);
  const [hovered, setHovered] = useState("");
  const { favourites, addEmoji, removeEmoji } = useContext(AppContext);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=2de7d743720872d2f587607311a1db33&page=${pageNum}
        `
      )
      .then((res) => {
        setSearchmovie(res.data.results);
      })
      .catch((err) => console.log(err));
  }, [searchQuery, pageNum]);
  const handleClick = (e) => {
    e.preventDefault();
    keyword === ""
      ? alert("Enter the Search keyword")
      : axios
          .get(
            `https://api.themoviedb.org/3/search/movie?query=${keyword}&api_key=2de7d743720872d2f587607311a1db33&page=1`
          )
          .then((res) => {
            setSearchmovie(res.data.results);
            setSearchQuery(keyword);
            setKeyword("");
            setShowPage(true);
            setPage(1);
          })
          .catch((err) => console.log(err));
  };

  const onPrev = () => {
    if (pageNum > 1) {
      setPage(pageNum - 1);
    }
  };
  const onNext = () => {
    setPage(pageNum + 1);
  };
  /*emoji show and hide on hover*/
  const showEmoji = (id) => {
    setHovered(id);
  };
  const hideEmoji = () => {
    setHovered("");
  };
  return (
    <>
      <form action="" onSubmit={handleClick}>
        <input
          type="text"
          value={keyword}
          className="ml-3 mr-2  border-2  border-red-700 focus:outline-none "
          placeholder="Search..."
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <button
          className="rounded-[5px] border-2 border-red-700 text-red-700 "
          type="submit"
        >
          Search
        </button>
      </form>
      <div className="mt-8">
        <div
          className="mb-8
            text-center text-2xl font-bold
            "
        >
          Searched Movies
        </div>
        <div
          className="flex 
            flex-wrap
            justify-center
            "
        >
          {searchmovie.length === 0 ? (
            <div>Enter the movie name to be searched...</div>
          ) : (
            searchmovie.map((movie) => {
              return (
                <div
                  onMouseOver={() => {
                    showEmoji(movie.id);
                  }}
                  onMouseLeave={() => {
                    hideEmoji();
                  }}
                  key={movie.id}
                  className="
                md: relative    
                m-4
                flex h-[40vh]
                w-[160px]
                items-end
                rounded-xl
                bg-cover
                bg-center
                 duration-300 hover:scale-110 
                 md:w-[180px]
                "
                  style={{
                    backgroundImage: `url(
                                    https://image.tmdb.org/t/p/original/t/p/w500/${movie.poster_path})`,
                  }}
                >
                  <div
                    className="absolute
                          right-2
                                top-2 rounded-xl bg-gray-900
                                p-2
                               "
                    style={{
                      display: hovered === movie.id ? "block" : "none",
                    }}
                  >
                    {favourites.some((check) => {
                      return check === movie ? true : false;
                    }) === false ? (
                      <div
                        className="
                                cursor-pointer
                                text-2xl
                                "
                        onClick={() => {
                          addEmoji(movie);
                        }}
                      >
                        😍
                      </div>
                    ) : (
                      <div
                        className="
                                cursor-pointer
                                text-2xl
                                "
                        onClick={() => {
                          removeEmoji(movie.id);
                        }}
                      >
                        ❌
                      </div>
                    )}
                  </div>
                  <div
                    className="
                    w-full rounded-b-xl
                bg-gray-900 bg-opacity-60
                p-2
                text-center
                font-bold
                text-white
                "
                  >
                    <Link to={`/detail/${movie.id}`}>
                      {movie.title || movie.name}
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <div>
        {showPage ? (
          <Pagination
            pageNum={pageNum}
            onPrev={onPrev}
            onNext={onNext}
          ></Pagination>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Search;
