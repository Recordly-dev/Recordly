import React from "react";

import styles from "./GoogleOauth.module.scss";

const GoogleOauth = () => (
  <div className={styles.GoogleOauth}>
    <a
      href={`http://localhost:${
        process.env.REACT_APP_BACKEND_PORT || 8080
      }/api/auth/google`}
    >
      <button className={styles.GoogleOauth__button}>Google Login</button>
    </a>
  </div>
);

export default GoogleOauth;
