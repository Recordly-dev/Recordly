import React, { useState, useEffect } from "react";
import { useQueryClient } from "react-query";

import { useGetSearchWorkspace } from "query-hooks/useFetchWorkspcae";

import SearchInput from "components/SearchInput";
import styles from "./SearchBar.module.scss";

const SearchBar = ({
  isFavoritesPage,
  isTagPage,
  setIsSearch,
}: {
  isFavoritesPage?: boolean;
  isTagPage?: boolean;
  setIsSearch: Function;
}) => {
  const [searchValue, setSearchValue] = useState("");

  const { data } = useGetSearchWorkspace({
    value: searchValue,
    isFavoritesPage: !!isFavoritesPage,
    isTagPage: !!isTagPage,
  });

  useEffect(() => {
    if (searchValue === "") {
      setIsSearch(false);
      return;
    }
    setIsSearch(true);
  }, [searchValue, setIsSearch]);

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <SearchInput
      className={styles.Searchbar}
      inputClassName={styles.Searchbar__input}
      value={searchValue}
      placeholder="Search"
      onChange={handleChangeSearchValue}
    />
  );
};

export default SearchBar;
