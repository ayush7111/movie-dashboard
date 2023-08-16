import "./App.css";
import NavBar from "./component/NavBar";
import Banner from "./component/Banner";
import Movies from "./component/Movies";
import Favourites from "./component/Favourites";
import PageNotFound from "./component/PageNotFound";
import Search from "./component/Search";
import { Route, Routes } from "react-router-dom";
import MovieDetails from "./component/MovieDetails";
function App() {
  return (
    <>
      <NavBar></NavBar>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner></Banner>
              <Movies></Movies>
            </>
          }
        ></Route>
        <Route path="fav" element={<Favourites></Favourites>}></Route>
        <Route path="search" element={<Search></Search>}></Route>
        <Route
          path="detail/:id"
          element={<MovieDetails></MovieDetails>}
        ></Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
    </>
  );
}

export default App;
