import axios from "axios";

/**
 * 전체 태그 가져오기
 */
export async function getTags() {
  const { data } = await axios.get("/api/tag");

  return data.result.tags;
}

/**
 * 태그 목록 정렬하는 api
 */
export async function getTagsSortedByCount({ type }: { type: string }) {
  const { data } = await axios.get("/api/tag");

  if (type === "basic") {
    return data.result.tags;
  } else if (type === "count") {
    const sortedTagList = data.result.tags.sort(
      (a: any, b: any) => b.workspaces.length - a.workspaces.length
    );

    return sortedTagList;
  }
}

/**
 * 태그 목록 이름 순 정렬하는 api
 */
export async function getTagsSortedByName({ isSort }: { isSort: boolean }) {
  const { data } = await axios.get("/api/tag");

  if (isSort) {
    const sortedTagList = data.result.tags.sort((a: any, b: any) =>
      a.name.localeCompare(b.name)
    );

    return sortedTagList;
  } else {
    return data.result.tags;
  }
}

/**
 * 파이썬 서버 추천 태그 가져오기
 */
export async function getRecommendedTag({
  text,
  workspaceId,
}: {
  text: string;
  workspaceId: string;
}) {
  try {
    const { data } = await axios.post(
      "/kobert/tags",
      JSON.stringify({ text: text }),
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    );

    const recommendedTags = data.result.tags;

    axios.patch(`/api/workspace/${workspaceId}/recommendedTags`, {
      recommendedTags,
    });

    return recommendedTags;
  } catch (err) {
    console.log(err);
  }
}

/**
 * 워크스페이스 안에 태그 목록 가져오는 api
 */
export async function getTagsInWorkspace({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const { data } = await axios.get(`/api/workspace/${workspaceId}`);

  const currentWorkspaceTagList = data.result.workspace.tags;

  return currentWorkspaceTagList;
}

/**
 * 워크스페이스 안에 태그 생성하는 로직
 */
export async function postTag({
  name,
  workspaceId,
}: {
  name: string;
  workspaceId: string;
}) {
  await axios.post("/api/tag", {
    name: name,
    workspaceId: workspaceId,
  });
}

/**
 * 워크스페이스 안에 태그 수정하는 로직
 */
export async function patchTag({
  tagId,
  tagName,
  workspaceId,
}: {
  tagId: string;
  tagName: string;
  workspaceId: string;
}) {
  const { data } = await axios.patch(`/api/tag/${tagId}`, {
    workspaceId: workspaceId,
    tagName: tagName,
  });

  return data.result.tag;
}

/**
 * 태그 삭제
 */
export async function deleteTag({
  workspaceId,
  tagId,
}: {
  workspaceId: string;
  tagId: string;
}) {
  await axios.delete(`/api/tag/${tagId}`, {
    data: { workspaceId: workspaceId },
  });
}
