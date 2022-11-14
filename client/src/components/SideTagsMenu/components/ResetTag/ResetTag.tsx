import React from "react";

import { useDispatch } from "store";

import RefreshIcon from "common/assets/icons/RefreshIcon";

import { actions as workspaceActions } from "store/slice/workspaceSlice";

import CONSTANT from "../../constants";

import styles from "./ResetTag.module.scss";
import { Button } from "reactstrap";

const ResetTag = ({
  setTagInputValue,
  setIsSortByAlpha,
  sortTagList,
}: {
  setTagInputValue: Function;
  setIsSortByAlpha: Function;
  sortTagList: Function;
}) => {
  const dispatch = useDispatch();

  const resetWorkspaceList = () => {
    dispatch(workspaceActions.fetchAllWorkspaceList());
    setTagInputValue("");
    sortTagList("count");
  };

  return (
    <Button color="link" className={styles.ResetTag}>
      <RefreshIcon
        className={styles.ResetTag__icon}
        width={CONSTANT.ICON_SIZE.REFRESH}
        height={CONSTANT.ICON_SIZE.REFRESH}
        onClick={resetWorkspaceList}
        color="#858899"
      />
    </Button>
  );
};

ResetTag.propTypes = {};

export default ResetTag;
