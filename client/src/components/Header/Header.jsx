import React from "react";
import propTypes from "prop-types";
import imageUrl from "assets/images/logo.png";

import styles from "./Header.module.scss";

const Header = ({ imageUrl }) => {
  return (
    <header className={styles.Header}>
      <img src={imageUrl} className={styles.Header__image} alt="logoImage" />
      <h1 className={styles.Header__title}>Recordly</h1>
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
