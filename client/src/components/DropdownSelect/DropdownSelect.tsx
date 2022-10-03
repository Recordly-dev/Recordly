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
  const [selectedItemName, setSelectedItemName] = useState("최신순");

  const toggle = (): void => setIsDropdownOpen((prevState) => !prevState);

  const handleDropdownName = (type: string) => {
    if (type === "newest") {
      setSelectedItemName("최신순");
    } else if (type === "oldest") {
      setSelectedItemName("오래된순");
    }
  };

  return (
    <Dropdown
      isOpen={isDropdownOpen}
      toggle={toggle}
      className={styles.DropdownSelect}
    >
      <DropdownToggle className={styles.DropdownSelect__toggle} caret>
        {selectedItemName}
      </DropdownToggle>
      <DropdownMenu className={styles.DropdownSelect__menu}>
        <DropdownItem
          onClick={() => {
            handleDropdownItem("newest");
            handleDropdownName("newest");
          }}
          className={styles.DropdownSelect__menu__item}
        >
          최신순
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            handleDropdownItem("oldest");
            handleDropdownName("oldest");
          }}
          className={styles.DropdownSelect__menu__item}
        >
          오랜된순
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownSelect;
