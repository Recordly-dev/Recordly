import { TDDocument } from "@tldraw/tldraw";
import axios from "axios";
import sortBy from "lodash/sortBy";

import { IWorkspace } from "../../types/workspace";

/**
 * 전체 workspace 불러오는 api
 */
export async function getWorkspaces() {
  const { data } = await axios.get("/api/workspace");

  return data.result.workspaces;
}

/**
 * 현재 workspace 불러오는 api
 */
export async function getCurrentWorkspace({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const { data } = await axios.get(`/api/workspace/${workspaceId}`);

  return data.result.workspace;
}

/**
 * 폴더에 있는 것 빼고 전체 workspace 불러오는 api
 */
export async function getWorkspaceOutsideOfFolder() {
  const { data } = await axios.get("/api/workspace");

  const filterData = data.result.workspaces.filter(
    (workspace: IWorkspace) => workspace.folder === null
  );

  return filterData;
}

/**
 * 특정 폴더의 workspace 불러오는 api
 */
export async function getWorkspaceInFolder({ folderId }: { folderId: string }) {
  const { data } = await axios.get(`/api/folder/${folderId}/workspace`);

  return data.result.workspaces;
}

/**
 * 특정 태그를 가지고 있는 워크스페이스 불러오는 로직
 */
export async function getWorkspacesWithTag({ tagId }: { tagId: string }) {
  const { data } = await axios.get(`/api/tag/${tagId}/workspaces`);

  return data.result.workspaces;
}

/**
 * 검색에 포함된 workspace 불러오는 api
 */
export async function getSearchWorkspace({
  keyword,
  isFavoritesPage,
  isTagPage,
}: {
  keyword: string;
  isFavoritesPage: boolean;
  isTagPage: boolean;
}) {
  const isKeywordBlank = keyword.length === 0;
  const isMainPage = !isTagPage && !isFavoritesPage;
  let workspaces;

  if (isFavoritesPage) {
    const { data } = await axios.get("/api/workspace/favorites");

    workspaces = data.result.workspaces;
  } else {
    const { data } = await axios.get("/api/workspace");

    workspaces = data.result.workspaces;
  }

  if (isKeywordBlank) {
    return isMainPage
      ? workspaces.filter((workspace: IWorkspace) => workspace.folder === null)
      : workspaces;
  }

  return workspaces.filter((workspace: IWorkspace) =>
    workspace.title.includes(keyword)
  );
}
/**
 * 드롭다운(최신, 오래된 순)일 때 실행되는 api
 */
export async function getWorkspacesSortedByEditedAt({
  type,
  isFavoritesPage,
  isTagPage,
}: {
  type: string;
  isFavoritesPage?: boolean;
  isTagPage?: boolean;
}) {
  let workspaces;

  if (isFavoritesPage) {
    const { data } = await axios.get("/api/workspace/favorites");

    workspaces = data.result.workspaces;
  } else if (isTagPage) {
    const { data } = await axios.get("/api/workspace");

    workspaces = data.result.workspaces;
  } else {
    const { data } = await axios.get("/api/workspace");

    const outsideOfFolderWorkspace = data.result.workspaces.filter(
      (workspace: IWorkspace) => workspace.folder === null
    );

    workspaces = outsideOfFolderWorkspace;
  }

  const sortedData = sortBy(workspaces, "editedAt").reverse();

  if (type === "Newest") {
    return sortedData;
  } else {
    const sortedReverseData = sortBy(workspaces, "editedAt");

    return sortedReverseData;
  }
}

/**
 * 즐겨찾기 workspace 불러오는 api
 */
export async function getFavoratedWorkspace() {
  const { data } = await axios.get("/api/workspace/favorites");

  return data.result.workspaces;
}

/**
 * 즐겨찾기 상태 수정하는 api
 */
export async function patchFavoritesWorkspace({
  workspaceId,
  isFavorites,
}: {
  workspaceId: string;
  isFavorites: boolean;
}) {
  const params = {
    workspaceId,
    isFavorites,
  };

  await axios.patch(`/api/workspace/favorites/${workspaceId}`, params);
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
 * 워크스페이스 썸네일 생성
 */
export async function postWorkspaceThumbnail({
  workspaceId,
  formData,
}: {
  workspaceId: string;
  formData: any;
}) {
  await axios.post(`/api/workspace/${workspaceId}/thumbnail`, formData);
}

/**
 * 워크스페이스 수정 api
 */
export async function patchWorkspace({
  workspaceId,
  folder,
  folderId,
  title,
}: {
  workspaceId: string;
  title?: string;
  folderId?: string | null;
  folder?: string | null;
}) {
  await axios.patch(`/api/workspace/${workspaceId}`, {
    workspaceId,
    folder,
    folderId,
    title,
  });
}

/**
 * 워크스페이스 수정 api
 */
export async function patchWorkspaceInner({
  workspaceId,
  document,
}: {
  workspaceId: string;
  document: TDDocument;
}) {
  await axios.patch(`/api/workspace/${workspaceId}`, {
    content: document,
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
