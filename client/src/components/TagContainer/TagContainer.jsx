import React from "react";
import cn from "classnames";

import TagList from "components/TagList";
import styles from "./TagContainer.module.scss";

const TagContainer = () => {
  return (
    <section
      className={cn(
        styles.TagContainer,
        "d-flex",
        "flex-column",
        "align-items-center",
        "me-4",
        "p-4"
      )}
    >
      <h3 className={cn(styles.TagContainer__title, "mb-4")}>Tag List</h3>
      <TagList />
    </section>
  );
};

export default TagContainer;
