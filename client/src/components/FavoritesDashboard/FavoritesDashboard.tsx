import cn from "classnames";

import { Container } from "reactstrap";

import { useGetFavoratedWorkspace } from "query-hooks/useFetchWorkspcae";

import WorkspaceList from "components/WorkspaceList";
import EmptyDashboard from "components/EmptyDashboard";
import CreateFileButton from "components/CreateFileButton";

import styles from "./FavoritesDashboard.module.scss";

const FavoritesDashboard = ({
  isFavoritesPage,
}: {
  isFavoritesPage: boolean;
}) => {
  const { data: favoritedWorkspaces, isLoading } = useGetFavoratedWorkspace();

  const isEmptyFavoritedWorkspace = favoritedWorkspaces?.length === 0;

  return (
    <section className={cn(styles.FavoritesDashboard)}>
      <Container fluid className={styles.FavoritesDashboard__fileList}>
        {isEmptyFavoritedWorkspace ? (
          <EmptyDashboard isFavoritesPage />
        ) : (
          <WorkspaceList
            isLoadingData={isLoading}
            isFavoritesPage={isFavoritesPage}
            workspaces={favoritedWorkspaces}
          />
        )}
      </Container>
      <CreateFileButton />
    </section>
  );
};

export default FavoritesDashboard;
