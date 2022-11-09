import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import axios from "axios";
import cn from "classnames";
import Swal from "sweetalert2";

import { actions as workspaceActions } from "store/slice/workspaceSlice";
import { useDispatch } from "store";

import { Button } from "reactstrap";

import SearchBar from "components/SearchBar";
import DropdownSelect from "components/DropdownSelect";

import { IFolder } from "types/folder";

import styles from "./MainHeader.module.scss";
import MoveToBackButton from "components/MainDashboard/components/MoveToBackButton";

const MainHeader = ({
  isFolderDetailPage,
  isFavoritesPage,
  isTagPage,
}: {
  isFolderDetailPage?: boolean;
  isFavoritesPage?: boolean;
  isTagPage?: boolean;
}) => {
  const [folderName, setFolderName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDropdownOnClick = (type: string) => {
    dispatch(workspaceActions.sortWorkspaceList({ type }));
  };

  useEffect(() => {
    (async () => {
      if (!isFolderDetailPage) {
        return;
      }
      const { data } = await axios.get("/api/folder");
      const [currentFolder] = data.filter(
        (folder: IFolder) =>
          folder._id === window?.location?.pathname.split("/").at(-1) || ""
      );

      setFolderName(currentFolder?.title);
    })();
  }, [isFolderDetailPage]);

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

  const moveGoBack = () => {
    navigate(`/main`);
    dispatch(workspaceActions.fetchWorkspaceList());
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
        >
          {isFolderDetailPage && (
            <>
              <MoveToBackButton moveGoBack={moveGoBack} />
              <span className={styles.MainHeader__folderPath}>
                {folderName}
              </span>
            </>
          )}
        </div>

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
