import React, { useState, useEffect } from "react";
import cn from "classnames";
import { useSelector } from "react-redux";
import { useDispatch } from "store";

import { actions as tagListActions } from "store/slice/tagSlice";

import TagList from "components/TagList";
import EmptyTagList from "components/EmptyTagList";

import SortBigOrderIcon from "common/assets/icons/SortBigOrderIcon";

import styles from "./SideTagsMenu.module.scss";

import CONSTANT from "./constants";
import SearchInput from "components/SearchInput";
import ResetTag from "./components/ResetTag";

const SideTagsMenu = () => {
  const [sortType, setSortType] = useState("basic");
  const [isSortByAlpha, setIsSortByAlpha] = useState(false);
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

  const sortByAlphaTagList = () => {
    setIsSortByAlpha((prev) => !prev);
  };

  useEffect(() => {
    dispatch(tagListActions.fetchSortByAlphaTagList({ isSort: isSortByAlpha }));
  }, [isSortByAlpha]);

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
          <div className={styles.SideTagsMenu__icons}>
            <span
              onClick={sortByAlphaTagList}
              className={cn({
                "material-symbols-outlined": true,
                [styles.SideTagsMenu__sortIcon]: true,
                [styles.SideTagsMenu__sortIcon__active]: isSortByAlpha,
              })}
            >
              sort_by_alpha
            </span>
            <SortBigOrderIcon
              width={CONSTANT.ICON_SIZE.SORT}
              height={CONSTANT.ICON_SIZE.SORT}
              color={sortType === "basic" ? "#3e404c" : "#0c7ae2"}
              onClick={() => sortTagList(sortType)}
            />
          </div>
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
            setIsSortByAlpha={setIsSortByAlpha}
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
