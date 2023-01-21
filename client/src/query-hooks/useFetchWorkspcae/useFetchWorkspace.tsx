import { useQueryClient, useQuery, useMutation } from "react-query";

import {
  getWorkspace,
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

// 전체 워크스페이스 조회
export const useGetTag = () =>
  useQuery(WORKSPACE_KEYS.all(), () => getWorkspace());

// type에 따라 정렬된 워크스페이스 조회
export const useGetWorkspacesSortedByEditedAt = ({ type }: { type: string }) =>
  useQuery(WORKSPACE_KEYS.all(), () => getWorkspacesSortedByEditedAt({ type }));

// 폴더 외부에 있는 워크스페이스 조회
export const useGetWorkspaceOutsideOfFolder = () => {
  useQuery(WORKSPACE_KEYS.outsideOfFolder(), () =>
    getWorkspaceOutsideOfFolder()
  );
};

// 특정 폴더 안에 있는 워크스페이스 조회
export const useGetWorkspaceInFolder = ({ uid }: { uid: string }) => {
  useQuery(WORKSPACE_KEYS.workspaceInFolder(uid), () =>
    getWorkspaceInFolder({ uid })
  );
};

// 특정 태그를 가진 워크스페이스 조회
export const useGetWorkspacesWithTag = ({ tagId }: { tagId: string }) => {
  useQuery(WORKSPACE_KEYS.withTag(tagId), () =>
    getWorkspacesWithTag({ tagId })
  );
};

// 검색한 결과에 따른 워크스페이스 조회
export const useGetSearchWorkspace = ({ value }: { value: string }) => {
  useQuery(WORKSPACE_KEYS.search(value), () => getSearchWorkspace({ value }));
};

// 즐겨찾기 되어있는 워크스페이스 조회
export const useGetFavoratedWorkspace = () => {
  useQuery(WORKSPACE_KEYS.favoritedWorkspace(), () => getFavoratedWorkspace());
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
export const usePatchWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({
      workspaceId,
      folder,
      title,
    }: {
      workspaceId: string;
      title?: string;
      folder?: string | null;
    }) => patchWorkspace({ workspaceId, title, folder }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(WORKSPACE_KEYS.outsideOfFolder());
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
      },
    }
  );
};
