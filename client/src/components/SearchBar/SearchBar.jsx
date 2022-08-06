import React from "react";
import { Input, InputGroup } from "reactstrap";

import styles from "./SearchBar.module.scss";

const SearchBar = (props) => {
  return (
    <div className={styles.SearchInputWithIcon}>
      <InputGroup>
        <Input
          id={styles.searchInput}
          className={styles.SearchInputWithIcon__input}
          placeholder="Search"
        />
      </InputGroup>
    </div>
  );
};

export default SearchBar;
