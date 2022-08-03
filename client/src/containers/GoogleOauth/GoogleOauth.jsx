import React from "react";
import axios from "axios";

import googleLoginImage from "./assets/images/googleLoginButtonImage.png";

import styles from "./GoogleOauth.module.scss";

const GoogleOauth = () => {
  const onClickGoogleLogin = () => {
    axios.get("http://localhost:8080/api/auth/google/callback");
  };

  return (
    <div className={styles.GoogleOauth}>
      <a href="http://localhost:8080/api/auth/google">
        <img
          src={googleLoginImage}
          className={styles.GoogleOauth__image}
          onClick={onClickGoogleLogin}
          alt="google Login"
        />
      </a>
    </div>
  );
};

export default GoogleOauth;
