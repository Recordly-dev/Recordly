import React from "react";
import { useNavigate } from "react-router";

import axios from "axios";
import cn from "classnames";
import Swal from "sweetalert2";

import {
  actions,
  actions as workspaceActions,
} from "store/slice/workspaceList";
import { useDispatch } from "store";

import createIcon from "./assets/images/create-icon.png";
import SearchBar from "components/SearchBar";
import DropdownSelect from "components/DropdownSelect";

import styles from "./MainHeader.module.scss";

const MainHeader = ({ isFavoritesPage }: { isFavoritesPage?: boolean }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDropdownOnClick = (type: string) => {
    dispatch(workspaceActions.sortWorkspaceList({ type }));
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLImageElement>): void => {
    let title: string;
    let workspaceType: string;

    Swal.fire({
      title: "메모 제목을 적어주세요.",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Create",
      showLoaderOnConfirm: true,
      preConfirm: (title) => {
        return title;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "일반 메모와 PDF를 선택해주세요.",
          showDenyButton: true,
          confirmButtonText: "MEMO",
          denyButtonText: `PDF`,
        }).then((workspace) => {
          title = result.value;
          if (workspace.isConfirmed) {
            workspaceType = "docs";
          } else if (workspace.isDenied) {
            workspaceType = "pdf";
          }

          dispatch(actions.postWorkspace({ title, workspaceType }));
        });
      }
    });

    e.preventDefault();
    e.stopPropagation();
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
        >
          {/* Todo: 로고 생기면 넣기 */}
          {/* <img src={imageUrl} className={styles.Header__image} alt="logoImage" /> */}
          <span className={styles.MainHeader__container__title}>Recordly</span>
        </div>

        <div
          className={cn(
            styles.MainHeader__container__right,
            "d-flex",
            "align-items-center",
            "justify-content-center"
          )}
        >
          <div>
            <img
              src={createIcon}
              className={styles.MainHeader__container__createIcon}
              onClick={handleButtonClick}
              alt="create-icon"
            />
          </div>
          <SearchBar isFavoritesPage={isFavoritesPage} />
          <DropdownSelect handleDropdownItem={handleDropdownOnClick} />
          <button
            className={styles.MainHeader__container__right__logout}
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
