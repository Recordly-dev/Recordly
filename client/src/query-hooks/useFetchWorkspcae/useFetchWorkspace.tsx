import { useQueryClient, useQuery, useMutation } from "react-query";

import {
  getWorkspaces,
  getWorkspaceOutsideOfFolder,
  getWorkspaceInFolder,
  getWorkspacesWithTag,
  getSearchWorkspace,
  getWorkspacesSortedByEditedAt,
  getFavoratedWorkspace,
  patchFavoritesWorkspace,
  postWorkspace,
  patchWorkspace,
  deleteWorkspace,
} from "./apis";

import WORKSPACE_KEYS from "./keys";

import { IWorkspace } from "types/workspace";

// 전체 워크스페이스 조회
export const useGetWorkspaces = () =>
  useQuery(WORKSPACE_KEYS.all(), () => getWorkspaces());

// 즐겨찾기 되어있는 워크스페이스 조회
export const useGetFavoratedWorkspace = () =>
  useQuery(WORKSPACE_KEYS.favoritedWorkspace(), () => getFavoratedWorkspace());

// 폴더 외부에 있는 워크스페이스 조회
export const useGetWorkspaceOutsideOfFolder = () =>
  useQuery(WORKSPACE_KEYS.outsideOfFolder(), () =>
    getWorkspaceOutsideOfFolder()
  );

// 특정 폴더 안에 있는 워크스페이스 조회
export const useGetWorkspaceInFolder = ({ uid }: { uid: string }) =>
  useQuery(WORKSPACE_KEYS.workspaceInFolder(uid), () =>
    getWorkspaceInFolder({ uid })
  );

// 특정 태그를 가진 워크스페이스 조회
export const useGetWorkspacesWithTag = ({ tagId }: { tagId: string }) =>
  useQuery(WORKSPACE_KEYS.withTag(tagId), () =>
    getWorkspacesWithTag({ tagId })
  );

// 검색한 결과에 따른 워크스페이스 조회
export const useGetSearchWorkspace = ({
  keyword,
  isFavoritesPage,
  isTagPage,
  isFetchWorkspace,
}: {
  keyword: string;
  isFavoritesPage: boolean;
  isTagPage: boolean;
  isFetchWorkspace: boolean;
}) => {
  const queryClient = useQueryClient();

  return useQuery(
    WORKSPACE_KEYS.search(keyword),
    () => getSearchWorkspace({ keyword, isFavoritesPage, isTagPage }),
    {
      // 현재 검색할 때 마다 workspace 호출이 여러 번 되는 이슈
      // 추후 Debounce or key 최적화로 해결 예정
      onSuccess: (workspaces: IWorkspace[]) => {
        if (isFavoritesPage) {
          queryClient.setQueryData(
            WORKSPACE_KEYS.favoritedWorkspace(),
            workspaces
          );
        } else if (isTagPage) {
          queryClient.setQueryData(WORKSPACE_KEYS.all(), workspaces);
        } else {
          queryClient.setQueryData(
            WORKSPACE_KEYS.outsideOfFolder(),
            workspaces
          );
        }
      },
      enabled: isFetchWorkspace,
    }
  );
};

// type에 따라 정렬된 워크스페이스 조회
export const useGetWorkspacesSortedByEditedAt = ({
  type,
  isFavoritesPage,
  isTagPage,
}: {
  type: string;
  isFavoritesPage: boolean | undefined;
  isTagPage: boolean | undefined;
}) => {
  const queryClient = useQueryClient();

  return useQuery(
    WORKSPACE_KEYS.sort(type),
    () => getWorkspacesSortedByEditedAt({ type, isFavoritesPage, isTagPage }),
    {
      // 현재 검색할 때 마다 workspace 호출이 여러 번 되는 이슈
      // 추후 Debounce or key 최적화로 해결 예정
      onSuccess: (workspaces: IWorkspace[]) => {
        if (isFavoritesPage) {
          queryClient.setQueryData(
            WORKSPACE_KEYS.favoritedWorkspace(),
            workspaces
          );
        } else if (isTagPage) {
          queryClient.setQueryData(WORKSPACE_KEYS.all(), workspaces);
        } else {
          queryClient.setQueryData(
            WORKSPACE_KEYS.outsideOfFolder(),
            workspaces
          );
        }
      },
    }
  );
};

// 워크스페이스 즐겨찾기 수정
export const usePatchFavoritesWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uid, isFavorites }: { uid: string; isFavorites: boolean }) =>
      patchFavoritesWorkspace({ uid, isFavorites }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(WORKSPACE_KEYS.favoritedWorkspace());
      },
    }
  );
};

// 워크스페이스 생성
export const usePostWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ title, workspaceType }: { title: string; workspaceType: string }) =>
      postWorkspace({ title, workspaceType }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(WORKSPACE_KEYS.outsideOfFolder());
      },
    }
  );
};

// 워크스페이스 수정
export const usePatchWorkspace = ({
  folderId,
}: {
  folderId: string | null;
}) => {
  const queryClient = useQueryClient();

  return useMutation(
    ({
      workspaceId,
      folder,
      folderId,
      title,
    }: {
      workspaceId: string;
      title?: string;
      folderId?: string | null;
      folder?: string | null;
    }) => patchWorkspace({ workspaceId, title, folder, folderId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(WORKSPACE_KEYS.outsideOfFolder());
        queryClient.invalidateQueries(
          WORKSPACE_KEYS.workspaceInFolder(folderId)
        );
        queryClient.invalidateQueries(WORKSPACE_KEYS.all());
      },
    }
  );
};

// 워크스페이스 삭제
export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ workspaceId }: { workspaceId: string }) =>
      deleteWorkspace({ workspaceId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(WORKSPACE_KEYS.outsideOfFolder());
        queryClient.invalidateQueries(WORKSPACE_KEYS.all());
      },
    }
  );
};
