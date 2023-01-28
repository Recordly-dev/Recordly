import React from "react";

import { useResetWorkspace } from "query-hooks/useFetchWorkspcae";

import { Button } from "reactstrap";
import RefreshIcon from "common/assets/icons/RefreshIcon";

import styles from "./ResetTag.module.scss";

import CONSTANT from "./constants";

const ResetTag = ({
  setTagInputValue,
  setIsSortByAlpha,
  setCurrentSeleteTagId,
  sortTagList,
}: {
  setTagInputValue: Function;
  setIsSortByAlpha: Function;
  setCurrentSeleteTagId: Function;
  sortTagList: Function;
}) => {
  const { mutate: resetWorkspace } = useResetWorkspace();

  const resetWorkspaceList = () => {
    resetWorkspace();
    setTagInputValue("");
    setCurrentSeleteTagId("");
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
