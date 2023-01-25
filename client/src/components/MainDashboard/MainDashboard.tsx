import cn from "classnames";
import { Container } from "reactstrap";

import {
  useGetWorkspaces,
  useGetWorkspaceInFolder,
  useGetWorkspaceOutsideOfFolder,
} from "query-hooks/useFetchWorkspcae";

import FolderList from "components/FolderList";
import WorkspaceList from "components/WorkspaceList";
import EmptyDashboard from "components/EmptyDashboard";
import CreateFileButton from "components/CreateFileButton";

import { useSelector } from "react-redux";

import styles from "./MainDashboard.module.scss";

const MainDashboard = ({
  isFolderDetailPage,
  isTagPage,
}: {
  isFolderDetailPage?: boolean;
  isTagPage?: boolean;
}) => {
  const currentFolderId: string = useSelector(
    (state: any) => state.folder.currentFolderId
  );

  const { data: allWorkspaces, isLoading } = useGetWorkspaces();

  const { data: workspaceOutSideOfFolder } = useGetWorkspaceOutsideOfFolder();

  const { data: workspaceInFolder } = useGetWorkspaceInFolder({
    uid: currentFolderId,
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
            {!isFolderDetailPage && !isTagPage && (
              <FolderList isLoadingData={isLoading} />
            )}
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
