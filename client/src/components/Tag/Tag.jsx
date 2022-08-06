import React from "react";
import { Button } from "reactstrap";
import cn from "classnames";

import styles from "./Tag.module.scss";

const Tag = ({ tagList }) => {
  return (
    <div className={cn(styles.Tag, "d-flex", "flex-column")}>
      {tagList.map((tag) => (
        <Button
          className={cn(
            styles.Tag__tag,
            "d-flex",
            "align-items-center",
            "justify-content-center"
          )}
          color="primary"
          size="md"
        >
          <span>{tag.text}</span>
          <span className={styles.Tag__tag__count}>({tag.count})</span>
        </Button>
      ))}
    </div>
  );
};

export default Tag;
