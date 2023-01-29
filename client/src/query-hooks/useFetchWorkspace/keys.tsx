const workspaceKeys = {
  all: () => ["workspace"],
  favorited: () => [...workspaceKeys.all(), "favorited"],
  outsideOfFolder: () => [...workspaceKeys.all(), "outside"],
  workspaceInFolder: (folderId: string | null) => [
    ...workspaceKeys.all(),
    folderId,
  ],

  haveTags: (tagId: string) => [...workspaceKeys.all(), tagId],
  searched: (keyword: string) => [...workspaceKeys.all(), keyword],
  sorted: (sortType: string) => [...workspaceKeys.all(), sortType],
  current: (workspaceId: string) => [...workspaceKeys.all(), workspaceId],
};

export default workspaceKeys;
