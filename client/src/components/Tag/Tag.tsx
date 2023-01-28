import React from "react";
import cn from "classnames";

import { Button } from "reactstrap";

import styles from "./Tag.module.scss";

const Tag = ({
  id,
  name,
  count,
  currentSeleteTagId,
  getWorkspaceWithTags,
}: {
  id: string;
  name: string;
  count: number;
  currentSeleteTagId: string;
  getWorkspaceWithTags: Function;
}) => {
  return (
    <Button
      className={cn({
        [styles.Tag]: true,
        [styles.Tag__active]: currentSeleteTagId === id,
      })}
      color="primary"
      size="md"
      onClick={() => {
        getWorkspaceWithTags(id);
      }}
    >
      <span className={styles.Tag__name}>{name}</span>
      <span className={styles.Tag__count}>{count}</span>
    </Button>
  );
};

export default Tag;
