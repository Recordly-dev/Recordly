import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import styles from "./DropdownSelect.module.scss";

const DropdownSelect = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggle = (): void => setIsDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown
      isOpen={isDropdownOpen}
      toggle={toggle}
      className={styles.DropdownSelect}
    >
      <DropdownToggle className={styles.DropdownSelect__toggle} caret>
        최신순
      </DropdownToggle>
      <DropdownMenu className={styles.DropdownSelect__menu}>
        <DropdownItem className={styles.DropdownSelect__menu__item}>
          최신순
        </DropdownItem>
        <DropdownItem className={styles.DropdownSelect__menu__item}>
          오랜된순
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownSelect;
