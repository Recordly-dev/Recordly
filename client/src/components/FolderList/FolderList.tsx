import { useSelector } from "react-redux";
import { useDispatch } from "store";

import Folder from "components/Folder/Folder";

import { actions as workspaceActions } from "store/slice/workspaceList";
import { IFolder } from "types/folder";
import WorkspaceSkeleton from "components/Skeleton/WorkspaceSkeleton";

const FolderList = ({ isLoadingData }: { isLoadingData: boolean }) => {
  const dispatch = useDispatch();

  const folderList: IFolder[] = useSelector(
    (state: any) => state.folder.folderList
  );

  const moveWorkSpacePage = async (id: string) => {
    dispatch(workspaceActions.fetchWorkspaceInFolder({ uid: id }));
  };

  return (
    <>
      {isLoadingData ? (
        <WorkspaceSkeleton />
      ) : (
        folderList.map((folder) => (
          <Folder
            uid={folder._id}
            key={folder._id}
            title={folder.title}
            moveWorkSpacePage={moveWorkSpacePage}
          />
        ))
      )}
    </>
  );
};

export default FolderList;
