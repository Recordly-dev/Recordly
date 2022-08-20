import React from "react";
import cn from "classnames";
import propTypes from "prop-types";
import imageUrl from "assets/images/logo.png";

import styles from "./Header.module.scss";

const Header = ({ imageUrl, isLogin }) => {
  return (
    <header
      className={cn(
        styles.Header,
        "d-flex",
        "align-items-center",
        "justify-content-between",
        "ps-4",
        "pe-4"
      )}
    >
      <div className={cn(styles.Header__left, "d-flex", "align-items-center")}>
        <img src={imageUrl} className={styles.Header__image} alt="logoImage" />
        <h1 className={styles.Header__title}>Recordly</h1>
      </div>
      {isLogin && (
        <div className={styles.Header_right}>
          <button>Logout</button>
        </div>
      )}
    </header>
  );
};

Header.propTypes = {
  imageUrl: propTypes.string,
};

Header.defaultProps = {
  imageUrl: imageUrl,
};

export default Header;
