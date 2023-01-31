import React from "react";
import cn from "classnames";

import { Button } from "reactstrap";

import styles from "./Tag.module.scss";

const Tag = ({
  id,
  name,
  count,
  getWorkspaceHaveTags,
  currentSeleteTagId,
}: {
  id: string;
  name: string;
  count: number;
  getWorkspaceHaveTags: Function;
  currentSeleteTagId: string;
}) => {
  return (
    <Button
      className={cn({
        [styles.Tag]: true,
        [styles.Tag__active]: currentSeleteTagId === id,
      })}
      color="primary"
      size="md"
      onClick={() => getWorkspaceHaveTags(id)}
    >
      <span className={styles.Tag__name}>{name}</span>
      <span className={styles.Tag__count}>{count}</span>
    </Button>
  );
};

Tag.propTypes = {};

export default Tag;
