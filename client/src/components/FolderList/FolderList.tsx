import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import Folder from "components/Folder/Folder";

import styles from "./FolderList.module.scss";

import { fetchFolderList } from "store/slice/folderListSlice";
import { useDispatch } from "store";
import { IFolder } from "types/folder";

const FolderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const folderList: IFolder[] = useSelector(
    (state: any) => state.folder.folderList
  );

  useEffect(() => {
    dispatch(fetchFolderList());
  }, []);

  const moveWorkSpacePage = (id: string): void => {
    navigate(`/main/${id}`);
  };

  return (
    <>
      {folderList.map((folder) => (
        <Folder
          uid={folder._id}
          title={folder.title}
          moveWorkSpacePage={moveWorkSpacePage}
        />
      ))}
    </>
  );
};

export default FolderList;
