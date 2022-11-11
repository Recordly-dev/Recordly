import React from "react";

import PlusIcon from "common/assets/icons/PlusIcon";

import styles from "./RecommendedTag.module.scss";

import CONSTANT from "../../constants";

const RecommendedTag = ({
  tagName,
  saveRecommendedTag,
}: {
  tagName: string;
  saveRecommendedTag: Function;
}) => {
  return (
    <div className={styles.RecommendedTag} color="primary">
      <span className={styles.RecommendedTag__text}># {tagName}</span>
      <PlusIcon
        className={styles.RecommendedTag__icon}
        onClick={() => saveRecommendedTag(tagName)}
        width={CONSTANT.ICON_SIZE.PLUS}
        height={CONSTANT.ICON_SIZE.PLUS}
      />
    </div>
  );
};

export default RecommendedTag;
