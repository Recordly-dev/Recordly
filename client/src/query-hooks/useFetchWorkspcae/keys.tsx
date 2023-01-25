const workspaceKeys = {
  all: () => ["workspace"],
  withTag: (tagId: string) => [...workspaceKeys.all(), tagId],
  search: (value: string) => [...workspaceKeys.all(), value],
  outsideOfFolder: () => [...workspaceKeys.all(), "outside"],
  workspaceInFolder: (folderId: string | null) => [
    ...workspaceKeys.all(),
    folderId,
  ],
  favoritedWorkspace: () => [...workspaceKeys.all(), "favorited"],
};

export default workspaceKeys;
