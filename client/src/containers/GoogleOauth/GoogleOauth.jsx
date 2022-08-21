import React from "react";

import styles from "./GoogleOauth.module.scss";

const GoogleOauth = () => {
  return (
    <div className={styles.GoogleOauth}>
      <a href="http://localhost:8080/api/auth/google">
        <button className={styles.GoogleOauth__button}>Google Login</button>
      </a>
    </div>
  );
};

export default GoogleOauth;
