import React, { useState } from "react";

import { useDispatch } from "store";

import { actions as workspaceActions } from "store/slice/workspaceSlice";

import styles from "./TagList.module.scss";
import Tag from "components/Tag";

const TagList = ({
  tagList,
  tagInputValue,
}: {
  tagList: any;
  tagInputValue: string;
}) => {
  const [isSeletedTag, setIsSeletedTag] = useState(false);
  const [currentSeleteTagId, setCurrentSeleteTagId] = useState("");
  const dispatch = useDispatch();

  const getWorkspaceHaveTags = (tagId: string) => {
    if (currentSeleteTagId === tagId && isSeletedTag) {
      setIsSeletedTag(false);
      dispatch(workspaceActions.fetchAllWorkspaceList());
    } else {
      setIsSeletedTag(true);
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
            />
          )
      )}
    </div>
  );
};

export default TagList;
