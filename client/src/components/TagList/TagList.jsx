import React, { useEffect, useState } from "react";

import Tag from "components/Tag";
import styles from "./TagList.module.scss";

const TagList = ({ workspaceList, getWorkspaceHaveTags }) => {
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    setTagList(workspaceList.map((data) => data.tags));
  }, []);

  return (
    <Tag
      tagList={tagList}
      workspaceList={workspaceList}
      getWorkspaceHaveTags={getWorkspaceHaveTags}
    />
  );
};

export default TagList;
