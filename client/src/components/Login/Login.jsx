import React from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
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

      {/* <div className={styles.longfazers}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div> */}

      <div className={styles.outbutton}>
        <Link to="/home">
          <button className={styles.cornerButton}>
            <span>LOGIN</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
