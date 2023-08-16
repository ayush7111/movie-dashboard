import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import Pagination from "./Pagination";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [pageNum, setPage] = useState(1);
  const [hovered, setHovered] = useState("");
  const { favourites, addEmoji, removeEmoji } = useContext(AppContext);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/all/week?api_key=2de7d743720872d2f587607311a1db33&page=${pageNum}`
      )
      .then((res) => {
        setMovies(res.data.results);
      });
  }, [pageNum]);
  /* Pagination handlers*/
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
    <div className="mt-8">
      <div
        className="mb-8
            text-center text-2xl font-bold
            "
      >
        Trending Movies
      </div>
      <div
        className="flex 
            flex-wrap
            justify-center
            "
      >
        {movies.length === 0 ? (
          <Oval
            height="80"
            width="80"
            radius="9"
            color="gray"
            secondaryColor="gray"
            ariaLabel="loading"
          />
        ) : (
          movies.map((movie) => {
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
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${movie.poster_path})`,
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
                  <Link to={`detail/${movie.id}`}>
                    {movie.title || movie.name}
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
      <Pagination
        pageNum={pageNum}
        onPrev={onPrev}
        onNext={onNext}
      ></Pagination>
    </div>
  );
};

export default Movies;
