import React, { useState } from "react";
import cn from "classnames";

import Swal from "sweetalert2";
import { IFolder } from "types/folder";
import { ITag } from "types/tag";

import { useGetFolder } from "query-hooks/useFetchFolder";
import {
  usePatchWorkspace,
  useDeleteWorkspace,
  usePatchFavoritesWorkspace,
} from "query-hooks/useFetchWorkspcae";

import DropdownIcon from "./assets/images/dropdown-icon.png";
import EditIcon from "common/assets/icons/EditIcon";
import StarFillIcon from "common/assets/icons/StarFillIcon";

import EditDropdown from "../EditDropdown";
import TagPreview from "components/TagPreview";

import styles from "./Workspace.module.scss";

import CONSTANT from "./constants";

const Workspace = ({
  uid,
  title,
  folderId,
  tagList,
  editedAt,
  favorites,
  moveWorkSpacePage,
  formatWorkspaceDate,
}: {
  uid: string;
  title: string;
  folderId: string | null;
  tagList: ITag[];
  editedAt: string;
  favorites: boolean;
  moveWorkSpacePage: Function;
  formatWorkspaceDate: Function;
}) => {
  const [isFavorites, setIsFavorites] = useState(favorites);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { mutateAsync: mutatePatchWorkspace } = usePatchWorkspace({ folderId });
  const { mutateAsync: mutateDeleteWorkspace } = useDeleteWorkspace();
  const { mutateAsync: mutatePatchFavoritesWorkspace } =
    usePatchFavoritesWorkspace();

  const { data: folderList } = useGetFolder();

  const handleDropdownOpen = (e: React.MouseEvent<HTMLImageElement>) => {
    setIsDropdownOpen((prev) => !prev);

    e.preventDefault();
    e.stopPropagation();
  };

  /**
   * 메모 삭제 로직
   */
  const handleDeleteWorkspace = (): void => {
    Swal.fire({
      title: `Are you sure want to\ndelete the "${title}" memo?`,
      text: "Cannot revert deleted memos.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        mutateDeleteWorkspace({
          workspaceId: uid,
        });
      }
    });
  };

  /**
   * 메모 제목 수정 로직
   */
  const patchWorkspace = (e: React.MouseEvent<HTMLImageElement>) => {
    Swal.fire({
      title: "Please enter the name of the memo you want to edit.",
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
    }).then((result) => {
      if (result.isConfirmed) {
        mutatePatchWorkspace({
          workspaceId: uid,
          folderId,
          title: result?.value,
        });
      }
    });
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMoveFolderModalToggle = async () => {
    const folderItem = folderList.map((folder: IFolder) => folder?.title);

    await Swal.fire({
      title: "Please select a folder",
      input: "select",
      inputOptions: {
        ...folderItem,
      },
      inputPlaceholder: "Select a folder",
      showCancelButton: true,
      inputValidator: async (value: string) => {
        const seletedFolder = folderList[+value];

        if (seletedFolder._id === folderId) {
          return "You cannot select the same folder.";
        }

        mutatePatchWorkspace({
          workspaceId: uid,
          folder: seletedFolder._id,
        });

        return "";
      },
    });
  };

  /**
   * 즐겨찾기 toggle
   */
  const toggleFavorites = (e: React.MouseEvent<Element>) => {
    setIsFavorites((prev) => !prev);

    mutatePatchFavoritesWorkspace({
      workspaceId: uid,
      isFavorites: !favorites,
    });

    e.preventDefault();
    e.stopPropagation();
  };

  const inFolderDropdownItem = {
    title: "Exclude folder",
    onClick: () => {
      mutatePatchWorkspace({
        workspaceId: uid,
        folderId,
        folder: null,
      });
    },
  };

  const basicDropdownItem = [
    {
      title: "Delete",
      onClick: () => {
        handleDeleteWorkspace();
      },
    },
    {
      title: "Move Folder",
      onClick: () => {
        handleMoveFolderModalToggle();
      },
    },
  ];

  /**
   * 썸네일 지정 핸들러
   */
  const setThumbnail = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ): void => {
    e.currentTarget.src = CONSTANT.EMPTY_IMAGE_PATH;
  };

  return (
    <div className={cn(styles.Workspace__container)}>
      <div
        className={styles.Workspace__docs}
        onClick={() => moveWorkSpacePage(uid)}
      >
        <div className={styles.Workspace__docs__top}>
          <img
            className={styles.Workspace__docs__top__image}
            src={CONSTANT.IMAGE_PATH(uid)}
            onError={setThumbnail}
            alt="thumbnail"
          />
          <div className={cn("d-flex")}>
            {isFavorites ? (
              <StarFillIcon
                onClick={toggleFavorites}
                width={CONSTANT.ICON_SIZE.STAR}
                height={CONSTANT.ICON_SIZE.STAR}
                color="#ffc107"
              />
            ) : (
              <StarFillIcon
                onClick={toggleFavorites}
                width={CONSTANT.ICON_SIZE.STAR}
                height={CONSTANT.ICON_SIZE.STAR}
                color="#dcdce2"
              />
            )}
            <div className={styles.Workspace__dropdownContainer}>
              <img
                className={styles.Workspace__dropdownIcon}
                onClick={handleDropdownOpen}
                src={DropdownIcon}
                alt="dropdown icon"
              />
              <EditDropdown
                className={styles.Workspace__dropdown}
                isDropdownOpen={isDropdownOpen}
                toggle={handleDropdownOpen}
                dropdownItem={
                  folderId
                    ? [inFolderDropdownItem, ...basicDropdownItem]
                    : basicDropdownItem
                }
                direction="down"
              />
            </div>
          </div>
        </div>
        <div className={styles.Workspace__docs__bottom}>
          <div className={cn("d-flex", "align-items-center", "mb-1")}>
            <span className={styles.Workspace__title}>{title}</span>
            <EditIcon
              className={styles.Workspace__editIcon}
              onClick={patchWorkspace}
              width={CONSTANT.ICON_SIZE.EDIT}
              height={CONSTANT.ICON_SIZE.EDIT}
              color="#a9abb8"
            />
          </div>
          <div className={styles.Workspace__dateEdit}>
            <span className={styles.Workspace__dateEdit__date}>
              {formatWorkspaceDate(editedAt)}
            </span>
          </div>
          <div
            className={cn(
              styles.Workspace__tagList,
              "d-flex",
              "align-items-center",
              "w-100"
            )}
          >
            {tagList.map((tag: ITag) => (
              <TagPreview name={"# " + tag.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
