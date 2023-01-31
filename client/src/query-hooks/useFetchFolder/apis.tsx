import axios from "axios";

/**
 * 모든 폴더 가져오는 로직
 */
export async function getFolder() {
  const { data } = await axios.get("/api/folder");

  return data;
}

/**
 * 폴더 생성하는 로직
 */
export async function postFolder({ title }: { title: string }) {
  await axios.post(`/api/folder`, {
    title,
  });
}

/**
 * 폴더 수정하는 로직
 */
export async function patchFolder({
  uid,
  title,
}: {
  uid: string;
  title: string;
}) {
  await axios.patch(`/api/folder/${uid}`, {
    folderId: uid,
    title: title,
  });
}

/**
 * 특정 폴더 삭제하는 로직
 */
export async function deleteFolder({ uid }: { uid: string }) {
  await axios.delete(`/api/folder/${uid}`);
}
