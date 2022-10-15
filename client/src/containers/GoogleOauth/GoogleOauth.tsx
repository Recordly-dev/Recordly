import React from "react";

import styles from "./GoogleOauth.module.scss";

const GoogleOauth = () => (
  <div className={styles.GoogleOauth}>
    <a href={`/api/auth/google`}>
      <button className={styles.GoogleOauth__button}>Google Login</button>
    </a>
  </div>
);

export default GoogleOauth;
