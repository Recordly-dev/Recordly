import React from "react";

import PlusIcon from "common/assets/icons/PlusIcon";

import styles from "./RecommendedTagSkeleton.module.scss";

const RecommendedTagSkeleton = () => {
  return (
    <div>
      <div className={styles.RecommendedTagSkeleton}>
        <div className={styles.RecommendedTagSkeleton__text}></div>
        <PlusIcon
          className={styles.RecommendedTagSkeleton__icon}
          color="rgb(203, 203, 203)"
        />
      </div>
    </div>
  );
};

export default RecommendedTagSkeleton;
