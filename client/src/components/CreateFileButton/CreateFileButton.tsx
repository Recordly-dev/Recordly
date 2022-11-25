import React, { useState } from "react";
import cn from "classnames";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

import PlusIcon from "common/assets/icons/PlusIcon";
import EditDropdown from "components/EditDropdown";

import FolderIcon from "common/assets/icons/FolderIcon";
import FileIcon from "common/assets/icons/FileIcon";

import { actions as workspaceActions } from "store/slice/workspaceSlice";
import { actions as folderActions } from "store/slice/folderSlice";
import { useDispatch } from "store";

import styles from "./CreateFileButton.module.scss";

import CONSTANT from "./constants";

const CreateFileButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const moveDashboard = () => navigate("/main");

  const handleDropdownOpen = (e: any) => {
    setIsDropdownOpen((prev) => !prev);

    e.preventDefault();
    e.stopPropagation();
  };

  const createWorkspace = (): void => {
    moveDashboard();
    let title: string;
    let workspaceType: string;

    Swal.fire({
      title: "Please write the memo title.",
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
      // if (result.isConfirmed) {
      //   Swal.fire({
      //     title: "Please choose\n between memo and PDF",
      //     showDenyButton: true,
      //     confirmButtonText: "MEMO",
      //     denyButtonText: `PDF`,
      //   }).then((workspace) => {
          title = result.value;
          // if (workspace.isConfirmed) {
          workspaceType = "docs";
          // } else if (workspace.isDenied) {
            // workspaceType = "pdf";
          // }

          dispatch(workspaceActions.postWorkspace({ title, workspaceType }));
        });
      // }
    // });
  };

  const createFolder = () => {
    moveDashboard();
    Swal.fire({
      title: "Please write the folder title.",
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
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(folderActions.postFolderList({ title: res?.value }));
      }
    });
  };

  const dropdownItem = [
    {
      title: (
        <div className={cn("d-flex", "align-items-center", "m-1")}>
          <FileIcon
            className={cn("me-1")}
            width="24px"
            height="24px"
            color="#234e70"
          />
          <span>Memo</span>
        </div>
      ),
      onClick: () => {
        createWorkspace();
      },
    },
    {
      title: (
        <div className={cn("d-flex", "align-items-center", "m-1")}>
          <FolderIcon
            className={cn("me-1")}
            width="24px"
            height="24px"
            color="#234e70"
          />
          <span>Folder</span>
        </div>
      ),
      onClick: () => {
        createFolder();
      },
    },
  ];

  return (
    <div onClick={handleDropdownOpen} className={styles.CreateFileButton}>
      <PlusIcon
        width={CONSTANT.ICON_SIZE.PLUS}
        height={CONSTANT.ICON_SIZE.PLUS}
        color="white"
      />
      <EditDropdown
        className={styles.CreateFileButton__dropdown}
        isDropdownOpen={isDropdownOpen}
        toggle={handleDropdownOpen}
        dropdownItem={dropdownItem}
        direction="up"
      />
    </div>
  );
};

export default CreateFileButton;
