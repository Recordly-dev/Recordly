import React, { useState } from "react";
import cn from "classnames";

import { useNavigate } from "react-router";
import Swal from "sweetalert2";

import { usePostWorkspace } from "query-hooks/useFetchWorkspace";
import { usePostFolder } from "query-hooks/useFetchFolder";

import PlusIcon from "common/assets/icons/PlusIcon";
import FolderIcon from "common/assets/icons/FolderIcon";
import FileIcon from "common/assets/icons/FileIcon";
import EditDropdown from "components/EditDropdown";

import styles from "./CreateFileButton.module.scss";

import CONSTANT from "./constants";

const CreateFileButton = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { mutateAsync: mutatePostWorkspace } = usePostWorkspace();
  const { mutateAsync: mutatePostFolder } = usePostFolder();

  const moveDashboard = () => navigate("/main");

  const handleDropdownOpen = (e: React.MouseEvent<HTMLDivElement>) => {
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
      title = result.value;
      workspaceType = "docs";

      mutatePostWorkspace({ title, workspaceType });
    });
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
        const title = res?.value;

        mutatePostFolder({ title });
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
