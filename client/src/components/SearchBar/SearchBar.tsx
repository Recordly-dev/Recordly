import React, { useState, useEffect } from "react";
import { Input, InputGroup, InputGroupText } from "reactstrap";

import { actions as workspaceActions } from "store/slice/workspaceSlice";
import { actions as folderListActions } from "store/slice/folderSlice";
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

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);

    if (e.target.value === "") {
      dispatch(
        workspaceActions.filterWorkspaceList({
          value: "",
          isFavoritesPage: !!isFavoritesPage,
          isTagPage: !!isTagPage,
        })
      );
      !isTagPage && dispatch(folderListActions.fetchFolderList());
    }
  };

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(
        workspaceActions.filterWorkspaceList({
          value: searchValue,
          isFavoritesPage: !!isFavoritesPage,
          isTagPage: !!isTagPage,
        })
      );
      !isTagPage && dispatch(folderListActions.setInitialFolderList());
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
