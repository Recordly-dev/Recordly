import React from "react";

import styles from "./WorkspaceSkeleton.module.scss";

const WorkspaceSkeleton = () => (
  <div className={styles.WorkspaceSkeleton}>
    <div className={styles.WorkspaceSkeleton__top}></div>
    <div className={styles.WorkspaceSkeleton__bottom}>
      <div className={styles.WorkspaceSkeleton__bottom__title}></div>
      <div className={styles.WorkspaceSkeleton__bottom__date}></div>
    </div>
  </div>
);

export default WorkspaceSkeleton;
