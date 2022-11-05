import React, { useState, useEffect } from "react";
import { Input } from "reactstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "store";

import { actions as tagListActions } from "store/slice/tagSlice";

import Tag from "components/Tag";

import styles from "./SideTagsMenu.module.scss";

const SideTagsMenu = () => {
  const [tagInputValue, setTagInputValue] = useState("");

  const dispatch = useDispatch();
  const tagList = useSelector((state: any) => state.tag.tagList);

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setTagInputValue(value);
  };

  useEffect(() => {
    dispatch(tagListActions.fetchTagList());
  }, []);

  return (
    <div className={styles.SideTagsMenu}>
      <Input
        className={styles.SideTagsMenu__input}
        value={tagInputValue}
        onChange={handleTagInput}
      />
      <Tag tagList={tagList} tagInputValue={tagInputValue} />
    </div>
  );
};

export default SideTagsMenu;
