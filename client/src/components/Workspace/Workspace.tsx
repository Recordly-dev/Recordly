import React, { useState } from "react";
import cn from "classnames";

import { useSelector } from "react-redux";
import { useDispatch } from "store";
import Swal from "sweetalert2";
import EditDropdown from "../EditDropdown";

import { actions as workspaceActions } from "store/slice/workspaceSlice";

import { IFolder } from "types/folder";

import DropdownIcon from "./assets/images/dropdown-icon.png";
import EditIcon from "common/assets/icons/EditIcon";
import StarFillIcon from "common/assets/icons/StarFillIcon";

import styles from "./Workspace.module.scss";

import CONSTANT from "./constants";
import BasicTag from "pages/editorPage/components/EditorMenu/components/BasicTag";
import TagPreview from "components/TagPreview";

const Workspace = ({
  uid,
  title,
  folderId,
  tagList,
  editedAt,
  favorites,
  isTagPage,
  isFavoritesPage,
  moveWorkSpacePage,
  formatWorkspaceDate,
}: {
  uid: string;
  title: string;
  folderId: string | null;
  tagList: any;
  editedAt: string;
  favorites: boolean;
  isTagPage: boolean;
  isFavoritesPage?: boolean;
  moveWorkSpacePage: Function;
  formatWorkspaceDate: Function;
}) => {
  const dispatch = useDispatch();
  const [isFavorites, setIsFavorites] = useState(favorites);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const folderList: IFolder[] = useSelector(
    (state: any) => state.folder.folderList
  );

  const handleDropdownOpen = (e: React.MouseEvent<HTMLImageElement>) => {
    setIsDropdownOpen((prev) => !prev);

    e.preventDefault();
    e.stopPropagation();
  };

  /**
   * 메모 삭제 로직
   */
  const handleDeleteWorkspace = (
    e: React.MouseEvent<HTMLImageElement>
  ): void => {
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
        dispatch(
          workspaceActions.deleteWorkspace({
            workspaceId: uid,
            folderId: folderId,
            isFavoritesPage,
            isTagPage,
          })
        );
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
        dispatch(
          workspaceActions.patchWorkspace({
            workspaceId: uid,
            title: result?.value,
            folderId: folderId,
            isFavoritesPage,
            isTagPage,
          })
        );
      }
    });
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMoveFolderModalToggle = async () => {
    const folderItem = folderList.map((folder) => folder?.title);

    await Swal.fire({
      title: "Please select a folder",
      input: "select",
      inputOptions: {
        ...folderItem,
      },
      inputPlaceholder: "Select a folder",
      showCancelButton: true,
      inputValidator: async (value: string) => {
        // const response = await axios.get(`/api/workspace/${uid}`);

        const seletedFolder = folderList[+value];

        if (seletedFolder._id === folderId) {
          return "You cannot select the same folder.";
        }
        dispatch(
          workspaceActions.patchWorkspace({
            workspaceId: uid,
            folder: seletedFolder._id,
            folderId: folderId,
          })
        );
        return "";
      },
    });
  };

  /**
   * 즐겨찾기 toggle
   */
  const toggleFavorites = (e: any) => {
    setIsFavorites((prev) => !prev);
    dispatch(
      workspaceActions.patchFavoritesWorkspaceList({
        uid: uid,
        isFavorites: !favorites,
        isFavoritesPage: isFavoritesPage,
      })
    );

    e.preventDefault();
    e.stopPropagation();
  };
  const dropdownItem = [
    folderId && {
      title: "Exclude folder",
      onClick: (e: any) => {
        dispatch(
          workspaceActions.patchWorkspace({
            workspaceId: uid,
            folder: null,
            folderId: folderId,
          })
        );
      },
    },
    {
      title: "Delete",
      onClick: (e: any) => {
        handleDeleteWorkspace(e);
      },
    },
    {
      title: "Move Folder",
      onClick: (e: any) => {
        handleMoveFolderModalToggle();
      },
    },
  ].filter((item) => item !== null);

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
          <div>
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
            <img
              className={styles.Workspace__dropdownIcon}
              onClick={handleDropdownOpen}
              src={DropdownIcon}
              alt="dropdown icon"
            />
            <EditDropdown
              isDropdownOpen={isDropdownOpen}
              toggle={handleDropdownOpen}
              dropdownItem={dropdownItem}
            />
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
          <div className={cn("d-flex", "align-items-center", "w-100", "mb-2")}>
            <span className={styles.Workspace__dataEdit}>
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
            {tagList.map((tag: any) => (
              <TagPreview name={"# " + tag.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
