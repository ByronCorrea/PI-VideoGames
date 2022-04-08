import "./App.css";
import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";
import About from "./components/About/About";
import Create from "./components/Create/Create";
import { Route, BrowserRouter } from "react-router-dom";
// import GameDetails from "./components/GameDetails/GameDetails";
// import Page404 from "./components/Page404/Page404";
// import Videogames from "./components/Videogames/Videogames";
// import { useEffect } from "react";

function App() {
  return (
    <div className="App">
      {/*  */}
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route exat path={"/about"} component={About} />
        <Route
          path={[
            "/home",
            "/detail/",
            "/create",
            "/about",
            "/videogame/:idVideogame",
          ]}
          component={Nav}
        />
        <Route exact path="/create" component={Create} />
        {/* <Route path="*" component={Page404} /> */}
        {/* <Route exact path="/home" component={Videogames} /> */}
        {/* <Route exact path="/videogame/:idVideogame" component={GameDetails} />  */}
      </BrowserRouter>
    </div>
  );
}

export default App;
