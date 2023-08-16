import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div
      className="
      flex items-center
      space-x-8
      py-4 pl-3
       "
    >
      <Link
        to="/"
        className="text-xl 
            font-bold
            text-red-700
            "
      >
        Movies
      </Link>
      <Link
        to="/fav"
        className="text-xl
            font-bold
            text-red-700
            
            "
      >
        Favourites
      </Link>
      <Link
        to="/search"
        className="text-xl
            font-bold
            text-red-700
            
            "
      >
        Search
      </Link>
    </div>
  );
};

export default NavBar;
