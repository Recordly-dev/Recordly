import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import cn from "classnames";

import styles from "./Tag.module.scss";

const countTags = (tagList) => {
  let tagsCount = {};

  tagList.forEach((tags) => {
    tags.forEach((tag) => {
      if (!tagsCount[tag]) {
        tagsCount[tag] = 1;
      } else {
        tagsCount[tag]++;
      }
    });
  });

  return Object.entries(tagsCount).sort((a, b) => b[1] - a[1]);
};

const Tag = ({ tagList }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags(countTags(tagList));
  }, [tagList]);

  return (
    <div className={cn(styles.Tag, "d-flex", "flex-column")}>
      {tags.map((tag) => (
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
          <span>{tag[0]}</span>
          <span className={styles.Tag__tag__count}>({tag[1]})</span>
        </Button>
      ))}
    </div>
  );
};

export default Tag;
