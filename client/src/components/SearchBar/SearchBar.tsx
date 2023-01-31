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

  const { mutateAsync: mutateSearchWorkspace } = useGetSearchWorkspace({
    isFavoritesPage: !!isFavoritesPage,
    isTagPage: !!isTagPage,
  });

  useEffect(() => {
    if (searchValue === "") {
      dispatch(workspaceActions.updateSearchStatus({ isSearch: false }));
      return;
    }
  }, [searchValue]);

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);

    // useEffect에 넣으면 mount될 때 쓸데없는 api통신이 됨
    if (e.target.value === "") {
      mutateSearchWorkspace({ keyword: e.target.value });
    }
  };

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      mutateSearchWorkspace({ keyword: searchValue });
      dispatch(workspaceActions.updateSearchStatus({ isSearch: true }));
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
      setSearchValue={setSearchValue}
    />
  );
};

export default SearchBar;
