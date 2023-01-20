const workspaceKeys = {
  all: () => ["workspace"],
  withTag: (tagId: string) => [...workspaceKeys.all(), tagId],
  search: (value: string) => [...workspaceKeys.all(), value],
  outsideOfFolder: () => [...workspaceKeys.all(), "externalFolder"],
  workspaceInFolder: (folderId: string) => [...workspaceKeys.all(), folderId],
  favoritesWorkspace: () => [...workspaceKeys.all(), "favorites"],
};

export default workspaceKeys;
