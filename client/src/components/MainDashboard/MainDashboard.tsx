import React, { useEffect, useState } from "react";
import cn from "classnames";
import { useNavigate } from "react-router";

import { Container } from "reactstrap";

import FolderList from "components/FolderList";
import WorkspaceList from "components/WorkspaceList";
import MoveToBackCard from "./components/MoveToBackCard";

import { useDispatch } from "store";
import { useSelector } from "react-redux";

import { actions as folderActions } from "store/slice/folderList";
import { actions as workspaceActions } from "store/slice/workspaceList";

import styles from "./MainDashboard.module.scss";

const MainDashboard = ({
  isFolderDetailPage,
}: {
  isFolderDetailPage?: boolean;
}) => {
  const [isLoadingData, setIsLoadingData] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoadingFetchWorkspace: boolean = useSelector(
    (state: any) => state.workspace.isLoading
  );

  const isLoadingFetchFolder: boolean = useSelector(
    (state: any) => state.folder.isLoading
  );

  const currentFolderId: string = useSelector(
    (state: any) => state.folder.currentFolderId
  );

  useEffect(() => {
    dispatch(folderActions.fetchFolderList());
    !isFolderDetailPage
      ? dispatch(workspaceActions.fetchWorkspaceList())
      : dispatch(
          workspaceActions.fetchWorkspaceInFolder({ uid: currentFolderId })
        );
  }, [isFolderDetailPage, currentFolderId]);

  const moveGoBack = () => {
    navigate(`/main`);
    dispatch(workspaceActions.fetchWorkspaceList());
  };

  useEffect(() => {
    setIsLoadingData(isLoadingFetchWorkspace || isLoadingFetchFolder);
  }, [isLoadingFetchWorkspace, isLoadingFetchFolder]);

  return (
    <section className={cn(styles.MainDashboard)}>
      <Container fluid className={styles.MainDashboard__fileList}>
        {isFolderDetailPage ? (
          <MoveToBackCard moveGoBack={moveGoBack} />
        ) : (
          <FolderList isLoadingData={isLoadingData} />
        )}
        <WorkspaceList isLoadingData={isLoadingData} />
      </Container>
    </section>
  );
};

export default MainDashboard;
