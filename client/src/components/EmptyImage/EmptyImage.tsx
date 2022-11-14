import React from "react";

import styles from "./EmptyImage.module.scss";

import emptyImage from "./assets/images/emptyTag.svg";

const EmptyImage = () => (
  <div className={styles.EmptyImage}>
    <img
      className={styles.EmptyImage__image}
      src={emptyImage}
      alt="empty status"
    />
  </div>
);

export default EmptyImage;
