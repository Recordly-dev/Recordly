import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import { useNavigate } from "react-router";

import Folder from "components/Folder/Folder";

import styles from "./FolderList.module.scss";

import { actions as folderActions } from "store/slice/folderList";
import { actions as workspaceActions } from "store/slice/workspaceList";
import { IFolder } from "types/folder";
import WorkspaceSkeleton from "components/Skeleton/WorkspaceSkeleton";

const FolderList = ({ isLoadingData }: { isLoadingData: boolean }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [viewFolder, setViewFolder] = useState(true);

  const folderList: IFolder[] = useSelector(
    (state: any) => state.folder.folderList
  );

  useEffect(() => {
    dispatch(folderActions.fetchFolderList());
  }, []);

  useEffect(() => {
    // 임시 커밋! 추후 로직 수정 예정
    window.onpopstate = () => {
      // popstate 가 발생하면 페이지를 전환
      setViewFolder(true);
    };
  }, []);

  const moveWorkSpacePage = async (id: string) => {
    dispatch(workspaceActions.fetchWorkspaceInFolder({ uid: id }));

    setViewFolder(false);
  };

  const moveGoBack = () => {
    setViewFolder(true);
    navigate(`/main`);
    dispatch(workspaceActions.fetchWorkspaceList());
  };

  return (
    <>
      {viewFolder ? (
        isLoadingData ? (
          <WorkspaceSkeleton />
        ) : (
          folderList.map((folder) => (
            <Folder
              uid={folder._id}
              key={folder._id}
              title={folder.title}
              moveWorkSpacePage={moveWorkSpacePage}
            />
          ))
        )
      ) : (
        <>
          <div className={styles.FolderList} onClick={moveGoBack}>
            <div>
              <h1 className={styles.FolderList__title}>뒤로 가기</h1>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FolderList;
