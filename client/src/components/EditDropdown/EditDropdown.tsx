import React, { MouseEventHandler } from "react";
import cn from "classnames";
import { Dropdown, DropdownMenu, DropdownItem } from "reactstrap";
import { Direction } from "reactstrap/types/lib/Dropdown";

import styles from "./EditDropdown.module.scss";

interface IDropdownItem {
  title: JSX.Element | string;
  onClick: MouseEventHandler;
}

const EditDropdown = ({
  className,
  itemClassName,
  isDropdownOpen,
  dropdownItem,
  direction,
  toggle,
}: {
  className?: string;
  itemClassName?: string;
  isDropdownOpen: boolean;
  dropdownItem: IDropdownItem[];
  direction: Direction;
  toggle: MouseEventHandler;
}) => (
  <Dropdown
    className={cn(styles.EditDropdown, className)}
    isOpen={isDropdownOpen}
    toggle={toggle}
    direction={direction}
  >
    <DropdownMenu className={cn(styles.EditDropdown__menu, itemClassName)}>
      {dropdownItem.map((item: IDropdownItem, index) => (
        <DropdownItem
          key={index.toString()}
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
