const workspaceKeys = {
  all: () => ["workspace"],
  withTag: (tagId: string) => [...workspaceKeys.all(), tagId],
  search: (value: string) => [...workspaceKeys.all(), value],
  sort: (type: string) => [...workspaceKeys.all(), type],
  current: (workspaceId: string) => [...workspaceKeys.all(), workspaceId],
  outsideOfFolder: () => [...workspaceKeys.all(), "outside"],
  workspaceInFolder: (folderId: string | null) => [
    ...workspaceKeys.all(),
    folderId,
  ],
  favoritedWorkspace: () => [...workspaceKeys.all(), "favorited"],
};

export default workspaceKeys;
