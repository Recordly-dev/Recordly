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

  // enabled false로 두고 refetch로 조건에 따라 fetch하는 로직
  const { refetch: refetchWorkspace } = useGetSearchWorkspace({
    keyword: searchValue,
    isFavoritesPage: !!isFavoritesPage,
    isTagPage: !!isTagPage,
    options: {
      enabled: false,
    },
  });

  useEffect(() => {
    if (searchValue === "") {
      refetchWorkspace();
      dispatch(workspaceActions.updateSearchStatus({ isSearch: false }));
      return;
    }
  }, [searchValue]);

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      refetchWorkspace();
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
