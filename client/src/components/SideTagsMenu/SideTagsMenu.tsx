import React, { useState, useEffect } from "react";
import cn from "classnames";
import { useSelector } from "react-redux";
import { useDispatch } from "store";

import { actions as tagListActions } from "store/slice/tagSlice";

import TagList from "components/TagList";
import EmptyTagList from "components/EmptyTagList";

import SortBigOrderIcon from "common/assets/icons/SortBigOrderIcon";
import SortBasicOrderIcon from "common/assets/icons/SortBasicOrderIcon";

import styles from "./SideTagsMenu.module.scss";

import CONSTANT from "./constants";
import SearchInput from "components/SearchInput";
import ResetTag from "./components/ResetTag";

const SideTagsMenu = () => {
  const [sortType, setSortType] = useState("basic");
  const [tagInputValue, setTagInputValue] = useState("");

  const dispatch = useDispatch();
  const tagList = useSelector((state: any) => state.tag.tagList);

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setTagInputValue(value);
  };

  const sortTagList = (type: string) => {
    if (type === "basic") {
      dispatch(tagListActions.fetchSortTagList({ type: "count" }));
      setSortType("count");
    } else {
      dispatch(tagListActions.fetchSortTagList({ type: "basic" }));
      setSortType("basic");
    }
  };

  useEffect(() => {
    dispatch(tagListActions.fetchTagList());
  }, []);

  const isEmptyTagList =
    tagList.filter((tag: any) => tag.name.includes(tagInputValue)).length ===
      0 || tagList.length === 0;

  return (
    <div className={styles.SideTagsMenu}>
      <div className={styles.SideTagsMenu__container}>
        <div className={styles.SideTagsMenu__header} />
        <div className={styles.SideTagsMenu__subHeader}>
          <span>Tags</span>
          {sortType === "basic" ? (
            <SortBigOrderIcon
              width={CONSTANT.ICON_SIZE.SORT}
              height={CONSTANT.ICON_SIZE.SORT}
              color="#3e404c"
              onClick={() => sortTagList(sortType)}
            />
          ) : (
            <SortBasicOrderIcon
              width={CONSTANT.ICON_SIZE.SORT}
              height={CONSTANT.ICON_SIZE.SORT}
              color="#3e404c"
              onClick={() => sortTagList(sortType)}
            />
          )}
        </div>
        <div className={cn("d-flex", "align-items-center", "mb-3")}>
          <SearchInput
            className={styles.SideTagsMenu__Searchbar}
            inputClassName={styles.SideTagsMenu__Searchbar__input}
            value={tagInputValue}
            placeholder="Search Tags"
            onChange={handleTagInput}
          />
          <ResetTag
            setTagInputValue={setTagInputValue}
            sortTagList={sortTagList}
          />
        </div>
        {isEmptyTagList ? (
          <EmptyTagList />
        ) : (
          <TagList tagList={tagList} tagInputValue={tagInputValue} />
        )}
      </div>
    </div>
  );
};

export default SideTagsMenu;
