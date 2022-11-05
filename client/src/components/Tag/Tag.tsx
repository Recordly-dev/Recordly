import React, { useEffect, useState } from "react";

import { useDispatch } from "store";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";

import { actions as workspaceActions } from "store/slice/workspaceSlice";

import { IWorkspace } from "types/workspace";
import cn from "classnames";

import styles from "./Tag.module.scss";

const Tag = ({ tagList }: { tagList: any }) => {
  const dispatch = useDispatch();
  const workspaceList = useSelector(
    (state: any) => state.workspace.workspaceList
  );

  const getWorkspaceHaveTags = (workspace: IWorkspace[], tagName: string) => {
    const filterWorkspace = workspace.filter((v: any) => {
      const tagsArr = v.tags.map((tag: any) => tag.name);

      return tagsArr.includes(tagName);
    });

    dispatch(workspaceActions.setWorkspaceList(filterWorkspace));
  };

  return (
    <div className={cn(styles.Tag, "d-flex", "flex-column")}>
      {tagList.map((tag: any) => (
        <Button
          className={cn(
            styles.Tag__tag,
            "d-flex",
            "align-items-center",
            "justify-content-center"
          )}
          color="primary"
          size="md"
          onClick={() => getWorkspaceHaveTags(workspaceList, tag.name)}
        >
          <span>{tag?.name}</span>
          <span className={styles.Tag__tag__count}>
            ({tag.workspaces?.length})
          </span>
        </Button>
      ))}
    </div>
  );
};

export default Tag;
