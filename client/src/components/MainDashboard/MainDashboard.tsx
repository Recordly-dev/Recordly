import React, { useEffect, useState } from "react";
import cn from "classnames";
import { Container } from "reactstrap";

import FolderList from "components/FolderList";
import WorkspaceList from "components/WorkspaceList";

import { useDispatch } from "store";
import { useSelector } from "react-redux";

import { actions as folderActions } from "store/slice/folderSlice";
import { actions as workspaceActions } from "store/slice/workspaceSlice";

import styles from "./MainDashboard.module.scss";
import EmptyDashboard from "components/EmptyDashboard";

const MainDashboard = ({
  isFolderDetailPage,
  isTagPage,
  isEmptyDashboard,
  isLoadingData,
}: {
  isFolderDetailPage?: boolean;
  isTagPage?: boolean;
  isEmptyDashboard: boolean;
  isLoadingData: boolean;
}) => {
  const dispatch = useDispatch();

  const currentFolderId: string = useSelector(
    (state: any) => state.folder.currentFolderId
  );

  useEffect(() => {
    if (isTagPage) {
      dispatch(folderActions.setInitialFolderList());
      dispatch(workspaceActions.fetchAllWorkspaceList());
    } else if (isFolderDetailPage) {
      dispatch(
        workspaceActions.fetchWorkspaceInFolder({ uid: currentFolderId })
      );
    } else {
      dispatch(folderActions.fetchFolderList());
      dispatch(workspaceActions.fetchWorkspaceList());
    }
  }, [isTagPage, isFolderDetailPage, currentFolderId]);

  return (
    <section className={cn(styles.MainDashboard)}>
      <Container fluid className={styles.MainDashboard__fileList}>
        {isEmptyDashboard && !isLoadingData ? (
          <EmptyDashboard isTagPage={isTagPage} />
        ) : (
          <>
            {!isFolderDetailPage && (
              <FolderList isLoadingData={isLoadingData} />
            )}
            <WorkspaceList
              isLoadingData={isLoadingData}
              isTagPage={isTagPage}
            />
          </>
        )}
      </Container>
    </section>
  );
};

export default MainDashboard;
