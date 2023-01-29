import React, { useState, useEffect } from "react";
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

import CONSTANT from "./constants";

const SideTagsMenu = () => {
  const [sortType, setSortType] = useState("basic");
  const [isSortByName, setIsSortByName] = useState(false);
  const [tagInputValue, setTagInputValue] = useState("");
  const [tagId, setTagId] = useState("");

  const currentSeleteTagId = useSelector(
    (state: any) => state.tag.currentTagId
  );

  const { data: tagList } = useGetTags();
  const { refetch: refetchByCount } = useGetTagsSortedByCount({
    type: sortType,
  });
  const { refetch: refetchByName } = useGetTagsSortedByName({
    isSort: isSortByName,
  });
  const { refetch: refetchTags } = useGetWorkspacesWithTag({ tagId });

  const dispatch = useDispatch();

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setTagInputValue(value);
  };

  const getWorkspaceWithTags = (tagId: string) => {
    setTagId(tagId);
  };

  const sortTagList = (type: string) => {
    if (type === "basic") {
      setSortType("count");
    } else {
      setSortType("basic");
    }
  };

  const sortByNameTagList = () => {
    setIsSortByName((prev) => !prev);
  };

  useEffect(() => {
    refetchTags();
    dispatch(tagListActions.patchCurrentTagId({ tagId }));
  }, [tagId]);

  useEffect(() => {
    refetchByCount();
  }, [sortType]);

  useEffect(() => {
    refetchByName();
  }, [isSortByName]);

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
              onClick={sortByNameTagList}
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
              color={sortType === "basic" ? "#3e404c" : "#0c7ae2"}
              onClick={() => sortTagList(sortType)}
            />
          </div>
        </div>
        <div className={styles.SideTagsMenu__tagContainer}>
          <div
            className={cn(styles.SideTagsMenu__searchContainer, {
              [styles.SideTagsMenu__searchContainer__empty]:
                tagList?.length === 0,
            })}
          >
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
