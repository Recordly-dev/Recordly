import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "store";

import { actions as tagListActions } from "store/slice/tagList";

import Tag from "components/Tag";

import styles from "./SideTagsMenu.module.scss";

const SideTagsMenu = () => {
  const dispatch = useDispatch();
  const tagList = useSelector((state: any) => state.tag.tagList);

  console.log(tagList);

  useEffect(() => {
    dispatch(tagListActions.fetchTagList());
  }, []);
  return (
    <div className={styles.SideTagsMenu}>
      <Tag tagList={tagList.map((v: any) => v.name)} />
    </div>
  );
};

export default SideTagsMenu;
