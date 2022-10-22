import React, { useState, useEffect } from "react";
import axios from "axios";
import cn from "classnames";

import Swal from "sweetalert2";

import { fetchWorkspace } from "store/slice/workspcaeSlice";
import { useDispatch } from "store";

import DropdownIcon from "./assets/images/dropdown-icon.png";
import styles from "./Workspace.module.scss";
import { Button } from "reactstrap";

const Workspace = ({
  uid,
  title,
  editedAt,
  favorites,
  moveWorkSpacePage,
  formatDate,
}: {
  uid: string;
  title: string;
  editedAt: string;
  favorites: boolean;
  moveWorkSpacePage: Function;
  formatDate: Function;
}) => {
  const dispatch = useDispatch();
  const [isFavorites, setIsFavorites] = useState(favorites);

  const path: string = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_SERVER_HOST}/api/public/assets/images/thumbnail/${uid}.png`;
  const emptyPath: string = `/api/public/assets/images/emptyThumbnail.png`;

  const handleDeleteWorkspace = (
    e: React.MouseEvent<HTMLImageElement>
  ): void => {
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "삭제한 메모는 되돌릴 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`api/workspace/${uid}`).then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "메모가 삭제 되었습니다.",

            showConfirmButton: false,
            timer: 1000,
          });
          dispatch(fetchWorkspace());
        });
      }
    });
    e.preventDefault();
    e.stopPropagation();
  };

  const toggleFavorites = async () => {
    setIsFavorites((prev) => !prev);
  };

  const setThumbnail = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ): void => {
    e.currentTarget.src = emptyPath;
  };

  useEffect(() => {
    (async () => {
      const params = {
        workspaceId: uid,
        isFavorites: isFavorites,
      };
      await axios.patch(`/api/workspace/favorites/${uid}`, params);
    })();
  }, [isFavorites, uid]);

  return (
    <div className={cn(styles.Workspace__container)}>
      <div className={styles.Workspace__docs}>
        <div
          className={styles.Workspace__docs__top}
          onClick={() => moveWorkSpacePage(uid)}
        >
          <img
            className={styles.Workspace__docs__top__image}
            src={path}
            onError={setThumbnail}
            alt="thumbnail"
          />
        </div>
        <div className={styles.Workspace__docs__bottom}>
          <h6 className={styles.Workspace__title}>{title}</h6>
          <div
            className={cn(
              "d-flex",
              "justify-content-between",
              "align-items-center",
              "w-100"
            )}
          >
            {isFavorites && <span style={{ color: "red" }}>별</span>}
            <Button onClick={toggleFavorites}>즐겨찾기</Button>
            <span className={styles.Workspace__dataEdit}>
              {formatDate(editedAt)}
            </span>
            <img
              className={styles.Workspace__dropdownIcon}
              onClick={handleDeleteWorkspace}
              src={DropdownIcon}
              alt="dropdown icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
