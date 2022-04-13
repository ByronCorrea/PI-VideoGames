import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import dotenv from "dotenv";
import axios from "axios";
import store from "./store/index";
import { BrowserRouter as Router } from "react-router-dom";

dotenv.config();

axios.defaults.baseURL =
  process.env.REACT_APP_API_KEY || "http://localhost:3001";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
