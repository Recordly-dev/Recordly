import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import cn from "classnames";

import Swal from "sweetalert2";

import { fetchWorkspace } from "store/slice/workspcaeSlice";

import DropdownIcon from "./assets/images/dropdown-icon.png";
import styles from "./Workspace.module.scss";

const Workspace = ({ uid, title, editedAt, moveWorkSpacePage, formatDate }) => {
  const dispatch = useDispatch();

  const path = `http://localhost:${
    process.env.REACT_APP_BACKEND_PORT || 8080
  }/api/public/assets/images/thumbnail/${uid}.png`;
  const emptyPath = `http://localhost:8080/public/assets/images/thumbnail/emptyThumbnail.png`;

  const handleDeleteWorkspace = (e) => {
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
        axios.delete(`api/workspace/${uid}`).then((res, req) => {
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

  const setThumbnail = (e) => {
    e.target.src = emptyPath;
  };

  return (
    <div
      className={cn(styles.Workspace__container)}
      onClick={() => moveWorkSpacePage(uid)}
    >
      <div className={styles.Workspace__docs}>
        <div className={styles.Workspace__docs__top}>
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
            <div></div>
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
