import React from "react";
import { useNavigate } from "react-router";

import axios from "axios";
import cn from "classnames";
import Swal from "sweetalert2";

import { actions as workspaceActions } from "store/slice/workspaceSlice";
import { useDispatch } from "store";

import { Button } from "reactstrap";

import SearchBar from "components/SearchBar";
import DropdownSelect from "components/DropdownSelect";

import styles from "./MainHeader.module.scss";

const MainHeader = ({
  isFavoritesPage,
  isTagPage,
}: {
  isFavoritesPage?: boolean;
  isTagPage?: boolean;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDropdownOnClick = (type: string) => {
    dispatch(workspaceActions.sortWorkspaceList({ type }));
  };

  const logout = (): void => {
    axios
      .get("/api/auth/logout")
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          title: "로그아웃에 실패했습니다.",
          showConfirmButton: false,
          timer: 1000,
        });
        console.log(err, "로그아웃 실패");
      });
  };

  return (
    <header
      className={cn(
        styles.MainHeader,
        "d-flex",
        "align-items-center",
        "justify-content-center"
      )}
    >
      <div
        className={cn(
          styles.MainHeader__container,
          "d-flex",
          "align-items-center",
          "justify-content-between",
          "ps-4",
          "pe-4"
        )}
      >
        <div
          className={cn(
            styles.MainHeader__container__left,
            "d-flex",
            "align-items-center",
            "justify-content-center"
          )}
        ></div>

        <div
          className={cn(
            styles.MainHeader__container__right,
            "d-flex",
            "align-items-center",
            "justify-content-center"
          )}
        >
          <SearchBar isFavoritesPage={isFavoritesPage} isTagPage={isTagPage} />
          <DropdownSelect handleDropdownItem={handleDropdownOnClick} />
          <Button
            className={styles.MainHeader__container__right__logout}
            color="primary"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
