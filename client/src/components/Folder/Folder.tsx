import React, { useState } from "react";
import cn from "classnames";
import Swal from "sweetalert2";

import { actions } from "store/slice/folderSlice";
import { useDispatch } from "store";

import folderIcon from "./assets/images/Folder.png";
import dropdownIcon from "./assets/images/Dropdown.png";
import EditIcon from "common/assets/icons/EditIcon";

import EditDropdown from "../EditDropdown";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  const patchFolder = (e: React.MouseEvent<HTMLImageElement>) => {
    Swal.fire({
      title: "수정할 폴더 이름을 입력해주세요.",
      input: "text",
      inputValue: title,
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
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDropdownOpen = (e: any) => {
    setIsDropdownOpen((prev) => !prev);

    e.preventDefault();
    e.stopPropagation();
  };

  const dropdownItem = [
    {
      title: "삭제하기",
      onClick: (e: any) => {
        deleteFolder(e);
      },
    },
  ];

  return (
    <div className={styles.Folder} onClick={() => moveFolderDetailPage(uid)}>
      <div className={styles.Folder__top}>
        <img
          className={styles.Folder__image}
          src={folderIcon}
          alt="folder img"
        />
        <img
          className={styles.Folder__dropdownIcon}
          onClick={handleDropdownOpen}
          src={dropdownIcon}
          alt="dropdown icon"
        />
        <EditDropdown
          isDropdownOpen={isDropdownOpen}
          toggle={handleDropdownOpen}
          dropdownItem={dropdownItem}
        />
      </div>
      <div className={styles.Folder__bottom}>
        <div className={cn("d-flex", "align-items-center", "mb-2")}>
          <p className={styles.Folder__title}>{title}</p>
          <EditIcon
            className={styles.Folder__editIcon}
            onClick={patchFolder}
            width="18px"
            height="18px"
            color="#a9abb8"
          />
        </div>
        <span className={styles.Folder__fileCount}>5 files</span>
        {/* <div>
          <Button onClick={deleteFolder}>삭제</Button>
        </div> */}
      </div>
    </div>
  );
};

export default Folder;
