import { useDispatch } from "store";
import { useNavigate } from "react-router";

import { useGetFolder } from "query-hooks/useFetchFolder";

import { actions as folderActions } from "store/slice/folderSlice";

import WorkspaceSkeleton from "components/Skeleton/WorkspaceSkeleton";
import Folder from "components/Folder/Folder";

import { IFolder } from "types/folder";

const FolderList = ({ isLoadingData }: { isLoadingData: boolean }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: folders, isLoading } = useGetFolder();

  const moveFolderDetailPage = (id: string) => {
    navigate(`/main/${id}`);
    dispatch(folderActions.patchCurrentFolderId({ uid: id }));
  };

  return (
    <>
      {isLoadingData ? (
        <WorkspaceSkeleton />
      ) : (
        folders?.map((folder: IFolder) => (
          <Folder
            uid={folder._id}
            key={folder._id}
            title={folder.title}
            isLoading={isLoading}
            moveFolderDetailPage={moveFolderDetailPage}
          />
        ))
      )}
    </>
  );
};

export default FolderList;
