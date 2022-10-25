import React, { useEffect, useState } from "react";
import cn from "classnames";
import { useSelector } from "react-redux";

import { Container } from "reactstrap";

import FolderList from "components/FolderList";
import WorkspaceList from "components/WorkspaceList";

import styles from "./MainDashboard.module.scss";

const MainDashboard = () => {
  const [isLoadingData, setIsLoadingData] = useState(false);

  const isLoadingFetchWorkspace: boolean = useSelector(
    (state: any) => state.workspace.isLoading
  );

  const isLoadingFetchFolder: boolean = useSelector(
    (state: any) => state.folder.isLoading
  );

  useEffect(() => {
    setIsLoadingData(isLoadingFetchWorkspace || isLoadingFetchFolder);
  }, [isLoadingFetchWorkspace, isLoadingFetchFolder]);

  return (
    <section className={cn(styles.MainDashboard)}>
      <Container fluid className={styles.MainDashboard__fileList}>
        <FolderList isLoadingData={isLoadingData} />
        <WorkspaceList isLoadingData={isLoadingData} />
      </Container>
    </section>
  );
};

export default MainDashboard;
