import React from "react";
import cn from "classnames";

import styles from "./SimpleWorkspaceSkeleton.module.scss";

const SimpleWorkspaceSkeleton = () => {
  return (
    <div className={styles.SimpleWorkspaceSkeleton}>
      <div className={styles.SimpleWorkspaceSkeleton__top}>
        <div className={styles.SimpleWorkspaceSkeleton__top__image}></div>
      </div>
      <div className={styles.SimpleWorkspaceSkeleton__bottom}>
        <div className={styles.SimpleWorkspaceSkeleton__bottom__title}></div>
        <div className={cn("d-flex", "align-items-center")}>
          <div className={styles.SimpleWorkspaceSkeleton__bottom__date}></div>
          <div className={styles.SimpleWorkspaceSkeleton__bottom__date}></div>
          <div className={styles.SimpleWorkspaceSkeleton__bottom__date}></div>
        </div>
      </div>
    </div>
  );
};

export default SimpleWorkspaceSkeleton;
