import { React, useEffect } from "react";
import "./Nav.module.css.css";
import Logo from "../../assets/Logo Pagina.png";
import { Link } from "react-router-dom";

function Nav() {
  useEffect(() => {
    const body = document.querySelector("body"),
      sidebar = body.querySelector("nav"),
      toggle = body.querySelector(".toggle"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");

    toggle.addEventListener("click", () => {
      sidebar.classList.toggle("close");
    });

    modeSwitch.addEventListener("click", () => {
      body.classList.toggle("dark");

      if (body.classList.contains("dark")) {
        modeText.innerText = "Light mode";
      } else {
        modeText.innerText = "Dark mode";
      }
    });
  }, []);

  return (
    <div>
      <nav className="sidebar close">
        <header>
          <div className="image-text">
            <Link to="/home">
              <span className="image">
                <img src={Logo} alt="" />
              </span>
            </Link>
            <div className="text logo-text">
              <span className="name">Play Zone</span>
            </div>
          </div>

          <i className="bx bx-chevron-right toggle"></i>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              <li className="mode bottom-content">
                <div className="sun-moon">
                  <i className="bx bx-moon icon moon"></i>
                  <i className="bx bx-sun icon sun"></i>
                </div>
                <span className="mode-text text">Dark mode</span>

                <div className="toggle-switch">
                  <span className="switch"></span>
                </div>
              </li>
              <li className="nav-link">
                <a href={"/home"}>
                  <i className="bx bx-home-alt icon"></i>
                  <span className="text nav-text">Home</span>
                </a>
              </li>

              <li className="nav-link">
                <a href={"/create"}>
                  <i className="bx bx-edit icon"></i>
                  <span className="text nav-text">Create</span>
                </a>
              </li>

              <li className="nav-link">
                <a href={"/about"}>
                  <i className="bx bx-user icon"></i>
                  <span className="text nav-text">About</span>
                </a>
              </li>
              <li className="">
                <a href="/">
                  <i className="bx bx-log-out icon"></i>
                  <span className="text nav-text">Logout</span>
                </a>
              </li>
            </ul>
            <div className="cardSocial">
              <li className="">
                <a
                  href="https://www.linkedin.com/in/byron-correa/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bx bxl-linkedin-square icon"></i>
                  <span className="text nav-text">Linkedin</span>
                </a>
              </li>

              <li className="">
                <a
                  href="https://github.com/ByronCorrea"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bx bxl-github icon"></i>
                  <span className="text nav-text">Github</span>
                </a>
              </li>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
