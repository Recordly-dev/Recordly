import React, { useEffect, useState } from "react";
import cn from "classnames";
import { useDispatch } from "store";
import { useSelector } from "react-redux";

import { Container } from "reactstrap";

import WorkspaceList from "components/WorkspaceList";

import { actions as workspaceActions } from "store/slice/workspaceList";

import styles from "./FavoritesDashboard.module.scss";

const FavoritesDashboard = ({
  isFavoritesPage,
}: {
  isFavoritesPage: boolean;
}) => {
  const dispatch = useDispatch();

  const [isLoadingData, setIsLoadingData] = useState(false);

  const isLoadingFetchWorkspace: boolean = useSelector(
    (state: any) => state.workspace.isLoading
  );

  useEffect(() => {
    setIsLoadingData(isLoadingFetchWorkspace);
  }, [isLoadingFetchWorkspace]);

  useEffect(() => {
    dispatch(workspaceActions.fetchFavoritesWorkspaceList());
  }, []);

  return (
    <section className={cn(styles.FavoritesDashboard)}>
      <Container fluid className={styles.FavoritesDashboard__fileList}>
        <WorkspaceList
          isLoadingData={isLoadingData}
          isFavoritesPage={isFavoritesPage}
        />
      </Container>
    </section>
  );
};

export default FavoritesDashboard;
