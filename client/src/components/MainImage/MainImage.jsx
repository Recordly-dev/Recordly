import React from "react";

import styles from "./MainImage.module.scss";
import rightSectionImage from "./assets/images/mainImage.png";

const MainImage = () => {
  return (
    <div className={styles.MainImage}>
      <img src={rightSectionImage} alt="right section logo" />
    </div>
  );
};

export default MainImage;
