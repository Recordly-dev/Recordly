import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import styles from "./DropdownSelect.module.scss";

const DropdownSelect = ({
  handleDropdownItem,
}: {
  handleDropdownItem: Function;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedItemName, setSelectedItemName] = useState("Newest");

  const toggle = (): void => setIsDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown
      isOpen={isDropdownOpen}
      toggle={toggle}
      className={styles.DropdownSelect}
    >
      <DropdownToggle
        color="primary"
        className={styles.DropdownSelect__toggle}
        caret
      >
        {selectedItemName}
      </DropdownToggle>
      <DropdownMenu className={styles.DropdownSelect__menu} end>
        <DropdownItem
          onClick={() => {
            handleDropdownItem("newest");
            setSelectedItemName("Newest");
          }}
          className={styles.DropdownSelect__menu__item}
        >
          Newest
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            handleDropdownItem("oldest");
            setSelectedItemName("Oldest");
          }}
          className={styles.DropdownSelect__menu__item}
        >
          Oldest
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownSelect;
