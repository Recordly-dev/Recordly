import React from "react";
import { Input, InputGroup } from "reactstrap";

import styles from "./SearchBar.module.scss";

const SearchBar = (props) => {
  return (
    <InputGroup className={styles.SearchInputWithIcon}>
      <Input
        id={styles.searchInput}
        className={styles.SearchInputWithIcon__input}
        // placeholder={props.placeholder}
        // value={props.value}
        // onChange={props.inputChangeHandler}
        // onKeyDown={props.inputKeyDownHandler}
      />
    </InputGroup>
  );
};

export default SearchBar;
