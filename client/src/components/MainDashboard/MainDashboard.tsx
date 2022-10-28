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

const MainDashboard = ({ isDetail }: { isDetail?: boolean }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoadingData, setIsLoadingData] = useState(false);

  const isLoadingFetchWorkspace: boolean = useSelector(
    (state: any) => state.workspace.isLoading
  );

  const isLoadingFetchFolder: boolean = useSelector(
    (state: any) => state.folder.isLoading
  );

  useEffect(() => {
    dispatch(folderActions.fetchFolderList());
    dispatch(workspaceActions.fetchWorkspaceList());
  }, []);

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
        {isDetail ? (
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
