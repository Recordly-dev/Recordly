import cn from "classnames";

import {
  useGetWorkspaces,
  useGetWorkspaceInFolder,
  useGetWorkspaceOutsideOfFolder,
} from "query-hooks/useFetchWorkspace";

import { Container } from "reactstrap";

import FolderList from "components/FolderList";
import WorkspaceList from "components/WorkspaceList";
import EmptyDashboard from "components/EmptyDashboard";
import CreateFileButton from "components/CreateFileButton";

import { useSelector } from "react-redux";

import styles from "./MainDashboard.module.scss";

import { RootState } from "store";

const MainDashboard = ({
  isFolderDetailPage,
  isTagPage,
}: {
  isFolderDetailPage?: boolean;
  isTagPage?: boolean;
}) => {
  const currentFolderId = useSelector(
    (state: RootState) => state.folder.currentFolderId
  );

  const isSearch = useSelector(
    (state: RootState) => state.workspace.isSearchStatus
  );

  const { data: allWorkspaces, isLoading } = useGetWorkspaces();

  const { data: workspaceOutSideOfFolder } = useGetWorkspaceOutsideOfFolder();

  const { data: workspaceInFolder } = useGetWorkspaceInFolder({
    folderId: currentFolderId,
  });

  function getWorkspaces({
    isFolderDetailPage,
    isTagPage,
  }: {
    isFolderDetailPage?: boolean;
    isTagPage?: boolean;
  }) {
    if (isFolderDetailPage) {
      return workspaceInFolder;
    } else if (isTagPage) {
      return allWorkspaces;
    } else {
      return workspaceOutSideOfFolder;
    }
  }

  const workspaces = getWorkspaces({ isFolderDetailPage, isTagPage });

  const isEmptyWorkspaces = workspaces?.length === 0;

  const isViewFolderList = !isFolderDetailPage && !isTagPage && !isSearch;

  return (
    <section
      className={cn(styles.MainDashboard, {
        [styles.MainDashboard__tagPage]: isTagPage,
      })}
    >
      <Container
        fluid
        className={cn(styles.MainDashboard__fileList, {
          [styles.MainDashboard__tagPage__fileList]: isTagPage,
        })}
      >
        {isEmptyWorkspaces ? (
          <EmptyDashboard isTagPage={isTagPage} />
        ) : (
          <>
            {isViewFolderList && <FolderList isLoadingData={isLoading} />}
            <WorkspaceList
              isLoadingData={isLoading}
              isTagPage={isTagPage}
              isFolderDetailPage={isFolderDetailPage}
              workspaces={workspaces}
            />
          </>
        )}
      </Container>
      <CreateFileButton />
    </section>
  );
};

export default MainDashboard;
