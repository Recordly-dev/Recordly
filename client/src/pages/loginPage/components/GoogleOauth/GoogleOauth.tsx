import React, { forwardRef } from "react";

import styles from "./GoogleOauth.module.scss";

import googleLogo from "./assets/images/googleLogo.png";

const GoogleOauth = forwardRef(({ loginRef }: { loginRef: any }) => {
  return (
    <div ref={loginRef} className={styles.GoogleOauth}>
      <a href={`/api/auth/google`}>
        <button className={styles.GoogleOauth__button}>
          <img
            className={styles.GoogleOauth__button__logo}
            src={googleLogo}
            alt="google"
          />
          <span>Google Login</span>
        </button>
      </a>
    </div>
  );
});

export default GoogleOauth;
