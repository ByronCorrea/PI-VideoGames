import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Home.module.css";
import Loader from "../Loader/Loader";
import Page from "../Page/Page";
import Pagination from "../Pagination/Pagination";
import { clearDetail, getGames } from "../../Actions";
import { TabTitle } from "../GeneralFunctions";

export default function Home() {
  TabTitle("Home");

  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);

  const [results] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(clearDetail());
    !allVideogames.length && dispatch(getGames());
    setCurrentPage(1);
  }, [dispatch, results, allVideogames]);

  function handlePaginate(n) {
    setCurrentPage(n);
  }

  const indexOfLastPost = currentPage * results;
  const indexOfFirstPost = indexOfLastPost - results;
  const currentPosts = allVideogames?.slice(indexOfFirstPost, indexOfLastPost);
  return allVideogames.length === 0 ? (
    <div>
      <Loader />
    </div>
  ) : allVideogames === "Error" ? (
    <div>
      <h3>Nothing found</h3>
    </div>
  ) : (
    <div className={styles.global}>
      <div className={styles.home}>
        <div className={styles.pagination}>
          <Pagination
            currentPage={currentPage}
            results={results}
            totalPosts={allVideogames.length}
            handlePaginate={handlePaginate}
          />
        </div>

        <div className={styles.pagination}>
          <Pagination
            currentPage={currentPage}
            results={results}
            totalPosts={allVideogames.length}
            handlePaginate={handlePaginate}
          />
        </div>

        <div className={styles.page}>
          <Page gamesInPage={currentPosts} />
        </div>
      </div>
    </div>
  );
}
