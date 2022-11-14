import React, { useState } from "react";

import { useDispatch } from "store";

import { actions as workspaceActions } from "store/slice/workspaceSlice";

import styles from "./TagList.module.scss";
import Tag from "components/Tag";

const TagList = ({
  tagList,
  currentSeleteTagId,
  tagInputValue,
  setCurrentSeleteTagId,
}: {
  tagList: any;
  currentSeleteTagId: string;
  tagInputValue: string;
  setCurrentSeleteTagId: Function;
}) => {
  const dispatch = useDispatch();

  const getWorkspaceHaveTags = (tagId: string) => {
    if (currentSeleteTagId === tagId) {
      dispatch(workspaceActions.fetchAllWorkspaceList());
    } else {
      setCurrentSeleteTagId(tagId);
      dispatch(workspaceActions.fetchWorkspacesWithTag({ tagId }));
    }
  };

  return (
    <div className={styles.TagList}>
      {tagList.map(
        (tag: any) =>
          tag.name.includes(tagInputValue) && (
            <Tag
              id={tag?._id}
              name={tag?.name}
              count={tag?.workspaces?.length}
              getWorkspaceHaveTags={getWorkspaceHaveTags}
              currentSeleteTagId={currentSeleteTagId}
            />
          )
      )}
    </div>
  );
};

export default TagList;
