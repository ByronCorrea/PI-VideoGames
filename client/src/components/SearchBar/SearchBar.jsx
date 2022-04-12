import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../Actions/index";
import styles from "./SearchBar.module.css";
function SearchBar() {
  const [byName, setByName] = useState(true);
  const [placeholder, setPlaceholder] = useState("Search...");

  const dispatch = useDispatch();

  function handleStateChange(e) {
    e.preventDefault(e);
    setByName(!byName);
  }

  function handleOnSearch(e) {
    e.preventDefault();
    if (e.target[0].value === "") {
      setPlaceholder("Write something!");
    } else {
      let dir = window.location.href.split("/");
      let reDirBase = dir[0] + "//" + dir[1] + "/" + dir[2];
      byName
        ? dispatch(searchByName(e.target[0].value))
        : window.location.assign(`${reDirBase}/detail/${e.target[0].value}`);
    }
    const input = document.getElementById("search-bar-input");
    input.value = "";
  }
  return (
    <div>
      <form
        type="submit"
        onSubmit={(e) => handleOnSearch(e)}
        className={styles.searchBar}
      >
        <input
          placeholder={placeholder}
          id="search-bar-input"
          autoComplete="off"
        />
        <button type="submit" className={styles.buttonSearch}>
          <i className="bx bx-search"></i>
        </button>
      </form>
      <button
        className={styles.buttonSearch2}
        onClick={(e) => handleStateChange(e)}
      >
        {byName ? "Name" : "ID"}
      </button>
    </div>
  );
}

export default SearchBar;
