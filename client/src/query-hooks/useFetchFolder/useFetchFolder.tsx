import { useQueryClient, useQuery, useMutation } from "react-query";

import { getFolder, postFolder, patchFolder, deleteFolder } from "./apis";

import FOLDER_KEYS from "./keys";

// 폴더 조회
export const useGetFolder = () =>
  useQuery(FOLDER_KEYS.folder(), () => getFolder());

// 폴더 생성
export const usePostFolder = () => {
  const queryClient = useQueryClient();

  return useMutation(({ title }: { title: string }) => postFolder({ title }), {
    onSuccess: () => {
      queryClient.invalidateQueries(FOLDER_KEYS.folder());
    },
  });
};

// 폴더 수정
export const usePatchFolder = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ title, uid }: { title: string; uid: string }) =>
      patchFolder({ title, uid }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(FOLDER_KEYS.folder());
      },
    }
  );
};

// 폴더 삭제
export const useDeleteFolder = () => {
  const queryClient = useQueryClient();

  return useMutation(({ uid }: { uid: string }) => deleteFolder({ uid }), {
    onSuccess: () => {
      queryClient.invalidateQueries(FOLDER_KEYS.folder());
    },
  });
};
