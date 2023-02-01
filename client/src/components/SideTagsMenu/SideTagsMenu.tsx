import React, { useState } from "react";
import cn from "classnames";
import { useSelector } from "react-redux";
import { useDispatch } from "store";

import { actions as tagListActions } from "store/slice/tagSlice";

import {
  useGetTags,
  useGetTagsSortedByName,
  useGetTagsSortedByCount,
} from "query-hooks/useFetchTag";
import { useGetWorkspacesWithTag } from "query-hooks/useFetchWorkspace";

import TagList from "components/TagList";
import EmptyImage from "components/EmptyImage";
import SearchInput from "components/SearchInput";
import ResetTag from "components/ResetTag";

import SortBigOrderIcon from "common/assets/icons/SortBigOrderIcon";

import styles from "./SideTagsMenu.module.scss";

import { ITag } from "types/tag";
import { RootState } from "store";

import CONSTANT from "./constants";

const SideTagsMenu = () => {
  const [isSortByCount, setIsSortByCount] = useState(false);
  const [isSortByName, setIsSortByName] = useState(false);
  const [tagInputValue, setTagInputValue] = useState("");

  const currentSeleteTagId = useSelector(
    (state: RootState) => state.tag.currentTagId
  );

  const { data: tagList, refetch: refetchTagList } = useGetTags();

  const { mutateAsync: mutateTagsByCount } = useGetTagsSortedByCount();
  const { mutateAsync: mutateTagsByName } = useGetTagsSortedByName();
  const { mutateAsync: mutateWorkspacesWithTags } = useGetWorkspacesWithTag();

  const dispatch = useDispatch();

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setTagInputValue(value);
  };

  const getWorkspaceWithTags = (tagId: string) => {
    mutateWorkspacesWithTags({ tagId });
    dispatch(tagListActions.updateCurrentTagId({ tagId }));
  };

  const sortByCountTagList = (isSort: boolean) => {
    if (isSort) {
      mutateTagsByCount();
    } else {
      refetchTagList();
    }

    setIsSortByCount((prev) => !prev);
  };

  const sortByNameTagList = (isSort: boolean) => {
    if (isSort) {
      mutateTagsByName();
    } else {
      refetchTagList();
    }
    setIsSortByName((prev) => !prev);
  };

  const isEmptyTagList = !tagList
    ? true
    : tagList.filter((tag: ITag) => tag.name.includes(tagInputValue)).length ===
        0 || tagList?.length === 0;

  return (
    <div className={styles.SideTagsMenu}>
      <div className={styles.SideTagsMenu__container}>
        <div className={styles.SideTagsMenu__header} />
        <div className={styles.SideTagsMenu__subHeader}>
          <span>Tags</span>
          <div className={styles.SideTagsMenu__icons}>
            <span
              onClick={() => sortByNameTagList(!isSortByName)}
              className={cn({
                "material-symbols-outlined": true,
                [styles.SideTagsMenu__sortIcon]: true,
                [styles.SideTagsMenu__sortIcon__active]: isSortByName,
              })}
            >
              sort_by_alpha
            </span>
            <SortBigOrderIcon
              width={CONSTANT.ICON_SIZE.SORT}
              height={CONSTANT.ICON_SIZE.SORT}
              color={isSortByCount === false ? "#3e404c" : "#0c7ae2"}
              onClick={() => sortByCountTagList(!isSortByCount)}
            />
          </div>
        </div>
        <div className={styles.SideTagsMenu__tagContainer}>
          <div
            className={cn(styles.SideTagsMenu__searchContainer, {
              [styles.SideTagsMenu__searchContainer__empty]: !tagList
                ? true
                : tagList.length === 0,
            })}
          >
            <SearchInput
              className={styles.SideTagsMenu__Searchbar}
              inputClassName={styles.SideTagsMenu__Searchbar__input}
              value={tagInputValue}
              placeholder="Search Tags"
              onChange={handleTagInput}
              setSearchValue={setTagInputValue}
            />
            <ResetTag
              setTagInputValue={setTagInputValue}
              sortByCountTagList={sortByCountTagList}
              setIsSortByName={setIsSortByName}
            />
          </div>
          {isEmptyTagList ? (
            <EmptyImage />
          ) : (
            <TagList
              tagList={tagList}
              tagInputValue={tagInputValue}
              currentSeleteTagId={currentSeleteTagId}
              getWorkspaceWithTags={getWorkspaceWithTags}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SideTagsMenu;
