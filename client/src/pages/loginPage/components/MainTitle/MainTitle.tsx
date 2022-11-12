import React, { ReactNode } from "react";

import styles from "./MainTitle.module.scss";

const MainTitle = ({
  mainText,
  description,
}: {
  mainText: ReactNode;
  description: ReactNode;
}) => {
  return (
    <section className={styles.MainTitle}>
      <div className={styles.MainTitle__main}>{mainText}</div>
      <div className={styles.MainTitle__description}>{description}</div>
    </section>
  );
};

export default MainTitle;
