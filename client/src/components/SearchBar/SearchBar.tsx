import React, { useState, useEffect } from "react";

import { useGetSearchWorkspace } from "query-hooks/useFetchWorkspace";

import { actions as workspaceActions } from "store/slice/workspaceSlice";
import { useDispatch } from "store";

import SearchInput from "components/SearchInput";
import styles from "./SearchBar.module.scss";

const SearchBar = ({
  isFavoritesPage,
  isTagPage,
}: {
  isFavoritesPage?: boolean;
  isTagPage?: boolean;
}) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [isFetchWorkspace, setIsFetchWorkspace] = useState(false);

  useGetSearchWorkspace({
    keyword: searchValue,
    isFavoritesPage: !!isFavoritesPage,
    isTagPage: !!isTagPage,
    isFetchWorkspace,
  });

  useEffect(() => {
    if (searchValue === "") {
      dispatch(workspaceActions.updateSearchStatus({ isSearch: false }));
      setIsFetchWorkspace(true);
      return;
    }
  }, [searchValue]);

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsFetchWorkspace(true);
      dispatch(workspaceActions.updateSearchStatus({ isSearch: true }));
    } else {
      setIsFetchWorkspace(false);
    }
  };

  return (
    <SearchInput
      className={styles.Searchbar}
      inputClassName={styles.Searchbar__input}
      value={searchValue}
      placeholder="Search"
      onChange={handleChangeSearchValue}
      onKeyDown={handleOnKeyPress}
    />
  );
};

export default SearchBar;
