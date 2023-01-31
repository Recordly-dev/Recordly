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
  const { mutateAsync: mutateSearchWorkspace } = useGetSearchWorkspace({
    isFavoritesPage: !!isFavoritesPage,
    isTagPage: !!isTagPage,
  });

  useEffect(() => {
    if (searchValue === "") {
      mutateSearchWorkspace({ keyword: searchValue });
      dispatch(workspaceActions.updateSearchStatus({ isSearch: false }));
      return;
    }
  }, [searchValue]);

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
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
