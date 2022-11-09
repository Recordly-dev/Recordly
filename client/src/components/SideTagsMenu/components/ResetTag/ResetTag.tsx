import React from "react";

import { useDispatch } from "store";

import RefreshIcon from "common/assets/icons/RefreshIcon";

import { actions as workspaceActions } from "store/slice/workspaceSlice";

import CONSTANT from "../../constants";

import styles from "./ResetTag.module.scss";

const ResetTag = ({ setTagInputValue }: { setTagInputValue: Function }) => {
  const dispatch = useDispatch();

  const resetWorkspaceList = () => {
    dispatch(workspaceActions.fetchAllWorkspaceList());
    setTagInputValue("");
  };
  return (
    <div className={styles.ResetTag}>
      <RefreshIcon
        className={styles.ResetTag__icon}
        width={CONSTANT.ICON_SIZE.REFRESH}
        height={CONSTANT.ICON_SIZE.REFRESH}
        onClick={resetWorkspaceList}
        color="#858899"
      />
    </div>
  );
};

ResetTag.propTypes = {};

export default ResetTag;
