import React, { useState } from "react";

import PlusIcon from "common/assets/icons/PlusIcon";
import { Tooltip } from "reactstrap";

import styles from "./RecommendedTag.module.scss";

import CONSTANT from "./constants";

const RecommendedTag = ({
  idx,
  tagName,
  saveRecommendedTag,
}: {
  idx: number;
  tagName: string;
  saveRecommendedTag: Function;
}) => {
  const [tootipOpen, setTooltipOpen] = useState(false);

  const toggleTooltip = () => {
    setTooltipOpen((prev) => !prev);
  };
  return (
    <div>
      <div
        id={`${tagName}${idx}`}
        className={styles.RecommendedTag}
        color="primary"
      >
        <span className={styles.RecommendedTag__text}># {tagName}</span>
        <PlusIcon
          className={styles.RecommendedTag__icon}
          onClick={() => saveRecommendedTag(tagName)}
          width={CONSTANT.ICON_SIZE.PLUS}
          height={CONSTANT.ICON_SIZE.PLUS}
        />
      </div>
      {/*<Tooltip
        placement="top"
        isOpen={tootipOpen}
        target={`${tagName}${idx}`}
        toggle={toggleTooltip}
      >
        <span className={styles.RecommendedTag__tooltip}>Recommended Tags</span>
  </Tooltip>*/}
    </div>
  );
};

export default RecommendedTag;
