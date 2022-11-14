import React, { useEffect } from "react";
import cn from "classnames";
import { useDispatch } from "store";

import { Container } from "reactstrap";

import WorkspaceList from "components/WorkspaceList";
import EmptyDashboard from "components/EmptyDashboard";
import CreateFileButton from "components/CreateFileButton";

import { actions as workspaceActions } from "store/slice/workspaceSlice";
import { actions as folderActions } from "store/slice/folderSlice";

import styles from "./FavoritesDashboard.module.scss";

const FavoritesDashboard = ({
  isFavoritesPage,
  isEmptyDashboard,
  isLoadingData,
}: {
  isFavoritesPage: boolean;
  isEmptyDashboard: boolean;
  isLoadingData: boolean;
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(workspaceActions.fetchFavoritesWorkspaceList());
    dispatch(folderActions.setInitialFolderList());
  }, []);

  return (
    <section className={cn(styles.FavoritesDashboard)}>
      <Container fluid className={styles.FavoritesDashboard__fileList}>
        {isEmptyDashboard ? (
          <EmptyDashboard isFavoritesPage />
        ) : (
          <WorkspaceList
            isLoadingData={isLoadingData}
            isFavoritesPage={isFavoritesPage}
          />
        )}
      </Container>
      <CreateFileButton />
    </section>
  );
};

export default FavoritesDashboard;
