import React from "react";
import cn from "classnames";

import styles from "./MainTitle.module.scss";

const TITLE_INFO = {
  MAIN: (
    <>
      <h2>
        대학생들을 위한
        <br />
        필기 솔루션
      </h2>
    </>
  ),
  SUB: <h1>Recordly</h1>,
};

const MainTitle = () => {
  return (
    <section className={cn(styles.MainTitle)}>
      <div className={styles.MainTitle__main}>{TITLE_INFO.MAIN}</div>
      <div className={styles.MainTitle__sub}>{TITLE_INFO.SUB}</div>
    </section>
  );
};

export default MainTitle;
