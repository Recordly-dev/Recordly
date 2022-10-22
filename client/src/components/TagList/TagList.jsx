import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWorkspace } from "store/slice/workspaceList";

import Tag from "components/Tag";
import styles from "./TagList.module.scss";

const TagList = () => {
  const dispatch = useDispatch();
  const [tagList, setTagList] = useState([]);

  const workspaceList = useSelector((state) => state.workspace.workspaceList);

  useEffect(() => {
    dispatch(fetchWorkspace());
  }, [dispatch]);

  useEffect(() => {
    setTagList(workspaceList.map((data) => data.tags));
  }, [workspaceList]);

  return <Tag tagList={tagList} workspaceList={workspaceList} />;
};

export default TagList;
