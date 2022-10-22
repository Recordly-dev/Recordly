import React, { useState, useEffect } from "react";
import axios from "axios";
import cn from "classnames";

import { useSelector } from "react-redux";
import { useDispatch } from "store";
import Swal from "sweetalert2";

import { Button } from "reactstrap";
import AlertModal from "components/AlertModal";

import { fetchWorkspace } from "store/slice/workspaceList";

import { IFolder } from "types/folder";

import DropdownIcon from "./assets/images/dropdown-icon.png";
import styles from "./Workspace.module.scss";

import CONSTANT from "./constants";

const Workspace = ({
  uid,
  title,
  editedAt,
  favorites,
  moveWorkSpacePage,
  formatWorkspaceDate,
}: {
  uid: string;
  title: string;
  editedAt: string;
  favorites: boolean;
  moveWorkSpacePage: Function;
  formatWorkspaceDate: Function;
}) => {
  const dispatch = useDispatch();

  const [isFavorites, setIsFavorites] = useState(favorites);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [selectFolderId, setSelectFolderId] = useState("");

  const folderList: IFolder[] = useSelector(
    (state: any) => state.folder.folderList
  );

  /**
   * 메모 삭제 로직
   */
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
        axios.delete(`/api/workspace/${uid}`).then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "메모가 삭제 되었습니다.",

            showConfirmButton: false,
            timer: 1000,
          });
          /**
           * 삭제 완료 시 workspace 다시 로드하는 dispatch
           */
          dispatch(fetchWorkspace());
        });
      }
    });
  };

  /**
   * 메모 제목 수정 로직
   */
  const patchWorkspace = (e: React.MouseEvent<HTMLButtonElement>) => {
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
        axios
          .patch(`/api/workspace/${uid}`, {
            workspaceId: uid,
            title: result?.value,
          })
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "메모가 수정되었습니다.",
              showConfirmButton: false,
              timer: 1000,
            });
            /**
             * 수정 완료 시 workspace 다시 로드하는 dispatch
             */
            dispatch(fetchWorkspace());
          })
          .catch((err) => {
            // 이름 중복
            if (err.response.data.error === 11000) {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "중복된 이름이 있습니다.",
                showConfirmButton: false,
                timer: 1000,
              });
            } else {
              // 메모 수정 실패
              Swal.fire({
                position: "center",
                icon: "error",
                title: "메모 수정에 실패했습니다.",
                showConfirmButton: false,
                timer: 1000,
              });
            }
          });
      }
    });
  };

  /**
   * 메모를 folder안에 넣는 로직이 들어간 모달 핸들러
   * Todo: drag & drop으로 수정
   */
  const openFolderModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowFolderModal(true);
  };

  /**
   * folder 지정 모달 close
   */
  const closeFolderModal = () => {
    setShowFolderModal(false);
  };

  /**
   * 모달에서 폴더 클릭 시 폴더 uid 상태 변경
   */
  const focusFolder = (uid: any) => {
    setSelectFolderId(uid);
  };

  /**
   * 모달 완료 클릭 시 patch 통신으로 워크스페이스 폴더에 업로드
   */
  const insertWorkspaceinFolder = async () => {
    await axios.patch(`/api/workspace/${uid}`, { folder: selectFolderId });

    dispatch(fetchWorkspace());
    closeFolderModal();
  };

  /**
   * 즐겨찾기 toggle
   */
  const toggleFavorites = async () => {
    setIsFavorites((prev) => !prev);
  };

  /**
   * 썸네일 지정 핸들러
   */
  const setThumbnail = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ): void => {
    e.currentTarget.src = CONSTANT.EMPTY_IMAGE_PATH;
  };

  /**
   * workspace에 대해 isFavorites이 변경되면 서버 통신으로 즐겨찾기 수정
   */
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
            src={CONSTANT.IMAGE_PATH(uid)}
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
            <Button onClick={patchWorkspace}>수정</Button>
            <Button onClick={openFolderModal}>폴더</Button>
            <span className={styles.Workspace__dataEdit}>
              {formatWorkspaceDate(editedAt)}
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
      <AlertModal showAlertModal={showFolderModal}>
        <AlertModal.Header
          closeAlertModal={closeFolderModal}
        ></AlertModal.Header>
        <AlertModal.Body>
          <div className={cn("d-flex", "flex-column", "align-items-center")}>
            <h3>폴더 선택</h3>
            <div className={cn("d-flex", "flex-column")}>
              {folderList.map((folder) => (
                <Button
                  className={styles.Workspace__modal__button}
                  onClick={() => focusFolder(folder._id)}
                >
                  {folder.title}
                </Button>
              ))}
            </div>
          </div>
        </AlertModal.Body>
        <AlertModal.Footer className={styles.Workspace__modal__footer}>
          <Button onClick={closeFolderModal}>취소</Button>
          <Button onClick={insertWorkspaceinFolder}>이동</Button>
        </AlertModal.Footer>
      </AlertModal>
    </div>
  );
};

export default Workspace;
