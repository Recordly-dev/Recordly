import React from "react";
import cn from "classnames";
import { Dropdown, DropdownMenu, DropdownItem } from "reactstrap";
import { Direction } from "reactstrap/types/lib/Dropdown";

import styles from "./EditDropdown.module.scss";

const EditDropdown = ({
  className,
  itemClassName,
  isDropdownOpen,
  toggle,
  dropdownItem,
  direction,
}: {
  className?: string;
  itemClassName?: string;
  isDropdownOpen: boolean;
  toggle: any;
  dropdownItem: any;
  direction: Direction;
}) => (
  <Dropdown
    className={cn(styles.EditDropdown, className)}
    isOpen={isDropdownOpen}
    toggle={toggle}
    direction={direction}
  >
    <DropdownMenu className={cn(styles.EditDropdown__menu, itemClassName)}>
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
