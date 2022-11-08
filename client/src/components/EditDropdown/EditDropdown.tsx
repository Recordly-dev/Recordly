import React from "react";
import { Dropdown, DropdownMenu, DropdownItem } from "reactstrap";

import styles from "./EditDropdown.module.scss";

const EditDropdown = ({
  isDropdownOpen,
  toggle,
  dropdownItem,
}: {
  isDropdownOpen: boolean;
  toggle: any;
  dropdownItem: any;
}) => (
  <Dropdown
    className={styles.EditDropdown}
    isOpen={isDropdownOpen}
    toggle={toggle}
  >
    <DropdownMenu className={styles.EditDropdown__menu}>
      {dropdownItem.map((item: any) => (
        <DropdownItem
          onClick={item.onClick}
          className={styles.EditDropdown__item}
        >
          <span className={styles.EditDropdown__text}>{item?.title}</span>
        </DropdownItem>
      ))}
    </DropdownMenu>
  </Dropdown>
);

export default EditDropdown;
