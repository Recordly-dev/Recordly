import { useQueryClient, useQuery, useMutation } from "react-query";

import {
  getWorkspace,
  getWorkspaceOutsideOfFolder,
  getWorkspaceInFolder,
  getWorkspacesWithTag,
  getSearchWorkspace,
  getSortWorkspace,
  getFavoritesWorkspace,
  patchFavoritesWorkspace,
  postWorkspace,
  patchWorkspace,
  deleteWorkspace,
} from "./apis";

import WORKSPACE_KEYS from "./keys";

// 워크스페이스 조회
export const useGetTag = () =>
  useQuery(WORKSPACE_KEYS.all(), () => getWorkspace());

export const useGetSortedTag = ({ type }: { type: string }) =>
  useQuery(WORKSPACE_KEYS.all(), () => getSortWorkspace({ type }));

export const useGetWorkspaceOutsideOfFolder = () => {
  useQuery(WORKSPACE_KEYS.outsideOfFolder(), () =>
    getWorkspaceOutsideOfFolder()
  );
};

export const useGetWorkspaceInFolder = ({ uid }: { uid: string }) => {
  useQuery(WORKSPACE_KEYS.workspaceInFolder(uid), () =>
    getWorkspaceInFolder({ uid })
  );
};

export const useGetWorkspacesWithTag = ({ tagId }: { tagId: string }) => {
  useQuery(WORKSPACE_KEYS.withTag(tagId), () =>
    getWorkspacesWithTag({ tagId })
  );
};

export const useGetSearchWorkspace = ({ value }: { value: string }) => {
  useQuery(WORKSPACE_KEYS.search(value), () => getSearchWorkspace({ value }));
};

export const useGetFavoritesWorkspace = () => {
  useQuery(WORKSPACE_KEYS.favoritesWorkspace(), () => getFavoritesWorkspace());
};

// 즐겨찾기 수정
export const usePatchFavoritesWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uid, isFavorites }: { uid: string; isFavorites: boolean }) =>
      patchFavoritesWorkspace({ uid, isFavorites }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(WORKSPACE_KEYS.favoritesWorkspace());
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
