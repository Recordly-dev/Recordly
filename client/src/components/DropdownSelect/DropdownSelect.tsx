import { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { useGetWorkspacesSortedByEditedAt } from "query-hooks/useFetchWorkspace";

import styles from "./DropdownSelect.module.scss";

const DropdownSelect = ({
  isFavoritesPage,
  isTagPage,
}: {
  isFavoritesPage?: boolean;
  isTagPage?: boolean;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedItemName, setSelectedItemName] = useState("Newest");

  const { mutateAsync: mutateSortedByEditedAt } =
    useGetWorkspacesSortedByEditedAt({
      isFavoritesPage,
      isTagPage,
    });

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
            mutateSortedByEditedAt({
              type: "Newest",
            });
            setSelectedItemName("Newest");
          }}
          className={styles.DropdownSelect__menu__item}
        >
          Newest
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            mutateSortedByEditedAt({
              type: "Oldest",
            });
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
