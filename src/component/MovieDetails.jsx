import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const MovieDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [detail, setdetail] = useState({});
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=2de7d743720872d2f587607311a1db33`
      )
      .then((res) => setdetail(res.data))
      .catch((err) => {
        console.log(err);
      });
    return () => {
      setdetail({});
    };
  }, [id]);
  return (
    <>
      <div className=" ml-1 mt-10 flex gap-5">
        <img
          alt=""
          src={`https://image.tmdb.org/t/p/original/t/p/w200/${detail.poster_path}`}
          className="h-[50vh] rounded-md"
        />
        <div>
          <div className="mb-5 text-3xl font-extrabold">
            Title:-{detail.original_title}
          </div>
          <div className="mb-5 text-xl">
            Release Date:- {detail.release_date}
          </div>
          <div className="text-xl">Overview:-{detail.overview}</div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
