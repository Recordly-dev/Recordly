import React from "react";

import { useGetWorkspaces } from "query-hooks/useFetchWorkspace";
import { actions as tagListActions } from "store/slice/tagSlice";
import { useDispatch } from "store";

import { Button } from "reactstrap";
import RefreshIcon from "common/assets/icons/RefreshIcon";

import styles from "./ResetTag.module.scss";

import CONSTANT from "./constants";

const ResetTag = ({
  setIsSortByName,
  setTagInputValue,
  sortByCountTagList,
}: {
  setIsSortByName: Function;
  setTagInputValue: Function;
  sortByCountTagList: Function;
}) => {
  const dispatch = useDispatch();

  const { refetch: refetchWorkspaces } = useGetWorkspaces();

  const resetWorkspaceList = () => {
    refetchWorkspaces();

    setTagInputValue("");
    setIsSortByName(false);
    sortByCountTagList(false);

    dispatch(tagListActions.updateCurrentTagId({ tagId: "" }));
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
