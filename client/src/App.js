import "./App.css";
import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";
import About from "./components/About/About";
import Create from "./components/Create/Create.jsx";
import SidePanel from "./components/SidePanel/SidePanel";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";

import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
        <Route path="/home" component={SidePanel} />
        <Route exact path="/" component={Login} />
        <Switch>
          <Route exact path="/detail/:id" component={Detail} />
          <Route exact path="/home" component={Home} />
          <Route exat path={"/about"} component={About} />
          <Route exact path="/create" component={Create} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
