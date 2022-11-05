import React, { useState } from "react";

import { useDispatch } from "store";
import { Button } from "reactstrap";

import { actions as workspaceActions } from "store/slice/workspaceSlice";

import cn from "classnames";

import styles from "./Tag.module.scss";

const Tag = ({
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
    <div className={cn(styles.Tag, "d-flex", "flex-column")}>
      {tagList.map(
        (tag: any) =>
          tag.name.includes(tagInputValue) && (
            <Button
              className={cn(
                styles.Tag__tag,
                "d-flex",
                "align-items-center",
                "justify-content-center"
              )}
              color="primary"
              size="md"
              onClick={() => getWorkspaceHaveTags(tag?._id)}
            >
              <span>{tag?.name}</span>
              <span className={styles.Tag__tag__count}>
                ({tag.workspaces?.length})
              </span>
            </Button>
          )
      )}
    </div>
  );
};

export default Tag;
