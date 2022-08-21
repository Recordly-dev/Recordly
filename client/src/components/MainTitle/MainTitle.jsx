import React from "react";

import styles from "./MainTitle.module.scss";

const TITLE_INFO = {
  MAIN: <span>always Recordly</span>,
  DESCRIPTION: (
    <span>
      Recordly는 "대학생들을 위한 필기 솔루션"이라는 비전으로 <br />
      사용자의 메모에 대해 자동 태깅 및 추천을 해줌으로써
      <br />
      사용자에게 새로운 경험을 줄 수 있도록 생태계를 만들어 나가고 있습니다.
    </span>
  ),
};

const MainTitle = () => {
  return (
    <section className={styles.MainTitle}>
      <div className={styles.MainTitle__main}>{TITLE_INFO.MAIN}</div>
      <div className={styles.MainTitle__description}>
        {TITLE_INFO.DESCRIPTION}
      </div>
    </section>
  );
};

export default MainTitle;
