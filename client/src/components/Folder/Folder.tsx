import React, { useState, useEffect } from "react";
import cn from "classnames";
import Swal from "sweetalert2";

import { usePatchFolder, useDeleteFolder } from "query-hooks/useFetchFolder";
import { useGetWorkspaces } from "query-hooks/useFetchWorkspace";

import folderIcon from "./assets/images/Folder.png";
import dropdownIcon from "./assets/images/Dropdown.png";
import EditIcon from "common/assets/icons/EditIcon";
import EditDropdown from "../EditDropdown";

import { IWorkspace } from "types/workspace";

import styles from "./Folder.module.scss";

const Folder = ({
  uid,
  title,
  isLoading,
  moveFolderDetailPage,
}: {
  uid: string;
  title: string;
  isLoading: boolean;
  moveFolderDetailPage: Function;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [countOfMemosInFolder, setCountOfMemosInFolder] = useState(0);

  const { data: workspaces } = useGetWorkspaces();
  const { mutateAsync: mutatePatchFolder } = usePatchFolder();
  const { mutateAsync: mutateDeleteFolder } = useDeleteFolder();

  useEffect(() => {
    const filterWorkspaceList = workspaces?.filter(
      (workspace: IWorkspace) => workspace.folder === uid
    );
    setCountOfMemosInFolder(filterWorkspaceList?.length);
  }, [uid, workspaces, isLoading]);

  const deleteFolder = () => {
    Swal.fire({
      title: `Are you sure want to\ndelete the "${title}" folder?`,
      text: "Cannot revert deleted folders & inner memos",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        mutateDeleteFolder({
          folderId: uid,
        });
      }
    });
  };

  const patchFolder = (e: React.MouseEvent<HTMLImageElement>) => {
    Swal.fire({
      title: "Please enter the name of the folder you want to edit.",
      input: "text",
      inputValue: title,
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Edit",
      showLoaderOnConfirm: true,
      preConfirm: (title) => {
        return title;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(async (res) => {
      if (res.isConfirmed) {
        await mutatePatchFolder({
          folderId: uid,
          title: res?.value,
        });
      }
    });
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDropdownOpen = (e: React.MouseEvent<Element>) => {
    setIsDropdownOpen((prev) => !prev);

    e.preventDefault();
    e.stopPropagation();
  };

  const dropdownItem = [
    {
      title: "Delete",
      onClick: () => {
        deleteFolder();
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
        <div className={styles.Folder__dropdownContainer}>
          <img
            className={styles.Folder__dropdownIcon}
            onClick={handleDropdownOpen}
            src={dropdownIcon}
            alt="dropdown icon"
          />
          <EditDropdown
            className={styles.Folder__dropdown}
            isDropdownOpen={isDropdownOpen}
            toggle={handleDropdownOpen}
            dropdownItem={dropdownItem}
            direction="down"
          />
        </div>
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
        <span className={styles.Folder__fileCount}>
          {countOfMemosInFolder} files
        </span>
      </div>
    </div>
  );
};

export default Folder;
