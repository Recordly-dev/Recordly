import React from "react";

import styles from "./MoveToBackCard.module.scss";

const MoveToBackCard = ({ moveGoBack }: { moveGoBack: any }) => (
  <div className={styles.MoveToBackCard} onClick={moveGoBack}>
    <div>
      <h1 className={styles.MoveToBackCard__title}>뒤로 가기</h1>
    </div>
  </div>
);

export default MoveToBackCard;
