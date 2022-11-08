import React from "react";
import cn from "classnames";

import BackIcon from "common/assets/icons/BackIcon";
import styles from "./MoveToBackButton.module.scss";

import CONSTANT from "./constants";

const MoveToBackButton = ({ moveGoBack }: { moveGoBack: any }) => (
  <div className={styles.MoveToBackButton} onClick={moveGoBack}>
    <div
      className={cn("d-flex", "align-items-center", "justify-content-center")}
    >
      <BackIcon
        width={CONSTANT.ICON_SIZE}
        height={CONSTANT.ICON_SIZE}
        color="#3e404c"
      />
    </div>
  </div>
);

export default MoveToBackButton;
