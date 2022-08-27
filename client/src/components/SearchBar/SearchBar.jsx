import React from "react";
import { Input, InputGroup, InputGroupText } from "reactstrap";

import searchIcon from "./assets/images/search-icon.png";
import styles from "./SearchBar.module.scss";

const SearchBar = (props) => {
  return (
    <div className={styles.SearchBar}>
      <InputGroup>
        <InputGroupText className={styles.SearchBar__left}>
          <img
            className={styles.SearchBar__icon}
            src={searchIcon}
            alt="search icon"
          />
        </InputGroupText>
        <Input
          id={styles.searchInput}
          className={styles.SearchBar__input}
          placeholder="검색"
        />
      </InputGroup>
    </div>
  );
};

export default SearchBar;
