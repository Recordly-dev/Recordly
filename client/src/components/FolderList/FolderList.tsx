import { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import Folder from "components/Folder/Folder";

import styles from "./FolderList.module.scss";

import { fetchFolderList } from "store/slice/folderListSlice";
import {
  fetchWorkspace,
  fetchWorkspaceInFolder,
} from "store/slice/workspcaeSlice";
import { useDispatch } from "store";
import { IFolder } from "types/folder";

const FolderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [viewFolder, setViewFolder] = useState(true);

  const folderList: IFolder[] = useSelector(
    (state: any) => state.folder.folderList
  );

  useEffect(() => {
    dispatch(fetchFolderList());
  }, []);

  const moveWorkSpacePage = async (id: string) => {
    navigate(`/main/${id}`);
    dispatch(fetchWorkspaceInFolder(id));

    setViewFolder(false);
  };

  const moveGoBack = () => {
    setViewFolder(true);
    navigate(`/main`);
    dispatch(fetchWorkspace());
  };

  return (
    <>
      {viewFolder ? (
        folderList.map((folder) => (
          <Folder
            uid={folder._id}
            title={folder.title}
            moveWorkSpacePage={moveWorkSpacePage}
          />
        ))
      ) : (
        <>
          <div className={styles.FolderList} onClick={moveGoBack}>
            <div>
              <span className={styles.FolderList__title}>뒤로 가기</span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FolderList;
