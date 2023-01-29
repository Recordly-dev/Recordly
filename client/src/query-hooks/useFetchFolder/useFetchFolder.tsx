import { useQueryClient, useQuery, useMutation } from "react-query";

import { getFolder, postFolder, patchFolder, deleteFolder } from "./apis";

import FOLDER_KEYS from "./keys";

// 폴더 조회
export const useGetFolder = () =>
  useQuery(FOLDER_KEYS.all(), () => getFolder());

// 폴더 생성
export const usePostFolder = () => {
  const queryClient = useQueryClient();

  return useMutation(({ title }: { title: string }) => postFolder({ title }), {
    onSuccess: () => {
      queryClient.invalidateQueries(FOLDER_KEYS.all());
    },
  });
};

// 폴더 수정
export const usePatchFolder = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ title, folderId }: { title: string; folderId: string }) =>
      patchFolder({ title, folderId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(FOLDER_KEYS.all());
      },
    }
  );
};

// 폴더 삭제
export const useDeleteFolder = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ folderId }: { folderId: string }) => deleteFolder({ folderId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(FOLDER_KEYS.all());
      },
    }
  );
};
