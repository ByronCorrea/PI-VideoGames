import React from "react";
import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.backGround}>
      <div className={styles.cuerpo}>
        <span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>

        <div className={styles.base}></div>
        <div className={styles.face}></div>
      </div>

      <div className={styles.longfazers}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={styles.outbutton}>
        <button className={styles.cornerButton}>
          <span>LOADING</span>
        </button>
      </div>
    </div>
  );
}

export default Loader;
