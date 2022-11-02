import { useSelector } from "react-redux";
import { useDispatch } from "store";
import { useNavigate } from "react-router";

import Folder from "components/Folder/Folder";

import { IFolder } from "types/folder";
import { actions as folderActions } from "store/slice/folderSlice";
import { actions as workspaceActions } from "store/slice/workspaceSlice";

import WorkspaceSkeleton from "components/Skeleton/WorkspaceSkeleton";

const FolderList = ({ isLoadingData }: { isLoadingData: boolean }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const folderList: IFolder[] = useSelector(
    (state: any) => state.folder.folderList
  );

  const moveFolderDetailPage = (id: string) => {
    navigate(`/main/${id}`);
    dispatch(folderActions.patchCurrentFolderId({ uid: id }));
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
            moveFolderDetailPage={moveFolderDetailPage}
          />
        ))
      )}
    </>
  );
};

export default FolderList;
