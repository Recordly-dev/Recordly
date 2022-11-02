import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Button } from "reactstrap";
import cn from "classnames";

import styles from "./Tag.module.scss";

const Tag = ({ tagList }: {tagList: any}) => {
  const workspaceList = useSelector(
    (state: any) => state.workspace.workspaceList
  );

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
          // onClick={() => getWorkspaceHaveTags(tag[0])}
        >
          <span>{tag.name}</span>
          <span className={styles.Tag__tag__count}>({tag.workspaces.length})</span>
        </Button>
      ))}
    </div>
  );
};

export default Tag;
