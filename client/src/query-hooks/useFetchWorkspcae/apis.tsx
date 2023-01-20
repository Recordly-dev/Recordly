import axios from "axios";
import sortBy from "lodash/sortBy";

import { IWorkspace } from "../../types/workspace";
/**
 * 전체 workspace 불러오는 api
 */
export async function getWorkspace() {
  const { data } = await axios.get("/api/workspace");

  return data;
}

/**
 * 폴더에 있는 것 빼고 전체 workspace 불러오는 api
 */
export async function getWorkspaceOutsideOfFolder() {
  const { data } = await axios.get("/api/folder");

  const filterData = data.filter(
    (workspace: IWorkspace) => workspace.folder === null
  );

  return filterData;
}

/**
 * 특정 폴더의 workspace 불러오는 api
 */
export async function getWorkspaceInFolder({ uid }: { uid: string }) {
  const { data } = await axios.get(`/api/folder/${uid}/workspace`);

  return data;
}

/**
 * 특정 태그를 가지고 있는 워크스페이스 불러오는 로직
 */
export async function getWorkspacesWithTag({ tagId }: { tagId: string }) {
  const { data } = await axios.get(`/api/tag/${tagId}/workspaces`);

  return data;
}

/**
 * 검색에 포함된 workspace 불러오는 api
 */
export async function getSearchWorkspace({ value }: { value: string }) {
  const { data } = await axios.get("/api/workspace");

  return data?.filter((v: IWorkspace) => {
    if (value.length === 0) {
      return v.folder === null;
    } else {
      return v.title.includes(value);
    }
  });
}
/**
 * 드롭다운(최신, 오래된 순)일 때 실행되는 api
 */
export async function getSortWorkspace({ type }: { type: string }) {
  const { data } = await axios.get("/api/workspace");

  const sortedData = sortBy(data, "editedAt").reverse();

  if (type === "newest") {
    return sortedData;
  } else {
    const sortedReverseData = sortBy(data, "editedAt");

    return sortedReverseData;
  }
}

/**
 * 즐겨찾기 workspace 불러오는 api
 */
export async function getFavoritesWorkspace() {
  const { data } = await axios.get("/api/workspace/favorites");

  return data;
}

/**
 * 즐겨찾기 상태 수정하는 api
 */
export async function patchFavoritesWorkspace({
  uid,
  isFavorites,
}: {
  uid: string;
  isFavorites: boolean;
}) {
  const params = {
    workspaceId: uid,
    isFavorites: isFavorites,
  };

  await axios.patch(`/api/workspace/favorites/${uid}`, params);
}

/**
 * 워크스페이스 생성 api
 */
export async function postWorkspace({
  title,
  workspaceType,
}: {
  title: string;
  workspaceType: string;
}) {
  await axios.post("/api/workspace", {
    title: title,
    workspaceType: workspaceType,
  });
}

/**
 * 워크스페이스 수정 api
 */
export async function patchWorkspace({
  workspaceId,
  folder,
  title,
}: {
  workspaceId: string;
  title?: string;
  folder?: string | null;
}) {
  await axios.patch(`/api/workspace/${workspaceId}`, {
    workspaceId: workspaceId,
    folder: folder,
    title: title,
  });
}

/**
 * 워크스페이스 삭제 api
 */
export async function deleteWorkspace({
  workspaceId,
}: {
  workspaceId: string;
}) {
  await axios.delete(`/api/workspace/${workspaceId}`);
}
