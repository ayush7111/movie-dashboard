import React, { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { Link } from "react-router-dom";
const Banner = () => {
  const [bannerMovie, setBanner] = useState("");
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/all/week?api_key=2de7d743720872d2f587607311a1db33"
      )
      .then((res) => {
        setBanner(res.data.results[0]);
        console.log(bannerMovie);
      });
  }, []);

  return (
    <>
      {bannerMovie === "" ? (
        <div className="flex justify-center">
          <Oval
            height="80"
            width="80"
            radius="9"
            color="grey"
            secondaryColor="grey"
            ariaLabel="loading"
          />
        </div>
      ) : (
        <div
          className="flex h-[40vh] items-end bg-cover bg-center md:h-[60vh]"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/original/${bannerMovie.backdrop_path})`,
          }}
        >
          <div className="w-full bg-gray-900 bg-opacity-60 p-4 text-center text-xl text-white md:text-3xl">
            <Link to={`/detail/${bannerMovie.id}`}>{bannerMovie.title}</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
