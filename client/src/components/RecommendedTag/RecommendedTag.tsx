import PlusIcon from "common/assets/icons/PlusIcon";

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
}) => (
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
  </div>
);

export default RecommendedTag;
