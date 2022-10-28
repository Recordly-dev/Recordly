import React from "react";
import cn from "classnames";
import Swal from "sweetalert2";

import { Button } from "reactstrap";
import { actions } from "store/slice/folderList";
import { useDispatch } from "store";

import folderSrc from "./assets/images/Folder.png";

import styles from "./Folder.module.scss";

const Folder = ({
  uid,
  title,
  moveFolderDetailPage,
}: {
  uid: string;
  title: string;
  moveFolderDetailPage: Function;
}) => {
  const dispatch = useDispatch();

  const deleteFolder = (e: React.MouseEvent<HTMLButtonElement>) => {
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "삭제한 폴더는 되돌릴 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(actions.deleteFolderList({ uid }));
      }
    });
    e.preventDefault();
    e.stopPropagation();
  };

  const patchFolder = () => {
    Swal.fire({
      title: "폴더 이름을 입력해주세요.",
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
    }).then(async (res) => {
      if (res.isConfirmed) {
        dispatch(
          actions.patchFolderList({
            uid: uid,
            title: res?.value,
          })
        );
      }
    });
  };

  return (
    <div className={styles.Folder}>
      <img
        className={styles.Folder__image}
        onClick={() => moveFolderDetailPage(uid)}
        src={folderSrc}
        alt="folder img"
      />
      <div className={cn("d-flex", "flex-column", "align-items-center")}>
        <span className={styles.Folder__title}>{title}</span>
        <div>
          <Button onClick={deleteFolder}>삭제</Button>
          <Button onClick={patchFolder}>수정</Button>
        </div>
      </div>
    </div>
  );
};

export default Folder;
