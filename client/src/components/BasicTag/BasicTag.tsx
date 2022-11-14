import React from "react";

import CloseIcon from "common/assets/icons/CloseIcon";

import styles from "./BasicTag.module.scss";

import CONSTANT from "./constants";

const BasicTag = ({
  tagId,
  workspaceId,
  tagName,
  idx,
  handleDeleteTag,
  handlePatchTag,
}: {
  tagId: string;
  workspaceId: string;
  tagName: string;
  idx: number;
  handleDeleteTag: Function;
  handlePatchTag: Function;
}) => (
  <div className={styles.Tag}>
    <div
      className={styles.Tag__name}
      role="button"
      tabIndex={0}
      onClick={() => handlePatchTag(tagName, tagId, workspaceId, idx)}
    >
      <span>#</span>
      <span>{tagName}</span>
    </div>

    <div
      className={styles.Tag__deleteButton}
      onClick={() => handleDeleteTag(tagId, workspaceId)}
    >
      <CloseIcon
        width={CONSTANT.ICON_SIZE.CLOSE}
        height={CONSTANT.ICON_SIZE.CLOSE}
      />
    </div>
  </div>
);

BasicTag.propTypes = {};

export default BasicTag;
