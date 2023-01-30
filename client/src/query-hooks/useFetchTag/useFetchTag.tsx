import { useQueryClient, useQuery, useMutation } from "react-query";

import {
  getTags,
  getTagsSortedByCount,
  getTagsSortedByName,
  getRecommendedTag,
  getTagsInWorkspace,
  postTag,
  patchTag,
  deleteTag,
} from "./apis";

import TAG_KEYS from "./keys";

// 전체 태그 조회
export const useGetTags = () => useQuery(TAG_KEYS.all(), getTags);

// 이름 순으로 정렬된 태그 조회
export const useGetTagsSortedByCount = ({ type }: { type: string }) =>
  useQuery(TAG_KEYS.all(), () => getTagsSortedByCount({ type }));

// 알파벳 순서로 정렬된 태그 조회
export const useGetTagsSortedByName = ({ isSort }: { isSort: boolean }) =>
  useQuery(TAG_KEYS.all(), () => getTagsSortedByName({ isSort }));

// 추천 태그 조회
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

// 워크스페이스 내부 태그 목록 조회
export const useGetTagsInWorkspace = ({
  workspaceId,
}: {
  workspaceId: string;
}) =>
  useQuery(TAG_KEYS.workspaceTag(workspaceId), () =>
    getTagsInWorkspace({ workspaceId })
  );

// 태그 생성
export const usePostTag = ({ workspaceId }: { workspaceId: string }) => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ name, workspaceId }: { name: string; workspaceId: string }) =>
      postTag({ name, workspaceId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(TAG_KEYS.workspaceTag(workspaceId));
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
        queryClient.invalidateQueries(TAG_KEYS.workspaceTag(workspaceId));
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
        queryClient.invalidateQueries(TAG_KEYS.workspaceTag(workspaceId));
      },
    }
  );
};
