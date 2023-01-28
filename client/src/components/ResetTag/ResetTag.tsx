import React from "react";

import { useGetWorkspaces } from "query-hooks/useFetchWorkspcae";

import { Button } from "reactstrap";
import RefreshIcon from "common/assets/icons/RefreshIcon";

import styles from "./ResetTag.module.scss";

import CONSTANT from "./constants";

const ResetTag = ({
  setTagInputValue,
  setCurrentSeleteTagId,
  sortTagList,
}: {
  setTagInputValue: Function;
  setCurrentSeleteTagId: Function;
  sortTagList: Function;
}) => {
  const { refetch: refetchWorkspaces } = useGetWorkspaces();

  const resetWorkspaceList = () => {
    refetchWorkspaces();
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
