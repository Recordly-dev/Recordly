import React from "react";

import styles from "./EmptyTagList.module.scss";

import emptyImage from "./assets/images/emptyTag.svg";

const EmptyTagList = () => (
  <div className={styles.EmptyTagList}>
    <img
      className={styles.EmptyTagList__image}
      src={emptyImage}
      alt="empty status"
    />
  </div>
);

export default EmptyTagList;
