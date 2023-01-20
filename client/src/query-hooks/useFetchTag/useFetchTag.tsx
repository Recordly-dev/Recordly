import { useQueryClient, useQuery, useMutation } from "react-query";

import {
  getTag,
  getSortedTag,
  getSortedAlphaTag,
  getRecommendedTag,
  getWorkspaceTag,
  postTag,
  patchTag,
  deleteTag,
} from "./apis";

import TAG_KEYS from "./keys";

// 태그 조회
export const useGetTag = () => useQuery(TAG_KEYS.all(), getTag);

//
export const useGetSortedTag = ({ type }: { type: string }) =>
  useQuery(TAG_KEYS.all(), () => getSortedTag({ type }));

export const useGetSortedAlphaTag = ({ isSort }: { isSort: boolean }) =>
  useQuery(TAG_KEYS.all(), () => getSortedAlphaTag({ isSort }));

export const useGetRecommendedTag = ({
  text,
  workspaceId,
}: {
  text: string;
  workspaceId: string;
}) =>
  useQuery(TAG_KEYS.recommendedTag(workspaceId), () =>
    getRecommendedTag({ text, workspaceId })
  );

export const useGetWorkspaceTag = ({ uid }: { uid: string }) => {
  useQuery(TAG_KEYS.workspcaeTag(uid), () => getWorkspaceTag({ uid }));
};

// 태그 생성
export const usePostTag = ({ workspaceId }: { workspaceId: string }) => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ name, workspaceId }: { name: string; workspaceId: string }) =>
      postTag({ name, workspaceId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(TAG_KEYS.workspcaeTag(workspaceId));
      },
    }
  );
};

// 태그 수정
export const usePatchTag = ({ workspaceId }: { workspaceId: string }) => {
  const queryClient = useQueryClient();

  return useMutation(
    ({
      tagId,
      tagName,
      workspaceId,
    }: {
      tagId: string;
      tagName: string;
      workspaceId: string;
    }) => patchTag({ tagId, tagName, workspaceId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(TAG_KEYS.workspcaeTag(workspaceId));
      },
    }
  );
};

// 태그 삭제
export const useDeleteTag = ({ workspaceId }: { workspaceId: string }) => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ tagId, workspaceId }: { tagId: string; workspaceId: string }) =>
      deleteTag({ tagId, workspaceId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(TAG_KEYS.workspcaeTag(workspaceId));
      },
    }
  );
};
