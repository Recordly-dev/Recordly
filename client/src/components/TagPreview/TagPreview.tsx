import React from "react";
import cn from "classnames";
import { Button } from "reactstrap";

import styles from "./TagPreview.module.scss";

const TagPreview = ({ name }: { name: string }) => {
  return (
    <Button
      className={cn(
        styles.TagPreview,
        "d-flex",
        "align-items-center",
        "justify-content-center"
      )}
      color="primary"
      size="md"
      disabled
    >
      <span className={styles.TagPreview__name}>{name}</span>
    </Button>
  );
};

export default TagPreview;
